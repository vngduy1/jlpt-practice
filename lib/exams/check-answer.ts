import type { ExamQuestion } from '@/types/exam';

export interface AnswerCheckResult {
  questionId: number;
  selectedAnswer: number;
  correctAnswer: number;
  isCorrect: boolean;
}

export function checkAnswer(
  question: ExamQuestion,
  selectedAnswer: number,
): AnswerCheckResult {
  const answerIds =
    question.type === 'SENTENCE_ORDER'
      ? question.fragments.map((fragment) => fragment.id)
      : question.choices.map((choice) => choice.id);

  if (!answerIds.includes(selectedAnswer)) {
    throw new RangeError(
      `Answer "${selectedAnswer}" does not exist for question "${question.id}".`,
    );
  }

  return {
    questionId: question.id,
    selectedAnswer,
    correctAnswer: question.correctAnswer,
    isCorrect: selectedAnswer === question.correctAnswer,
  };
}
