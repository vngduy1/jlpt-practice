import type { ExamMode } from "@/types/exam-runner";

interface ExamModeSwitchProps {
  mode: ExamMode;
  onChange: (mode: ExamMode) => void;
}

export function ExamModeSwitch({ mode, onChange }: ExamModeSwitchProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="inline-flex rounded-lg border border-border bg-card p-1">
        <button
          type="button"
          onClick={() => onChange("practice")}
          className={`rounded-md px-4 py-2 text-sm font-semibold transition ${
            mode === "practice"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          練習モード
        </button>

        <button
          type="button"
          onClick={() => onChange("exam")}
          className={`rounded-md px-4 py-2 text-sm font-semibold transition ${
            mode === "exam"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          模擬試験モード
        </button>
      </div>

      <p className="text-xs text-muted-foreground">
        {mode === "practice"
          ? "解答後に正解を確認できます。"
          : "採点するまで正解は表示されません。"}
      </p>
    </div>
  );
}
