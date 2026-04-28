"use client";

import { useState } from "react";

export default function TestGeminiPage() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [userRequest, setUserRequest] = useState("");
  const [result, setResult] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);

  async function requestTutorJson() {
    if (!imageFile) {
      alert("이미지를 선택하세요.");
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("userRequest", userRequest);

    setLoading(true);

    try {
      const res = await fetch("/api/generate-tutor-json", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Tutor JSON 생성 실패");
      }

      setResult(data);
    } catch (error) {
      setResult({
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Gemini Tutor JSON Test</h1>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
      />

      <br />
      <br />

      <textarea
        value={userRequest}
        onChange={(e) => setUserRequest(e.target.value)}
        placeholder="사용자 요구사항 입력"
        rows={4}
        style={{ width: "100%", maxWidth: 600 }}
      />

      <br />
      <br />

      <button onClick={requestTutorJson} disabled={loading}>
        {loading ? "생성 중..." : "Tutor JSON 생성"}
      </button>

      <pre
        style={{
          marginTop: 24,
          padding: 16,
          background: "#111",
          color: "#0f0",
          whiteSpace: "pre-wrap",
        }}
      >
        {result ? JSON.stringify(result, null, 2) : "결과 없음"}
      </pre>
    </main>
  );
}