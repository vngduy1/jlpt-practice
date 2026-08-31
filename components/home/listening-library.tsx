import type { JlptLevel } from "@/types/exam";
import type { ListeningExamSummary } from "@/types/listening-exam";

interface ListeningLibraryProps {
  exams: ListeningExamSummary[];
  selectedLevel: JlptLevel;
}

export function ListeningLibrary({
  exams,
  selectedLevel,
}: ListeningLibraryProps) {
  const filteredExams = exams
    .filter((exam) => exam.level === selectedLevel)
    .sort((a, b) => {
      if (a.year !== b.year) {
        return b.year - a.year;
      }

      return b.month - a.month;
    });

  return (
    <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
      <div className="mb-7">
        <p className="text-sm font-semibold text-primary">{selectedLevel}</p>

        <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
          {selectedLevel} 聴解練習
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          JLPT形式の聴解問題を練習できます。
        </p>
      </div>

      {filteredExams.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredExams.map((exam) => (
            <div
              key={exam.id}
              className="rounded-xl border border-border bg-card p-6"
            >
              <p className="text-sm font-semibold text-primary">{exam.level}</p>

              <h3 className="mt-3 text-xl font-bold">{exam.title}</h3>

              <p className="mt-4 text-sm text-muted-foreground">
                問題数：{exam.questionCount}問
              </p>

              <p className="mt-2 text-sm text-muted-foreground">
                試験時間：約{exam.durationMinutes}分
              </p>

              {exam.loadedQuestionCount === exam.questionCount ? (
                <p className="mt-6 text-sm font-semibold text-primary">
                  利用可能
                </p>
              ) : (
                <p className="mt-6 text-sm font-medium text-muted-foreground">
                  問題データ準備中 （{exam.loadedQuestionCount}/
                  {exam.questionCount}）
                </p>
              )}

              <a
                href={`/listening/${exam.id}`}
                className="mt-6 flex min-h-11 w-full items-center justify-center rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                聴解試験を開く
              </a>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-border px-6 py-16 text-center">
          <p className="font-semibold">
            {selectedLevel} の聴解問題はまだありません
          </p>

          <p className="mt-2 text-sm text-muted-foreground">
            問題データを準備中です。
          </p>
        </div>
      )}
    </section>
  );
}
