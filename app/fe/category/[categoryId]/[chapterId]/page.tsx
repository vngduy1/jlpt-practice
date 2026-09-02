import { ArrowRight, BookOpen, Star } from "lucide-react";
import { notFound } from "next/navigation";

import { FeSiteHeader } from "@/components/fe/fe-site-header";
import { getFeChapter } from "@/lib/fe/utils";

interface PageProps {
  params: Promise<{
    categoryId: string;
    chapterId: string;
  }>;
}

const importanceLabel = {
  high: "重要",
  medium: "標準",
  low: "基礎",
} as const;

export async function generateMetadata({ params }: PageProps) {
  const { categoryId, chapterId } = await params;

  const record = getFeChapter(categoryId, chapterId);

  if (!record) {
    return {
      title: "学習分野が見つかりません | FE Theory",
    };
  }

  return {
    title: `${record.chapter.titleJa} | FE Theory`,
    description: `${record.chapter.titleJa}（${record.chapter.titleVi}）の学習項目一覧`,
  };
}

export default async function FeChapterPage({ params }: PageProps) {
  const { categoryId, chapterId } = await params;

  const record = getFeChapter(categoryId, chapterId);

  if (!record) {
    notFound();
  }

  const { category, chapter } = record;

  const lessons = [...chapter.lessons].sort((a, b) => a.order - b.order);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <FeSiteHeader />

      <section className="border-b border-border/70 bg-hero">
        <div className="mx-auto max-w-5xl px-5 py-9 sm:px-8 sm:py-12">
          {/* oxlint-disable-next-line next/no-html-link-for-pages */}
          <a
            href={`/fe/category/${category.id}`}
            className="inline-flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            ← {category.titleJa}
          </a>
          <div className="mt-7">
            <div className="flex items-center gap-2 text-sm font-semibold text-primary">
              <BookOpen className="size-4" aria-hidden="true" />
              {String(chapter.order).padStart(2, "0")}
            </div>

            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              {chapter.titleJa}
            </h1>

            <p className="mt-2 text-base text-muted-foreground sm:text-lg">
              {chapter.titleVi}
            </p>

            <p className="mt-4 text-sm font-medium text-muted-foreground">
              {lessons.length} レッスン
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-12">
        <div className="space-y-3">
          {lessons.map((lesson) => (
            /* oxlint-disable-next-line next/no-html-link-for-pages */
            <a
              key={lesson.id}
              href={`/fe/lesson/${lesson.id}`}
              className="group flex min-h-24 items-center gap-4 rounded-2xl border border-border bg-card px-5 py-4 transition-all hover:border-primary/30 hover:shadow-sm sm:px-6"
            >
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Star className="size-5" aria-hidden="true" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-bold sm:text-lg">{lesson.titleJa}</h2>

                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                    {importanceLabel[lesson.importance]}
                  </span>
                </div>

                <p className="mt-1 text-sm text-muted-foreground">
                  {lesson.titleVi}
                </p>
              </div>

              <ArrowRight
                className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary"
                aria-hidden="true"
              />
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
