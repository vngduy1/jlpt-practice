import { CheckCircle2, XCircle } from "lucide-react";

import { PassageBox } from "@/components/exams/passage-box";
import { SentenceOrderQuestionView } from "@/components/exams/sentence-order-question";

import type { ExamMode, RunnerQuestion } from "@/types/exam-runner";

interface QuestionRendererProps {
  item: RunnerQuestion;

  mode: ExamMode;

  selectedAnswer?: number;

  isChecked: boolean;

  onSelect: (answerId: number) => void;

  onCheck: () => void;
}

export function QuestionRenderer({
  item,
  mode,
  selectedAnswer,
  isChecked,
  onSelect,
  onCheck,
}: QuestionRendererProps) {
  const question = item.question;

  const passage = item.passage;
  const groupType = item.groupType;
  const layout = item.layout;

  const isCorrect =
    selectedAnswer !== undefined && selectedAnswer === question.correctAnswer;

  return (
    <section className="rounded-xl border border-border bg-card p-6">
      {/* =========================
          文の組み立て
         ========================= */}

      {question.type === "SENTENCE_ORDER" ? (
        <SentenceOrderQuestionView
          question={question}
          selectedAnswer={selectedAnswer}
          onSelect={onSelect}
        />
      ) : (
        <>
          {/* =========================
              CLOZE
             ========================= */}

          {groupType === "CLOZE" && passage && (
            <PassageBox title="文章">
              <div className="whitespace-pre-wrap text-[15px] leading-8">
                {passage}
              </div>
            </PassageBox>
          )}

          {/* =========================
              READING
             ========================= */}

          {groupType === "READING" && passage && (
            <PassageBox title="読解">
              {layout === "vertical" ? (
                <div className="flex justify-center overflow-x-auto">
                  <div className="jlpt-vertical-passage">{passage}</div>
                </div>
              ) : (
                <div className="whitespace-pre-wrap text-[15px] leading-8">
                  {passage}
                </div>
              )}
            </PassageBox>
          )}

          {/* =========================
              INFORMATION SEARCH
             ========================= */}

          {groupType === "INFORMATION_SEARCH" && passage && (
            <PassageBox title="情報検索">
              <div className="whitespace-pre-wrap text-[15px] leading-8">
                {passage}
              </div>
            </PassageBox>
          )}

          {/* Question */}

          {question.question && (
            <p className="text-lg leading-8">{question.question}</p>
          )}

          {/* Choices */}

          <div className="mt-6 space-y-3">
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

                  <span>{choice.text}</span>
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* =========================
          Practice Check
         ========================= */}

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
                  {question.correctAnswer}
                </p>
              )}

              {question.explanation && (
                <p className="mt-3 text-sm leading-6">{question.explanation}</p>
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
