import type { Metadata } from "next";
import { ArrowLeft, Layers3 } from "lucide-react";
import { notFound } from "next/navigation";

import { FeChapterSection } from "@/components/fe/fe-chapter-section";
import { FeSiteHeader } from "@/components/fe/fe-site-header";
import { getFeCategory } from "@/lib/fe/registry";

interface FeCategoryPageProps {
  params: Promise<{ categoryId: string }>;
}

export async function generateMetadata({
  params,
}: FeCategoryPageProps): Promise<Metadata> {
  const { categoryId } = await params;
  const category = getFeCategory(categoryId);

  if (!category) return { title: "カテゴリーが見つかりません" };

  const description = `${category.titleJa}・${category.titleVi}のFE理論レッスン。`;

  return {
    title: `${category.titleJa} | FE Theory`,
    description,
    openGraph: { title: category.titleJa, description, images: [] },
    twitter: { title: category.titleJa, description, images: [] },
  };
}

export default async function FeCategoryPage({ params }: FeCategoryPageProps) {
  const { categoryId } = await params;
  const category = getFeCategory(categoryId);

  if (!category) notFound();

  const chapters = [...category.chapters].sort((a, b) => a.order - b.order);
  const lessonCount = chapters.reduce(
    (count, chapter) => count + chapter.lessons.length,
    0,
  );

  return (
    <main className="min-h-screen bg-background text-foreground">
      <FeSiteHeader />

      <section className="border-b border-border/70 bg-hero">
        <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
          {/* oxlint-disable-next-line next/no-html-link-for-pages -- Full-page navigation is required for Vinext/Cloudflare deployment. */}
          <a
            href="/fe"
            className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            カテゴリー一覧
          </a>

          <div className="mt-7 flex items-start gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-secondary text-secondary-foreground">
              <Layers3 className="size-5" aria-hidden="true" />
            </span>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {category.titleJa}
              </h1>
              <p className="mt-2 text-lg text-muted-foreground">
                {category.titleVi}
              </p>
              <p className="mt-4 text-sm font-medium text-muted-foreground">
                {chapters.length}章・{lessonCount}レッスン
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-5xl gap-5 px-5 py-8 sm:px-8 sm:py-12">
        {chapters.map((chapter, index) => (
          <FeChapterSection key={chapter.id} chapter={chapter} number={index + 1} />
        ))}
      </div>
    </main>
  );
}
