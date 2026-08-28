export type JlptLevel = 'N1' | 'N2' | 'N3' | 'N4' | 'N5';

export interface QuestionRange {
  start: number;
  end: number;
}

export interface ExamOption {
  id: string;
  text: string;
}

export interface ExamQuestion {
  id: string;
  number: number;
  section: string;
  prompt: string;
  options: ExamOption[];
  correctOptionId: string;
  explanation?: string;
}

export interface Exam {
  id: string;
  level: JlptLevel;
  year: number;
  month: 7 | 12;
  title: string;
  description: string;
  questionRange: QuestionRange;
  questions: ExamQuestion[];
}

export interface ExamSummary extends Omit<Exam, 'questions'> {
  loadedQuestionCount: number;
}
