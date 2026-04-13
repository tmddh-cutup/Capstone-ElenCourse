import { NextResponse } from "next/server";
import type { TutorProblemPayload } from "@/lib/schema";

export async function GET() {
  const payload: TutorProblemPayload = {
    viewer: {
      problem_info: {
        id: "sample-001",
        source: "Mock Data",
        subject: "Mathematics",
        points: 3,
      },
      problem_statement: {
        main_text: "이차방정식 x^2 - 5x + 6 = 0의 해를 구하시오.",
        sub_question: "핵심 개념과 단계별 풀이를 생각해보자.",
        choices: [],
      },
      analysis: {
        concept: "이차방정식의 인수분해",
        key_idea: "인수분해를 통해 두 근을 찾는다.",
      },
      visualization: undefined,
      answer_index: undefined,
      solution: {
        steps: [
          {
            step_id: 1,
            explanation: "식이 인수분해 가능한지 확인한다.",
          },
          {
            step_id: 2,
            explanation: "(x-2)(x-3)=0 으로 변형한다.",
          },
          {
            step_id: 3,
            explanation: "각 인수를 0으로 두어 x=2, 3을 구한다.",
          },
        ],
        final_answer: "x=2, 3",
      },
    },
    classification: {
      primary_type: "equation_solving",
      recommended_entry_branch: "solution_support",
      type_flags: {
        calculation_procedural: false,
        algebraic_structure: true,
        equation_solving: true,
        combinatorial_reasoning: false,
        graph_geometry: false,
        conceptual_understanding: false,
      },
      difficulty: "easy",
    },
    solution_model: {
      overview: "이 문제는 인수분해를 통해 해를 구하는 기본적인 이차방정식 문제이다.",
      steps: [
        {
          step_id: 1,
          title: "식의 구조 파악",
          step_type: "identify",
          goal: "주어진 식이 인수분해 가능한 형태인지 확인한다.",
          explanation: "곱해서 6이 되고 더해서 -5가 되는 두 수를 찾는다.",
          concept_tag: "인수분해",
        },
        {
          step_id: 2,
          title: "인수분해",
          step_type: "transform",
          goal: "식을 곱셈 형태로 바꾼다.",
          explanation: "x^2 - 5x + 6 = (x-2)(x-3) 으로 인수분해된다.",
          expected_answer: "(x-2)(x-3)=0",
          concept_tag: "이차식 인수분해",
        },
        {
          step_id: 3,
          title: "해 구하기",
          step_type: "calculate",
          goal: "각 인수를 0으로 두고 해를 구한다.",
          explanation: "x-2=0 또는 x-3=0 이므로 x=2, 3이다.",
          expected_answer: "x=2, x=3",
          concept_tag: "방정식의 해",
        },
      ],
      final_answer: "x=2, 3",
    },
    tutoring_assets: {
      logic_steps: {
        ko: [
          "이 식이 어떤 형태의 방정식인지 먼저 말해볼래?",
          "인수분해가 가능하려면 어떤 두 수를 찾아야 할까?",
          "인수분해한 뒤에는 각 인수를 어떻게 처리해야 할까?"
        ],
        en: [
          "What kind of equation is this?",
          "Which two numbers are needed for factorization?",
          "After factorization, what should we do with each factor?"
        ],
      },
      hints: {
        ko: [
          "합이 -5이고 곱이 6인 두 수를 찾아보자.",
          "인수분해 뒤에는 각 인수를 0으로 둔다.",
        ],
        en: [
          "Find two numbers whose sum is -5 and product is 6.",
          "After factorization, set each factor equal to zero.",
        ],
      },
      core_concepts: [
        {
          name: "인수분해",
          description: "이차식을 두 일차식의 곱으로 나타내는 방법이다.",
        },
        {
          name: "방정식의 해",
          description: "식을 참으로 만드는 미지수의 값이다.",
        },
      ],
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
      show_graph_panel: false,
      show_choices: false,
      show_hint_button: true,
      show_concept_button: true,
      show_solution_steps: true,
      show_concept_panel: true,
    },
    meta: {
      source_type: "text",
      user_request: "핵심 개념과 단계별 풀이를 보여줘",
      generated_at: new Date().toISOString(),
    },
  };

  return NextResponse.json(payload);
}