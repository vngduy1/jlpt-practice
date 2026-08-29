import n1December2024 from "@/data/exams/n1/2024-12.json";
import n1July2023 from "@/data/exams/n1/2023-07.json";
import n1December2022 from "@/data/exams/n1/2022-12.json";
import n1December2023 from "@/data/exams/n1/2023-12.json";

import type { Exam } from "@/types/exam";

export const n1Exams: Exam[] = [
  n1December2024 as Exam,
  n1July2023 as Exam,
  n1December2023 as Exam,
  n1December2022 as Exam,
];