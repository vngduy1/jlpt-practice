import type { SentenceOrderQuestion } from "@/types/exam";

interface SentenceOrderQuestionViewProps {
  question: SentenceOrderQuestion;
  selectedAnswer?: number;
  onSelect: (fragmentId: number) => void;
}

export function SentenceOrderQuestionView({
  question,
  selectedAnswer,
  onSelect,
}: SentenceOrderQuestionViewProps) {
  return (
    <div>
      <p className="mb-5 text-sm font-semibold text-primary">文の組み立て</p>

      {/* Câu giống format JLPT */}
      <div className="rounded-xl bg-muted/35 px-5 py-6">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-4 text-[17px] leading-8">
          {question.sentenceBefore && <span>{question.sentenceBefore}</span>}

          {[1, 2, 3, 4].map((position) => {
            const isStar = position === question.starPosition;

            return (
              <span
                key={position}
                className="relative inline-flex h-9 min-w-16 items-center justify-center border-b-2 border-foreground/55 px-3"
              >
                {isStar && (
                  <span
                    className="absolute bottom-2 text-base font-bold leading-none text-foreground"
                    aria-label="star position"
                  >
                    ★
                  </span>
                )}
              </span>
            );
          })}

          {question.sentenceAfter && <span>{question.sentenceAfter}</span>}
        </div>
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        ★ に入るものを、1・2・3・4から一つ選んでください。
      </p>

      {/* 4 đáp án */}
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {question.fragments.map((fragment) => {
          const selected = selectedAnswer === fragment.id;

          return (
            <button
              key={fragment.id}
              type="button"
              onClick={() => onSelect(fragment.id)}
              className={`flex min-h-14 items-center gap-3 rounded-lg border px-4 py-3 text-left transition ${
                selected
                  ? "border-primary bg-primary/5 ring-1 ring-primary"
                  : "border-border bg-card hover:border-primary/40 hover:bg-muted/40"
              }`}
            >
              <span
                className={`grid size-8 shrink-0 place-items-center rounded-full border text-sm font-semibold ${
                  selected
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background"
                }`}
              >
                {fragment.id}
              </span>

              <span className="leading-6">{fragment.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
