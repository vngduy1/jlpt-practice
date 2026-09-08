import categoryIndexJson from "@/data/fe/categories.json";

// 01
import basicTheoryIndexJson from "@/data/fe/theory/01-basic-theory/index.json";
import discreteMathematicsJson from "@/data/fe/theory/01-basic-theory/01-discrete-mathematics.json";
import appliedMathematicsJson from "@/data/fe/theory/01-basic-theory/02-applied-mathematics.json";
import informationTheory from "@/data/fe/theory/01-basic-theory/03-information-theory.json";
import communicationTheory from "@/data/fe/theory/01-basic-theory/04-communication-theory.json";
import measurementAndControlTheory from "@/data/fe/theory/01-basic-theory/05-measurement-and-control-theory.json";

// 02
import algorithmProgramIndexJson from "@/data/fe/theory/02-algorithm-program/index.json";
import dataStructuresJson from "@/data/fe/theory/02-algorithm-program/01-data-structures.json";
import algorithmsJson from "@/data/fe/theory/02-algorithm-program/02-algorithms.json";
import programmingJson from "@/data/fe/theory/02-algorithm-program/03-programming.json";
import programmingLanguages from "@/data/fe/theory/02-algorithm-program/04-programming-languages.json";
import otherLanguages from "@/data/fe/theory/02-algorithm-program/05-other-languages.json";


// 03
import computerComponentsIndexJson from "@/data/fe/theory/03-computer-components/index.json";
import processorJson from "@/data/fe/theory/03-computer-components/01-processor.json";
import memoryJson from "@/data/fe/theory/03-computer-components/02-memory.json";
import busJson from "@/data/fe/theory/03-computer-components/03-bus.json";
import inputOutputDevicesJson from "@/data/fe/theory/03-computer-components/04-input-output-devices.json";
import inputOutputEquipmentJson from "@/data/fe/theory/03-computer-components/05-input-output-equipment.json";


// 04
import systemComponentsIndexJson from "@/data/fe/theory/04-system-components/index.json";
import systemConfigurationJson from "@/data/fe/theory/04-system-components/01-system-configuration.json";
import systemEvaluationMetricsJson from "@/data/fe/theory/04-system-components/02-system-evaluation-metrics.json";

// 05 ソフトウェア
import softwareIndexJson from "@/data/fe/theory/05-software/index.json";
import operatingSystemsJson from "@/data/fe/theory/05-software/01-operating-systems.json";
import middlewareJson from "@/data/fe/theory/05-software/02-middleware.json";
import fileSystemJson from "@/data/fe/theory/05-software/03-file-system.json";
import developmentToolsJson from "@/data/fe/theory/05-software/04-development-tools.json";
import openSourceSoftwareJson from "@/data/fe/theory/05-software/05-open-source-software.json";

// 06
import hardwareIndexJson from "@/data/fe/theory/06-hardware/index.json";
import hardwareJson from "@/data/fe/theory/06-hardware/01-hardware.json";

// 07
import userInterfaceIndexJson from "@/data/fe/theory/07-user-interface/index.json";
import userInterfaceTechnologyJson from "@/data/fe/theory/07-user-interface/01-user-interface-technology.json";
import uxUiDesignJson from "@/data/fe/theory/07-user-interface/02-ux-ui-design.json";

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

const systemComponentsManifest =
  systemComponentsIndexJson as FeCategoryManifest;

const systemComponentsCategory: FeCategory = {
  id: systemComponentsManifest.id,
  order: systemComponentsManifest.order,
  titleJa: systemComponentsManifest.titleJa,
  titleVi: systemComponentsManifest.titleVi,
  chapters: [
    systemConfigurationJson as FeChapter,
    systemEvaluationMetricsJson as FeChapter,
  ],
};

// 05 ソフトウェア
const softwareManifest = softwareIndexJson as FeCategoryManifest;

const softwareCategory: FeCategory = {
  id: softwareManifest.id,
  order: softwareManifest.order,
  titleJa: softwareManifest.titleJa,
  titleVi: softwareManifest.titleVi,
  chapters: [
    operatingSystemsJson as FeChapter,
    middlewareJson as FeChapter,
    fileSystemJson as FeChapter,
    developmentToolsJson as FeChapter,
    openSourceSoftwareJson as FeChapter,
  ],
};

// 06
const hardwareManifest = hardwareIndexJson as FeCategoryManifest;

const hardwareCategory: FeCategory = {
  id: hardwareManifest.id,
  order: hardwareManifest.order,
  titleJa: hardwareManifest.titleJa,
  titleVi: hardwareManifest.titleVi,
  chapters: [
    hardwareJson as FeChapter,
  ],
};

// 07
const userInterfaceManifest =
  userInterfaceIndexJson as FeCategoryManifest;

const userInterfaceCategory: FeCategory = {
  id: userInterfaceManifest.id,
  order: userInterfaceManifest.order,
  titleJa: userInterfaceManifest.titleJa,
  titleVi: userInterfaceManifest.titleVi,
  chapters: [
    userInterfaceTechnologyJson as FeChapter,
    uxUiDesignJson as FeChapter,
  ],
};

export const feTheoryCategories: FeCategory[] = [
  basicTheoryCategory,
  algorithmProgramCategory,
  computerComponentsCategory,
  systemComponentsCategory,
  softwareCategory,
  hardwareCategory,
  userInterfaceCategory
];
