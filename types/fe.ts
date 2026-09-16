export type FeImportance = "high" | "medium" | "low";

export type FeCategoryIcon =
  | "binary"
  | "algorithm"
  | "computer"
  | "system"
  | "software"
  | "hardware"
  | "ui"
  | "media"
  | "database"
  | "network"
  | "security"
  | "code"
  | "git-branch"
  | "clipboard-list"
  | "settings"
  | "search-check"
  | "route"
  | "notebook-tabs"
  | "chart-no-axes-combined"
  | "lightbulb"
  | "factory"
  | "building-2"
  | "scale";

export interface FeCategoryReference {
  id: string;
  order: number;
  titleJa: string;
  titleVi: string;
  icon?: FeCategoryIcon;

  /**
   * Category 内の lesson 総数。
   * categories.json から取得し、
   * lesson 数を求めるために全 chapter を読み込まない。
   */
  count?: number;

  /**
   * Category manifest への相対パス。
   * 例: 11-security/index.json
   */
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
 * Category の index.json に保存する chapter metadata。
 *
 * Chapter 一覧を表示するだけなら実際の chapter JSON を
 * 読み込む必要はない。
 */
export interface FeChapterReference {
  id: string;
  order: number;
  titleJa: string;
  titleVi: string;

  /**
   * Chapter 内の lesson 数。
   */
  count?: number;

  /**
   * Chapter JSON ファイル名。
   * 例: 02-information-security-management.json
   */
  file: string;
}

/**
 * Category manifest。
 *
 * 例:
 * data/fe/theory/11-security/index.json
 */
export interface FeCategoryManifest {
  id: string;
  order: number;
  titleJa: string;
  titleVi: string;
  chapters: FeChapterReference[];
}

/**
 * 実際の chapter JSON。
 *
 * この型は lesson 本文を必要とするときだけ使用する。
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
 * manifest + 全 chapter JSON を結合した従来形式。
 *
 * 移行中の既存コードとの互換性のため残す。
 * 新しい一覧画面では可能な限り使用しない。
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
