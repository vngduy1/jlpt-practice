import type { JlptLevel } from "@/types/exam";

const jlptLevels: JlptLevel[] = [
  "N1",
  "N2",
  "N3",
  "N4",
  "N5",
];

interface HomeHeaderProps {
  selectedLevel: JlptLevel;
  onLevelChange: (level: JlptLevel) => void;
}

export function HomeHeader({
  selectedLevel,
  onLevelChange,
}: HomeHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
            日本
          </span>

          <div className="leading-tight">
            <p className="font-semibold tracking-tight">
              JLPT Practice
            </p>

            <p className="mt-0.5 text-[11px] text-muted-foreground">
              日本語能力試験 練習
            </p>
          </div>
        </div>

        <nav className="hidden items-center gap-1 sm:flex" aria-label="JLPT levels">
          {/* oxlint-disable-next-line next/no-html-link-for-pages -- Full-page navigation is required for Vinext/Cloudflare deployment. */}
          <a
            href="/fe"
            className="mr-2 rounded-md border border-border bg-card px-3 py-2 text-sm font-semibold text-primary transition-colors hover:bg-secondary"
          >
            基本情報
          </a>
          {jlptLevels.map((level) => {
            const active = level === selectedLevel;

            return (
              <button
                key={level}
                type="button"
                onClick={() => onLevelChange(level)}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {level}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile */}
      <div className="border-t border-border/60 px-5 py-2 sm:hidden">
        <div className="flex gap-2 overflow-x-auto pb-0.5">
          {/* oxlint-disable-next-line next/no-html-link-for-pages -- Full-page navigation is required for Vinext/Cloudflare deployment. */}
          <a
            href="/fe"
            className="inline-flex min-h-10 shrink-0 items-center rounded-md border border-primary/30 bg-secondary px-4 text-sm font-semibold text-primary"
          >
            基本情報
          </a>
          {jlptLevels.map((level) => {
            const active = level === selectedLevel;

            return (
              <button
                key={level}
                type="button"
                onClick={() => onLevelChange(level)}
                className={`min-w-14 rounded-md border px-4 py-2 text-sm font-semibold transition-colors ${
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground"
                }`}
              >
                {level}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
