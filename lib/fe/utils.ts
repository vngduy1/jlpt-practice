import { feCategoryIndex, feTheoryCategories } from "@/lib/fe/registry";

import type {
  FeCategory,
  FeCategoryIndex,
  FeCategorySummary,
  FeChapter,
  FeLesson,
} from "@/types/fe";

const categoryById = new Map(
  feTheoryCategories.map((category) => [category.id, category]),
);

export function getFeCategoryIndex(): FeCategoryIndex {
  return feCategoryIndex;
}

export function listFeCategorySummaries(): FeCategorySummary[] {
  return [...feCategoryIndex.categories]
    .sort((a, b) => a.order - b.order)
    .map((reference) => {
      const category = categoryById.get(reference.id);

      return {
        ...reference,
        chapterCount: category?.chapters.length ?? 0,
        lessonCount:
          category?.chapters.reduce(
            (count, chapter) => count + chapter.lessons.length,
            0,
          ) ?? 0,
      };
    });
}

export function getFeCategory(categoryId: string): FeCategory | undefined {
  return categoryById.get(categoryId);
}

export interface FeChapterRecord {
  category: FeCategory;
  chapter: FeChapter;
}

export function getFeChapter(
  categoryId: string,
  chapterId: string,
): FeChapterRecord | undefined {
  const category = getFeCategory(categoryId);

  if (!category) {
    return undefined;
  }

  const chapter = category.chapters.find((item) => item.id === chapterId);

  if (!chapter) {
    return undefined;
  }

  return {
    category,
    chapter,
  };
}

export interface FeLessonRecord {
  category: FeCategory;
  chapter: FeChapter;
  lesson: FeLesson;
}

export function getFeLesson(lessonId: string): FeLessonRecord | undefined {
  for (const category of feTheoryCategories) {
    for (const chapter of category.chapters) {
      const lesson = chapter.lessons.find((item) => item.id === lessonId);

      if (lesson) {
        return {
          category,
          chapter,
          lesson,
        };
      }
    }
  }

  return undefined;
}
