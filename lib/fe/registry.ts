import categoryIndexJson from "@/data/fe/categories.json";

import basicTheoryIndexJson from "@/data/fe/theory/01-basic-theory/index.json";
import discreteMathematicsJson from "@/data/fe/theory/01-basic-theory/01-discrete-mathematics.json";
import appliedMathematics from "@/data/fe/theory/01-basic-theory/02-applied-mathematics.json";
import informationTheory from "@/data/fe/theory/01-basic-theory/03-information-theory.json";

import type {
  FeCategory,
  FeCategoryIndex,
  FeCategoryManifest,
  FeChapter,
} from "@/types/fe";

export const feCategoryIndex = categoryIndexJson as FeCategoryIndex;

const basicTheoryManifest = basicTheoryIndexJson as FeCategoryManifest;

const basicTheoryCategory: FeCategory = {
  id: basicTheoryManifest.id,
  order: basicTheoryManifest.order,
  titleJa: basicTheoryManifest.titleJa,
  titleVi: basicTheoryManifest.titleVi,
  chapters: [
    discreteMathematicsJson as FeChapter,
    appliedMathematics as FeChapter,
    informationTheory as FeChapter,
  ],
};

export const feTheoryCategories: FeCategory[] = [basicTheoryCategory];
