import { Home } from "lucide-react";
import { notFound } from "next/navigation";

import { ListeningExamRunner } from "@/components/listening/listening-exam-runner";
import { ClientNavigation } from "@/components/navigation/client-navigation";
import { getListeningExamById } from "@/lib/exams/listening/registry";

interface ListeningExamPageProps {
  params: Promise<{
    examId: string;
  }>;
}

export default async function ListeningExamPage({
  params,
}: ListeningExamPageProps) {
  const { examId } = await params;

  const exam = getListeningExamById(examId);

  if (!exam) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
        <header className="mb-8 border-b border-border pb-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-primary">
                {exam.level} {exam.year}年{exam.month}月
              </p>

              <h1 className="mt-2 text-2xl font-bold">日本語能力試験 聴解</h1>

              <p className="mt-2 text-sm text-muted-foreground">
                全{exam.questionCount}問・約{exam.durationMinutes}分
              </p>
            </div>

            <ClientNavigation
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <Home className="size-4" />
              ホーム
            </ClientNavigation>
          </div>
        </header>

        <ListeningExamRunner sections={exam.sections} />
      </div>
    </main>
  );
}
