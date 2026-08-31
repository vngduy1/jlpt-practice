import { HomePage } from "@/components/home/home-page";
import {
  listJlptExamSummaries,
  listOriginalExamSummaries,
} from "@/lib/exams/registry";

export default function Home() {
  const officialExams = listJlptExamSummaries();
  const originalExams = listOriginalExamSummaries();

  return (
    <HomePage officialExams={officialExams} originalExams={originalExams} />
  );
}
