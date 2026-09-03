import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, BookMarked } from "lucide-react";
import { notFound } from "next/navigation";

import { FeLessonContent } from "@/components/fe/fe-lesson-content";
import { FeSiteHeader } from "@/components/fe/fe-site-header";
import { getFeLesson, getFeLessonNavigation } from "@/lib/fe/utils";

interface FeLessonPageProps {
  params: Promise<{ lessonId: string }>;
}

export async function generateMetadata({
  params,
}: FeLessonPageProps): Promise<Metadata> {
  const { lessonId } = await params;
  const record = getFeLesson(lessonId);

  if (!record) return { title: "レッスンが見つかりません" };

  const { lesson } = record;
  const description = `${lesson.summaryJa} ${lesson.summaryVi}`;

  return {
    title: `${lesson.titleJa} | FE Theory`,
    description,
    openGraph: { title: lesson.titleJa, description, images: [] },
    twitter: { title: lesson.titleJa, description, images: [] },
  };
}

export default async function FeLessonPage({ params }: FeLessonPageProps) {
  const { lessonId } = await params;
  const record = getFeLesson(lessonId);

  if (!record) notFound();

  const { category, chapter, lesson } = record;
  const { previous, next } = getFeLessonNavigation(lessonId);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <FeSiteHeader />

      <div className="mx-auto max-w-5xl px-5 py-7 sm:px-8 sm:py-10">
        {/* oxlint-disable-next-line next/no-html-link-for-pages -- Full-page navigation is required for Vinext/Cloudflare deployment. */}
        <a
          href={`/fe/category/${encodeURIComponent(category.id)}`}
          className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          {category.titleJa}
        </a>

        <header className="mt-6 border-b border-border pb-7">
          <div className="flex items-start gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-secondary text-secondary-foreground">
              <BookMarked className="size-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-primary">
                {chapter.titleJa} / {chapter.titleVi}
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                {lesson.titleJa}
              </h1>
              <p className="mt-2 text-lg leading-7 text-muted-foreground">
                {lesson.titleVi}
              </p>
            </div>
          </div>
        </header>

        <div className="mt-6">
          <FeLessonContent lesson={lesson} />
        </div>

        <nav
          className="mt-12 border-t border-border pt-6"
          aria-label="Lesson navigation"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {previous ? (
              <>
                {/* oxlint-disable-next-line next/no-html-link-for-pages -- Full-page navigation is required for Vinext/Cloudflare deployment. */}
                <a
                  href={`/fe/lesson/${encodeURIComponent(previous.lesson.id)}`}
                  className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-muted/40"
                >
                  <p className="flex items-center gap-2 text-sm font-semibold text-muted-foreground group-hover:text-primary">
                    <ArrowLeft className="size-4" aria-hidden="true" />
                    前の項目
                  </p>

                  <p className="mt-3 font-bold text-foreground">
                    {previous.lesson.titleJa}
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {previous.lesson.titleVi}
                  </p>
                </a>
              </>
            ) : (
              <div />
            )}

            {next ? (
              <>
                {/* oxlint-disable-next-line next/no-html-link-for-pages -- Full-page navigation is required for Vinext/Cloudflare deployment. */}
                <a
                  href={`/fe/lesson/${encodeURIComponent(next.lesson.id)}`}
                  className="group rounded-xl border border-border bg-card p-5 text-left transition-colors hover:border-primary/40 hover:bg-muted/40 sm:text-right"
                >
                  <p className="flex items-center gap-2 text-sm font-semibold text-muted-foreground group-hover:text-primary sm:justify-end">
                    次の項目
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </p>

                  <p className="mt-3 font-bold text-foreground">
                    {next.lesson.titleJa}
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {next.lesson.titleVi}
                  </p>
                </a>
              </>
            ) : (
              <>
                {/* oxlint-disable-next-line next/no-html-link-for-pages -- Full-page navigation is required for Vinext/Cloudflare deployment. */}
                <a
                  href={`/fe/category/${encodeURIComponent(category.id)}`}
                  className="group rounded-xl border border-border bg-card p-5 text-left transition-colors hover:border-primary/40 hover:bg-muted/40 sm:text-right"
                >
                  <p className="text-sm font-semibold text-muted-foreground group-hover:text-primary">
                    学習完了
                  </p>

                  <p className="mt-3 font-bold text-foreground">一覧に戻る</p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Quay lại danh sách
                  </p>
                </a>
              </>
            )}
          </div>
        </nav>
      </div>
    </main>
  );
}
