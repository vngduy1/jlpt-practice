interface ListeningResultProps {
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  percentage: number;

  onReview: () => void;
  onRestart: () => void;
}

export function ListeningResult({
  correctCount,
  incorrectCount,
  unansweredCount,
  percentage,
  onReview,
  onRestart,
}: ListeningResultProps) {
  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-border bg-card p-6">
        <p className="text-sm font-semibold text-primary">聴解試験結果</p>

        <h2 className="mt-2 text-2xl font-bold">採点結果</h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-4">
          <ResultCard label="正解" value={correctCount} />

          <ResultCard label="不正解" value={incorrectCount} />

          <ResultCard label="未回答" value={unansweredCount} />

          <ResultCard label="正答率" value={`${percentage.toFixed(1)}%`} />
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onReview}
            className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold transition hover:bg-muted"
          >
            問題を確認する
          </button>

          <button
            type="button"
            onClick={onRestart}
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            最初からやり直す
          </button>
        </div>
      </section>
    </div>
  );
}

interface ResultCardProps {
  label: string;
  value: string | number;
}

function ResultCard({ label, value }: ResultCardProps) {
  return (
    <div className="rounded-lg border border-border p-4">
      <p className="text-sm text-muted-foreground">{label}</p>

      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  );
}
