/**
 * The shape of a problem object sent from the server.
 * Fields mirror the JSON structure provided by the backend API.
 */
export interface ServerProblem {
  problem_info: {
    id: string;
    source: string;
    subject: string;
    points: number;
  };
  problem_statement: {
    main_text: string;
    sub_question: string;
    choices: string[]; // e.g. ["3", "10/3", "11/3", "4", "13/3"]
  };
  analysis?: {
    concept?: string;
    key_idea?: string;
  };
  visualization?: {
    engine: "tikz";
    code: string;
    caption?: string;
  };
  solution?: Record<string, unknown>;
  answer_index?: number; // 1-based index into choices
}
