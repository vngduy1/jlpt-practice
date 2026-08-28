import { Clock3 } from "lucide-react";

interface ExamTimerProps {
  remainingSeconds: number;
}

export function ExamTimer({ remainingSeconds }: ExamTimerProps) {
  const hours = Math.floor(remainingSeconds / 3600);

  const minutes = Math.floor((remainingSeconds % 3600) / 60);

  const seconds = remainingSeconds % 60;

  const formattedTime = [
    String(hours).padStart(2, "0"),
    String(minutes).padStart(2, "0"),
    String(seconds).padStart(2, "0"),
  ].join(":");

  return (
    <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
      <Clock3 className="size-4 text-primary" />

      <span className="text-xs text-muted-foreground">残り時間</span>

      <span
        className={`font-mono text-sm font-semibold ${
          remainingSeconds <= 600 ? "text-destructive" : "text-foreground"
        }`}
      >
        {formattedTime}
      </span>
    </div>
  );
}
