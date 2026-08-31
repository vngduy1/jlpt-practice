import { n1Exams } from "@/lib/exams/n1";
import { n2Exams } from "@/lib/exams/n2";
import { n3Exams } from "@/lib/exams/n3";
import { n4Exams } from "@/lib/exams/n4";
import { n5Exams } from "@/lib/exams/n5";

import type {
  Exam,
  ExamSectionItem,
  ExamSource,
  ExamSummary,
} from "@/types/exam";

const examRegistry: Exam[] = [
  ...n1Exams,
  ...n2Exams,
  ...n3Exams,
  ...n4Exams,
  ...n5Exams,
];

function countQuestions(items?: ExamSectionItem[]): number {
  if (!Array.isArray(items)) {
    return 0;
  }

  return items.reduce(
    (total, item) => total + ("questions" in item ? item.questions.length : 1),
    0,
  );
}

function toExamSummary(exam: Exam): ExamSummary {
  const { sections, ...summary } = exam;

  return {
    ...summary,

    loadedQuestionCount: sections.reduce(
      (total, section) => total + countQuestions(section.items),
      0,
    ),
  };
}

/**
 * 全ての試験一覧
 */
export function listExamSummaries(): ExamSummary[] {
  return examRegistry.map(toExamSummary);
}

/**
 * JLPT過去問・過去問形式のみ
 */
export function listJlptExamSummaries(): ExamSummary[] {
  return examRegistry
    .filter((exam) => exam.source === "JLPT")
    .map(toExamSummary);
}

/**
 * オリジナル模擬試験のみ
 */
export function listOriginalExamSummaries(): ExamSummary[] {
  return examRegistry
    .filter((exam) => exam.source === "ORIGINAL")
    .map(toExamSummary);
}

/**
 * レベル + 種類で取得
 */
export function listExamSummariesByLevel(
  level: Exam["level"],
  source?: ExamSource,
): ExamSummary[] {
  return examRegistry
    .filter(
      (exam) =>
        exam.level === level &&
        (source === undefined || exam.source === source),
    )
    .map(toExamSummary);
}

/**
 * IDから試験を取得
 */
export function getExamById(id: string): Exam | undefined {
  return examRegistry.find((exam) => exam.id === id);
}
