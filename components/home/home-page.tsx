"use client";

import { useState } from "react";

import {
  ExamSectionSwitch,
  type PracticeSection,
} from "@/components/home/exam-section-switch";
import { ExamLibrary } from "@/components/home/exam-library";
import { HeroSection } from "@/components/home/hero-section";
import { HomeHeader } from "@/components/home/home-header";
import { ListeningLibrary } from "@/components/home/listening-library";
import type { ListeningExamSummary } from "@/types/listening-exam";

import type { ExamSummary, JlptLevel } from "@/types/exam";

interface HomePageProps {
  officialExams: ExamSummary[];
  originalExams: ExamSummary[];
  listeningExams: ListeningExamSummary[];
}

export function HomePage({
  officialExams,
  originalExams,
  listeningExams,
}: HomePageProps) {
  const [selectedLevel, setSelectedLevel] = useState<JlptLevel>("N1");

  const [selectedSection, setSelectedSection] =
    useState<PracticeSection>("language");

  return (
    <main className="min-h-screen bg-background text-foreground">
      <HomeHeader
        selectedLevel={selectedLevel}
        onLevelChange={setSelectedLevel}
      />

      <HeroSection />

      <ExamSectionSwitch
        value={selectedSection}
        onChange={setSelectedSection}
      />

      {selectedSection === "language" ? (
        <>
          <ExamLibrary
            exams={officialExams}
            selectedLevel={selectedLevel}
            variant="official"
          />

          <div className="border-t border-border/70">
            <ExamLibrary
              exams={originalExams}
              selectedLevel={selectedLevel}
              variant="original"
            />
          </div>
        </>
      ) : (
        <ListeningLibrary
          exams={listeningExams}
          selectedLevel={selectedLevel}
        />
      )}

      <footer className="mt-8 border-t border-border/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-7 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>JLPT Practice</p>
          <p>日本語能力試験の学習をサポートします。</p>
        </div>
      </footer>
    </main>
  );
}
