# ElenCourse 📚

> AI 기반 소크라테스식 수학 과외 플랫폼

고등학교 수학 문제를 AI가 직접 답을 알려주는 대신, 소크라테스식 문답법으로 학생이 스스로 생각하고 풀어낼 수 있도록 유도하는 웹 애플리케이션입니다.

---

## 🚀 시작하기

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

---

## ✅ 구현된 기능

### 🔐 인증 페이지

- **로그인 페이지** (`/login`)
  - 이메일 + 비밀번호 입력
  - 중앙 정렬된 글라스모피즘 패널 디자인

- **회원가입 페이지** (`/signup`)
  - 닉네임, 이메일, 비밀번호, 나이 입력
  - 성별 선택: 세그먼트 위젯(남성 / 여성 / N/A) 형태
  - MVP 단계로 이메일 인증 생략 (향후 연동 가능 구조)

---

### 📝 수학 문제 패널 (MathProblemPane)

- **KaTeX 수식 렌더링** — LaTeX 수식을 아름답게 표시
- **수식 직접 편집** — 연필 아이콘 클릭 시 LaTeX 코드 수정 후 즉시 리렌더링
- **이미지 드래그 앤 드롭** — 수학 문제 사진을 끌어다 업로드 (OCR 연동 준비)
- **이미지 파일 업로드** — 카메라 버튼으로 파일 직접 선택
- **스크롤 지원** — 문제와 그래프가 함께 있어도 잘리지 않고 스크롤 가능

---

### 💬 소크라테스 AI 채팅 (SocraticDialogue)

- **단계별 질문 유도** — 정답을 직접 알려주지 않고, 사고를 이끄는 질문 방식
- **힌트 버튼** — 막힐 때 단계별 힌트 제공
- **이미지 첨부** — 채팅 입력창에서 이미지를 첨부하여 질문 가능
- **진도 자동 업데이트** — 대화 진행에 따라 상단 진도 바 자동 변화
- **Philos 캐릭터** — AI 튜터 이름 텍스트에 부드러운 부유(floating) 애니메이션 적용

---

### 📊 TikZ 그래프 시각화 (TikzRenderer)

- **실시간 그래프 렌더링** — TikZ 코드를 [Kroki API](https://kroki.io)로 전송해 SVG 이미지로 렌더링
- **변수 편집 기능** — 편집 모드에서 TikZ 코드를 직접 수정 후 "Render Changes" 클릭 시 그래프 즉시 반영
- **변수 실험 학습** — `\def\a{1}` 같은 변수를 바꾸며 그래프 모양 변화를 시각적으로 탐구 가능
- `arrows.meta`, `calc`, `patterns` TikZ 라이브러리 자동 포함
- 로딩 중 스피너 및 에러 상태 처리

---

### 📄 서버 JSON 문제 뷰어 (ProblemViewer)

서버에서 구조화된 JSON 형태로 문제를 내려주면 자동으로 파싱해 렌더링합니다.

- **MathJax v3** — `$...$` 인라인 수식을 iframe 내에서 렌더링
- **보기 자동 표시** — choices 배열을 ① ② ③ ④ ⑤ 원문자로 표시
- **출처 및 배점 표시** — 문제 상단에 출처·배점 자동 노출
- **TikZ 시각화 연동** — `visualization.engine === "tikz"` 필드가 있으면 자동으로 그래프 렌더링

#### 서버 문제 JSON 포맷 예시

```json
{
  "problem_info": {
    "id": "2013-06-B-08",
    "source": "2013년 6월 평가원 모의고사 나형 8번",
    "subject": "Mathematics - Calculus",
    "points": 3
  },
  "problem_statement": {
    "main_text": "점 $A(1, 0)$을 지나고 ...",
    "sub_question": "삼각형 $BAC$의 넓이를 $f(t)$라 할 때 ...",
    "choices": ["3", "\\dfrac{10}{3}", "\\dfrac{11}{3}", "4", "\\dfrac{13}{3}"]
  },
  "visualization": {
    "engine": "tikz",
    "code": "\\begin{tikzpicture}...",
    "caption": "그래프 설명"
  },
  "answer_index": 4
}
```

---

### 📚 문제 은행 (ProblemBank)

- 여러 문제를 목록으로 탐색, 클릭하여 학습 공간으로 불러오기
- 문제 상태 표시: `풀었음` / `학습 중` / `미풀이`
- 주제별 색상 배지

---

### 👤 학생 프로필 및 아바타

- **프로필 수정 기능** — 상단 우측 사용자 이름 클릭 시 나타나는 Popover에서 톱니바퀴 아이콘을 눌러 이름, 학교, 성별, 출생연도를 직접 수정 가능
- **학습 현황 통계 표시** — 프로필 팝업 하단에 `완료`, `학습 중`, `미해결` 상태의 문제 수를 전체 데이터 기반으로 자동 계산하여 배지 형태로 명확하게 시각화
- **Philos 커스텀 아바타 & 애니메이션** — 기존 텍스트 대신 철학자 할아버지 이미지를 적용하고, 프레이머 모션(Framer Motion)을 활용해 사람이 숨 쉬며 고개를 살짝 까딱이는 듯한 자연스러운 아이들링(Idling) 애니메이션 부여

---

## 🛠️ 기술 스택

| 분류 | 기술 |
|------|------|
| 프레임워크 | Next.js 15 (App Router) |
| 언어 | TypeScript |
| 스타일링 | Tailwind CSS |
| UI 컴포넌트 | shadcn/ui |
| 수식 렌더링 | KaTeX, MathJax v3 |
| 그래프 렌더링 | TikZ via Kroki.io API |
| 데이터 압축 | pako (zlib/deflate) |
| 애니메이션 | Framer Motion |

---

## 📁 프로젝트 구조

```
src/
├── app/
│   ├── page.tsx                    # 메인 학습 페이지
│   ├── login/page.tsx              # 로그인
│   └── signup/page.tsx             # 회원가입
├── components/
│   ├── MathProblemPane.tsx         # 수학 문제 패널 (편집, 업로드, 렌더링)
│   ├── SocraticDialogue.tsx        # 소크라테스 AI 채팅
│   ├── SocraticCharacter.tsx       # AI 캐릭터 (Philos 부유 애니메이션)
│   ├── ProblemBank.tsx             # 문제 은행 목록
│   ├── ProblemViewer.tsx           # 서버 JSON 문제 통합 뷰어
│   ├── TikzRenderer.tsx            # TikZ → SVG 렌더러 (Kroki API)
│   └── LatexProblemRenderer.tsx    # LaTeX 문자열 → MathJax iframe 렌더러
└── lib/
    ├── mockProblems.ts             # 목업 문제 데이터
    ├── serverProblem.ts            # 서버 JSON 타입 정의 (TypeScript)
    └── krokiUtils.ts               # Kroki API 인코딩 유틸리티
```

---

## 📌 향후 계획

- [ ] 실제 AI API (Gemini / GPT) 연결
- [ ] Firebase / Supabase를 이용한 사용자 인증 및 DB 연동
- [ ] 회원가입 시 이메일 인증 추가
- [ ] 이미지 OCR 연동 (수학 문제 사진 → LaTeX 자동 변환)
- [ ] 학습 이력 및 통계 대시보드
