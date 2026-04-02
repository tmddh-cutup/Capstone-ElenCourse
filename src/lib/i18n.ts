export type Language = 'ko' | 'en';

type Translations = {
  [key: string]: {
    ko: string;
    en: string;
  };
};

export const defaultLanguage: Language = 'ko';

export const translations: Translations = {
  "app.title": { ko: "ElenCourse", en: "ElenCourse" },
  "app.learningWorkspace": { ko: "📝 문제 학습 공간", en: "📝 Learning Workspace" },
  "app.problemBank": { ko: "📚 문제은행", en: "📚 Problem Bank" },
  "app.tabWorkspace": { ko: "학습 (Workspace)", en: "Workspace" },
  "app.tabBank": { ko: "문제은행 (Bank)", en: "Bank" },
  
  "progress.current": { ko: "현재 학습중:", en: "Currently Learning:" },
  
  "profile.title": { ko: "프로필 수정", en: "Edit Profile" },
  "profile.name": { ko: "이름", en: "Name" },
  "profile.school": { ko: "학교", en: "School" },
  "profile.gender": { ko: "성별", en: "Gender" },
  "profile.gender.female": { ko: "여성", en: "Female" },
  "profile.gender.male": { ko: "남성", en: "Male" },
  "profile.gender.none": { ko: "선택안함", en: "Prefer not to say" },
  "profile.birthYear": { ko: "출생연도", en: "Birth Year" },
  "profile.save": { ko: "저장", en: "Save" },
  "profile.birth": { ko: "출생", en: "Birth" },
  "profile.birthYearSuffix": { ko: "년생", en: " (Year)" },
  "profile.currentGrade": { ko: "현재 학년", en: "Current Grade" },
  "profile.gradeRef": { ko: "기준", en: "Ref." },
  "profile.learningStatus": { ko: "학습 현황", en: "Learning Status" },
  "profile.solved": { ko: "완료", en: "Solved" },
  "profile.learning": { ko: "학습 중", en: "Learning" },
  "profile.unsolved": { ko: "미해결", en: "Unsolved" },
  "profile.total": { ko: "총 문제", en: "Total" },
  "profile.language": { ko: "언어", en: "Language" },
  "profile.switchLangKo": { ko: "한국어", en: "한국어" },
  "profile.switchLangEn": { ko: "English", en: "English" },

  "bank.title": { ko: "문제은행 (Problem Bank)", en: "Problem Bank" },
  "bank.description": { ko: "이전에 학습했던 문제들을 다시 풀어보거나 복습할 수 있습니다.", en: "You can review or try solving previously learned problems again." },
  "bank.badge.solved": { ko: "해결완료", en: "Solved" },
  "bank.badge.learning": { ko: "학습중", en: "Learning" },
  "bank.badge.unsolved": { ko: "미해결", en: "Unsolved" },
  "bank.btn.retry": { ko: "다시 풀기", en: "Try Again" },

  "math.currentProblem": { ko: "현재 문제", en: "Current Problem" },
  "math.uploadPhoto": { ko: "사진 업로드", en: "Upload Photo" },
  "math.scanning": { ko: "스캔 중...", en: "Scanning..." },
  "math.dropImage": { ko: "이미지를 여기에 놓으세요", en: "Drop image to upload" },
  "math.analyzing": { ko: "문제 이미지 분석 중...", en: "Analyzing problem image..." },
  "math.labelMath": { ko: "수식 (LaTeX)", en: "Math Formula (LaTeX)" },
  "math.labelTikz": { ko: "TikZ 그래프 변수 & 코드", en: "TikZ Graph Variables & Code" },
  "math.labelLatex": { ko: "LaTeX 문제 코드", en: "LaTeX Problem Code" },
  "math.cancel": { ko: "취소", en: "Cancel" },
  "math.render": { ko: "변경사항 렌더링", en: "Render Changes" },
  
  "dialogue.letSolve": { ko: "같이 이 문제를 풀어볼까요.", en: "Let's solve this problem." },
  "dialogue.alreadyFinished": { ko: "이미 이 문제를 완료하셨네요! 다른 문제를 풀어볼까요?", en: "You've already finished this problem! Want to try another?" },
  "dialogue.hint": { ko: "💡 힌트:", en: "💡 Hint:" },
  "dialogue.noHint": { ko: "더 이상 힌트가 없습니다.", en: "No more hints available." },
  "dialogue.placeholderOpt": { ko: "메시지를 추가하세요 (선택사항)...", en: "Add an optional message..." },
  "dialogue.placeholder": { ko: "답변을 입력하세요...", en: "Type your response..." },
  "dialogue.tooltipHint": { ko: "힌트 얻기", en: "Get a Hint" },
  "dialogue.tooltipUpload": { ko: "이미지 업로드", en: "Upload Image" },
};
