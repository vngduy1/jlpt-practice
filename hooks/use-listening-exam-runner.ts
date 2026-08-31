"use client";

import { useMemo, useState } from "react";

import type { ExamMode } from "@/types/exam-runner";
import type {
  ListeningQuestion,
  ListeningSection,
} from "@/types/listening-exam";

export interface ListeningRunnerItem {
  question: ListeningQuestion;
  section: ListeningSection;
}

export function useListeningExamRunner(sections: ListeningSection[]) {
  const items = useMemo<ListeningRunnerItem[]>(
    () =>
      sections.flatMap((section) =>
        section.questions.map((question) => ({
          question,
          section,
        })),
      ),
    [sections],
  );

  const questions = useMemo(() => items.map((item) => item.question), [items]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const [answers, setAnswers] = useState<Record<number, number>>({});

  const [mode, setMode] = useState<ExamMode>("exam");

  const [checkedQuestions, setCheckedQuestions] = useState<
    Record<number, boolean>
  >({});

  const [submitted, setSubmitted] = useState(false);

  const currentItem = items[currentIndex];

  const currentQuestion = currentItem?.question;

  const currentSection = currentItem?.section;

  const selectedAnswer = currentQuestion
    ? answers[currentQuestion.id]
    : undefined;

  const isChecked = currentQuestion
    ? checkedQuestions[currentQuestion.id] === true
    : false;

  const answeredCount = questions.filter(
    (question) => answers[question.id] !== undefined,
  ).length;

  const unansweredCount = questions.length - answeredCount;

  /*
   * 採点結果
   */
  const result = useMemo(() => {
    let correctCount = 0;
    let incorrectCount = 0;

    for (const question of questions) {
      const answer = answers[question.id];

      if (answer === undefined) {
        continue;
      }

      if (answer === question.correctAnswer) {
        correctCount += 1;
      } else {
        incorrectCount += 1;
      }
    }

    const percentage =
      questions.length > 0 ? (correctCount / questions.length) * 100 : 0;

    return {
      correctCount,
      incorrectCount,
      unansweredCount,
      percentage,
    };
  }, [answers, questions, unansweredCount]);

  /*
   * 現在の問題が各問題区分の最初かどうか
   */
  const previousItem = currentIndex > 0 ? items[currentIndex - 1] : undefined;

  const isFirstQuestionOfSection =
    !!currentItem &&
    (!previousItem || previousItem.section.id !== currentItem.section.id);

  /*
   * 回答を選択
   */
  function selectAnswer(answerId: number) {
    if (!currentQuestion) {
      return;
    }

    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answerId,
    }));

    /*
     * 練習モードで回答を変更した場合は、
     * 再度答えを確認できるようにする。
     */
    if (mode === "practice") {
      setCheckedQuestions((prev) => ({
        ...prev,
        [currentQuestion.id]: false,
      }));
    }
  }

  /*
   * 練習モードで答えを確認
   */
  function checkCurrentAnswer() {
    if (!currentQuestion || selectedAnswer === undefined) {
      return;
    }

    setCheckedQuestions((prev) => ({
      ...prev,
      [currentQuestion.id]: true,
    }));
  }

  /*
   * 指定した問題へ移動
   */
  function jumpToQuestion(index: number) {
    if (index < 0 || index >= items.length) {
      return;
    }

    setCurrentIndex(index);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  /*
   * 前の問題
   */
  function goPrevious() {
    if (currentIndex > 0) {
      jumpToQuestion(currentIndex - 1);
    }
  }

  /*
   * 次の問題
   */
  function goNext() {
    if (currentIndex < items.length - 1) {
      jumpToQuestion(currentIndex + 1);
    }
  }

  /*
   * 試験終了・採点
   */
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

  /*
   * 採点結果から問題画面へ戻る
   *
   * 回答内容は残す。
   */
  function returnToQuestions() {
    setSubmitted(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  /*
   * 最初からやり直す
   *
   * 全ての回答・確認状態を削除し、
   * 1問目から開始する。
   */
  function restartExam() {
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

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return {
    items,
    questions,

    currentIndex,
    currentItem,
    currentQuestion,
    currentSection,

    answers,

    mode,
    setMode,

    selectedAnswer,
    isChecked,
    isFirstQuestionOfSection,

    answeredCount,
    unansweredCount,

    submitted,
    result,

    selectAnswer,
    checkCurrentAnswer,

    jumpToQuestion,
    goPrevious,
    goNext,

    submitExam,
    returnToQuestions,
    restartExam,
  };
}
