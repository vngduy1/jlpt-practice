import { ArrowRight, Star } from "lucide-react";

import type { FeLesson } from "@/types/fe";

interface FeLessonCardProps {
  lesson: FeLesson;
}

const importanceLabels: Record<FeLesson["importance"], string> = {
  high: "重要",
  medium: "標準",
  low: "補足",
};

export function FeLessonCard({ lesson }: FeLessonCardProps) {
  return (
    // oxlint-disable-next-line next/no-html-link-for-pages -- Full-page navigation is required for Vinext/Cloudflare deployment.
    <a
      href={`/fe/lesson/${encodeURIComponent(lesson.id)}`}
      className="group flex min-h-24 items-center gap-4 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/35 hover:bg-accent/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-5"
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-secondary text-secondary-foreground">
        <Star className="size-4" aria-hidden="true" />
      </span>

      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2">
          <span className="font-bold">{lesson.titleJa}</span>
          <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-semibold text-muted-foreground">
            {importanceLabels[lesson.importance]}
          </span>
        </span>
        <span className="mt-1 block text-sm leading-6 text-muted-foreground">
          {lesson.titleVi}
        </span>
      </span>

      <ArrowRight
        className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
        aria-hidden="true"
      />
    </a>
  );
}
