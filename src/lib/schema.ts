import type { ServerProblem } from "@/lib/serverProblem";

export type LocalizedStringArray = {
  ko: string[];
  en: string[];
};

export interface TutorProblemPayload {
  viewer: ServerProblem;

  classification?: {
    primary_type: string;
    recommended_entry_branch:
      | "initial_prompt"
      | "solution_support"
      | "concept_support";
    type_flags: Record<string, boolean>;
  };

  solution_model?: {
    steps: Array<{
      step_id: number;
      goal: string;
      expected_answer?: string;
      concept_tag?: string;
    }>;
  };

  tutoring_assets: {
    logic_steps: LocalizedStringArray;
    hints: LocalizedStringArray;
  };
}