import { BookOpenText, ChevronRight } from "lucide-react";

import { ExamCard } from "@/components/exams/exam-card";
import { listExamSummaries } from "@/lib/exams/registry";

const jlptLevels = ["N1", "N2", "N3", "N4", "N5"] as const;

export default function Home() {
  const exams = listExamSummaries();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/80 bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
              日本
            </span>

            <div className="leading-tight">
              <p className="font-semibold tracking-tight">JLPT Practice</p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                日本語能力試験 練習
              </p>
            </div>
          </div>

          <nav
            className="hidden items-center gap-1 sm:flex"
            aria-label="JLPT levels"
          >
            {jlptLevels.map((level) => (
              <button
                key={level}
                type="button"
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  level === "N1"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {level}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <section className="border-b border-border/70 bg-hero">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-primary">
              <BookOpenText className="size-4" aria-hidden="true" />
              JLPT 模擬試験
            </div>

            <h1 className="text-3xl font-bold tracking-[-0.025em] sm:text-5xl">
              日本語能力試験 練習
            </h1>

            <p className="mt-3 text-lg font-medium text-foreground/75 sm:text-xl">
              JLPT Practice Tests
            </p>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              本番形式の問題で、語彙・文法・読解を練習しながら、
              JLPTの実力を確認しましょう。
            </p>

            <div className="mt-7 flex gap-2 overflow-x-auto pb-1 sm:hidden">
              {jlptLevels.map((level) => (
                <button
                  key={level}
                  type="button"
                  className={`min-w-14 rounded-md border px-4 py-2.5 text-sm font-semibold ${
                    level === "N1"
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-muted-foreground"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-primary">N1</p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
              N1 練習問題
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              過去の試験形式に沿って練習できます。
            </p>
          </div>

          {exams.length > 1 && (
            <button
              type="button"
              className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex"
            >
              すべて見る
              <ChevronRight className="size-4" />
            </button>
          )}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {exams.map((exam) => (
            <ExamCard key={exam.id} exam={exam} />
          ))}
        </div>
      </section>

      <footer className="mt-8 border-t border-border/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-7 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>JLPT Practice</p>
          <p>日本語能力試験の学習をサポートします。</p>
        </div>
      </footer>
    </main>
  );
}
