import { FeLessonCard } from "@/components/fe/fe-lesson-card";
import type { FeChapter } from "@/types/fe";

interface FeChapterSectionProps {
  chapter: FeChapter;
  number: number;
}

export function FeChapterSection({
  chapter,
  number,
}: FeChapterSectionProps) {
  const lessons = [...chapter.lessons].sort((a, b) => a.order - b.order);

  return (
    <section className="rounded-xl border border-border bg-card/60 p-5 sm:p-7">
      <div className="flex items-start gap-4">
        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
          {number}
        </span>
        <div>
          <h2 className="text-xl font-bold tracking-tight">{chapter.titleJa}</h2>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            {chapter.titleVi}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-3">
        {lessons.map((lesson) => (
          <FeLessonCard key={lesson.id} lesson={lesson} />
        ))}
      </div>
    </section>
  );
}
