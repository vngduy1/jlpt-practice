import { ArrowRight, BookOpen } from "lucide-react";
import { notFound } from "next/navigation";

import { FeSiteHeader } from "@/components/fe/fe-site-header";
import { getFeCategory } from "@/lib/fe/utils";

interface PageProps {
  params: Promise<{
    categoryId: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { categoryId } = await params;
  const category = getFeCategory(categoryId);

  if (!category) {
    return {
      title: "カテゴリーが見つかりません | FE Theory",
    };
  }

  return {
    title: `${category.titleJa} | FE Theory`,
    description: `${category.titleJa}（${category.titleVi}）の学習分野一覧`,
  };
}

export default async function FeCategoryPage({ params }: PageProps) {
  const { categoryId } = await params;

  const category = getFeCategory(categoryId);

  if (!category) {
    notFound();
  }

  const chapters = [...category.chapters].sort((a, b) => a.order - b.order);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <FeSiteHeader />

      <section className="border-b border-border/70 bg-hero">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-12">
          {/* oxlint-disable-next-line next/no-html-link-for-pages */}
          <a
            href="/fe"
            className="inline-flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            ← カテゴリー一覧
          </a>

          <div className="mt-7">
            <div className="flex items-center gap-2 text-sm font-semibold text-primary">
              <BookOpen className="size-4" aria-hidden="true" />
              学習カテゴリー
            </div>

            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              {category.titleJa}
            </h1>

            <p className="mt-2 text-base text-muted-foreground sm:text-lg">
              {category.titleVi}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-primary">学習分野</p>

            <h2 className="mt-1 text-2xl font-bold">分野を選ぶ</h2>
          </div>

          <p className="text-sm text-muted-foreground">{chapters.length}分野</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {chapters.map((chapter) => (
            /* oxlint-disable-next-line next/no-html-link-for-pages */
            <a
              key={chapter.id}
              href={`/fe/category/${category.id}/${chapter.id}`}
              className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground">
                  {String(chapter.order).padStart(2, "0")}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-xl font-bold">{chapter.titleJa}</h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {chapter.titleVi}
                  </p>

                  <p className="mt-4 text-sm font-medium text-muted-foreground">
                    {chapter.lessons.length} レッスン
                  </p>
                </div>

                <ArrowRight
                  className="mt-1 size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary"
                  aria-hidden="true"
                />
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
