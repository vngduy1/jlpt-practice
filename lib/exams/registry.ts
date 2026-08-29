import { n1Exams } from "@/lib/exams/n1";
import { n2Exams } from "@/lib/exams/n2";
import { n3Exams } from "@/lib/exams/n3";
import { n4Exams } from "@/lib/exams/n4";
import { n5Exams } from "@/lib/exams/n5";

import type { Exam, ExamSectionItem, ExamSummary } from "@/types/exam";

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
    (total, item) =>
      total + ("questions" in item ? item.questions.length : 1),
    0,
  );
}

export function listExamSummaries(): ExamSummary[] {
  return examRegistry.map(({ sections, ...exam }) => ({
    ...exam,

    loadedQuestionCount: sections.reduce(
      (total, section) => total + countQuestions(section.items),
      0,
    ),
  }));
}

export function getExamById(id: string): Exam | undefined {
  return examRegistry.find((exam) => exam.id === id);
}