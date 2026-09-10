"use client";

import { useRouter } from "next/navigation";

import type { JlptLevel } from "@/types/exam";

const jlptLevels: JlptLevel[] = ["N1", "N2", "N3", "N4", "N5"];

interface SiteHeaderProps {
  section: "jlpt" | "fe";
  selectedLevel?: JlptLevel;
  onLevelChange?: (level: JlptLevel) => void;
}

export function SiteHeader({
  section,
  selectedLevel,
  onLevelChange,
}: SiteHeaderProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/95 backdrop-blur">
      <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-6 px-5 py-2 sm:px-8">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="flex shrink-0 items-center gap-3 text-left"
        >
          <span className="grid size-10 place-items-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
            日本
          </span>

          <div className="leading-tight">
            <p className="font-semibold tracking-tight">JLPT Practice</p>

            <p className="mt-0.5 text-[11px] text-muted-foreground">
              日本語能力試験 練習
            </p>
          </div>
        </button>

        <div className="hidden flex-col items-end gap-1 sm:flex">
          <nav className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => router.push("/")}
              className={`rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
                section === "jlpt"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              JLPT
            </button>

            <button
              type="button"
              onClick={() => router.push("/fe")}
              className={`rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
                section === "fe"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              基本情報
            </button>
          </nav>

          {section === "jlpt" && selectedLevel && onLevelChange ? (
            <nav className="flex items-center gap-1" aria-label="JLPT levels">
              {jlptLevels.map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => onLevelChange(level)}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                    selectedLevel === level
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {level}
                </button>
              ))}
            </nav>
          ) : (
            <p className="px-3 text-xs font-semibold text-muted-foreground">
              FE Theory
            </p>
          )}
        </div>
      </div>
    </header>
  );
}
