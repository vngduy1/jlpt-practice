import { Cpu, LibraryBig } from "lucide-react";

import { FeCategoryCard } from "@/components/fe/fe-category-card";
import { FeSiteHeader } from "@/components/fe/fe-site-header";
import { getFeCategoryIndex, listFeCategorySummaries } from "@/lib/fe/utils";

export const metadata = {
  title: "基本情報技術者試験 | FE Theory",
  description:
    "基本情報技術者試験の理論を日本語とベトナム語で学ぶためのカテゴリー一覧。",
  openGraph: {
    title: "基本情報技術者試験 | FE Theory",
    description: "日本語とベトナム語で学ぶFE理論。",
    images: [],
  },
  twitter: {
    title: "基本情報技術者試験 | FE Theory",
    description: "日本語とベトナム語で学ぶFE理論。",
    images: [],
  },
};

export default function FeHomePage() {
  const index = getFeCategoryIndex();
  const categories = listFeCategorySummaries();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <FeSiteHeader />

      <section className="border-b border-border/70 bg-hero">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
              <Cpu className="size-4" aria-hidden="true" />
              FE 理論学習
            </div>
            <h1 className="text-3xl font-bold tracking-[-0.025em] sm:text-5xl">
              {index.titleJa}
            </h1>
            <p className="mt-3 text-lg font-medium text-foreground/75 sm:text-xl">
              {index.titleVi}
            </p>
            <div className="mt-6 grid max-w-2xl gap-3 text-sm leading-7 text-muted-foreground sm:text-base">
              <p>
                科目ごとに基礎概念を整理し、試験に必要な技術用語と考え方を学びます。
              </p>
              <p>
                Học các khái niệm và thuật ngữ kỹ thuật cốt lõi theo từng chủ đề
                của kỳ thi FE.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-primary">
              <LibraryBig className="size-4" aria-hidden="true" />
              学習カテゴリー
            </div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight">
              理論を選ぶ
            </h2>
          </div>
          <p className="text-sm text-muted-foreground">
            {categories.length}カテゴリー
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <FeCategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>
    </main>
  );
}
