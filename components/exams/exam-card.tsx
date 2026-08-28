import { ArrowRight, CalendarDays, ListChecks } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { ExamSummary } from '@/types/exam';

interface ExamCardProps {
  exam: ExamSummary;
}

export function ExamCard({ exam }: ExamCardProps) {
  const progress = Math.round(
    (exam.loadedQuestionCount / exam.questionCount) * 100,
  );

  return (
    <article className="flex min-h-72 flex-col rounded-2xl border border-border bg-card p-6 shadow-[0_14px_40px_-30px_rgb(25_30_55/45%)]">
      <div className="flex items-start justify-between gap-4">
        <span className="grid size-12 place-items-center rounded-xl bg-primary text-lg font-bold text-primary-foreground">
          {exam.level}
        </span>
        <Badge variant="secondary">Structure ready</Badge>
      </div>

      <h3 className="mt-6 text-xl font-semibold tracking-tight">
        {exam.title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {exam.description}
      </p>

      <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-xl bg-muted p-3">
          <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <CalendarDays className="size-3.5" aria-hidden="true" /> Date
          </dt>
          <dd className="mt-1 font-semibold">
            {exam.year}-{String(exam.month).padStart(2, '0')}
          </dd>
        </div>
        <div className="rounded-xl bg-muted p-3">
          <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <ListChecks className="size-3.5" aria-hidden="true" /> Questions
          </dt>
          <dd className="mt-1 font-semibold">1–{exam.questionCount}</dd>
        </div>
      </dl>

      <div className="mt-auto pt-6">
        <div className="mb-2 flex justify-between text-xs text-muted-foreground">
          <span>Question data</span>
          <span>{progress}% loaded</span>
        </div>
        <div className="mb-5 h-1.5 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary"
            style={{ width: `${progress}%` }}
          />
        </div>
        <Button className="w-full justify-between" disabled>
          Add question content next
          <ArrowRight data-icon="inline-end" aria-hidden="true" />
        </Button>
      </div>
    </article>
  );
}
