import { BookOpenText, Headphones } from "lucide-react";

export type PracticeSection = "language" | "listening";

interface ExamSectionSwitchProps {
  value: PracticeSection;
  onChange: (value: PracticeSection) => void;
}

export function ExamSectionSwitch({ value, onChange }: ExamSectionSwitchProps) {
  return (
    <div className="mx-auto max-w-6xl px-5 pt-8 sm:px-8 sm:pt-10">
      <div className="inline-flex rounded-lg border border-border bg-card p-1">
        <button
          type="button"
          onClick={() => onChange("language")}
          className={`inline-flex min-h-10 items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition-colors sm:px-5 ${
            value === "language"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          <BookOpenText className="size-4" aria-hidden="true" />
          言語知識・読解
        </button>

        <button
          type="button"
          onClick={() => onChange("listening")}
          className={`inline-flex min-h-10 items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition-colors sm:px-5 ${
            value === "listening"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          <Headphones className="size-4" aria-hidden="true" />
          聴解
        </button>
      </div>
    </div>
  );
}
