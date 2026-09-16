import { feCategoryIndex } from "@/lib/fe/registry";
import { loadFeCategoryManifest, loadFeChapter } from "@/lib/fe/loaders";

import type {
  FeCategoryIndex,
  FeCategoryManifest,
  FeCategorySummary,
  FeChapter,
  FeLesson,
} from "@/types/fe";

/**
 * FE 全体のカテゴリー index を取得する。
 *
 * categories.json の metadata のみを使用する。
 */
export function getFeCategoryIndex(): FeCategoryIndex {
  return feCategoryIndex;
}

/**
 * FE カテゴリー一覧を取得する。
 *
 * Chapter JSON は読み込まない。
 */
export function listFeCategorySummaries(): FeCategorySummary[] {
  return [...feCategoryIndex.categories]
    .sort((a, b) => a.order - b.order)
    .map((reference) => ({
      ...reference,
      lessonCount: reference.count ?? 0,
    }));
}

/**
 * Category manifest を取得する。
 *
 * 例:
 * security
 * → 11-security/index.json のみロード
 */
export async function getFeCategory(
  categoryId: string,
): Promise<FeCategoryManifest | undefined> {
  return loadFeCategoryManifest(categoryId);
}

export interface FeChapterRecord {
  category: FeCategoryManifest;
  chapter: FeChapter;
}

/**
 * 指定された chapter だけをロードする。
 *
 * 例:
 * security / information-security-management
 * → 02-information-security-management.json のみロード
 */
export async function getFeChapter(
  categoryId: string,
  chapterId: string,
): Promise<FeChapterRecord | undefined> {
  const [category, chapter] = await Promise.all([
    loadFeCategoryManifest(categoryId),
    loadFeChapter(categoryId, chapterId),
  ]);

  if (!category || !chapter) {
    return undefined;
  }

  return {
    category,
    chapter,
  };
}

export interface FeLessonRecord {
  category: FeCategoryManifest;
  chapter: FeChapter;
  lesson: FeLesson;
}

/**
 * Category / Chapter / Lesson が分かっている場合のみ、
 * 対象 chapter 内から lesson を取得する。
 *
 * FE 全体を検索しない。
 */
export async function getFeLesson(
  categoryId: string,
  chapterId: string,
  lessonId: string,
): Promise<FeLessonRecord | undefined> {
  const record = await getFeChapter(categoryId, chapterId);

  if (!record) {
    return undefined;
  }

  const lesson = record.chapter.lessons.find((item) => item.id === lessonId);

  if (!lesson) {
    return undefined;
  }

  return {
    ...record,
    lesson,
  };
}

export interface FeLessonNavigationRecord {
  previous?: FeLesson;
  next?: FeLesson;
}

/**
 * 現在の chapter 内で前後の lesson を取得する。
 *
 * FE 全体の lesson 配列は作成しない。
 */
export function getFeLessonNavigation(
  chapter: FeChapter,
  lessonId: string,
): FeLessonNavigationRecord {
  const lessons = [...chapter.lessons].sort((a, b) => a.order - b.order);

  const currentIndex = lessons.findIndex((lesson) => lesson.id === lessonId);

  if (currentIndex === -1) {
    return {};
  }

  return {
    previous: currentIndex > 0 ? lessons[currentIndex - 1] : undefined,

    next:
      currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : undefined,
  };
}
