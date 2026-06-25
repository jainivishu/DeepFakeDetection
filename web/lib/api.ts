import axios from "axios";
import { DetectionResult } from "@/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function detectDeepfake(
  file: File,
  onProgress?: (percent: number) => void
): Promise<DetectionResult> {
  const formData = new FormData();
  formData.append("video", file);

  const { data } = await axios.post<DetectionResult>(
    `${API_BASE_URL}/detect`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (event) => {
        if (event.total && onProgress) {
          onProgress(Math.round((event.loaded * 100) / event.total));
        }
      },
    }
  );

  return data;
}
