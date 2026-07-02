// ─── AI Chat & Messaging Types ────────────────────────────────────────────────

export interface DiagnosisResult {
  condition: string;
  disease: string;
  confidence: string;
  treatment: string;
  prevention: string;
}

export interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  time: string;
  image?: string;
  diagnosis?: DiagnosisResult;
}

export interface ChatMessage {
  id: string;
  sender: string;
  role: "agent" | "customer" | "system";
  text: string;
  time: string;
}
