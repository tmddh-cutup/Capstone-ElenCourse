import { GoogleGenAI, type Part } from "@google/genai";
import { buildTutorJsonPrompt } from "./tutorPrompt";

type GeminiTutorJsonInput = {
  imageBase64: string;
  mimeType: string;
  userRequest?: string;
};

export async function generateTutorJsonWithGemini(input: GeminiTutorJsonInput) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY가 설정되어 있지 않습니다.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const imagePart: Part = {
    inlineData: {
      data: input.imageBase64,
      mimeType: input.mimeType,
    },
  };

  const prompt = buildTutorJsonPrompt(input.userRequest);

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [imagePart, prompt],
    config: {
      responseMimeType: "application/json",
      temperature: 0.2,
    },
  });

  const text = response.text ?? "{}";

  return {
    provider: "gemini",
    model: "gemini-2.5-flash",
    json: JSON.parse(text),
    rawText: text,
  };
}