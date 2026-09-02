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

/**
 * index.json 内の chapter 参照情報
 */
export interface FeChapterReference {
  id: string;
  order: number;
  titleJa: string;
  titleVi: string;
  file: string;
}

/**
 * 例:
 * data/fe/theory/01-basic-theory/index.json
 */
export interface FeCategoryManifest {
  id: string;
  order: number;
  titleJa: string;
  titleVi: string;
  chapters: FeChapterReference[];
}

/**
 * 実際の chapter JSON
 * 例:
 * 01-discrete-mathematics.json
 */
export interface FeChapter {
  id: string;
  order: number;
  titleJa: string;
  titleVi: string;
  syllabus?: string;
  lessons: FeLesson[];
}

/**
 * registry.ts で manifest + chapter JSON を結合した後の形
 */
export interface FeCategory {
  id: string;
  order: number;
  titleJa: string;
  titleVi: string;
  chapters: FeChapter[];
}

export interface FeCategorySummary extends FeCategoryReference {
  chapterCount?: number;
  lessonCount?: number;
}

export type FeLanguageMode = "ja" | "bilingual" | "vi";
