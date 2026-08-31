"use client";

import { Headphones } from "lucide-react";

import { ListeningAnswerFeedback } from "@/components/listening/listening-answer-feedback";

import type { ExamMode } from "@/types/exam-runner";
import type { ListeningQuestion } from "@/types/listening-exam";

interface ListeningQuestionRendererProps {
  question: ListeningQuestion;
  mode: ExamMode;
  selectedAnswer?: number;
  isChecked: boolean;
  onSelect: (answerId: number) => void;
  onCheck: () => void;
}

export function ListeningQuestionRenderer({
  question,
  mode,
  selectedAnswer,
  isChecked,
  onSelect,
  onCheck,
}: ListeningQuestionRendererProps) {
  return (
    <section className="rounded-xl border border-border bg-card p-6">
      <div className="mb-6 flex items-center gap-2">
        <Headphones className="size-5 text-primary" aria-hidden="true" />

        <p className="font-semibold">問題{question.mondai}</p>
      </div>

      {question.prompt && (
        <p className="mb-5 text-lg font-semibold leading-8">
          {question.prompt}
        </p>
      )}

      {question.promptImageUrl && (
        <div className="mb-6 overflow-hidden rounded-lg border border-border bg-white p-2">
          {/* oxlint-disable-next-line next/no-img-element -- JLPT question sheet images use their natural dimensions. */}
          <img
            src={question.promptImageUrl}
            alt={`問題${question.mondai}の問題用紙`}
            className="mx-auto h-auto max-h-105 w-auto max-w-full object-contain"
          />
        </div>
      )}

      {/* oxlint-disable-next-line jsx-a11y/media-has-caption -- Captions would reveal JLPT listening content during the exam. */}
      <audio
        controls
        preload="metadata"
        src={question.audioUrl}
        className="w-full"
      >
        お使いのブラウザは音声再生に対応していません。
      </audio>

      <div
        className={
          question.choiceDisplay === "NUMBER_ONLY"
            ? "mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4"
            : "mt-7 space-y-3"
        }
      >
        {question.choices.map((choice) => {
          const selected = selectedAnswer === choice.id;

          const showCorrect =
            mode === "practice" &&
            isChecked &&
            choice.id === question.correctAnswer;

          const showWrong =
            mode === "practice" &&
            isChecked &&
            selected &&
            choice.id !== question.correctAnswer;

          if (question.choiceDisplay === "NUMBER_ONLY") {
            return (
              <button
                key={choice.id}
                type="button"
                onClick={() => onSelect(choice.id)}
                className={`min-h-14 rounded-lg border text-lg font-bold transition ${
                  showCorrect
                    ? "border-green-500 bg-green-50 text-green-700"
                    : showWrong
                      ? "border-red-400 bg-red-50 text-red-700"
                      : selected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card hover:border-primary/40 hover:bg-muted"
                }`}
              >
                {choice.id}
              </button>
            );
          }

          return (
            <button
              key={choice.id}
              type="button"
              onClick={() => onSelect(choice.id)}
              className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left transition ${
                showCorrect
                  ? "border-green-500 bg-green-50"
                  : showWrong
                    ? "border-red-400 bg-red-50"
                    : selected
                      ? "border-primary bg-primary/5 ring-1 ring-primary"
                      : "border-border hover:border-primary/40 hover:bg-muted"
              }`}
            >
              <span
                className={`grid size-8 shrink-0 place-items-center rounded-full border text-sm font-semibold ${
                  showCorrect
                    ? "border-green-600 bg-green-600 text-white"
                    : showWrong
                      ? "border-red-500 bg-red-500 text-white"
                      : selected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border"
                }`}
              >
                {choice.id}
              </span>

              {choice.text && <span className="leading-6">{choice.text}</span>}

              {choice.imageUrl && (
                <>
                  {/* oxlint-disable-next-line next/no-img-element -- Native img is required for Vinext/Cloudflare deployment. */}
                  <img
                    src={choice.imageUrl}
                    alt={`選択肢${choice.id}`}
                    className="max-h-48 max-w-full object-contain"
                  />
                </>
              )}
            </button>
          );
        })}
      </div>

      {mode === "practice" && selectedAnswer !== undefined && (
        <div className="mt-6 border-t border-border pt-5">
          {!isChecked ? (
            <button
              type="button"
              onClick={onCheck}
              className="rounded-lg border border-primary px-4 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary/5"
            >
              答えを確認
            </button>
          ) : (
            <ListeningAnswerFeedback
              question={question}
              selectedAnswer={selectedAnswer}
            />
          )}
        </div>
      )}
    </section>
  );
}
