export type FeImportance = "high" | "medium" | "low";

export type FeCategoryIcon = "binary" | "workflow" | "database";

export interface FeCategoryReference {
  id: string;
  order: number;
  titleJa: string;
  titleVi: string;
  icon?: FeCategoryIcon;
  file: string;
}

export interface FeCategoryIndex {
  exam: "FE";
  titleJa: string;
  titleVi: string;
  categories: FeCategoryReference[];
}

export type FeContentBlockType =
  | "paragraph"
  | "heading"
  | "point"
  | "example"
  | "warning";

export interface FeContentBlock {
  type: FeContentBlockType;
  ja: string;
  vi: string;
}

export interface FeTerm {
  term: string;
  reading: string;
  english: string;
  vi: string;
  definitionJa: string;
  definitionVi: string;
}

export interface FeLesson {
  id: string;
  order: number;
  titleJa: string;
  titleVi: string;
  importance: FeImportance;
  summaryJa: string;
  summaryVi: string;
  content: FeContentBlock[];
  terms: FeTerm[];
  tags: string[];
}

export interface FeChapter {
  id: string;
  order: number;
  titleJa: string;
  titleVi: string;
  lessons: FeLesson[];
}

export interface FeCategory {
  id: string;
  titleJa: string;
  titleVi: string;
  chapters: FeChapter[];
}

export interface FeCategorySummary extends FeCategoryReference {
  chapterCount?: number;
  lessonCount?: number;
}

export type FeLanguageMode = "ja" | "bilingual" | "vi";
