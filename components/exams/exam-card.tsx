import { ArrowRight, CalendarDays, Clock3, FileText } from "lucide-react";
import Link from "next/link";

import type { ExamSummary } from "@/types/exam";

interface ExamCardProps {
  exam: ExamSummary;
}

export function ExamCard({ exam }: ExamCardProps) {
  const isReady =
    exam.loadedQuestionCount > 0 &&
    exam.loadedQuestionCount === exam.questionCount;

  const monthLabel = exam.month === 7 ? "7月" : "12月";

  return (
    <article className="group flex min-h-82-5 flex-col overflow-hidden rounded-xl border border-border bg-card transition duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_14px_35px_-24px_rgba(24,39,75,0.28)]">
      <div className="border-b border-border/70 px-6 py-5">
        <div className="flex items-start justify-between gap-4">
          <span className="inline-flex min-w-12 items-center justify-center rounded-md bg-primary px-3 py-2 text-base font-bold text-primary-foreground">
            {exam.level}
          </span>

          {!isReady && (
            <span className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
              準備中
            </span>
          )}
        </div>

        <h3 className="mt-5 text-xl font-bold tracking-tight">
          {exam.year}年{monthLabel} 日本語能力試験
        </h3>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          言語知識（文字・語彙・文法）・読解
        </p>
      </div>

      <div className="flex flex-1 flex-col px-6 py-5">
        <dl className="space-y-3 text-sm">
          <div className="flex items-center justify-between gap-4">
            <dt className="flex items-center gap-2 text-muted-foreground">
              <CalendarDays className="size-4" aria-hidden="true" />
              実施時期
            </dt>
            <dd className="font-medium">
              {exam.year}年{monthLabel}
            </dd>
          </div>

          <div className="flex items-center justify-between gap-4">
            <dt className="flex items-center gap-2 text-muted-foreground">
              <FileText className="size-4" aria-hidden="true" />
              問題数
            </dt>
            <dd className="font-medium">{exam.questionCount}問</dd>
          </div>

          <div className="flex items-center justify-between gap-4">
            <dt className="flex items-center gap-2 text-muted-foreground">
              <Clock3 className="size-4" aria-hidden="true" />
              試験時間
            </dt>
            <dd className="font-medium">110分</dd>
          </div>
        </dl>

        <div className="mt-auto pt-6">
          {isReady ? (
            <Link
              href={`/exams/${exam.id}`}
              className="flex min-h-11 w-full items-center justify-between rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              模擬試験を開始
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          ) : (
            <button
              type="button"
              disabled
              className="flex min-h-11 w-full cursor-not-allowed items-center justify-between rounded-lg bg-muted px-4 py-3 text-sm font-semibold text-muted-foreground"
            >
              問題データ準備中
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
