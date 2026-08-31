import { ArrowLeft, ArrowRight } from "lucide-react";

interface ListeningQuestionControlsProps {
  currentIndex: number;
  questionCount: number;
  onPrevious: () => void;
  onNext: () => void;
}

export function ListeningQuestionControls({
  currentIndex,
  questionCount,
  onPrevious,
  onNext,
}: ListeningQuestionControlsProps) {
  const isFirst = currentIndex === 0;

  const isLast = currentIndex === questionCount - 1;

  return (
    <div className="mt-6 flex items-center justify-between gap-4">
      <button
        type="button"
        onClick={onPrevious}
        disabled={isFirst}
        className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-semibold transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ArrowLeft className="size-4" />
        前へ
      </button>

      <button
        type="button"
        onClick={onNext}
        disabled={isLast}
        className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        次へ
        <ArrowRight className="size-4" />
      </button>
    </div>
  );
}
