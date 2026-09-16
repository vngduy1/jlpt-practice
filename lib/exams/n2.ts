import n2December2024 from "@/data/exams/n2/official/2024-12-n2.json";

// original
import n2Original01 from "@/data/exams/n2/original/n2-practice-01.json";
import n2Original02 from "@/data/exams/n2/original/n2-practice-02.json";
import n2Original03 from "@/data/exams/n2/original/n2-practice-03.json";
import n2Original04 from "@/data/exams/n2/original/n2-practice-04.json";
import n2Original05 from "@/data/exams/n2/original/n2-practice-05.json";
import n2Original06 from "@/data/exams/n2/original/n2-practice-06.json";
import n2Original07 from "@/data/exams/n2/original/n2-practice-07.json";

import type { Exam } from "@/types/exam";

export const n2Exams: Exam[] = [
  n2December2024 as Exam,

  // オリジナル問題
  n2Original01 as Exam,
  n2Original02 as Exam,
  n2Original03 as Exam,
  n2Original04 as Exam,
  n2Original05 as Exam,
  n2Original06 as Exam,
  n2Original07 as Exam,
];
