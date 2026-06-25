import os
import shutil
import tempfile
from contextlib import asynccontextmanager
from typing import List

from dotenv import load_dotenv

load_dotenv()

import cv2
import keras
import numpy as np
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from mtcnn import MTCNN
from pydantic import BaseModel

MODEL_PATH = os.getenv("MODEL_PATH", "dummy")
NUM_FRAMES = 10          # Must match the model's time dimension
IMG_SIZE = 128           # Must match the model's spatial dimension
CLASS_NAMES = ["real", "fake"]  # Index 0 = real, index 1 = fake

model = None
face_detector = None


class DetectionResult(BaseModel):
    prediction: str
    confidence: float


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Load the trained model and face detector once when the server starts."""
    global model, face_detector
    if MODEL_PATH.lower() not in ("dummy", "", "none") and os.path.exists(MODEL_PATH):
        model = keras.models.load_model(MODEL_PATH)
        print(f"[INFO] Loaded model from {MODEL_PATH}")
        print(f"[INFO] Model input: {model.input_shape}, output: {model.output_shape}")
        face_detector = MTCNN()
        print("[INFO] Face detector ready")
    else:
        print("[INFO] MODEL_PATH not set or file missing. Running in DUMMY mode.")
        model = None
        face_detector = None
    yield
    print("[INFO] Server shutting down.")


app = FastAPI(
    title="DeepFake Detector API",
    description="Upload a video and get a real/fake prediction.",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def _crop_face(frame_bgr: np.ndarray) -> np.ndarray:
    """Detect and crop the largest face in a BGR frame, fallback to resized frame."""
    rgb = cv2.cvtColor(frame_bgr, cv2.COLOR_BGR2RGB)
    faces = face_detector.detect_faces(rgb) if face_detector is not None else []

    if faces:
        # Pick the largest detected face
        largest = max(faces, key=lambda f: f["box"][2] * f["box"][3])
        x, y, w, h = largest["box"]
        x, y = max(0, x), max(0, y)
        face = rgb[y : y + h, x : x + w]
        face = cv2.resize(face, (IMG_SIZE, IMG_SIZE))
        return face

    # Fallback: resize the whole frame
    return cv2.resize(rgb, (IMG_SIZE, IMG_SIZE))


def extract_frames(video_path: str, max_frames: int = NUM_FRAMES) -> np.ndarray:
    """
    Extract evenly-spaced frames, crop the largest face with MTCNN,
    and preprocess for MobileNetV2 (RGB, [-1, 1]).
    Returns shape: (max_frames, IMG_SIZE, IMG_SIZE, 3)
    """
    cap = cv2.VideoCapture(video_path)
    total = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

    if total == 0:
        cap.release()
        return np.zeros((max_frames, IMG_SIZE, IMG_SIZE, 3), dtype=np.float32)

    step = max(total // max_frames, 1)
    frames: List[np.ndarray] = []

    for i, frame_idx in enumerate(range(0, total, step)):
        if i >= max_frames:
            break
        cap.set(cv2.CAP_PROP_POS_FRAMES, frame_idx)
        ret, frame = cap.read()
        if not ret:
            break
        face = _crop_face(frame)
        frames.append(face.astype(np.float32))

    cap.release()

    # Pad with black frames if the video is shorter than expected
    while len(frames) < max_frames:
        frames.append(np.zeros((IMG_SIZE, IMG_SIZE, 3), dtype=np.float32))

    frames = np.array(frames[:max_frames])
    # MobileNetV2 official preprocessing: RGB pixels in [0, 255] -> [-1, 1]
    frames = keras.applications.mobilenet_v2.preprocess_input(frames)
    return frames


@app.get("/health")
def health():
    return {
        "status": "ok",
        "mode": "dummy" if model is None else "model",
        "input_shape": str(model.input_shape) if model else None,
    }


@app.post("/detect", response_model=DetectionResult)
def detect(video: UploadFile = File(...)):
    if not video.content_type or not video.content_type.startswith("video/"):
        raise HTTPException(status_code=400, detail="Uploaded file is not a recognized video")

    suffix = f"_{video.filename}" if video.filename else ".mp4"
    with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
        shutil.copyfileobj(video.file, tmp)
        tmp_path = tmp.name

    try:
        if model is None:
            raise HTTPException(
                status_code=503,
                detail="Model not loaded. Check MODEL_PATH and server logs.",
            )

        frames = extract_frames(tmp_path)
        preds = model.predict(np.expand_dims(frames, axis=0), verbose=0)
        scores = preds[0]

        class_idx = int(scores.argmax())
        confidence = round(float(scores[class_idx]), 3)
        prediction = CLASS_NAMES[class_idx]

        return DetectionResult(prediction=prediction, confidence=confidence)
    finally:
        os.remove(tmp_path)
