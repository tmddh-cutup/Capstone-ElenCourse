import { NextRequest, NextResponse } from "next/server";
import type {
  TutorProblemPayload,
  TutorPrimaryType,
  TutorTypeFlags,
  TutorSolutionStep,
  TutorEntryBranch,
} from "@/lib/schema";

/**
 * generate-tutor-json API 요청 body 타입
 * - problemText: 사용자가 입력한 문제 원문
 * - userRequest: 사용자의 추가 요청 (예: "개념 위주로 설명해줘")
 */
type GenerateTutorJsonRequest = {
  problemText?: string;
  userRequest?: string;
};

/**
 * 문제 텍스트 안의 키워드를 기반으로 멀티 태그 플래그를 만든다.
 * 이 단계는 "문제에 어떤 성격이 섞여 있는가"를 판단하는 1차 분류 단계이다.
 */
function detectTypeFlags(problemText: string): TutorTypeFlags {
  const text = problemText.toLowerCase();

  return {
    calculation_procedural:
      text.includes("계산") ||
      text.includes("값을 구하") ||
      text.includes("결과를 구하"),

    algebraic_structure:
      text.includes("인수분해") ||
      text.includes("전개") ||
      text.includes("식을 정리") ||
      text.includes("식을 변형") ||
      text.includes("식의 값"),

    equation_solving:
      text.includes("방정식") ||
      text.includes("부등식") ||
      text.includes("해를 구하") ||
      text.includes("근을 구하"),

    combinatorial_reasoning:
      text.includes("경우의 수") ||
      text.includes("확률") ||
      text.includes("조합") ||
      text.includes("순열"),

    graph_geometry:
      text.includes("그래프") ||
      text.includes("함수") ||
      text.includes("좌표") ||
      text.includes("기울기") ||
      text.includes("도형"),

    conceptual_understanding:
      text.includes("정의") ||
      text.includes("설명") ||
      text.includes("이유") ||
      text.includes("옳은 것") ||
      text.includes("개념"),
  };
}

/**
 * 멀티 태그 플래그 중에서 대표 문제 유형(primary type)을 하나 선택한다.
 * 현재는 우선순위 기반 단일 선택 방식이다.
 */
function selectPrimaryType(flags: TutorTypeFlags): TutorPrimaryType {
  if (flags.equation_solving) return "equation_solving";
  if (flags.graph_geometry) return "graph_geometry";
  if (flags.combinatorial_reasoning) return "combinatorial_reasoning";
  if (flags.algebraic_structure) return "algebraic_structure";
  if (flags.conceptual_understanding) return "conceptual_understanding";
  if (flags.calculation_procedural) return "calculation_procedural";

  return "conceptual_understanding";
}

/**
 * 대표 문제 유형에 따라
 * - 개념명
 * - 핵심 아이디어
 * - 추천 진입 브랜치
 * 를 결정한다.
 */
function buildClassificationInfo(
  problemText: string
): {
  primaryType: TutorPrimaryType;
  typeFlags: TutorTypeFlags;
  concept: string;
  keyIdea: string;
  entryBranch: TutorEntryBranch;
} {
  const typeFlags = detectTypeFlags(problemText);
  const primaryType = selectPrimaryType(typeFlags);

  switch (primaryType) {
    case "equation_solving":
      return {
        primaryType,
        typeFlags,
        concept: "방정식 풀이",
        keyIdea: "식을 정리하고 적절한 풀이법으로 해를 구하는 유형",
        entryBranch: "solution_support",
      };

    case "graph_geometry":
      return {
        primaryType,
        typeFlags,
        concept: "그래프 및 함수 해석",
        keyIdea: "그래프와 식의 관계를 해석하여 필요한 값을 구하는 유형",
        entryBranch: "concept_support",
      };

    case "combinatorial_reasoning":
      return {
        primaryType,
        typeFlags,
        concept: "경우의 수와 확률",
        keyIdea: "조건을 분류해 가능한 경우를 체계적으로 세는 유형",
        entryBranch: "solution_support",
      };

    case "algebraic_structure":
      return {
        primaryType,
        typeFlags,
        concept: "식의 구조 파악과 변형",
        keyIdea: "식의 형태를 보고 적절한 변형 전략을 적용하는 유형",
        entryBranch: "solution_support",
      };

    case "calculation_procedural":
      return {
        primaryType,
        typeFlags,
        concept: "기본 계산 및 절차 수행",
        keyIdea: "주어진 조건과 식을 바탕으로 순서대로 계산하는 유형",
        entryBranch: "initial_prompt",
      };

    case "conceptual_understanding":
    default:
      return {
        primaryType,
        typeFlags,
        concept: "개념 이해",
        keyIdea: "핵심 개념과 조건의 의미를 정확히 파악하는 유형",
        entryBranch: "concept_support",
      };
  }
}

/**
 * 대표 문제 유형에 따라 튜터 내부 로직용 step skeleton을 만든다.
 * 이 데이터는 UI 표시용이라기보다, "튜터가 어떤 순서로 도움을 줄지"를 위한 구조이다.
 */
function buildStepSkeleton(primaryType: TutorPrimaryType): TutorSolutionStep[] {
  switch (primaryType) {
    case "equation_solving":
      return [
        {
          step_id: 1,
          title: "식 정리",
          step_type: "identify",
          goal: "방정식 형태를 파악한다",
        },
        {
          step_id: 2,
          title: "풀이 적용",
          step_type: "transform",
          goal: "적절한 풀이법을 적용한다",
        },
        {
          step_id: 3,
          title: "답 검토",
          step_type: "verify",
          goal: "해가 조건을 만족하는지 확인한다",
        },
      ];

    case "graph_geometry":
      return [
        {
          step_id: 1,
          title: "그래프 정보 파악",
          step_type: "identify",
          goal: "그래프와 함수의 핵심 정보를 정리한다",
        },
        {
          step_id: 2,
          title: "관계 해석",
          step_type: "interpret",
          goal: "그래프와 식의 관계를 연결한다",
        },
        {
          step_id: 3,
          title: "결과 확인",
          step_type: "verify",
          goal: "구한 값의 그래프적 의미를 확인한다",
        },
      ];

    case "combinatorial_reasoning":
      return [
        {
          step_id: 1,
          title: "조건 분류",
          step_type: "identify",
          goal: "조건에 따라 경우를 나눈다",
        },
        {
          step_id: 2,
          title: "경우 계산",
          step_type: "calculate",
          goal: "각 경우의 수 또는 확률을 계산한다",
        },
        {
          step_id: 3,
          title: "최종 정리",
          step_type: "verify",
          goal: "원하는 경우만 골라 답을 정리한다",
        },
      ];

    case "algebraic_structure":
      return [
        {
          step_id: 1,
          title: "식의 형태 관찰",
          step_type: "identify",
          goal: "식의 구조적 특징을 파악한다",
        },
        {
          step_id: 2,
          title: "식 변형",
          step_type: "transform",
          goal: "적절한 변형 전략을 적용한다",
        },
        {
          step_id: 3,
          title: "변형 결과 확인",
          step_type: "verify",
          goal: "변형이 올바른지 점검한다",
        },
      ];

    case "calculation_procedural":
      return [
        {
          step_id: 1,
          title: "조건 확인",
          step_type: "identify",
          goal: "주어진 값과 구할 값을 정리한다",
        },
        {
          step_id: 2,
          title: "계산 수행",
          step_type: "calculate",
          goal: "계산 순서에 맞게 값을 구한다",
        },
        {
          step_id: 3,
          title: "답 검산",
          step_type: "verify",
          goal: "계산 결과를 다시 확인한다",
        },
      ];

    case "conceptual_understanding":
    default:
      return [
        {
          step_id: 1,
          title: "문제 의미 파악",
          step_type: "identify",
          goal: "문제의 조건과 요구를 해석한다",
        },
        {
          step_id: 2,
          title: "핵심 개념 연결",
          step_type: "interpret",
          goal: "관련 개념과 연결한다",
        },
        {
          step_id: 3,
          title: "논리 점검",
          step_type: "verify",
          goal: "설명이나 판단이 타당한지 확인한다",
        },
      ];
  }
}

/**
 * 대표 문제 유형에 따른 짧은 힌트를 생성한다.
 * 이 데이터는 학생에게 직접 노출되는 짧은 도움말 용도이다.
 */
function buildShortHints(
  primaryType: TutorPrimaryType
): { ko: string[]; en: string[] } {
  switch (primaryType) {
    case "equation_solving":
      return {
        ko: [
          "먼저 식을 한쪽으로 정리해 보자.",
          "어떤 풀이법이 적절한지 먼저 떠올려 보자.",
        ],
        en: [
          "First rewrite the equation in a clear form.",
          "Think about which solving method fits best.",
        ],
      };

    case "graph_geometry":
      return {
        ko: [
          "그래프에서 주어진 핵심 정보를 먼저 찾자.",
          "그래프와 식이 어떻게 연결되는지 생각해 보자.",
        ],
        en: [
          "Identify the key information from the graph first.",
          "Think about how the graph and equation are connected.",
        ],
      };

    case "combinatorial_reasoning":
      return {
        ko: [
          "조건을 기준으로 경우를 나누어 보자.",
          "전체 경우와 원하는 경우를 구분해 보자.",
        ],
        en: [
          "Split the problem into cases based on the conditions.",
          "Separate total cases from the target cases.",
        ],
      };

    case "algebraic_structure":
      return {
        ko: [
          "식의 형태를 먼저 관찰해 보자.",
          "전개나 인수분해가 가능한지 확인해 보자.",
        ],
        en: [
          "Inspect the structure of the expression first.",
          "Check whether expansion or factorization helps.",
        ],
      };

    case "calculation_procedural":
      return {
        ko: [
          "주어진 값과 구할 값을 먼저 구분하자.",
          "계산 순서를 천천히 따라가 보자.",
        ],
        en: [
          "Separate the given values from the target first.",
          "Follow the calculation order step by step.",
        ],
      };

    case "conceptual_understanding":
    default:
      return {
        ko: [
          "핵심 개념이 무엇인지 먼저 떠올려 보자.",
          "문제의 문장을 천천히 해석해 보자.",
        ],
        en: [
          "Identify the core concept first.",
          "Interpret the statement carefully.",
        ],
      };
  }
}

/**
 * 최종 payload 생성 함수
 *
 * 구조 원칙:
 * - viewer: 프론트 화면에 바로 보여주기 위한 표시용 데이터
 * - solution_model: 튜터 내부 로직(단계별 풀이 지원)에 사용하는 데이터
 *
 * 중복 제거 원칙:
 * - 단계별 풀이(step skeleton)는 solution_model에서만 관리
 * - viewer에는 표시용 최소 정보만 둔다
 */
function buildPayload(
  problemText: string,
  userRequest?: string
): TutorProblemPayload {
  const {
    primaryType,
    typeFlags,
    concept,
    keyIdea,
    entryBranch,
  } = buildClassificationInfo(problemText);

  const steps = buildStepSkeleton(primaryType);
  const hints = buildShortHints(primaryType);

  return {
    viewer: {
      problem_info: {
        id: `generated-${Date.now()}`,
        source: "User Input",
        subject: "Mathematics",
        points: undefined,
      },

      problem_statement: {
        main_text: problemText,
        sub_question: userRequest || "",
        choices: [],
      },

      analysis: {
        concept,
        key_idea: keyIdea,
      },

      // 그래프, 도형, 시각 자료 등이 있을 경우 나중에 확장 가능
      visualization: undefined,

      // 객관식 문제일 때만 의미가 있는 필드
      answer_index: undefined,
    },

    classification: {
      primary_type: primaryType,
      recommended_entry_branch: entryBranch,
      type_flags: typeFlags,
      difficulty: "medium",
    },

    solution_model: {
      // 이 문제를 어떤 방향으로 풀어야 하는지에 대한 짧은 개요
      overview: keyIdea,

      // 튜터가 단계적으로 학생을 도울 때 사용하는 내부 step 구조
      steps,

      // 현재는 정답 미확정 상태이므로 비워둠
      final_answer: null,
    },

    tutoring_assets: {
      // 튜터가 학생에게 처음 던질 수 있는 유도 질문
      logic_steps: {
        ko: ["먼저 이 문제가 어떤 성격의 문제인지 말해볼래?"],
        en: ["Can you first tell what kind of problem this is?"],
      },

      // 짧은 힌트 모음
      hints,

      // 관련 핵심 개념 정보
      core_concepts: [
        {
          name: concept,
          description: keyIdea,
        },
      ],

      // schema.ts에 정의되어 있을 때만 유지
      common_mistakes: {
        ko: [
          "부호를 반대로 잡는 실수",
          "두 근 중 하나만 답으로 적는 실수",
        ],
        en: [
          "Sign errors during factorization",
          "Writing only one root as the answer",
        ],
      },
    },

    ui_config: {
      show_graph_panel: typeFlags.graph_geometry,
      show_choices: false,
      show_hint_button: true,
      show_concept_button: true,
      show_solution_steps: true,
      show_concept_panel: true,
    },

    meta: {
      source_type: "text",
      user_request: userRequest,
      generated_at: new Date().toISOString(),
    },
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as GenerateTutorJsonRequest;
    const problemText = body.problemText?.trim();
    const userRequest = body.userRequest?.trim();

    if (!problemText) {
      return NextResponse.json(
        {
          success: false,
          error: "problemText is required.",
        },
        { status: 400 }
      );
    }

    const payload = buildPayload(problemText, userRequest);

    return NextResponse.json({
      success: true,
      data: payload,
    });
  } catch (error) {
    console.error("[generate-tutor-json] error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate tutor JSON.",
      },
      { status: 500 }
    );
  }
}