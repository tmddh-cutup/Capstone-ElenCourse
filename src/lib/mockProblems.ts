import type { ServerProblem } from "./serverProblem";

export type LocalizedString = { ko: string; en: string };
export type LocalizedStringArray = { ko: string[]; en: string[] };

export type Problem = {
  id: string;
  topic: LocalizedString;
  title: LocalizedString;
  mathString: string;
  logicSteps: LocalizedStringArray;
  hints: LocalizedStringArray;
  status: "solved" | "learning" | "unsolved";
  lastAccessed: string;
  tikzString?: string;
  latexString?: string;
  serverProblem?: ServerProblem; // full structured JSON from the server
};

export const MOCK_PROBLEMS: Problem[] = [
  {
    id: "p1",
    topic: { ko: "일차방정식", en: "Linear Equations" },
    title: { ko: "기본 방정식에서 x 구하기", en: "Solve for x in a basic equation" },
    mathString: "2x + 5 = 15",
    logicSteps: {
      ko: [
        "ElenCourse에 오신 것을 환영합니다! 다음을 풀어야 합니다: $2x + 5 = 15$. $x$를 분리하려면 가장 먼저 무엇을 해야 할까요?",
        "정확해요! 양변에서 5를 빼면 $2x = 10$이 됩니다. 다음 논리적 단계는 무엇일까요?",
        "완벽합니다! 양변을 2로 나누면 $x$의 값은 차이가 무엇일까요?",
        "정답입니다! $x = 5$가 맞습니다. 정말 훌륭하게 생각해 냈군요!",
      ],
      en: [
        "Welcome to ElenCourse! We need to solve: $2x + 5 = 15$. What should we do first to isolate $x$?",
        "Exactly! Subtracting 5 from both sides gives us $2x = 10$. What's the next logical step?",
        "Perfect! If we divide both sides by 2, what is the value of $x$?",
        "Spot on! $x = 5$ is the correct answer. You really thought through that well!",
      ],
    },
    hints: {
      ko: [
        "상수들을 방정식의 한쪽으로 어떻게 모을 수 있을지 생각해 보세요.",
        "곱셈의 역연산은 무엇입니까?",
        "마지막 계산만 하시면 됩니다: 10을 2로 나누세요.",
        "이미 해결하셨습니다!",
      ],
      en: [
        "Think about how to move the constants to one side of the equation.",
        "What is the inverse operation of multiplication?",
        "Just do the final calculation: 10 divided by 2.",
        "You've already solved it!",
      ],
    },
    status: "learning",
    lastAccessed: "2026-03-31T20:56:07.000Z",
  },
  {
    id: "p2",
    topic: { ko: "이차방정식", en: "Quadratic Equations" },
    title: { ko: "이차 삼항식 인수분해하기", en: "Factor a quadratic trinomial" },
    mathString: "x^2 - 5x + 6 = 0",
    logicSteps: {
      ko: [
        "이차방정식 $x^2 - 5x + 6 = 0$을 인수분해해 봅시다. 곱해서 6이 되고 더해서 -5가 되는 두 숫자를 생각해 볼까요?",
        "맞습니다! 그 숫자들은 -2와 -3입니다. 인수분해된 형태로 어떻게 작성할까요?",
        "훌륭합니다. 그래서 우리는 $(x - 2)(x - 3) = 0$을 가지게 되었습니다. 이것이 $x$의 가능한 값에 어떤 의미를 가질까요?",
        "정답입니다! 해는 $x = 2$와 $x = 3$입니다. 훌륭한 작업이었어요!",
      ],
      en: [
        "Let's factor the quadratic equation $x^2 - 5x + 6 = 0$. Can you think of two numbers that multiply to 6 and add to -5?",
        "That's right! The numbers are -2 and -3. How do we write the factored form?",
        "Excellent. So we have $(x - 2)(x - 3) = 0$. What does this mean for the possible values of $x$?",
        "Correct! The solutions are $x = 2$ and $x = 3$. Great job!",
      ]
    },
    hints: {
      ko: [
        "6의 인수들을 나열해 보세요: (1,6), (2,3), (-1,-6), (-2,-3). 어떤 쌍이 합해서 -5가 되나요?",
        "원하는 숫자를 찾았다면 $(x + a)(x + b) = 0$ 형태로 적어보세요.",
        "두 숫자의 곱이 0이라면, 적어도 둘 중 하나는 0이어야 합니다.",
        "각 인수를 0으로 설정하고 x의 값을 찾으세요.",
      ],
      en: [
        "List the factors of 6: (1,6), (2,3), (-1,-6), (-2,-3). Which pair adds up to -5?",
        "Write it as $(x + a)(x + b) = 0$ where $a$ and $b$ are the numbers you found.",
        "If the product of two numbers is zero, at least one of them must be zero.",
        "Set each factor equal to zero and solve for x.",
      ]
    },
    status: "solved",
    lastAccessed: "2026-03-30T10:12:00.000Z",
  },
  {
    id: "p3",
    topic: { ko: "미적분", en: "Calculus" },
    title: { ko: "정적분 계산하기", en: "Determine the definite integral" },
    mathString: "\\int_{0}^{2} 3x^2 dx",
    logicSteps: {
      ko: [
        "정적분 $\\int_{0}^{2} 3x^2 dx$를 계산해 봅시다. $3x^2$의 원시함수(부정적분)는 무엇인가요?",
        "정확해요! 부정적분은 $x^3$입니다. 이제 이를 0부터 2까지 평가해야 합니다. 식을 어떻게 세울까요?",
        "맞습니다. 우리는 $2^3 - 0^3$을 계산해야 합니다. 최종 결과는 무엇일까요?",
        "완벽해요! 곡선 아래 면적은 8입니다. 잘 하셨어요!",
      ],
      en: [
        "Let's evaluate the definite integral: $\\int_{0}^{2} 3x^2 dx$. What is the antiderivative of $3x^2$?",
        "Spot on! The antiderivative is $x^3$. Now, we need to evaluate this from 0 to 2. How do we set that up?",
        "Right, we calculate $2^3 - 0^3$. What is the final result?",
        "Perfect! The area under the curve is 8. Nice work!",
      ],
    },
    hints: {
    ko: [
        "적분의 멱의 법칙을 사용하세요: $\\int x^n dx = \\frac{x^{n+1}}{n+1}$.",
        "부정적분에 위끝을 대입한 값에서 아래끝을 대입한 값을 빼세요.",
        "$2^3 = 2 \\times 2 \\times 2$라는 것을 기억하세요.",
        "정답이 눈앞에 있습니다!",
    ],
    en: [
        "Use the power rule for integration: $\\int x^n dx = \\frac{x^{n+1}}{n+1}$.",
        "Plug the upper limit into the antiderivative, and subtract the value when you plug in the lower limit.",
        "Remember that $2^3 = 2 \\times 2 \\times 2$.",
        "You have the final answer!",
      ]
    },
    status: "unsolved",
    lastAccessed: "2026-03-29T14:45:00.000Z",
  },
  {
    id: "p4",
    topic: { ko: "해석기하학", en: "Analytic Geometry" },
    title: { ko: "포물선의 그래프", en: "Graph of a Parabola" },
    mathString: "y = a x^2 + b x + c",
    tikzString: `\\begin{tikzpicture}[scale=0.8]
  % Try changing the variables a, b, and c below to see how the parabola changes!
  \\def\\a{1}
  \\def\\b{0}
  \\def\\c{-2}
  
  % Grid and Axes
  \\draw[very thin,color=gray!30] (-4,-4) grid (4,4);
  \\draw[->,thick] (-4.5,0) -- (4.5,0) node[right] {$x$};
  \\draw[->,thick] (0,-4.5) -- (0,4.5) node[above] {$y$};
  
  % Plotting the function
  \\draw[domain=-2.5:2.5,smooth,variable=\\x,blue,thick] plot ({\\x},{\\a*\\x*\\x + \\b*\\x + \\c});
\\end{tikzpicture}`,
    logicSteps: {
      ko: [
        "여기에 이차함수의 표준형이 있습니다: $y = ax^2 + bx + c$. 그 그래프는 포물선입니다.",
        "TikZ 그래프를 보세요. 변수 'a'를 수정해 보세요. 숫자를 음수로 바꾸면 어떤 일이 일어나나요?",
        "정확합니다! 'a'가 음수이면 포물선은 아래로 열립니다.",
        "이제 'c'를 변경해 보세요. 그게 그래프의 꼭짓점에 어떤 영향을 미치나요?",
        "훌륭해요! 'c'는 포물선을 세로로 이동시킵니다."
      ],
      en: [
        "Here is the standard form of a quadratic function: $y = ax^2 + bx + c$. The graph is a parabola.",
        "Look at the TikZ graph. Try editing the variable 'a'. What happens if you make it negative?",
        "Exactly! If 'a' is negative, the parabola opens downwards.",
        "Now try changing 'c'. How does it affect the vertex of the graph?",
        "Great! 'c' shifts the parabola vertically."
      ]
    },
    hints: {
      ko: [
        "TikZ 코드에서 \\def 명령어에 집중하세요.",
        "\\a에 음수 값을 넣으면 포물선이 준선에 대칭으로 뒤집힙니다.",
        "\\c 값은 y절편에 해당합니다."
      ],
      en: [
        "Focus on the \\def commands in the TikZ code.",
        "A negative value for \\a reflects the graph across its directrix.",
        "The value \\c corresponds to the y-intercept."
      ]
    },
    status: "learning",
    lastAccessed: "2026-04-01T10:00:00.000Z",
  },
  {
    id: "p5",
    topic: { ko: "미적분", en: "Calculus" },
    title: { ko: "삼각형 BAC의 넓이 f(t)와 f'(9) [2013 6월]", en: "Area of Triangle BAC f(t) and f'(9) [June 2013]" },
    mathString: "f(t) = (t-1)\\sqrt{t}",
    serverProblem: {
      problem_info: {
        id: "2013-06-B-08",
        source: "2013년 6월 평가원 모의고사 나형 8번",
        subject: "Mathematics - Calculus",
        points: 3,
      },
      problem_statement: {
        main_text:
          "점 $A(1, 0)$을 지나고 기울기가 양수인 직선 $l$이 곡선 $y=2\\sqrt{x}$와 만나는 점을 $B$, 점 $B$에서 $x$축에 내린 수선의 발을 $C$, 직선 $l$이 $y$축과 만나는 점을 $D$라 하자.",
        sub_question:
          "점 $B(t, 2\\sqrt{t})$에 대하여 삼각형 $BAC$의 넓이를 $f(t)$라 할 때, $f'(9)$의 값은?",
        choices: ["3", "\\dfrac{10}{3}", "\\dfrac{11}{3}", "4", "\\dfrac{13}{3}"],
      },
      analysis: {
        concept: "미분계수의 정의 및 함수의 미분",
        key_idea:
          "삼각형의 세 꼭짓점 좌표를 $t$에 대한 식으로 표현하여 넓이 함수 $f(t)$를 유도한 후, 다항함수의 미분법을 적용합니다.",
      },
      visualization: {
        engine: "tikz",
        code: `\\begin{tikzpicture}[scale=1.2, >=Stealth]
    % 축 및 원점
    \\draw[->] (-1,0) -- (6,0) node[below] {$x$};
    \\draw[->] (0,-1.5) -- (0,4.5) node[left] {$y$};
    \\node at (-0.2,-0.2) {O};
    
    % 곡선 y = 2*sqrt(x)
    \\draw[thick, blue, domain=0:5, samples=100] plot (\\x, {2*sqrt(\\x)});
    \\node[blue, right] at (4.5, 4.2) {$y=2\\sqrt{x}$};

    % 점 좌표 설정 (시각적 최적화를 위해 t=4 대입 상태)
    \\coordinate (A) at (1,0);
    \\coordinate (B) at (4,4);
    \\coordinate (C) at (4,0);
    \\coordinate (D) at (0,-1.33);

    % 직선 l
    \\draw[thick, orange] (-0.3,-1.73) -- (4.5, 4.66) node[right] {$l$};

    % 보조선 및 직각
    \\draw[dashed, gray] (B) -- (C);
    \\draw (3.8,0) -- (3.8,0.2) -- (4,0.2);

    % 점 레이블
    \\node[below] at (A) {A};
    \\node[above left] at (B) {B};
    \\node[below] at (C) {C};
    \\node[right] at (D) {D};

    % 점 렌더링
    \\fill (A) circle (1.5pt) (B) circle (1.5pt) (C) circle (1.5pt) (D) circle (1.5pt);
\\end{tikzpicture}`,
        caption: "곡선과 직선의 교점 B 및 삼각형 BAC 시각화",
      },
      answer_index: 4,
    },
    logicSteps: {
      ko: [
        "직선 $l$은 점 $A(1, 0)$을 지나고, 점 $B(t, 2\\sqrt{t})$를 지납니다. 이 두 점을 이용해 직선의 기울기를 구해볼까요?",
        "훌륭합니다! 기울기는 $\\frac{2\\sqrt{t}}{t-1}$이군요. 그렇다면 삼각형 $BAC$의 넓이 $f(t)$를 어떻게 표현할 수 있을까요?",
        "잘 하셨습니다! $f(t) = (t-1)\\sqrt{t} = t^{3/2} - t^{1/2}$입니다. 이제 $f'(t)$를 구해볼까요?",
        "$f'(t) = \\frac{3}{2}t^{1/2} - \\frac{1}{2}t^{-1/2}$이고, $t = 9$를 대입하면 $f'(9) = \\frac{13}{3}$입니다. 정답 ⑤번!"
      ],
      en: [
        "Line $l$ passes through point $A(1, 0)$ and point $B(t, 2\\sqrt{t})$. Can you find the slope of the line using these two points?",
        "Excellent! The slope is $\\frac{2\\sqrt{t}}{t-1}$. Then how can we express the area of triangle $BAC$, $f(t)$?",
        "Well done! $f(t) = (t-1)\\sqrt{t} = t^{3/2} - t^{1/2}$. Now let's calculate $f'(t)$.",
        "$f'(t) = \\frac{3}{2}t^{1/2} - \\frac{1}{2}t^{-1/2}$, and substituting $t = 9$ gives $f'(9) = \\frac{13}{3}$. The answer is choice 5!"
      ]
    },
    hints: {
      ko: [
        "직선의 기울기 공식: $m = \\frac{y_2 - y_1}{x_2 - x_1}$",
        "삼각형 넓이 = $\\frac{1}{2} \\times 밑변 \\times 높이$. 밑변은 $AC = t-1$, 높이는 $BC = 2\\sqrt{t}$입니다.",
        "$f(t) = t^{3/2} - t^{1/2}$로 바꿔 멱함수 미분 공식을 적용하세요.",
        "$f'(t) = \\frac{3}{2}\\sqrt{t} - \\frac{1}{2\\sqrt{t}}$, $t=9$를 대입하면 됩니다.",
      ],
      en: [
        "Slope formula: $m = \\frac{y_2 - y_1}{x_2 - x_1}$",
        "Area of a triangle = $\\frac{1}{2} \\times base \\times height$. The base is $AC = t-1$ and the height is $BC = 2\\sqrt{t}$.",
        "Rewrite to $f(t) = t^{3/2} - t^{1/2}$ and use the power rule for differentiation.",
        "$f'(t) = \\frac{3}{2}\\sqrt{t} - \\frac{1}{2\\sqrt{t}}$, simply substitute $t=9$.",
      ]
    },
    status: "unsolved",
    lastAccessed: "2026-04-01T11:00:00.000Z",
  },
];
