"use client";

import { useState } from "react";

import { ExamLibrary } from "@/components/home/exam-library";
import { HeroSection } from "@/components/home/hero-section";
import { HomeHeader } from "@/components/home/home-header";

import type { ExamSummary, JlptLevel } from "@/types/exam";

interface HomePageProps {
  officialExams: ExamSummary[];
  originalExams: ExamSummary[];
}

export function HomePage({ officialExams, originalExams }: HomePageProps) {
  const [selectedLevel, setSelectedLevel] = useState<JlptLevel>("N1");

  return (
    <main className="min-h-screen bg-background text-foreground">
      <HomeHeader
        selectedLevel={selectedLevel}
        onLevelChange={setSelectedLevel}
      />

      <HeroSection />

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

      <footer className="mt-8 border-t border-border/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-7 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>JLPT Practice</p>
          <p>日本語能力試験の学習をサポートします。</p>
        </div>
      </footer>
    </main>
  );
}
