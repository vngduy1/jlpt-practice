"use client";

import { ExamModeSwitch } from "@/components/exams/exam-mode-switch";
import { ListeningResult } from "@/components/listening/listening-result";
import { ListeningInstructionAudio } from "@/components/listening/listening-instruction-audio";
import { ListeningQuestionControls } from "@/components/listening/listening-question-controls";
import { ListeningQuestionNavigator } from "@/components/listening/listening-question-navigator";
import { ListeningQuestionRenderer } from "@/components/listening/listening-question-renderer";

import { useListeningExamRunner } from "@/hooks/use-listening-exam-runner";

import type { ListeningSection } from "@/types/listening-exam";

interface ListeningExamRunnerProps {
  sections: ListeningSection[];
}

export function ListeningExamRunner({ sections }: ListeningExamRunnerProps) {
  const runner = useListeningExamRunner(sections);

  if (!runner.currentItem) {
    return (
      <div className="rounded-xl border border-dashed border-border px-6 py-16 text-center">
        <p className="font-semibold">聴解問題データを準備中です。</p>
      </div>
    );
  }

  if (runner.submitted) {
    return (
      <ListeningResult
        correctCount={runner.result.correctCount}
        incorrectCount={runner.result.incorrectCount}
        unansweredCount={runner.result.unansweredCount}
        percentage={runner.result.percentage}
        onReview={runner.returnToQuestions}
        onRestart={runner.restartExam}
      />
    );
  }

  const { currentQuestion, currentSection } = runner;

  if (!currentQuestion || !currentSection) {
    return null;
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <ExamModeSwitch mode={runner.mode} onChange={runner.setMode} />

        <p className="text-xs text-muted-foreground">
          {runner.mode === "exam"
            ? "採点するまで正解は表示されません。"
            : "回答後に正解を確認できます。"}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div>
          <div className="mb-5 rounded-xl border border-border bg-card px-5 py-4">
            <p className="text-sm font-semibold text-primary">
              {currentSection.title}
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              問題 {runner.currentIndex + 1} / {runner.items.length}
            </p>
          </div>

          {runner.isFirstQuestionOfSection &&
            currentSection.instructionAudioUrl && (
              <ListeningInstructionAudio
                audioUrl={currentSection.instructionAudioUrl}
              />
            )}

          <ListeningQuestionRenderer
            question={currentQuestion}
            mode={runner.mode}
            selectedAnswer={runner.selectedAnswer}
            isChecked={runner.isChecked}
            onSelect={runner.selectAnswer}
            onCheck={runner.checkCurrentAnswer}
          />

          <ListeningQuestionControls
            currentIndex={runner.currentIndex}
            questionCount={runner.items.length}
            onPrevious={runner.goPrevious}
            onNext={runner.goNext}
          />
        </div>

        <ListeningQuestionNavigator
          questions={runner.questions}
          answers={runner.answers}
          currentIndex={runner.currentIndex}
          onJump={runner.jumpToQuestion}
          onSubmit={runner.submitExam}
        />
      </div>
    </div>
  );
}
