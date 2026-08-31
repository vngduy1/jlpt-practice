import type { JlptExamMonth, JlptLevel, Reviewable } from "@/types/exam";

export const LISTENING_QUESTION_TYPES = [
  "TASK_BASED_COMPREHENSION",
  "POINT_COMPREHENSION",
  "SUMMARY_COMPREHENSION",
  "QUICK_RESPONSE",
  "INTEGRATED_COMPREHENSION",
] as const;

export type ListeningQuestionType = (typeof LISTENING_QUESTION_TYPES)[number];

export type ListeningChoiceDisplay = "TEXT" | "IMAGE" | "NUMBER_ONLY";

export interface ListeningChoice {
  id: number;

  /**
   * TEXT の場合に表示する選択肢
   */
  text?: string;

  /**
   * IMAGE の場合に表示する画像
   */
  imageUrl?: string;
}

export interface ListeningQuestion extends Reviewable {
  id: number;

  /**
   * JLPT の 問題番号
   */
  mondai: number;

  type: ListeningQuestionType;

  /**
   * 音声ファイル
   */
  audioUrl: string;

  /**
   * 問題用紙に表示される質問文。
   * 音声だけで提示される場合は undefined。
   */
  prompt?: string;

  /**
   * 選択肢の表示方式
   */
  choiceDisplay: ListeningChoiceDisplay;

  choices: ListeningChoice[];

  /**
   * 問題用紙に表示する画像
   */
  promptImageUrl?: string;

  correctAnswer: number;

  /**
   * 復習モードでのみ使用するスクリプト
   */
  transcript?: string | null;

  /**
   * 解説
   */
  explanation?: string | null;
}

export interface ListeningSection {
  id: string;

  /**
   * 例:
   * 問題1 課題理解
   */
  title: string;

  type: ListeningQuestionType;

  /**
   * 問題ごとの説明音声。
   * 例: 「まず質問を聞いてください…」
   */
  instructionAudioUrl?: string;

  questions: ListeningQuestion[];
}

export type ListeningExamSource = "JLPT" | "ORIGINAL";

export interface ListeningExam {
  id: string;

  source: ListeningExamSource;

  level: JlptLevel;

  year: number;

  month: JlptExamMonth;

  title: string;

  description?: string;

  questionCount: number;

  durationMinutes: number;

  sections: ListeningSection[];
}

export interface ListeningExamSummary extends Omit<ListeningExam, "sections"> {
  loadedQuestionCount: number;
}
