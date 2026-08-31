import n3July2022 from "@/data/exams/n3/official/2022-07-n3.json";
import n3December2022 from "@/data/exams/n3/official/2022-12-n3.json";
import n3December2023 from "@/data/exams/n3/official/2023-12-n3.json";
import n3July2023 from "@/data/exams/n3/official/2023-07-n3.json";

import n3Original01 from "@/data/exams/n3/original/n3-original-01.json";
import n3Original02 from "@/data/exams/n3/original/n3-original-02.json";
import n3Original03 from "@/data/exams/n3/original/n3-original-03.json";

import type { Exam } from "@/types/exam";

export const n3Exams: Exam[] = [
  n3July2022 as Exam,
  n3December2022 as Exam,
  n3July2023 as Exam,
  n3December2023 as Exam,

  // オリジナル問題
  n3Original01 as Exam,
  n3Original02 as Exam,
  n3Original03 as Exam,
];
