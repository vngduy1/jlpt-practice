import n3July2022 from "@/data/exams/n3/2022-07-n3.json";
import n3December2022 from "@/data/exams/n3/2022-12-n3.json";
import n3December2023 from "@/data/exams/n3/2023-12-n3.json";
import n3July2023 from "@/data/exams/n3/2023-07-n3.json";

import type { Exam } from "@/types/exam";

export const n3Exams: Exam[] = [
  n3July2022 as Exam,
  n3December2022 as Exam,
  n3July2023 as Exam,
  n3December2023 as Exam,
];