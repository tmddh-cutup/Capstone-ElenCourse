import type { ServerProblem } from "./serverProblem";

export type Problem = {
  id: string;
  topic: string;
  title: string;
  mathString: string;
  logicSteps: string[];
  hints: string[];
  status: "solved" | "learning" | "unsolved";
  lastAccessed: string;
  tikzString?: string;
  latexString?: string;
  serverProblem?: ServerProblem; // full structured JSON from the server
};

export const MOCK_PROBLEMS: Problem[] = [
  {
    id: "p1",
    topic: "Linear Equations",
    title: "Solve for x in a basic equation",
    mathString: "2x + 5 = 15",
    logicSteps: [
      "Welcome to ElenCourse! We need to solve: $2x + 5 = 15$. What should we do first to isolate $x$?",
      "Exactly! Subtracting 5 from both sides gives us $2x = 10$. What's the next logical step?",
      "Perfect! If we divide both sides by 2, what is the value of $x$?",
      "Spot on! $x = 5$ is the correct answer. You really thought through that well!",
    ],
    hints: [
      "Think about how to move the constants to one side of the equation.",
      "What is the inverse operation of multiplication?",
      "Just do the final calculation: 10 divided by 2.",
      "You've already solved it!",
    ],
    status: "learning",
    lastAccessed: "2026-03-31T20:56:07.000Z",
  },
  {
    id: "p2",
    topic: "Quadratic Equations",
    title: "Factor a quadratic trinomial",
    mathString: "x^2 - 5x + 6 = 0",
    logicSteps: [
      "Let's factor the quadratic equation $x^2 - 5x + 6 = 0$. Can you think of two numbers that multiply to 6 and add to -5?",
      "That's right! The numbers are -2 and -3. How do we write the factored form?",
      "Excellent. So we have $(x - 2)(x - 3) = 0$. What does this mean for the possible values of $x$?",
      "Correct! The solutions are $x = 2$ and $x = 3$. Great job!",
    ],
    hints: [
      "List the factors of 6: (1,6), (2,3), (-1,-6), (-2,-3). Which pair adds up to -5?",
      "Write it as $(x + a)(x + b) = 0$ where $a$ and $b$ are the numbers you found.",
      "If the product of two numbers is zero, at least one of them must be zero.",
      "Set each factor equal to zero and solve for x.",
    ],
    status: "solved",
    lastAccessed: "2026-03-30T10:12:00.000Z",
  },
  {
    id: "p3",
    topic: "Calculus",
    title: "Determine the definite integral",
    mathString: "\\int_{0}^{2} 3x^2 dx",
    logicSteps: [
      "Let's evaluate the definite integral: $\\int_{0}^{2} 3x^2 dx$. What is the antiderivative of $3x^2$?",
      "Spot on! The antiderivative is $x^3$. Now, we need to evaluate this from 0 to 2. How do we set that up?",
      "Right, we calculate $2^3 - 0^3$. What is the final result?",
      "Perfect! The area under the curve is 8. Nice work!",
    ],
    hints: [
      "Use the power rule for integration: $\\int x^n dx = \\frac{x^{n+1}}{n+1}$.",
      "Plug the upper limit into the antiderivative, and subtract the value when you plug in the lower limit.",
      "Remember that $2^3 = 2 \\times 2 \\times 2$.",
      "You have the final answer!",
    ],
    status: "unsolved",
    lastAccessed: "2026-03-29T14:45:00.000Z",
  },
  {
    id: "p4",
    topic: "Analytic Geometry",
    title: "Graph of a Parabola",
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
    logicSteps: [
      "Here is the standard form of a quadratic function: $y = ax^2 + bx + c$. The graph is a parabola.",
      "Look at the TikZ graph. Try editing the variable 'a'. What happens if you make it negative?",
      "Exactly! If 'a' is negative, the parabola opens downwards.",
      "Now try changing 'c'. How does it affect the vertex of the graph?",
      "Great! 'c' shifts the parabola vertically."
    ],
    hints: [
      "Focus on the \\def commands in the TikZ code.",
      "A negative value for \\a reflects the graph across its directrix.",
      "The value \\c corresponds to the y-intercept."
    ],
    status: "learning",
    lastAccessed: "2026-04-01T10:00:00.000Z",
  },
  {
    id: "p5",
    topic: "미적분 (Calculus)",
    title: "삼각형 BAC의 넓이 f(t)와 f'(9) [2013 6월]",
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
    logicSteps: [
      "직선 $l$은 점 $A(1, 0)$을 지나고, 점 $B(t, 2\\sqrt{t})$를 지납니다. 이 두 점을 이용해 직선의 기울기를 구해볼까요?",
      "훌륭합니다! 기울기는 $\\frac{2\\sqrt{t}}{t-1}$이군요. 그렇다면 삼각형 $BAC$의 넓이 $f(t)$를 어떻게 표현할 수 있을까요?",
      "잘 하셨습니다! $f(t) = (t-1)\\sqrt{t} = t^{3/2} - t^{1/2}$입니다. 이제 $f'(t)$를 구해볼까요?",
      "$f'(t) = \\frac{3}{2}t^{1/2} - \\frac{1}{2}t^{-1/2}$이고, $t = 9$를 대입하면 $f'(9) = \\frac{13}{3}$입니다. 정답 ⑤번!"
    ],
    hints: [
      "직선의 기울기 공식: $m = \\frac{y_2 - y_1}{x_2 - x_1}$",
      "삼각형 넓이 = $\\frac{1}{2} \\times 밑변 \\times 높이$. 밑변은 $AC = t-1$, 높이는 $BC = 2\\sqrt{t}$입니다.",
      "$f(t) = t^{3/2} - t^{1/2}$로 바꿔 멱함수 미분 공식을 적용하세요.",
      "$f'(t) = \\frac{3}{2}\\sqrt{t} - \\frac{1}{2\\sqrt{t}}$, $t=9$를 대입하면 됩니다.",
    ],
    status: "unsolved",
    lastAccessed: "2026-04-01T11:00:00.000Z",
  },
];
