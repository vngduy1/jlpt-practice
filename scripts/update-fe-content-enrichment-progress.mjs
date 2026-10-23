import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, '..');
const auditPath = path.join(rootDir, 'docs', 'fe-content-quality-audit.json');
const progressPath = path.join(
  rootDir,
  'docs',
  'fe-content-enrichment-progress.json',
);
const allowedStatuses = new Set([
  'pending',
  'in_progress',
  'completed',
  'needs_review',
]);

function parseArgs(argv) {
  const args = {};
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith('--')) {
      throw new Error(`Unexpected argument: ${token}`);
    }
    const key = token.slice(2);
    const value = argv[index + 1];
    if (!value || value.startsWith('--')) {
      throw new Error(`Missing value for --${key}`);
    }
    args[key] = value;
    index += 1;
  }
  return args;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function stableKey(file, lessonId) {
  return `${file}#${lessonId}`;
}

function normalizeLesson(auditLesson, previousLesson) {
  return {
    key: stableKey(auditLesson.sourcePath, auditLesson.id),
    file: auditLesson.sourcePath,
    lessonId: auditLesson.id,
    titleJa: auditLesson.titleJa,
    titleVi: auditLesson.titleVi,
    auditGrade: auditLesson.grade,
    auditPriority: auditLesson.priority,
    status: previousLesson?.status ?? 'pending',
    batchId: previousLesson?.batchId ?? null,
    updatedAt: previousLesson?.updatedAt ?? null,
    validation: previousLesson?.validation ?? null,
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const audit = readJson(auditPath);
  const previous = fs.existsSync(progressPath) ? readJson(progressPath) : null;
  const previousByKey = new Map(
    (previous?.lessons ?? []).map((lesson) => [lesson.key, lesson]),
  );
  const seenKeys = new Set();
  const lessons = audit.lessons.map((auditLesson) => {
    if (!auditLesson.id) {
      throw new Error(`Lesson without ID cannot be tracked: ${auditLesson.key}`);
    }
    const key = stableKey(auditLesson.sourcePath, auditLesson.id);
    if (seenKeys.has(key)) throw new Error(`Duplicate stable key: ${key}`);
    seenKeys.add(key);
    return normalizeLesson(auditLesson, previousByKey.get(key));
  });

  const batches = [...(previous?.batches ?? [])];
  const hasBatchUpdate = Boolean(args['batch-id']);
  if (hasBatchUpdate) {
    const required = ['file', 'lesson-ids', 'status', 'validation-status'];
    for (const key of required) {
      if (!args[key]) throw new Error(`--${key} is required with --batch-id`);
    }
    if (!allowedStatuses.has(args.status)) {
      throw new Error(`Unsupported status: ${args.status}`);
    }
    if (args.status === 'completed' && args['validation-status'] !== 'passed') {
      throw new Error('A completed batch requires --validation-status passed');
    }

    const lessonIds = args['lesson-ids']
      .split(',')
      .map((id) => id.trim())
      .filter(Boolean);
    if (lessonIds.length === 0 || new Set(lessonIds).size !== lessonIds.length) {
      throw new Error('Lesson IDs must be a non-empty, unique comma-separated list');
    }
    const updatedAt = new Date().toISOString();
    for (const lessonId of lessonIds) {
      const key = stableKey(args.file, lessonId);
      const lesson = lessons.find((candidate) => candidate.key === key);
      if (!lesson) throw new Error(`Unknown lesson: ${key}`);
      if (
        ['completed', 'needs_review'].includes(lesson.status) &&
        lesson.batchId !== args['batch-id']
      ) {
        throw new Error(
          `Refusing to overwrite ${lesson.status} lesson from another batch: ${key}`,
        );
      }
      lesson.status = args.status;
      lesson.batchId = args['batch-id'];
      lesson.updatedAt = updatedAt;
      lesson.validation = {
        status: args['validation-status'],
        report: args.report ?? null,
      };
    }

    const batch = {
      batchId: args['batch-id'],
      file: args.file,
      lessonIds,
      status: args.status,
      updatedAt,
      report: args.report ?? null,
      validation: {
        status: args['validation-status'],
      },
    };
    const existingIndex = batches.findIndex(
      (candidate) => candidate.batchId === args['batch-id'],
    );
    if (existingIndex >= 0) batches[existingIndex] = batch;
    else batches.push(batch);
  } else if (Object.keys(args).length > 0) {
    throw new Error('--batch-id is required when passing update arguments');
  }

  const statusCounts = Object.fromEntries(
    [...allowedStatuses].map((status) => [
      status,
      lessons.filter((lesson) => lesson.status === status).length,
    ]),
  );
  const totalLessons = lessons.length;
  const unfinishedLessons =
    statusCounts.pending + statusCounts.in_progress + statusCounts.needs_review;
  if (totalLessons !== audit.statistics.totalLessons) {
    throw new Error('Audit total and progress lesson total do not match');
  }
  if (statusCounts.completed + unfinishedLessons !== totalLessons) {
    throw new Error('Progress status counts do not add up to the lesson total');
  }

  const output = {
    schemaVersion: 1,
    identity: 'file + lessonId',
    updatedAt: new Date().toISOString(),
    sourceAudit: {
      file: 'docs/fe-content-quality-audit.json',
      generatedAt: audit.generatedAt,
      scriptVersion: audit.scope.scriptVersion,
    },
    totals: {
      totalLessons,
      completedLessons: statusCounts.completed,
      unfinishedLessons,
      byStatus: statusCounts,
    },
    policy: {
      auditGradeIsNotEditorialApproval: true,
      completedRequiresSuccessfulValidation: true,
      doNotReprocessStatusesWithoutExplicitRequest: [
        'completed',
        'needs_review',
      ],
    },
    batches,
    lessons,
  };

  fs.writeFileSync(progressPath, `${JSON.stringify(output, null, 2)}\n`, 'utf8');
  console.log(
    JSON.stringify(
      {
        output: path.relative(rootDir, progressPath).replaceAll('\\', '/'),
        totals: output.totals,
        updatedBatch: args['batch-id'] ?? null,
      },
      null,
      2,
    ),
  );
}

main();
