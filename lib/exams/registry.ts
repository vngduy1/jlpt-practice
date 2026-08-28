import n1December2024 from '@/data/exams/n1/2024-12.json';
import type { Exam, ExamSummary } from '@/types/exam';

const examRegistry: Exam[] = [n1December2024 as Exam];

export function listExamSummaries(): ExamSummary[] {
  return examRegistry.map(({ questions, ...exam }) => ({
    ...exam,
    loadedQuestionCount: questions.length,
  }));
}

export function getExamById(id: string): Exam | undefined {
  return examRegistry.find((exam) => exam.id === id);
}
