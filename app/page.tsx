import { HomePage } from "@/components/home/home-page";
import { listExamSummaries } from "@/lib/exams/registry";

export default function Home() {
  const exams = listExamSummaries();

  return <HomePage exams={exams} />;
}