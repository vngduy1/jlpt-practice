import type { ExamQuestion } from '@/types/exam';

export interface AnswerCheckResult {
  questionId: string;
  selectedOptionId: string;
  correctOptionId: string;
  isCorrect: boolean;
}

export function checkAnswer(
  question: ExamQuestion,
  selectedOptionId: string,
): AnswerCheckResult {
  const optionExists = question.options.some(
    (option) => option.id === selectedOptionId,
  );

  if (!optionExists) {
    throw new RangeError(
      `Option "${selectedOptionId}" does not exist for question "${question.id}".`,
    );
  }

  return {
    questionId: question.id,
    selectedOptionId,
    correctOptionId: question.correctOptionId,
    isCorrect: selectedOptionId === question.correctOptionId,
  };
}
