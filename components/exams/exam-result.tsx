import { CheckCircle2, RotateCcw, XCircle } from "lucide-react";

import type { ExamResultData, RunnerQuestion } from "@/types/exam-runner";

interface ExamResultProps {
  result: ExamResultData;

  questions: RunnerQuestion[];

  remainingSeconds: number;

  onReviewQuestion: (index: number) => void;

  onRestart: () => void;
}

export function ExamResult({
  result,
  questions,
  remainingSeconds,
  onReviewQuestion,
  onRestart,
}: ExamResultProps) {
  function getAnswerText(item: RunnerQuestion, answerId?: number) {
    if (answerId === undefined) {
      return "未回答";
    }

    const question = item.question;

    if (question.type === "SENTENCE_ORDER") {
      const fragment = question.fragments.find(
        (fragment) => fragment.id === answerId,
      );

      return fragment ? `${answerId}. ${fragment.text}` : String(answerId);
    }

    const choice = question.choices.find((choice) => choice.id === answerId);

    return choice ? `${answerId}. ${choice.text}` : String(answerId);
  }

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-border bg-card p-6 sm:p-8">
        <p className="text-sm font-semibold text-primary">試験結果</p>

        <h2 className="mt-2 text-2xl font-bold">採点結果</h2>

        {remainingSeconds === 0 && (
          <p className="mt-2 text-sm text-destructive">
            制限時間が終了したため、自動的に採点しました。
          </p>
        )}

        <div className="mt-7 grid gap-4 sm:grid-cols-4">
          <ResultCard label="正解" value={`${result.correctCount}問`} />

          <ResultCard label="不正解" value={`${result.incorrectCount}問`} />

          <ResultCard label="未回答" value={`${result.unanswered}問`} />

          <ResultCard
            label="正答率"
            value={`${result.percentage.toFixed(1)}%`}
          />
        </div>

        <div className="mt-6 rounded-lg bg-muted/50 p-4">
          <p className="text-sm leading-6 text-muted-foreground">
            ※ この結果は正解数と正答率による簡易採点です。
            JLPT本試験の尺度得点とは異なります。
          </p>
        </div>

        <div className="mt-6">
          <button
            type="button"
            onClick={onRestart}
            className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            <RotateCcw className="size-4" />
            新しく始める
          </button>
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card p-6">
        <h3 className="text-lg font-bold">問題別結果</h3>

        <p className="mt-1 text-sm text-muted-foreground">
          問題を選択すると、その問題に戻って確認できます。
        </p>

        <div className="mt-6 space-y-3">
          {result.details.map((detail) => {
            const item = questions[detail.index];

            const unanswered = detail.userAnswer === undefined;

            return (
              <button
                key={detail.question.id}
                type="button"
                onClick={() => onReviewQuestion(detail.index)}
                className="flex w-full flex-col gap-3 rounded-lg border border-border p-4 text-left transition hover:border-primary/40 hover:bg-muted/30 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-muted font-semibold">
                    {detail.question.id}
                  </span>

                  <div>
                    <div className="flex items-center gap-2">
                      {unanswered ? (
                        <span className="font-semibold text-muted-foreground">
                          未回答
                        </span>
                      ) : detail.correct ? (
                        <>
                          <CheckCircle2 className="size-4 text-green-600" />

                          <span className="font-semibold text-green-700">
                            正解
                          </span>
                        </>
                      ) : (
                        <>
                          <XCircle className="size-4 text-destructive" />

                          <span className="font-semibold text-destructive">
                            不正解
                          </span>
                        </>
                      )}
                    </div>

                    <p className="mt-1 text-sm text-muted-foreground">
                      あなたの回答：
                      {getAnswerText(item, detail.userAnswer)}
                    </p>

                    <p className="mt-1 text-sm">
                      正解：
                      {getAnswerText(item, detail.question.correctAnswer)}
                    </p>
                  </div>
                </div>

                <span className="text-sm font-medium text-primary">
                  問題を見る →
                </span>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function ResultCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-muted/50 p-5">
      <p className="text-sm text-muted-foreground">{label}</p>

      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
  );
}
