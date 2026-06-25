export type Prediction = "real" | "fake";

export interface DetectionResult {
  prediction: Prediction;
  confidence: number;
}

export type Status = "idle" | "preview" | "analyzing" | "result";
