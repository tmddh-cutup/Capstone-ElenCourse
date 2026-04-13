import type { ServerProblem } from "@/lib/serverProblem";

export type LocalizedStringArray = {
  ko: string[];
  en: string[];
};

export type TutorPrimaryType =
  | "calculation_procedural"      // 계산/연산형
  | "algebraic_structure"         // 식 변형 / 구조 인식형
  | "equation_solving"            // 방정식/부등식 해결형
  | "combinatorial_reasoning"     // 경우의 수 / 조합적 사고형
  | "graph_geometry"              // 그래프 / 시각적 해석형
  | "conceptual_understanding";   // 개념 이해형

export type TutorEntryBranch =
  | "initial_prompt"
  | "solution_support"
  | "concept_support";

export type TutorDifficulty = "easy" | "medium" | "hard";

export type TutorSourceType = "text" | "image" | "ocr" | "vlm";

export type TutorStepType =
  | "identify"
  | "transform"
  | "calculate"
  | "interpret"
  | "verify";

export interface TutorTypeFlags {
  calculation_procedural: boolean;
  algebraic_structure: boolean;
  equation_solving: boolean;
  combinatorial_reasoning: boolean;
  graph_geometry: boolean;
  conceptual_understanding: boolean;
}

export interface TutorSolutionStep {
  step_id: number;
  title: string;
  step_type: TutorStepType;
  goal: string;
  expected_answer?: string | null;
  concept_tag?: string | null;
  explanation?: string | null;
}

export interface TutorViewerProblemInfo {
  id: string;
  source: string;
  subject: string;
  points: number | null;
}

export interface TutorViewerProblemStatement {
  main_text: string;
  sub_question: string;
  choices: string[];
}

export interface TutorViewerAnalysis {
  concept: string;
  key_idea: string;
}

export interface TutorViewerSolution {
  steps: TutorSolutionStep[];
  final_answer: string | undefined;
}

export interface TutorViewer {
  problem_info: TutorViewerProblemInfo;
  problem_statement: TutorViewerProblemStatement;
  analysis: TutorViewerAnalysis;
  visualization?: unknown | null;
  answer_index?: number | undefined;
  solution: TutorViewerSolution;
}

export interface TutorClassification {
  primary_type: TutorPrimaryType;
  recommended_entry_branch: TutorEntryBranch;
  type_flags: TutorTypeFlags;
  difficulty: "easy" | "medium" | "hard";
}

export interface TutorSolutionModel {
  overview?: string;
  steps: TutorSolutionStep[];
  final_answer: string | null;
}

export interface TutorCoreConcept {
  name: string;
  description: string;
}

export interface TutorTutoringAssets {
  logic_steps: LocalizedStringArray;
  hints: LocalizedStringArray;
  core_concepts: TutorCoreConcept[];
  common_mistakes: LocalizedStringArray;
}

export interface TutorUIConfig {
  show_graph_panel?: boolean;
  show_choices?: boolean;
  show_hint_button?: boolean;
  show_concept_button?: boolean;
  show_solution_steps?: boolean;
  show_concept_panel?: boolean;
}

export interface TutorMeta {
  source_type?: "text" | "image" | "mixed";
  user_request?: string;
  generated_at?: string;
}

export interface TutorProblemPayload {
  viewer: ServerProblem;
  classification?: TutorClassification;
  solution_model?: TutorSolutionModel;
  tutoring_assets: TutorTutoringAssets;
  ui_config?: TutorUIConfig;
  meta?: TutorMeta;
}