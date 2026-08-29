import { BookOpenText } from "lucide-react";

export function HeroSection() {
  return (
    <section className="border-b border-border/70 bg-hero">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-primary">
            <BookOpenText
              className="size-4"
              aria-hidden="true"
            />

            JLPT 模擬試験
          </div>

          <h1 className="text-3xl font-bold tracking-[-0.025em] sm:text-5xl">
            日本語能力試験 練習
          </h1>

          <p className="mt-3 text-lg font-medium text-foreground/75 sm:text-xl">
            JLPT Practice Tests
          </p>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            本番形式の問題で、語彙・文法・読解を練習しながら、
            JLPTの実力を確認しましょう。
          </p>
        </div>
      </div>
    </section>
  );
}