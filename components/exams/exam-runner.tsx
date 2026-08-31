"use client";

import { useEffect, useMemo, useState } from "react";

import { ArrowLeft, ArrowRight } from "lucide-react";

import { ExamModeSwitch } from "@/components/exams/exam-mode-switch";
import { ExamResult } from "@/components/exams/exam-result";
import { ExamTimer } from "@/components/exams/exam-timer";
import { QuestionNavigator } from "@/components/exams/question-navigator";
import { QuestionRenderer } from "@/components/exams/question-renderer";

import type {
  ExamMode,
  ExamResultData,
  RunnerQuestion,
} from "@/types/exam-runner";

interface ExamRunnerProps {
  questions: RunnerQuestion[];
  durationMinutes?: number;
}

export function ExamRunner({
  questions,
  durationMinutes = 110,
}: ExamRunnerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [answers, setAnswers] = useState<Record<number, number>>({});

  const [mode, setMode] = useState<ExamMode>("exam");

  const [checkedQuestions, setCheckedQuestions] = useState<
    Record<number, boolean>
  >({});

  const [submitted, setSubmitted] = useState(false);

  const [remainingSeconds, setRemainingSeconds] = useState(
    durationMinutes * 60,
  );

  const currentItem = questions[currentIndex];

  const currentQuestion = currentItem.question;

  const selectedAnswer = answers[currentQuestion.id];

  const answeredCount = Object.keys(answers).length;

  const unansweredCount = questions.length - answeredCount;

  const isChecked = checkedQuestions[currentQuestion.id] === true;

  /*
   * Timer
   */
  useEffect(() => {
    if (submitted) {
      return;
    }

    const timer = window.setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer);

          setSubmitted(true);

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [submitted]);

  /*
   * Result
   */
  const result = useMemo<ExamResultData>(() => {
    const initialResult = {
      correctCount: 0,
      incorrectCount: 0,
      unanswered: 0,
      details: [] as ExamResultData["details"],
    };

    const calculated = questions.reduce((acc, item, index) => {
      const question = item.question;

      const userAnswer = answers[question.id];

      const correct =
        userAnswer !== undefined && userAnswer === question.correctAnswer;

      const nextDetail = {
        index,
        question,
        userAnswer,
        correct,
      };

      if (userAnswer === undefined) {
        return {
          ...acc,
          unanswered: acc.unanswered + 1,
          details: [...acc.details, nextDetail],
        };
      }

      if (correct) {
        return {
          ...acc,
          correctCount: acc.correctCount + 1,
          details: [...acc.details, nextDetail],
        };
      }

      return {
        ...acc,
        incorrectCount: acc.incorrectCount + 1,
        details: [...acc.details, nextDetail],
      };
    }, initialResult);

    const percentage =
      questions.length > 0
        ? (calculated.correctCount / questions.length) * 100
        : 0;

    return {
      ...calculated,
      percentage,
    };
  }, [answers, questions]);

  function selectAnswer(answerId: number) {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answerId,
    }));

    if (mode === "practice") {
      setCheckedQuestions((prev) => ({
        ...prev,
        [currentQuestion.id]: false,
      }));
    }
  }

  function checkCurrentAnswer() {
    if (selectedAnswer === undefined) {
      return;
    }

    setCheckedQuestions((prev) => ({
      ...prev,
      [currentQuestion.id]: true,
    }));
  }

  function jumpToQuestion(index: number) {
    setCurrentIndex(index);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function goNext() {
    if (currentIndex < questions.length - 1) {
      jumpToQuestion(currentIndex + 1);
    }
  }

  function goPrevious() {
    if (currentIndex > 0) {
      jumpToQuestion(currentIndex - 1);
    }
  }

  function submitExam() {
    const message =
      unansweredCount > 0
        ? `未回答が${unansweredCount}問あります。\nこのまま試験を終了して採点しますか？`
        : "試験を終了して採点しますか？";

    if (!window.confirm(message)) {
      return;
    }

    setSubmitted(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function reviewQuestion(index: number) {
    setCurrentIndex(index);

    setSubmitted(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function startNewExam() {
    const confirmed = window.confirm(
      "現在の回答をすべて削除して、最初からやり直しますか？",
    );

    if (!confirmed) {
      return;
    }

    setCurrentIndex(0);

    setAnswers({});

    setCheckedQuestions({});

    setSubmitted(false);

    setRemainingSeconds(durationMinutes * 60);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // function restartExam() {
  //   const confirmed = window.confirm(
  //     "現在の回答をすべて削除して、最初からやり直しますか？",
  //   );

  //   if (!confirmed) {
  //     return;
  //   }

  //   setCurrentIndex(0);
  //   setAnswers({});
  //   setCheckedQuestions({});
  //   setSubmitted(false);

  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  // }

  if (submitted) {
    return (
      <ExamResult
        result={result}
        questions={questions}
        remainingSeconds={remainingSeconds}
        onReviewQuestion={reviewQuestion}
        onRestart={startNewExam}
      />
    );
  }

  return (
    <div className="space-y-5">
      <ExamModeSwitch mode={mode} onChange={setMode} />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-primary">
                問題
                {currentQuestion.mondai}
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                問題 {currentQuestion.id} / {questions.length}
              </p>
            </div>

            <ExamTimer remainingSeconds={remainingSeconds} />
          </div>

          <QuestionRenderer
            item={currentItem}
            mode={mode}
            selectedAnswer={selectedAnswer}
            isChecked={isChecked}
            onSelect={selectAnswer}
            onCheck={checkCurrentAnswer}
          />

          <div className="mt-6 flex items-center justify-between">
            <button
              type="button"
              onClick={goPrevious}
              disabled={currentIndex === 0}
              className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowLeft className="size-4" />
              前へ
            </button>

            <button
              type="button"
              onClick={
                currentIndex === questions.length - 1 ? submitExam : goNext
              }
              className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              {currentIndex === questions.length - 1 ? "採点する" : "次へ"}

              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>

        <QuestionNavigator
          questions={questions}
          answers={answers}
          currentIndex={currentIndex}
          onJump={jumpToQuestion}
          onSubmit={submitExam}
        />
      </div>
    </div>
  );
}
