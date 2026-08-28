import n1December2024 from "@/data/exams/n1/2024-12.json";
import n1July2023 from "@/data/exams/n1/2023-07.json";

import type { Exam, ExamSectionItem, ExamSummary } from "@/types/exam";

const examRegistry: Exam[] = [n1December2024 as Exam, n1July2023 as Exam];

function countQuestions(items?: ExamSectionItem[]): number {
  if (!Array.isArray(items)) {
    return 0;
  }

  return items.reduce(
    (total, item) => total + ("questions" in item ? item.questions.length : 1),
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
