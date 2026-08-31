"use client";

import type { ListeningQuestion } from "@/types/listening-exam";

interface ListeningQuestionNavigatorProps {
  questions: ListeningQuestion[];
  answers: Record<number, number>;
  currentIndex: number;
  onJump: (index: number) => void;
  onSubmit: () => void;
}

export function ListeningQuestionNavigator({
  questions,
  answers,
  currentIndex,
  onJump,
  onSubmit,
}: ListeningQuestionNavigatorProps) {
  const answeredCount = questions.filter(
    (question) => answers[question.id] !== undefined,
  ).length;

  const progress =
    questions.length > 0 ? (answeredCount / questions.length) * 100 : 0;

  return (
    <aside className="h-fit rounded-xl border border-border bg-card p-5 lg:sticky lg:top-24">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-bold">問題一覧</h2>

        <span className="text-xs text-muted-foreground">
          {answeredCount}/{questions.length}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-primary" />
          回答済み
        </span>

        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full border border-border bg-card" />
          未回答
        </span>
      </div>

      <div className="mt-5 grid grid-cols-5 gap-2">
        {questions.map((question, index) => {
          const answered = answers[question.id] !== undefined;
          const current = index === currentIndex;

          return (
            <button
              key={question.id}
              type="button"
              onClick={() => onJump(index)}
              aria-label={`問題${index + 1}`}
              aria-current={current ? "true" : undefined}
              className={`aspect-square rounded-md border text-sm font-medium transition ${
                current
                  ? answered
                    ? "border-primary bg-primary text-primary-foreground ring-2 ring-primary/20"
                    : "border-primary bg-card text-primary ring-2 ring-primary/20"
                  : answered
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {index + 1}
            </button>
          );
        })}
      </div>

      <div className="mt-6 border-t border-border pt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">回答済み</span>

          <strong>
            {answeredCount} / {questions.length}
          </strong>
        </div>

        <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <button
          type="button"
          onClick={onSubmit}
          className="mt-5 flex min-h-11 w-full items-center justify-center rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
        >
          試験を終了して採点
        </button>
      </div>
    </aside>
  );
}
