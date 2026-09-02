"use client";

import { AlertTriangle, CheckCircle2, FlaskConical, Languages } from "lucide-react";
import { useState } from "react";

import { FeLanguageToggle } from "@/components/fe/fe-language-toggle";
import { FeTermCard } from "@/components/fe/fe-term-card";
import type {
  FeContentBlock,
  FeLanguageMode,
  FeLesson,
} from "@/types/fe";

interface FeLessonContentProps {
  lesson: FeLesson;
}

export function FeLessonContent({ lesson }: FeLessonContentProps) {
  const [mode, setMode] = useState<FeLanguageMode>("bilingual");

  return (
    <>
      <div className="sticky top-16 z-40 -mx-5 border-y border-border/70 bg-background/95 px-5 py-3 backdrop-blur sm:mx-0 sm:rounded-xl sm:border sm:px-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Languages className="size-4 text-primary" aria-hidden="true" />
            表示言語 / Ngôn ngữ
          </div>
          <FeLanguageToggle value={mode} onChange={setMode} />
        </div>
      </div>

      <section className="mt-8 rounded-xl border border-border bg-card p-5 sm:p-7">
        <LocalizedPair
          ja={lesson.summaryJa}
          vi={lesson.summaryVi}
          mode={mode}
          prominent
        />
      </section>

      <article className="mt-6 space-y-4">
        {lesson.content.map((block, index) => (
          <TheoryBlock key={`${block.type}-${index}`} block={block} mode={mode} />
        ))}
      </article>

      {lesson.terms.length > 0 ? (
        <section className="mt-10 border-t border-border pt-8">
          <div className="mb-5">
            <p className="text-sm font-semibold text-primary">Technical terms</p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight">重要用語</h2>
            <p className="mt-1 text-sm text-muted-foreground">Thuật ngữ quan trọng</p>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {lesson.terms.map((term) => (
              <FeTermCard key={`${term.term}-${term.english}`} term={term} mode={mode} />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}

function TheoryBlock({
  block,
  mode,
}: {
  block: FeContentBlock;
  mode: FeLanguageMode;
}) {
  if (block.type === "heading") {
    return (
      <section className="pt-5">
        <LocalizedPair ja={block.ja} vi={block.vi} mode={mode} heading />
      </section>
    );
  }

  if (block.type === "point") {
    return (
      <section className="rounded-xl border border-primary/20 bg-secondary/65 p-5 sm:p-6">
        <div className="mb-3 flex items-center gap-2 text-sm font-bold text-primary">
          <CheckCircle2 className="size-4" aria-hidden="true" />
          ポイント / Điểm chính
        </div>
        <LocalizedPair ja={block.ja} vi={block.vi} mode={mode} />
      </section>
    );
  }

  if (block.type === "example") {
    return (
      <section className="rounded-xl border border-sky-200 bg-sky-50/70 p-5 text-slate-900 dark:border-sky-900 dark:bg-sky-950/30 dark:text-slate-100 sm:p-6">
        <div className="mb-3 flex items-center gap-2 text-sm font-bold text-sky-700 dark:text-sky-300">
          <FlaskConical className="size-4" aria-hidden="true" />
          例 / Ví dụ
        </div>
        <LocalizedPair ja={block.ja} vi={block.vi} mode={mode} />
      </section>
    );
  }

  if (block.type === "warning") {
    return (
      <section className="rounded-xl border border-amber-200 bg-amber-50/75 p-5 text-amber-950 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-100 sm:p-6">
        <div className="mb-3 flex items-center gap-2 text-sm font-bold text-amber-700 dark:text-amber-300">
          <AlertTriangle className="size-4" aria-hidden="true" />
          注意 / Lưu ý
        </div>
        <LocalizedPair ja={block.ja} vi={block.vi} mode={mode} />
      </section>
    );
  }

  return (
    <section className="rounded-xl border border-border bg-card p-5 sm:p-6">
      <LocalizedPair ja={block.ja} vi={block.vi} mode={mode} />
    </section>
  );
}

function LocalizedPair({
  ja,
  vi,
  mode,
  prominent = false,
  heading = false,
}: {
  ja: string;
  vi: string;
  mode: FeLanguageMode;
  prominent?: boolean;
  heading?: boolean;
}) {
  const bilingual = mode === "bilingual";
  const textClass = heading
    ? "text-xl font-bold leading-8 tracking-tight sm:text-2xl"
    : prominent
      ? "text-base font-medium leading-8 sm:text-lg"
      : "text-[15px] leading-8 sm:text-base";

  return (
    <div className={bilingual ? "grid gap-4 lg:grid-cols-2 lg:gap-8" : "block"}>
      {mode !== "vi" ? (
        <div>
          {bilingual ? (
            <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              日本語
            </p>
          ) : null}
          <p className={textClass}>{ja}</p>
        </div>
      ) : null}
      {mode !== "ja" ? (
        <div className={bilingual ? "border-t border-border/70 pt-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0" : ""}>
          {bilingual ? (
            <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Tiếng Việt
            </p>
          ) : null}
          <p className={textClass}>{vi}</p>
        </div>
      ) : null}
    </div>
  );
}
