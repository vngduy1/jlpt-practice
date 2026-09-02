"use client";

import type { FeLanguageMode } from "@/types/fe";

interface FeLanguageToggleProps {
  value: FeLanguageMode;
  onChange: (mode: FeLanguageMode) => void;
}

const options: Array<{ value: FeLanguageMode; label: string }> = [
  { value: "ja", label: "日本語" },
  { value: "bilingual", label: "日本語 + Tiếng Việt" },
  { value: "vi", label: "Tiếng Việt" },
];

export function FeLanguageToggle({
  value,
  onChange,
}: FeLanguageToggleProps) {
  return (
    <fieldset
      className="grid w-full grid-cols-3 rounded-lg border border-border bg-muted/70 p-1 sm:w-auto"
      aria-label="表示言語"
    >
      {options.map((option) => {
        const selected = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(option.value)}
            className={`min-h-11 rounded-md px-2 text-xs font-semibold transition-colors sm:px-4 sm:text-sm ${
              selected
                ? "bg-card text-primary shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </fieldset>
  );
}
