export const JLPT_QUESTION_TYPES = [
  'KANJI_READING',
  'VOCABULARY',
  'SYNONYM',
  'WORD_USAGE',
  'GRAMMAR',
  'SENTENCE_ORDER',
  'CLOZE',
  'READING',
  'INFORMATION_SEARCH',
] as const;

export type JlptQuestionType = (typeof JLPT_QUESTION_TYPES)[number];
export type JlptLevel = 'N1' | 'N2' | 'N3' | 'N4' | 'N5';
export type JlptExamMonth = 7 | 12;
export type PassageQuestionType = 'CLOZE' | 'READING' | 'INFORMATION_SEARCH';
export type StandaloneQuestionType = Exclude<
  JlptQuestionType,
  'SENTENCE_ORDER' | PassageQuestionType
>;

export interface Reviewable {
  /** True when the imported PDF text, layout, or answer needs manual verification. */
  needsReview: boolean;
}

export interface QuestionChoice {
  /** The answer number shown to the learner, normally 1 through 4. */
  id: number;
  text: string;
}

interface QuestionMetadata<TType extends JlptQuestionType> extends Reviewable {
  id: number;
  /** 問題 number from the source exam, not the global question number. */
  mondai: number;
  type: TType;
  explanation: string | null;
}

interface MultipleChoiceFields {
  question: string;
  choices: QuestionChoice[];
  /** References QuestionChoice.id rather than the array index. */
  correctAnswer: number;
}

export interface StandaloneQuestion
  extends QuestionMetadata<StandaloneQuestionType>, MultipleChoiceFields {}

export interface PassageQuestion<
  TType extends PassageQuestionType = PassageQuestionType,
>
  extends QuestionMetadata<TType>, MultipleChoiceFields {}

export interface SentenceFragment {
  id: number;
  text: string;
}

export interface SentenceOrderQuestion extends QuestionMetadata<'SENTENCE_ORDER'> {
  sentenceBefore: string;
  sentenceAfter: string;
  fragments: SentenceFragment[];
  /** Fragment ids in the order that produces the completed sentence. */
  correctOrder: number[];
  /** One-based position of ★ within correctOrder. */
  starPosition: number;
  /**
   * Fragment id placed at ★. It must equal
   * correctOrder[starPosition - 1], not the full ordered fragment list.
   */
  correctAnswer: number;
}

export interface PassageQuestionSet<
  TType extends PassageQuestionType,
> extends Reviewable {
  id: string;
  type: TType;
  passageId: string;
  /**
   * Shared source text is stored once here. Child questions must not copy it.
   * For information-search items, this can contain the extracted notice or table.
   */
  passage: string;
  questions: PassageQuestion<TType>[];
}

export type ClozeQuestionGroup = PassageQuestionSet<'CLOZE'>;
export type ReadingQuestionGroup = PassageQuestionSet<'READING'>;
export type InformationSearchQuestionGroup =
  PassageQuestionSet<'INFORMATION_SEARCH'>;

export type PassageQuestionGroup =
  | ClozeQuestionGroup
  | ReadingQuestionGroup
  | InformationSearchQuestionGroup;

export type NormalQuestion = StandaloneQuestion | PassageQuestion;
export type ExamQuestion = NormalQuestion | SentenceOrderQuestion;
export type ExamSectionItem =
  | StandaloneQuestion
  | SentenceOrderQuestion
  | PassageQuestionGroup;

export interface ExamSection {
  id: string;
  title: string;
  items: ExamSectionItem[];
}

export interface Exam {
  id: string;
  level: JlptLevel;
  year: number;
  month: JlptExamMonth;
  title: string;
  description: string;
  /** Expected total; draft JSON may contain fewer imported questions. */
  questionCount: number;
  sections: ExamSection[];
}

export interface ExamSummary extends Omit<Exam, 'sections'> {
  loadedQuestionCount: number;
}
