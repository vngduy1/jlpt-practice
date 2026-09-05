import categoryIndexJson from "@/data/fe/categories.json";

import basicTheoryIndexJson from "@/data/fe/theory/01-basic-theory/index.json";
import discreteMathematicsJson from "@/data/fe/theory/01-basic-theory/01-discrete-mathematics.json";
import appliedMathematicsJson from "@/data/fe/theory/01-basic-theory/02-applied-mathematics.json";
import informationTheory from "@/data/fe/theory/01-basic-theory/03-information-theory.json";
import communicationTheory from "@/data/fe/theory/01-basic-theory/04-communication-theory.json";
import measurementAndControlTheory from "@/data/fe/theory/01-basic-theory/05-measurement-and-control-theory.json";

import algorithmProgramIndexJson from "@/data/fe/theory/02-algorithm-program/index.json";
import dataStructuresJson from "@/data/fe/theory/02-algorithm-program/01-data-structures.json";
import algorithmsJson from "@/data/fe/theory/02-algorithm-program/02-algorithms.json";
import programmingJson from "@/data/fe/theory/02-algorithm-program/03-programming.json";
import programmingLanguages from "@/data/fe/theory/02-algorithm-program/04-programming-languages.json";
import otherLanguages from "@/data/fe/theory/02-algorithm-program/05-other-languages.json";

import computerComponentsIndexJson from "@/data/fe/theory/03-computer-components/index.json";
import processorJson from "@/data/fe/theory/03-computer-components/01-processor.json";
import memoryJson from "@/data/fe/theory/03-computer-components/02-memory.json";
import busJson from "@/data/fe/theory/03-computer-components/03-bus.json";
import inputOutputDevicesJson from "@/data/fe/theory/03-computer-components/04-input-output-devices.json";
import inputOutputEquipmentJson from "@/data/fe/theory/03-computer-components/05-input-output-equipment.json";

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
    appliedMathematicsJson as FeChapter,
    informationTheory as FeChapter,
    communicationTheory as FeChapter,
    measurementAndControlTheory as FeChapter,
  ],
};

const algorithmProgramManifest =
  algorithmProgramIndexJson as FeCategoryManifest;

const algorithmProgramCategory: FeCategory = {
  id: algorithmProgramManifest.id,
  order: algorithmProgramManifest.order,
  titleJa: algorithmProgramManifest.titleJa,
  titleVi: algorithmProgramManifest.titleVi,
  chapters: [
    dataStructuresJson as FeChapter,
    algorithmsJson as FeChapter,
    programmingJson as FeChapter,
    programmingLanguages as FeChapter,
    otherLanguages as FeChapter,
  ],
};

const computerComponentsManifest = computerComponentsIndexJson as FeCategoryManifest;

const computerComponentsCategory: FeCategory = {
  id: computerComponentsManifest.id,
  order: computerComponentsManifest.order,
  titleJa: computerComponentsManifest.titleJa,
  titleVi: computerComponentsManifest.titleVi,
  chapters: [
    processorJson as FeChapter,
    memoryJson as FeChapter,
    busJson as FeChapter,
    inputOutputDevicesJson as FeChapter,
    inputOutputEquipmentJson as FeChapter,
  ],
};

export const feTheoryCategories: FeCategory[] = [
  basicTheoryCategory,
  algorithmProgramCategory,
  computerComponentsCategory,
];
