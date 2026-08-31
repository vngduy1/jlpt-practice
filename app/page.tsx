import { HomePage } from "@/components/home/home-page";
import {
  listJlptExamSummaries,
  listOriginalExamSummaries,
} from "@/lib/exams/registry";
import { listListeningExamSummaries } from "@/lib/exams/listening/registry";

export default function Home() {
  const officialExams = listJlptExamSummaries();
  const originalExams = listOriginalExamSummaries();
  const listeningExams = listListeningExamSummaries();

  return (
    <HomePage
      officialExams={officialExams}
      originalExams={originalExams}
      listeningExams={listeningExams}
    />
  );
}
