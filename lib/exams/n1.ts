import n1December2024 from '@/data/exams/n1/official/2024-12.json';
import n1July2023 from '@/data/exams/n1/official/2023-07.json';
import n1December2022 from '@/data/exams/n1/official/2022-12.json';
import n1December2023 from '@/data/exams/n1/official/2023-12.json';

import n1Original01 from '@/data/exams/n1/original/n1-original-01.json';
import n1Original02 from '@/data/exams/n1/original/n1-original-02.json';
import n1Original03 from '@/data/exams/n1/original/n1-original-03.json';
import n1Original04 from '@/data/exams/n1/original/n1-original-04.json';
import n1Original05 from '@/data/exams/n1/original/n1-original-05.json';
import n1Original06 from '@/data/exams/n1/original/n1-original-06.json';
import n1Original07 from '@/data/exams/n1/original/n1-original-07.json';
import n1Original08 from '@/data/exams/n1/original/n1-original-08.json';
import n1Original09 from '@/data/exams/n1/original/n1-original-09.json';
import n1Original10 from '@/data/exams/n1/original/n1-original-10.json';
import n1Original11 from '@/data/exams/n1/original/n1-original-11.json';

import type { Exam } from '@/types/exam';

export const n1Exams: Exam[] = [
  // JLPT
  n1December2024 as Exam,
  n1July2023 as Exam,
  n1December2023 as Exam,
  n1December2022 as Exam,

  // オリジナル問題
  n1Original01 as Exam,
  n1Original02 as Exam,
  n1Original03 as Exam,
  n1Original04 as Exam,
  n1Original05 as Exam,
  n1Original06 as Exam,
  n1Original07 as Exam,
  n1Original08 as Exam,
  n1Original09 as Exam,
  n1Original10 as Exam,
  n1Original11 as Exam,
];
