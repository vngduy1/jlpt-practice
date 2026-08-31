import { n1ListeningExams } from "@/lib/exams/listening/n1";

import type {
  ListeningExam,
  ListeningExamSummary,
} from "@/types/listening-exam";

const listeningExamRegistry: ListeningExam[] = [...n1ListeningExams];

function toListeningExamSummary(exam: ListeningExam): ListeningExamSummary {
  const { sections, ...summary } = exam;

  const loadedQuestionCount = sections.reduce(
    (total, section) => total + section.questions.length,
    0,
  );

  return {
    ...summary,
    loadedQuestionCount,
  };
}

/**
 * 全ての聴解試験一覧
 */
export function listListeningExamSummaries(): ListeningExamSummary[] {
  return listeningExamRegistry.map(toListeningExamSummary);
}

/**
 * レベル別の聴解試験一覧
 */
export function listListeningExamSummariesByLevel(
  level: ListeningExam["level"],
): ListeningExamSummary[] {
  return listeningExamRegistry
    .filter((exam) => exam.level === level)
    .map(toListeningExamSummary);
}

/**
 * IDから聴解試験を取得
 */
export function getListeningExamById(id: string): ListeningExam | undefined {
  return listeningExamRegistry.find((exam) => exam.id === id);
}
