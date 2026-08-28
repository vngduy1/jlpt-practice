import type { ExamQuestion } from "@/types/exam";

export type ExamMode = "practice" | "exam";

export interface RunnerQuestion {
  question: ExamQuestion;

  passage?: string;
  passageId?: string;

  groupType?: "CLOZE" | "READING" | "INFORMATION_SEARCH";

  layout?: "horizontal" | "vertical";
}

export interface ExamResultDetail {
  index: number;
  question: ExamQuestion;
  userAnswer?: number;
  correct: boolean;
}

export interface ExamResultData {
  correctCount: number;
  incorrectCount: number;
  unanswered: number;
  percentage: number;
  details: ExamResultDetail[];
}
