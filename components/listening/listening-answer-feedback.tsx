import { CheckCircle2, XCircle } from "lucide-react";

import type { ListeningQuestion } from "@/types/listening-exam";

interface ListeningAnswerFeedbackProps {
  question: ListeningQuestion;
  selectedAnswer: number;
}

export function ListeningAnswerFeedback({
  question,
  selectedAnswer,
}: ListeningAnswerFeedbackProps) {
  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div
      className={`rounded-lg border p-4 ${
        isCorrect
          ? "border-green-500/30 bg-green-50"
          : "border-red-500/30 bg-red-50"
      }`}
    >
      <div className="flex items-center gap-2">
        {isCorrect ? (
          <CheckCircle2 className="size-5 text-green-600" />
        ) : (
          <XCircle className="size-5 text-red-600" />
        )}

        <p
          className={`font-semibold ${
            isCorrect ? "text-green-700" : "text-red-700"
          }`}
        >
          {isCorrect ? "正解です。" : "不正解です。"}
        </p>
      </div>

      {!isCorrect && (
        <p className="mt-2 text-sm">
          正解：
          <strong className="ml-1">{question.correctAnswer}</strong>
        </p>
      )}

      {question.explanation && (
        <p className="mt-3 text-sm leading-6">{question.explanation}</p>
      )}

      {question.transcript && (
        <div className="mt-4 border-t border-border/70 pt-4">
          <p className="text-sm font-semibold">スクリプト</p>

          <p className="mt-2 whitespace-pre-wrap text-sm leading-7">
            {question.transcript}
          </p>
        </div>
      )}
    </div>
  );
}
