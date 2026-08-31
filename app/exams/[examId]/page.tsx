import { notFound } from "next/navigation";

import { ExamRunner } from "@/components/exams/exam-runner";
import { getExamById } from "@/lib/exams/registry";

import type { ExamSectionItem } from "@/types/exam";
import type { RunnerQuestion } from "@/types/exam-runner";
import { Home } from "lucide-react";

interface ExamPageProps {
  params: Promise<{
    examId: string;
  }>;
}

function flattenQuestions(items: ExamSectionItem[]): RunnerQuestion[] {
  const result: RunnerQuestion[] = [];

  for (const item of items) {
    if ("questions" in item) {
      for (const question of item.questions) {
        result.push({
          question,
          passage: item.passage,
          passageId: item.passageId,
          groupType: item.type,
          layout: item.layout,
        });
      }
    } else {
      result.push({
        question: item,
      });
    }
  }

  return result;
}

export default async function ExamPage({ params }: ExamPageProps) {
  const { examId } = await params;

  const exam = getExamById(examId);

  if (!exam) {
    notFound();
  }

  const questions = exam.sections.flatMap((section) =>
    flattenQuestions(section.items),
  );

  if (questions.length === 0) {
    return (
      <main className="mx-auto max-w-4xl px-5 py-10">
        <p>問題データがありません。</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
        <header className="mb-8 border-b border-border pb-5">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-primary">
                {exam.level} {exam.year}年{exam.month}月
              </p>

              <h1 className="mt-2 text-2xl font-bold">日本語能力試験</h1>

              <p className="mt-2 text-sm text-muted-foreground">
                全{questions.length}問
              </p>
            </div>

            {/* oxlint-disable-next-line next/no-html-link-for-pages -- Full-page navigation is required for Vinext/Cloudflare deployment. */}
            <a
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <Home className="size-4" />
              ホーム
            </a>
          </div>
        </header>

        <ExamRunner questions={questions} durationMinutes={110} />
      </div>
    </main>
  );
}
