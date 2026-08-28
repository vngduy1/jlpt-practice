import { CheckCircle2 } from "lucide-react";

import type { RunnerQuestion } from "@/types/exam-runner";

interface QuestionNavigatorProps {
  questions: RunnerQuestion[];

  answers: Record<number, number>;

  currentIndex: number;

  onJump: (index: number) => void;

  onSubmit: () => void;
}

export function QuestionNavigator({
  questions,
  answers,
  currentIndex,
  onJump,
  onSubmit,
}: QuestionNavigatorProps) {
  const answeredCount = Object.keys(answers).length;

  const unansweredCount = questions.length - answeredCount;

  return (
    <aside className="lg:sticky lg:top-6 lg:self-start">
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">問題一覧</h2>

          <span className="text-xs text-muted-foreground">
            {answeredCount}/{questions.length}
          </span>
        </div>

        {/* Legend */}

        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="size-3 rounded-sm bg-primary" />

            <span className="text-muted-foreground">回答済み</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="size-3 rounded-sm border border-border bg-background" />

            <span className="text-muted-foreground">未回答</span>
          </div>
        </div>

        {/* Number Grid */}

        <div className="mt-5 grid grid-cols-5 gap-2">
          {questions.map((item, index) => {
            const question = item.question;

            const answered = answers[question.id] !== undefined;

            const active = index === currentIndex;

            return (
              <button
                key={question.id}
                type="button"
                onClick={() => onJump(index)}
                className={`grid aspect-square place-items-center rounded-md border text-sm font-semibold transition ${
                  active ? "border-primary ring-2 ring-primary/20" : ""
                } ${
                  answered
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {question.id}
              </button>
            );
          })}
        </div>

        {/* Progress */}

        <div className="mt-5 border-t border-border pt-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">回答済み</span>

            <span className="font-semibold">
              {answeredCount} / {questions.length}
            </span>
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{
                width: `${(answeredCount / questions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Submit */}

        <button
          type="button"
          onClick={onSubmit}
          className="mt-5 flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          試験を終了して採点
          <CheckCircle2 className="size-4" />
        </button>

        {unansweredCount > 0 && (
          <p className="mt-2 text-center text-xs text-muted-foreground">
            未回答 {unansweredCount}問
          </p>
        )}
      </div>
    </aside>
  );
}
