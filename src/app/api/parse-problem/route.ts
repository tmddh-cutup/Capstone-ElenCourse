import { NextResponse } from "next/server";
import type { TutorProblemPayload } from "@/lib/schema";

export async function GET() {
  const payload: TutorProblemPayload = {
    viewer: {
      problem_info: {
        id: "ai-mock-001",
        source: "AI mock parser",
        subject: "Mathematics - Calculus",
        points: 3,
      },
      problem_statement: {
        main_text:
          "점 A(1, 0)을 지나고 기울기가 양수인 직선 l이 곡선 y=2\\sqrt{x}와 만나는 점을 B, 점 B에서 x축에 내린 수선의 발을 C라 하자.",
        sub_question:
          "점 B(t, 2\\sqrt{t})에 대하여 삼각형 BAC의 넓이를 f(t)라 할 때, f'(9)의 값은?",
        choices: ["3", "\\dfrac{10}{3}", "\\dfrac{11}{3}", "4", "\\dfrac{13}{3}"],
      },
      analysis: {
        concept: "삼각형 넓이와 미분",
        key_idea:
          "밑변과 높이를 t에 대한 식으로 만든 뒤 넓이 함수를 미분한다.",
      },
      visualization: {
        engine: "tikz",
        code: String.raw`\begin{tikzpicture}[scale=1.2, >=Stealth]
\draw[->] (-1,0) -- (6,0) node[below] {$x$};
\draw[->] (0,-1.5) -- (0,4.5) node[left] {$y$};
\node at (-0.2,-0.2) {O};

\draw[thick, blue, domain=0:5, samples=100] plot (\x, {2*sqrt(\x)});
\node[blue, right] at (4.5, 4.2) {$y=2\sqrt{x}$};

\coordinate (A) at (1,0);
\coordinate (B) at (4,4);
\coordinate (C) at (4,0);

\draw[dashed, gray] (B) -- (C);
\draw (3.8,0) -- (3.8,0.2) -- (4,0.2);

\node[below] at (A) {A};
\node[above left] at (B) {B};
\node[below] at (C) {C};

\fill (A) circle (1.5pt) (B) circle (1.5pt) (C) circle (1.5pt);
\end{tikzpicture}`,
        caption: "곡선과 삼각형 BAC 시각화",
      },
      answer_index: 4, // 0-based
      solution: {
        steps: [
          {
            step_id: 1,
            explanation: "밑변 AC와 높이 BC를 t로 표현한다.",
          },
          {
            step_id: 2,
            explanation: "삼각형 넓이 f(t)를 만든다.",
          },
          {
            step_id: 3,
            explanation: "f'(t)를 구하고 t=9를 대입한다.",
          },
        ],
        final_answer: "\\dfrac{13}{3}",
      },
    },

    classification: {
      primary_type: "graph_geometry",
      recommended_entry_branch: "initial_prompt",
      type_flags: {
        calculation_procedural: false,
        algebraic_structure: true,
        equation_solving: false,
        combinatorial_reasoning: false,
        graph_geometry: true,
        logical_reasoning: false,
      },
    },

    solution_model: {
      steps: [
        {
          step_id: 1,
          goal: "점들의 좌표와 삼각형의 밑변, 높이를 정리한다.",
        },
        {
          step_id: 2,
          goal: "넓이 함수 f(t)를 만든다.",
        },
        {
          step_id: 3,
          goal: "f'(t)를 구해 9를 대입한다.",
        },
      ],
    },

    tutoring_assets: {
      logic_steps: {
        ko: [
          "이 문제는 바로 계산보다 먼저 도형의 밑변과 높이를 문자로 표현하는 게 중요해요. AC와 BC를 각각 어떻게 쓸 수 있을까요?",
          "좋아요. 이제 삼각형 넓이 공식을 써서 f(t)를 식으로 세워봅시다.",
          "좋습니다. 식을 정리했으면 이제 미분해서 f'(t)를 구해보세요.",
          "마지막으로 t=9를 대입하면 정답을 얻을 수 있어요.",
        ],
        en: [
          "In this problem, the key first step is expressing the base and height of the triangle in terms of t. How can we write AC and BC?",
          "Good. Now use the triangle area formula to build f(t).",
          "Great. After simplifying the expression, differentiate it to get f'(t).",
          "Finally, substitute t=9 to obtain the answer.",
        ],
      },
      hints: {
        ko: [
          "밑변 AC는 x좌표 차이입니다.",
          "삼각형 넓이 = 1/2 × 밑변 × 높이",
          "t의 지수꼴로 바꿔서 미분하면 편합니다.",
          "sqrt(9)=3을 이용하세요.",
        ],
        en: [
          "AC is the difference of x-coordinates.",
          "Area of a triangle = 1/2 × base × height",
          "Rewrite using powers of t before differentiating.",
          "Use sqrt(9)=3.",
        ],
      },
    },
  };

  return NextResponse.json(payload);
}