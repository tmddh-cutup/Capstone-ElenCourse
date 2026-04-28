import { NextRequest, NextResponse } from "next/server";
import { generateTutorJsonWithGemini } from "@/lib/ai/geminiProvider";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const image = formData.get("image");
    const userRequest = formData.get("userRequest");

    if (!(image instanceof File)) {
      return NextResponse.json(
        { error: "image 파일은 필수입니다." },
        { status: 400 }
      );
    }

    if (!image.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "이미지 파일만 업로드할 수 있습니다." },
        { status: 400 }
      );
    }

    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const imageBase64 = buffer.toString("base64");

    const result = await generateTutorJsonWithGemini({
      imageBase64,
      mimeType: image.type,
      userRequest: typeof userRequest === "string" ? userRequest : "",
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("[generate-tutor-json] error:", error);

    return NextResponse.json(
      {
        error: "Tutor JSON 생성 중 오류가 발생했습니다.",
        detail: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}