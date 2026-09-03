"use client";

import { useState } from "react";

import {
  ExamSectionSwitch,
  type PracticeSection,
} from "@/components/home/exam-section-switch";
import { ExamLibrary } from "@/components/home/exam-library";
import { HeroSection } from "@/components/home/hero-section";
import { HomeFooter } from "@/components/home/home-footer";
import { ListeningLibrary } from "@/components/home/listening-library";
import { SiteHeader } from "@/components/site/site-header";

import type { ExamSummary, JlptLevel } from "@/types/exam";
import type { ListeningExamSummary } from "@/types/listening-exam";

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

  const isLanguageSection = selectedSection === "language";

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader
        section="jlpt"
        selectedLevel={selectedLevel}
        onLevelChange={setSelectedLevel}
      />

      <HeroSection />

      <ExamSectionSwitch
        value={selectedSection}
        onChange={setSelectedSection}
      />

      {isLanguageSection ? (
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

      <HomeFooter />
    </main>
  );
}
