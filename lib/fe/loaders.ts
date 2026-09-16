import type {
  FeCategoryManifest,
  FeChapter,
  FeChapterReference,
} from "@/types/fe";

/**
 * Category manifest loaders
 *
 * Chỉ load index.json của category được yêu cầu.
 */
const categoryManifestLoaders: Record<
  string,
  () => Promise<FeCategoryManifest>
> = {
  "basic-theory": async () =>
    (await import("@/data/fe/theory/01-basic-theory/index.json"))
      .default as FeCategoryManifest,

  "algorithms-and-programming": async () =>
    (await import("@/data/fe/theory/02-algorithm-program/index.json"))
      .default as FeCategoryManifest,

  "computer-components": async () =>
    (await import("@/data/fe/theory/03-computer-components/index.json"))
      .default as FeCategoryManifest,

  "system-components": async () =>
    (await import("@/data/fe/theory/04-system-components/index.json"))
      .default as FeCategoryManifest,

  software: async () =>
    (await import("@/data/fe/theory/05-software/index.json"))
      .default as FeCategoryManifest,

  hardware: async () =>
    (await import("@/data/fe/theory/06-hardware/index.json"))
      .default as FeCategoryManifest,

  "user-interface": async () =>
    (await import("@/data/fe/theory/07-user-interface/index.json"))
      .default as FeCategoryManifest,

  "information-media": async () =>
    (await import("@/data/fe/theory/08-information-media/index.json"))
      .default as FeCategoryManifest,

  database: async () =>
    (await import("@/data/fe/theory/09-database/index.json"))
      .default as FeCategoryManifest,

  network: async () =>
    (await import("@/data/fe/theory/10-network/index.json"))
      .default as FeCategoryManifest,

  security: async () =>
    (await import("@/data/fe/theory/11-security/index.json"))
      .default as FeCategoryManifest,

  "system-development-technology": async () =>
    (
      await import("@/data/fe/theory/12-system-development-technology/index.json")
    ).default as FeCategoryManifest,

  "software-development-management-technology": async () =>
    (
      await import("@/data/fe/theory/13-software-development-management-technology/index.json")
    ).default as FeCategoryManifest,

  "project-management": async () =>
    (await import("@/data/fe/theory/14-project-management/index.json"))
      .default as FeCategoryManifest,

  "service-management": async () =>
    (await import("@/data/fe/theory/15-service-management/index.json"))
      .default as FeCategoryManifest,

  "system-audit": async () =>
    (await import("@/data/fe/theory/16-system-audit/index.json"))
      .default as FeCategoryManifest,

  "system-strategy": async () =>
    (await import("@/data/fe/theory/17-system-strategy/index.json"))
      .default as FeCategoryManifest,

  "system-planning": async () =>
    (await import("@/data/fe/theory/18-system-planning/index.json"))
      .default as FeCategoryManifest,

  "business-strategy-management": async () =>
    (
      await import("@/data/fe/theory/19-business-strategy-management/index.json")
    ).default as FeCategoryManifest,

  "technology-strategy-management": async () =>
    (
      await import("@/data/fe/theory/20-technology-strategy-management/index.json")
    ).default as FeCategoryManifest,

  "business-industry": async () =>
    (await import("@/data/fe/theory/21-business-industry/index.json"))
      .default as FeCategoryManifest,

  "corporate-activities": async () =>
    (await import("@/data/fe/theory/22-corporate-activities/index.json"))
      .default as FeCategoryManifest,

  "legal-affairs": async () =>
    (await import("@/data/fe/theory/23-legal-affairs/index.json"))
      .default as FeCategoryManifest,
};

/**
 * Chapter loaders
 *
 * Quan trọng:
 * Mỗi chapter là một dynamic import riêng.
 * Vì vậy mở một chapter sẽ không cần import toàn bộ FE.
 */
const chapterLoaders: Record<string, () => Promise<FeChapter>> = {
  // 01
  "basic-theory/discrete-mathematics": async () =>
    (
      await import("@/data/fe/theory/01-basic-theory/01-discrete-mathematics.json")
    ).default as FeChapter,

  "basic-theory/applied-mathematics": async () =>
    (
      await import("@/data/fe/theory/01-basic-theory/02-applied-mathematics.json")
    ).default as FeChapter,

  "basic-theory/information-theory": async () =>
    (
      await import("@/data/fe/theory/01-basic-theory/03-information-theory.json")
    ).default as FeChapter,

  "basic-theory/communication-theory": async () =>
    (
      await import("@/data/fe/theory/01-basic-theory/04-communication-theory.json")
    ).default as FeChapter,

  "basic-theory/measurement-and-control-theory": async () =>
    (
      await import("@/data/fe/theory/01-basic-theory/05-measurement-and-control-theory.json")
    ).default as FeChapter,

  // 02
  "algorithms-and-programming/data-structures": async () =>
    (
      await import("@/data/fe/theory/02-algorithm-program/01-data-structures.json")
    ).default as FeChapter,

  "algorithms-and-programming/algorithms": async () =>
    (await import("@/data/fe/theory/02-algorithm-program/02-algorithms.json"))
      .default as FeChapter,

  "algorithms-and-programming/programming": async () =>
    (await import("@/data/fe/theory/02-algorithm-program/03-programming.json"))
      .default as FeChapter,

  "algorithms-and-programming/programming-languages": async () =>
    (
      await import("@/data/fe/theory/02-algorithm-program/04-programming-languages.json")
    ).default as FeChapter,

  "algorithms-and-programming/other-languages": async () =>
    (
      await import("@/data/fe/theory/02-algorithm-program/05-other-languages.json")
    ).default as FeChapter,

  // 03
  "computer-components/processor": async () =>
    (await import("@/data/fe/theory/03-computer-components/01-processor.json"))
      .default as FeChapter,

  "computer-components/memory": async () =>
    (await import("@/data/fe/theory/03-computer-components/02-memory.json"))
      .default as FeChapter,

  "computer-components/bus": async () =>
    (await import("@/data/fe/theory/03-computer-components/03-bus.json"))
      .default as FeChapter,

  "computer-components/input-output-devices": async () =>
    (
      await import("@/data/fe/theory/03-computer-components/04-input-output-devices.json")
    ).default as FeChapter,

  "computer-components/input-output-equipment": async () =>
    (
      await import("@/data/fe/theory/03-computer-components/05-input-output-equipment.json")
    ).default as FeChapter,

  // 04
  "system-components/system-configuration": async () =>
    (
      await import("@/data/fe/theory/04-system-components/01-system-configuration.json")
    ).default as FeChapter,

  "system-components/system-evaluation-metrics": async () =>
    (
      await import("@/data/fe/theory/04-system-components/02-system-evaluation-metrics.json")
    ).default as FeChapter,

  // 05
  "software/operating-systems": async () =>
    (await import("@/data/fe/theory/05-software/01-operating-systems.json"))
      .default as FeChapter,

  "software/middleware": async () =>
    (await import("@/data/fe/theory/05-software/02-middleware.json"))
      .default as FeChapter,

  "software/file-system": async () =>
    (await import("@/data/fe/theory/05-software/03-file-system.json"))
      .default as FeChapter,

  "software/development-tools": async () =>
    (await import("@/data/fe/theory/05-software/04-development-tools.json"))
      .default as FeChapter,

  "software/open-source-software": async () =>
    (await import("@/data/fe/theory/05-software/05-open-source-software.json"))
      .default as FeChapter,

  // 06
  "hardware/hardware": async () =>
    (await import("@/data/fe/theory/06-hardware/01-hardware.json"))
      .default as FeChapter,

  // 07
  "user-interface/user-interface-technology": async () =>
    (
      await import("@/data/fe/theory/07-user-interface/01-user-interface-technology.json")
    ).default as FeChapter,

  "user-interface/ux-ui-design": async () =>
    (await import("@/data/fe/theory/07-user-interface/02-ux-ui-design.json"))
      .default as FeChapter,

  // 08
  "information-media/multimedia-technology": async () =>
    (
      await import("@/data/fe/theory/08-information-media/01-multimedia-technology.json")
    ).default as FeChapter,

  "information-media/multimedia-applications": async () =>
    (
      await import("@/data/fe/theory/08-information-media/02-multimedia-applications.json")
    ).default as FeChapter,

  // 09
  "database/database-methods": async () =>
    (await import("@/data/fe/theory/09-database/01-database-methods.json"))
      .default as FeChapter,

  "database/database-design": async () =>
    (await import("@/data/fe/theory/09-database/02-database-design.json"))
      .default as FeChapter,

  "database/data-operations": async () =>
    (await import("@/data/fe/theory/09-database/03-data-operations.json"))
      .default as FeChapter,

  "database/transaction-processing": async () =>
    (
      await import("@/data/fe/theory/09-database/04-transaction-processing.json")
    ).default as FeChapter,

  "database/database-applications": async () =>
    (await import("@/data/fe/theory/09-database/05-database-applications.json"))
      .default as FeChapter,

  // 10
  "network/network-methods": async () =>
    (await import("@/data/fe/theory/10-network/01-network-methods.json"))
      .default as FeChapter,

  "network/data-communication-and-control": async () =>
    (
      await import("@/data/fe/theory/10-network/02-data-communication-and-control.json")
    ).default as FeChapter,

  "network/communication-protocols": async () =>
    (
      await import("@/data/fe/theory/10-network/03-communication-protocols.json")
    ).default as FeChapter,

  "network/network-management": async () =>
    (await import("@/data/fe/theory/10-network/04-network-management.json"))
      .default as FeChapter,

  "network/network-applications": async () =>
    (await import("@/data/fe/theory/10-network/05-network-applications.json"))
      .default as FeChapter,

  // 11
  "security/information-security": async () =>
    (await import("@/data/fe/theory/11-security/01-information-security.json"))
      .default as FeChapter,

  "security/information-security-management": async () =>
    (
      await import("@/data/fe/theory/11-security/02-information-security-management.json")
    ).default as FeChapter,

  "security/security-technology-evaluation": async () =>
    (
      await import("@/data/fe/theory/11-security/03-security-technology-evaluation.json")
    ).default as FeChapter,

  "security/information-security-measures": async () =>
    (
      await import("@/data/fe/theory/11-security/04-information-security-measures.json")
    ).default as FeChapter,

  "security/security-implementation-technology": async () =>
    (
      await import("@/data/fe/theory/11-security/05-security-implementation-technology.json")
    ).default as FeChapter,

  // 12
  "system-development-technology/system-software-requirements": async () =>
    (
      await import("@/data/fe/theory/12-system-development-technology/01-system-software-requirements.json")
    ).default as FeChapter,

  "system-development-technology/design": async () =>
    (
      await import("@/data/fe/theory/12-system-development-technology/02-design.json")
    ).default as FeChapter,

  "system-development-technology/implementation-build": async () =>
    (
      await import("@/data/fe/theory/12-system-development-technology/03-implementation-build.json")
    ).default as FeChapter,

  "system-development-technology/integration-testing": async () =>
    (
      await import("@/data/fe/theory/12-system-development-technology/04-integration-testing.json")
    ).default as FeChapter,

  "system-development-technology/deployment-acceptance-support": async () =>
    (
      await import("@/data/fe/theory/12-system-development-technology/05-deployment-acceptance-support.json")
    ).default as FeChapter,

  "system-development-technology/maintenance-disposal": async () =>
    (
      await import("@/data/fe/theory/12-system-development-technology/06-maintenance-disposal.json")
    ).default as FeChapter,

  // 13
  "software-development-management-technology/development-process-methods":
    async () =>
      (
        await import("@/data/fe/theory/13-software-development-management-technology/01-development-process-methods.json")
      ).default as FeChapter,

  "software-development-management-technology/intellectual-property-application-management":
    async () =>
      (
        await import("@/data/fe/theory/13-software-development-management-technology/02-intellectual-property-application-management.json")
      ).default as FeChapter,

  "software-development-management-technology/development-environment-management":
    async () =>
      (
        await import("@/data/fe/theory/13-software-development-management-technology/03-development-environment-management.json")
      ).default as FeChapter,

  "software-development-management-technology/configuration-change-management":
    async () =>
      (
        await import("@/data/fe/theory/13-software-development-management-technology/04-configuration-change-management.json")
      ).default as FeChapter,

  // 14
  "project-management/project-management": async () =>
    (
      await import("@/data/fe/theory/14-project-management/01-project-management.json")
    ).default as FeChapter,

  "project-management/project-integration": async () =>
    (
      await import("@/data/fe/theory/14-project-management/02-project-integration.json")
    ).default as FeChapter,

  "project-management/project-stakeholders": async () =>
    (
      await import("@/data/fe/theory/14-project-management/03-project-stakeholders.json")
    ).default as FeChapter,

  "project-management/project-scope": async () =>
    (
      await import("@/data/fe/theory/14-project-management/04-project-scope.json")
    ).default as FeChapter,

  "project-management/project-resources": async () =>
    (
      await import("@/data/fe/theory/14-project-management/05-project-resources.json")
    ).default as FeChapter,

  "project-management/project-time": async () =>
    (
      await import("@/data/fe/theory/14-project-management/06-project-time.json")
    ).default as FeChapter,

  "project-management/project-cost": async () =>
    (
      await import("@/data/fe/theory/14-project-management/07-project-cost.json")
    ).default as FeChapter,

  "project-management/project-risk": async () =>
    (
      await import("@/data/fe/theory/14-project-management/08-project-risk.json")
    ).default as FeChapter,

  "project-management/project-quality": async () =>
    (
      await import("@/data/fe/theory/14-project-management/09-project-quality.json")
    ).default as FeChapter,

  "project-management/project-procurement": async () =>
    (
      await import("@/data/fe/theory/14-project-management/10-project-procurement.json")
    ).default as FeChapter,

  "project-management/project-communication": async () =>
    (
      await import("@/data/fe/theory/14-project-management/11-project-communication.json")
    ).default as FeChapter,

  // 15
  "service-management/service-management": async () =>
    (
      await import("@/data/fe/theory/15-service-management/01-service-management.json")
    ).default as FeChapter,

  "service-management/service-management-system-planning-operation": async () =>
    (
      await import("@/data/fe/theory/15-service-management/02-service-management-system-planning-operation.json")
    ).default as FeChapter,

  "service-management/performance-evaluation-improvement": async () =>
    (
      await import("@/data/fe/theory/15-service-management/03-performance-evaluation-improvement.json")
    ).default as FeChapter,

  "service-management/service-operation": async () =>
    (
      await import("@/data/fe/theory/15-service-management/04-service-operation.json")
    ).default as FeChapter,

  "service-management/facility-management": async () =>
    (
      await import("@/data/fe/theory/15-service-management/05-facility-management.json")
    ).default as FeChapter,

  // 16
  "system-audit/system-audit": async () =>
    (await import("@/data/fe/theory/16-system-audit/01-system-audit.json"))
      .default as FeChapter,

  "system-audit/internal-control": async () =>
    (await import("@/data/fe/theory/16-system-audit/02-internal-control.json"))
      .default as FeChapter,

  // 17
  "system-strategy/information-system-strategy": async () =>
    (
      await import("@/data/fe/theory/17-system-strategy/01-information-system-strategy.json")
    ).default as FeChapter,

  "system-strategy/business-process": async () =>
    (
      await import("@/data/fe/theory/17-system-strategy/02-business-process.json")
    ).default as FeChapter,

  "system-strategy/solution-business": async () =>
    (
      await import("@/data/fe/theory/17-system-strategy/03-solution-business.json")
    ).default as FeChapter,

  "system-strategy/system-utilization-promotion-evaluation": async () =>
    (
      await import("@/data/fe/theory/17-system-strategy/04-system-utilization-promotion-evaluation.json")
    ).default as FeChapter,

  // 18
  "system-planning/systemization-planning": async () =>
    (
      await import("@/data/fe/theory/18-system-planning/01-systemization-planning.json")
    ).default as FeChapter,

  "system-planning/requirements-definition": async () =>
    (
      await import("@/data/fe/theory/18-system-planning/02-requirements-definition.json")
    ).default as FeChapter,

  "system-planning/procurement-planning-implementation": async () =>
    (
      await import("@/data/fe/theory/18-system-planning/03-procurement-planning-implementation.json")
    ).default as FeChapter,

  // 19
  "business-strategy-management/business-strategy-methods": async () =>
    (
      await import("@/data/fe/theory/19-business-strategy-management/01-business-strategy-methods.json")
    ).default as FeChapter,

  "business-strategy-management/marketing": async () =>
    (
      await import("@/data/fe/theory/19-business-strategy-management/02-marketing.json")
    ).default as FeChapter,

  "business-strategy-management/business-strategy-goals-evaluation": async () =>
    (
      await import("@/data/fe/theory/19-business-strategy-management/03-business-strategy-goals-evaluation.json")
    ).default as FeChapter,

  "business-strategy-management/business-management-systems": async () =>
    (
      await import("@/data/fe/theory/19-business-strategy-management/04-business-management-systems.json")
    ).default as FeChapter,

  // 20
  "technology-strategy-management/technology-development-strategy-planning":
    async () =>
      (
        await import("@/data/fe/theory/20-technology-strategy-management/01-technology-development-strategy-planning.json")
      ).default as FeChapter,

  "technology-strategy-management/technology-development-planning": async () =>
    (
      await import("@/data/fe/theory/20-technology-strategy-management/02-technology-development-planning.json")
    ).default as FeChapter,

  // 21
  "business-industry/business-systems": async () =>
    (
      await import("@/data/fe/theory/21-business-industry/01-business-systems.json")
    ).default as FeChapter,

  "business-industry/engineering-systems": async () =>
    (
      await import("@/data/fe/theory/21-business-industry/02-engineering-systems.json")
    ).default as FeChapter,

  "business-industry/e-business": async () =>
    (await import("@/data/fe/theory/21-business-industry/03-e-business.json"))
      .default as FeChapter,

  "business-industry/consumer-equipment": async () =>
    (
      await import("@/data/fe/theory/21-business-industry/04-consumer-equipment.json")
    ).default as FeChapter,

  "business-industry/industrial-equipment": async () =>
    (
      await import("@/data/fe/theory/21-business-industry/05-industrial-equipment.json")
    ).default as FeChapter,

  // 22
  "corporate-activities/management-organization-theory": async () =>
    (
      await import("@/data/fe/theory/22-corporate-activities/01-management-organization-theory.json")
    ).default as FeChapter,

  "corporate-activities/business-analysis-data-utilization": async () =>
    (
      await import("@/data/fe/theory/22-corporate-activities/02-business-analysis-data-utilization.json")
    ).default as FeChapter,

  "corporate-activities/accounting-finance": async () =>
    (
      await import("@/data/fe/theory/22-corporate-activities/03-accounting-finance.json")
    ).default as FeChapter,

  // 23
  "legal-affairs/intellectual-property-rights": async () =>
    (
      await import("@/data/fe/theory/23-legal-affairs/01-intellectual-property-rights.json")
    ).default as FeChapter,

  "legal-affairs/security-related-laws": async () =>
    (
      await import("@/data/fe/theory/23-legal-affairs/02-security-related-laws.json")
    ).default as FeChapter,

  "legal-affairs/labor-transaction-laws": async () =>
    (
      await import("@/data/fe/theory/23-legal-affairs/03-labor-transaction-laws.json")
    ).default as FeChapter,

  "legal-affairs/other-laws-guidelines-engineer-ethics": async () =>
    (
      await import("@/data/fe/theory/23-legal-affairs/04-other-laws-guidelines-engineer-ethics.json")
    ).default as FeChapter,

  "legal-affairs/standardization": async () =>
    (await import("@/data/fe/theory/23-legal-affairs/05-standardization.json"))
      .default as FeChapter,
};

/**
 * Category の index.json だけを読み込む。
 */
export async function loadFeCategoryManifest(
  categoryId: string,
): Promise<FeCategoryManifest | undefined> {
  const loader = categoryManifestLoaders[categoryId];

  if (!loader) {
    return undefined;
  }

  return loader();
}

/**
 * 指定された category / chapter の chapter JSON だけを読み込む。
 */
export async function loadFeChapter(
  categoryId: string,
  chapterId: string,
): Promise<FeChapter | undefined> {
  const loader = chapterLoaders[`${categoryId}/${chapterId}`];

  if (!loader) {
    return undefined;
  }

  return loader();
}

/**
 * Manifest から chapter metadata を取得する。
 *
 * chapter 本文をロードしない。
 */
export async function getFeChapterReference(
  categoryId: string,
  chapterId: string,
): Promise<FeChapterReference | undefined> {
  const manifest = await loadFeCategoryManifest(categoryId);

  if (!manifest) {
    return undefined;
  }

  return manifest.chapters.find((chapter) => chapter.id === chapterId);
}
