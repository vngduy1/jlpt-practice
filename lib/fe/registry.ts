import categoryIndexJson from "@/data/fe/categories.json";
import algorithmJson from "@/data/fe/theory/02-algorithm.json";
import basicTheoryJson from "@/data/fe/theory/01-basic-theory.json";
import databaseJson from "@/data/fe/theory/05-database.json";

import type {
  FeCategory,
  FeCategoryIndex,
  FeCategorySummary,
  FeChapter,
  FeLesson,
} from "@/types/fe";

const categoryIndex = categoryIndexJson as FeCategoryIndex;
const theoryCategories = [
  basicTheoryJson as FeCategory,
  algorithmJson as FeCategory,
  databaseJson as FeCategory,
];

const categoryById = new Map(
  theoryCategories.map((category) => [category.id, category]),
);

export function getFeCategoryIndex(): FeCategoryIndex {
  return categoryIndex;
}

export function listFeCategorySummaries(): FeCategorySummary[] {
  return [...categoryIndex.categories]
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

export interface FeLessonRecord {
  category: FeCategory;
  chapter: FeChapter;
  lesson: FeLesson;
}

export function getFeLesson(lessonId: string): FeLessonRecord | undefined {
  for (const category of theoryCategories) {
    for (const chapter of category.chapters) {
      const lesson = chapter.lessons.find((item) => item.id === lessonId);

      if (lesson) return { category, chapter, lesson };
    }
  }

  return undefined;
}
