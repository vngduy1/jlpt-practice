import type { FeLanguageMode, FeTerm } from "@/types/fe";

interface FeTermCardProps {
  term: FeTerm;
  mode: FeLanguageMode;
}

export function FeTermCard({ term, mode }: FeTermCardProps) {
  const bilingual = mode === "bilingual";

  return (
    <article className="rounded-lg border border-border bg-card p-4 sm:p-5">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="text-lg font-bold">{term.term}</h3>
        <p className="text-sm text-muted-foreground">{term.reading}</p>
      </div>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
        <span className="font-medium text-primary">{term.english}</span>
        <span className="text-muted-foreground">{term.vi}</span>
      </div>

      <div
        className={`mt-4 gap-4 ${bilingual ? "grid lg:grid-cols-2" : "block"}`}
      >
        {mode !== "vi" ? (
          <div className="rounded-md bg-muted/55 p-3">
            <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              日本語
            </p>
            <p className="mt-1 text-sm leading-6">{term.definitionJa}</p>
          </div>
        ) : null}
        {mode !== "ja" ? (
          <div className={`${bilingual ? "mt-3 lg:mt-0" : ""} rounded-md bg-secondary/60 p-3`}>
            <p className="text-[11px] font-bold uppercase tracking-wider text-secondary-foreground/70">
              Tiếng Việt
            </p>
            <p className="mt-1 text-sm leading-6">{term.definitionVi}</p>
          </div>
        ) : null}
      </div>
    </article>
  );
}
