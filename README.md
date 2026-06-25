# DeepFake Detector — Web UI + Dummy API

A production-style web interface for deepfake video detection. The frontend is built with **Next.js**, **Tailwind CSS**, and **Framer Motion**. The backend is a **FastAPI** service that currently returns simulated predictions and is wired up for a real **Keras/TensorFlow** CNN+LSTM model later.

---

## Project layout

```
DeepFakeDetection/
├── web/                 # Next.js frontend
│   ├── app/             # Pages & global styles
│   ├── components/      # Hero, UploadZone, GaugeMeter, ResultCard, etc.
│   ├── lib/             # API client
│   └── types/           # Shared TypeScript types
│
├── api/                 # FastAPI backend
│   ├── main.py          # /detect endpoint + model loading placeholder
│   ├── requirements.txt # Python dependencies
│   └── model/           # Put your trained .h5 / .keras model here
│
└── README.md
```

---

## How it works

1. The user drops or selects a video in the browser.
2. The frontend streams the file to the FastAPI `/detect` endpoint.
3. The backend saves the video to a temporary file, extracts frames, runs the model, then deletes the video.
4. The backend returns `{ prediction: "real" | "fake", confidence: 0.93 }`.
5. The frontend animates a circular confidence meter and shows the verdict.

---

## Run locally

### 1. Start the backend

```bash
cd api
python -m venv venv
source venv/bin/activate          # On Windows: venv\Scripts\activate
pip install -r requirements.txt   # tensorflow is heavy; dummy mode skips it
uvicorn main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`.  
Visit `http://localhost:8000/docs` for the interactive Swagger UI.

### 2. Start the frontend

```bash
cd web
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## Connect your real model

1. Save your trained model file inside `api/model/`, e.g. `deepfake_cnn_lstm.h5`.
2. Update `api/.env`:

```env
MODEL_PATH=model/deepfake_cnn_lstm.h5
```

3. In `api/main.py`, uncomment the inference block inside `/detect`:

```python
from tensorflow.keras.models import load_model

model = load_model(MODEL_PATH)

# Inside /detect
frames = extract_frames(tmp_path)
preds = model.predict(np.expand_dims(frames, axis=0))
confidence = float(preds[0][0])
prediction = "fake" if confidence > 0.5 else "real"
confidence = round(confidence if prediction == "fake" else 1 - confidence, 3)
```

4. Make sure `extract_frames` produces the exact shape your model expects.

---

## Environment variables

| Variable | Used in | Purpose |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | `web/.env.local` | URL of the FastAPI backend (default: `http://localhost:8000`) |
| `MODEL_PATH` | `api/.env` | Path to trained Keras model; use `dummy` for simulated results |

---

## Notes

- Uploaded videos are **not stored permanently**. They are written to temp files and removed immediately after inference.
- The current backend uses `python-multipart` for file uploads and `CORSMiddleware` so the Next.js dev server can talk to it.
- Do **not** deploy until you confirm the full model integration works locally.
