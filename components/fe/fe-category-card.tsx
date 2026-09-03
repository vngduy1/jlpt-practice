import {
  ArrowRight,
  Binary,
  Database,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import type { FeCategoryIcon, FeCategorySummary } from "@/types/fe";

const categoryIcons: Record<FeCategoryIcon, LucideIcon> = {
  binary: Binary,
  algorithm: Workflow,
  database: Database,
};

interface FeCategoryCardProps {
  category: FeCategorySummary;
}

export function FeCategoryCard({ category }: FeCategoryCardProps) {
  const Icon =
    (category.icon ? categoryIcons[category.icon] : undefined) ?? BookFallback;

  return (
    // oxlint-disable-next-line next/no-html-link-for-pages -- Full-page navigation is required for Vinext/Cloudflare deployment.
    <a
      href={`/fe/category/${encodeURIComponent(category.id)}`}
      className="group flex min-h-48 flex-col rounded-xl border border-border bg-card p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-6"
    >
      <span className="grid size-11 place-items-center rounded-lg bg-secondary text-secondary-foreground">
        <Icon className="size-5" aria-hidden="true" />
      </span>

      <div className="mt-5 flex-1">
        <h2 className="text-lg font-bold tracking-tight">{category.titleJa}</h2>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          {category.titleVi}
        </p>
        {category.lessonCount !== undefined ? (
          <p className="mt-3 text-xs font-medium text-muted-foreground">
            {category.chapterCount}章・{category.lessonCount}レッスン
          </p>
        ) : null}
      </div>

      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
        理論を見る
        <ArrowRight
          className="size-4 transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </span>
    </a>
  );
}

function BookFallback({ className }: { className?: string }) {
  return <Binary className={className} aria-hidden="true" />;
}
