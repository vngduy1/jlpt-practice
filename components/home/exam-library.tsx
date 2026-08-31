import { ChevronRight } from "lucide-react";

import { ExamCard } from "@/components/exams/exam-card";

import type { ExamSummary, JlptLevel } from "@/types/exam";

type ExamLibraryVariant = "official" | "original";

interface ExamLibraryProps {
  exams: ExamSummary[];
  selectedLevel: JlptLevel;
  variant?: ExamLibraryVariant;
}

export function ExamLibrary({
  exams,
  selectedLevel,
  variant = "official",
}: ExamLibraryProps) {
  const filteredExams = exams
    .filter((exam) => exam.level === selectedLevel)
    .sort((a, b) => {
      if (variant === "original") {
        return a.title.localeCompare(b.title, "ja");
      }

      if (a.year !== b.year) {
        return b.year - a.year;
      }

      return b.month - a.month;
    });

  const isOriginal = variant === "original";

  return (
    <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
      <div className="mb-7 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-primary">{selectedLevel}</p>

          <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
            {isOriginal
              ? `${selectedLevel} オリジナル模擬試験`
              : `${selectedLevel} 練習問題`}
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            {isOriginal
              ? "JLPT対策のために作成したオリジナル問題です。"
              : "過去の試験形式に沿って練習できます。"}
          </p>
        </div>

        {/* {!isOriginal && filteredExams.length > 3 && (
          <button
            type="button"
            className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex"
          >
            すべて見る
            <ChevronRight className="size-4" />
          </button>
        )} */}
      </div>

      {filteredExams.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredExams.map((exam) => (
            <ExamCard key={exam.id} exam={exam} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-border px-6 py-16 text-center">
          <p className="font-semibold">
            {isOriginal
              ? `${selectedLevel} のオリジナル問題はまだありません`
              : `${selectedLevel} の問題はまだありません`}
          </p>

          <p className="mt-2 text-sm text-muted-foreground">
            問題データを準備中です。
          </p>
        </div>
      )}
    </section>
  );
}
