import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPT_VERSION = '1.0.0';
const ALLOWED_BLOCK_TYPES = new Set([
  'heading',
  'paragraph',
  'point',
  'example',
  'warning',
]);
const REQUIRED_TERM_FIELDS = [
  'term',
  'reading',
  'english',
  'vi',
  'definitionJa',
  'definitionVi',
];
const REFERENCE = {
  category: '01-basic-theory',
  chapter: '01-discrete-mathematics.json',
  lessonId: 'radix-and-number-systems',
  titleJa: '基数と進数',
};

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '..');
const sourceRoot = path.join(repoRoot, 'data', 'fe', 'theory');
const docsDir = path.join(repoRoot, 'docs');
const jsonOutput = path.join(docsDir, 'fe-content-quality-audit.json');
const markdownOutput = path.join(docsDir, 'fe-content-quality-audit.md');

const compact = (value) =>
  typeof value === 'string' ? value.replace(/\s+/gu, ' ').trim() : '';
const fingerprint = (value) =>
  compact(value)
    .toLocaleLowerCase('ja')
    .replace(/[\s\p{P}\p{S}]/gu, '');
const hasText = (value) => compact(value).length > 0;
const relative = (value) =>
  path.relative(repoRoot, value).replaceAll('\\', '/');
const unique = (items) => [...new Set(items)];
const countJapanese = (value) =>
  (
    compact(value).match(
      /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]/gu,
    ) ?? []
  ).length;
const countLatin = (value) =>
  (compact(value).match(/[A-Za-zÀ-ỹ]/gu) ?? []).length;

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function collectLessonEntries(value, sourcePath, indexPath = 'lessons') {
  if (!Array.isArray(value)) {
    return {
      lessons: [],
      issues: [{ sourcePath, indexPath, code: 'lessons-not-array' }],
    };
  }

  const lessons = [];
  const issues = [];

  value.forEach((entry, index) => {
    const currentPath = `${indexPath}[${index}]`;
    if (Array.isArray(entry)) {
      issues.push({
        sourcePath,
        indexPath: currentPath,
        code: 'nested-lesson-array',
        nestedLessonCount: entry.length,
        impact:
          'The TypeScript loader expects FeLesson[]; nested lessons are not addressable by getFeLesson or the renderer.',
      });
      const nested = collectLessonEntries(entry, sourcePath, currentPath);
      lessons.push(
        ...nested.lessons.map((item) => ({
          ...item,
          nestedInLessonArray: true,
        })),
      );
      issues.push(...nested.issues);
      return;
    }

    lessons.push({ lesson: entry, sourcePath, indexPath: currentPath });
  });

  return { lessons, issues };
}

function isMostlyJapanese(value) {
  const japanese = countJapanese(value);
  const latin = countLatin(value);
  return japanese >= 12 && japanese > latin * 0.8;
}

function warningReviewSignal(lesson) {
  const blocks = Array.isArray(lesson?.content) ? lesson.content : [];
  const nonPointText = [
    lesson?.summaryJa,
    lesson?.summaryVi,
    ...blocks
      .filter((block) => block?.type !== 'point' && block?.type !== 'warning')
      .flatMap((block) => [block?.ja, block?.vi]),
  ]
    .map(compact)
    .join(' ');

  return /注意|混同|誤り|間違|例外|区別|落とし穴|リスク|危険|禁止|してはいけ|lưu ý|nhầm|phân biệt|ngoại lệ|rủi ro|nguy hiểm|không được/iu.test(
    nonPointText,
  );
}

function embeddedExampleSignal(lesson) {
  const blocks = Array.isArray(lesson?.content) ? lesson.content : [];
  const prose = blocks
    .filter((block) => block?.type === 'paragraph' || block?.type === 'point')
    .flatMap((block) => [block?.ja, block?.vi])
    .map(compact)
    .join(' ');
  return /例えば|たとえば|例[：:]|例として|ví dụ|chẳng hạn/iu.test(prose);
}

function repeatedVietnameseLocations(lesson) {
  const texts = [];
  if (hasText(lesson?.summaryVi)) {
    texts.push({ location: 'summaryVi', text: lesson.summaryVi });
  }
  if (Array.isArray(lesson?.content)) {
    lesson.content.forEach((block, index) => {
      if (block?.type !== 'heading' && hasText(block?.vi)) {
        texts.push({ location: `content[${index}].vi`, text: block.vi });
      }
    });
  }
  if (Array.isArray(lesson?.terms)) {
    lesson.terms.forEach((term, index) => {
      if (hasText(term?.definitionVi)) {
        texts.push({
          location: `terms[${index}].definitionVi`,
          text: term.definitionVi,
        });
      }
    });
  }

  const groups = new Map();
  for (const entry of texts) {
    const key = fingerprint(entry.text);
    if (key.length < 30) continue;
    const group = groups.get(key) ?? [];
    group.push(entry.location);
    groups.set(key, group);
  }
  return [...groups.values()].filter((locations) => locations.length > 1);
}

function genericSignals(lesson, counts, repeatedVi) {
  if (!lesson || typeof lesson !== 'object') return [];
  const content = Array.isArray(lesson.content) ? lesson.content : [];
  const terms = Array.isArray(lesson.terms) ? lesson.terms : [];
  const signals = [];
  const pattern = content.map((block) => block?.type).join(',');
  const points = content.filter((block) => block?.type === 'point');

  if (
    pattern === 'heading,paragraph,point' &&
    terms.length === 1 &&
    counts.example === 0 &&
    counts.warning === 0
  ) {
    signals.push('minimal-batch-shape');
  }
  if (
    points.some((block) =>
      /^試験対策[：:].{0,100}(定義|目的|特徴).*(関連用語|違い|確認)/u.test(
        compact(block?.ja),
      ),
    )
  ) {
    signals.push('generic-exam-point-template');
  }
  if (
    hasText(lesson.summaryJa) &&
    points.some(
      (block) => fingerprint(block?.ja) === fingerprint(lesson.summaryJa),
    )
  ) {
    signals.push('point-repeats-summary-ja');
  }
  if (repeatedVi.length > 0) signals.push('repeated-vietnamese-within-lesson');
  return signals;
}

function auditLesson(entry, context) {
  const { lesson, sourcePath, indexPath, nestedInLessonArray = false } = entry;
  const schemaIssues = [];
  const emptyVietnamese = [];
  const vietnameseLanguageMismatch = [];
  const shortFields = [];

  if (!lesson || typeof lesson !== 'object' || Array.isArray(lesson)) {
    return {
      ...context,
      sourcePath,
      indexPath,
      nestedInLessonArray,
      id: null,
      order: null,
      titleJa: '(invalid lesson entry)',
      titleVi: '',
      importance: null,
      grade: 'C',
      priority: 'P0',
      blockCounts: Object.fromEntries(
        [...ALLOWED_BLOCK_TYPES].map((type) => [type, 0]),
      ),
      missing: ['valid-lesson-object'],
      emptyVietnamese: ['lesson'],
      vietnameseLanguageMismatch: [],
      shortFields: [],
      schemaIssues: ['lesson-not-object'],
      genericSignals: [],
      repeatedVietnamese: [],
      crossLessonDuplicateSignals: [],
      embeddedExample: false,
      warningReviewRecommended: false,
      reasons: ['Dữ liệu bài học không phải object hợp lệ.'],
      manualKnowledgeReviewRequired: true,
    };
  }

  for (const field of [
    'id',
    'titleJa',
    'titleVi',
    'importance',
    'summaryJa',
    'summaryVi',
  ]) {
    if (!hasText(lesson[field])) schemaIssues.push(`missing-or-empty-${field}`);
  }
  if (!hasText(lesson.titleVi)) emptyVietnamese.push('titleVi');
  if (!hasText(lesson.summaryVi)) emptyVietnamese.push('summaryVi');
  if (!new Set(['high', 'medium', 'low']).has(lesson.importance)) {
    schemaIssues.push('invalid-importance');
  }
  if (!Array.isArray(lesson.content)) schemaIssues.push('content-not-array');
  if (!Array.isArray(lesson.terms)) schemaIssues.push('terms-not-array');
  if (!Array.isArray(lesson.tags)) schemaIssues.push('tags-not-array');

  const blocks = Array.isArray(lesson.content) ? lesson.content : [];
  const counts = Object.fromEntries(
    [...ALLOWED_BLOCK_TYPES].map((type) => [type, 0]),
  );

  blocks.forEach((block, index) => {
    if (!block || typeof block !== 'object' || Array.isArray(block)) {
      schemaIssues.push(`content[${index}]-not-object`);
      return;
    }
    if (!ALLOWED_BLOCK_TYPES.has(block.type)) {
      schemaIssues.push(`content[${index}]-invalid-type`);
    } else {
      counts[block.type] += 1;
    }
    if (!hasText(block.ja)) schemaIssues.push(`content[${index}].ja-empty`);
    if (!hasText(block.vi)) {
      schemaIssues.push(`content[${index}].vi-empty`);
      emptyVietnamese.push(`content[${index}].vi`);
    }
    if (block.type !== 'heading') {
      if (compact(block.ja).length < 20)
        shortFields.push(`content[${index}].ja`);
      if (compact(block.vi).length < 35)
        shortFields.push(`content[${index}].vi`);
    }
    if (isMostlyJapanese(block.vi)) {
      vietnameseLanguageMismatch.push(`content[${index}].vi-mostly-japanese`);
    }
  });

  const terms = Array.isArray(lesson.terms) ? lesson.terms : [];
  terms.forEach((term, index) => {
    if (!term || typeof term !== 'object' || Array.isArray(term)) {
      schemaIssues.push(`terms[${index}]-not-object`);
      return;
    }
    for (const field of REQUIRED_TERM_FIELDS) {
      if (!hasText(term[field])) {
        schemaIssues.push(`terms[${index}].${field}-empty`);
        if (field === 'vi' || field === 'definitionVi') {
          emptyVietnamese.push(`terms[${index}].${field}`);
        }
      }
    }
    if (isMostlyJapanese(term.definitionVi)) {
      vietnameseLanguageMismatch.push(
        `terms[${index}].definitionVi-mostly-japanese`,
      );
    }
  });

  if (hasText(lesson.summaryJa) && compact(lesson.summaryJa).length < 25) {
    shortFields.push('summaryJa');
  }
  if (hasText(lesson.summaryVi) && compact(lesson.summaryVi).length < 45) {
    shortFields.push('summaryVi');
  }
  if (isMostlyJapanese(lesson.summaryVi)) {
    vietnameseLanguageMismatch.push('summaryVi-mostly-japanese');
  }

  const explanatoryBlocks = blocks.filter((block) => block?.type !== 'heading');
  const bodyJaLength = explanatoryBlocks.reduce(
    (sum, block) => sum + compact(block?.ja).length,
    0,
  );
  const bodyViLength = explanatoryBlocks.reduce(
    (sum, block) => sum + compact(block?.vi).length,
    0,
  );
  if (bodyJaLength < 80) shortFields.push('bodyJa-total');
  if (bodyViLength < 120) shortFields.push('bodyVi-total');

  const repeatedVi = repeatedVietnameseLocations(lesson);
  const embeddedExample = embeddedExampleSignal(lesson);
  const warningReviewRecommended =
    counts.warning === 0 && warningReviewSignal(lesson);
  const generic = genericSignals(lesson, counts, repeatedVi);
  const missing = [];
  if (!hasText(lesson.summaryJa) || !hasText(lesson.summaryVi)) {
    missing.push('bilingual-summary');
  }
  if (counts.heading === 0) missing.push('heading');
  if (counts.paragraph === 0) missing.push('paragraph');
  if (counts.point === 0) missing.push('point');
  if (counts.example === 0) missing.push('example');
  if (counts.warning === 0) missing.push('warning');
  if (terms.length === 0) missing.push('terms');
  if (
    terms.some((term) =>
      ['vi', 'definitionJa', 'definitionVi'].some(
        (field) => !hasText(term?.[field]),
      ),
    )
  ) {
    missing.push('complete-bilingual-term-definition');
  }

  const severe =
    nestedInLessonArray ||
    schemaIssues.some((issue) =>
      /lesson-not-object|missing-or-empty-(id|titleJa|titleVi|summaryJa|summaryVi)|content-not-array|content\[\d+\]\.(ja|vi)-empty/u.test(
        issue,
      ),
    ) ||
    blocks.length === 0 ||
    counts.paragraph === 0 ||
    emptyVietnamese.length > 0 ||
    (bodyJaLength < 50 && bodyViLength < 80);

  const upgradeSignals = [
    counts.heading === 0,
    counts.point === 0,
    terms.length === 0,
    counts.example === 0 && !embeddedExample,
    warningReviewRecommended,
    shortFields.length > 0,
    emptyVietnamese.length > 0,
    vietnameseLanguageMismatch.length > 0,
    schemaIssues.length > 0,
    generic.length > 0,
  ];
  const grade = severe ? 'C' : upgradeSignals.some(Boolean) ? 'B' : 'A';

  const priority =
    grade === 'C'
      ? 'P0'
      : grade === 'B' &&
          (lesson.importance === 'high' ||
            counts.point === 0 ||
            terms.length === 0 ||
            emptyVietnamese.length > 0 ||
            vietnameseLanguageMismatch.length > 0)
        ? 'P1'
        : grade === 'B'
          ? 'P2'
          : 'P3';

  const reasons = [];
  if (nestedInLessonArray) {
    reasons.push(
      'Bài nằm trong mảng lessons bị lồng, không tương thích loader hiện tại.',
    );
  }
  if (schemaIssues.length > 0)
    reasons.push(`Lỗi schema/dữ liệu: ${schemaIssues.join(', ')}.`);
  if (emptyVietnamese.length > 0) {
    reasons.push(`Tiếng Việt trống: ${unique(emptyVietnamese).join(', ')}.`);
  }
  if (vietnameseLanguageMismatch.length > 0) {
    reasons.push(
      `Trường tiếng Việt có vẻ vẫn là tiếng Nhật: ${unique(vietnameseLanguageMismatch).join(', ')}.`,
    );
  }
  if (counts.heading === 0 || counts.paragraph === 0 || counts.point === 0) {
    reasons.push(
      `Thiếu block cốt lõi: ${[
        counts.heading === 0 ? 'heading' : null,
        counts.paragraph === 0 ? 'paragraph' : null,
        counts.point === 0 ? 'point' : null,
      ]
        .filter(Boolean)
        .join(', ')}.`,
    );
  }
  if (terms.length === 0) reasons.push('Thiếu terms.');
  if (counts.example === 0 && !embeddedExample)
    reasons.push('Thiếu ví dụ cụ thể.');
  if (counts.example === 0 && embeddedExample) {
    reasons.push(
      'Không có block example riêng, nhưng ví dụ đã nằm trong paragraph/point.',
    );
  }
  if (warningReviewRecommended) {
    reasons.push(
      'Có tín hiệu dễ nhầm/ngoại lệ/rủi ro nhưng chưa có warning hoặc point cảnh báo rõ.',
    );
  }
  if (shortFields.length > 0)
    reasons.push(`Nội dung ngắn: ${unique(shortFields).join(', ')}.`);
  if (generic.length > 0)
    reasons.push(`Dấu hiệu khuôn mẫu/lặp: ${generic.join(', ')}.`);
  if (grade === 'A') {
    reasons.push(
      'Đạt ngưỡng cấu trúc tự động; vẫn bắt buộc review độ chính xác và chiều sâu kiến thức.',
    );
  }

  return {
    ...context,
    sourcePath,
    indexPath,
    nestedInLessonArray,
    id: hasText(lesson.id) ? lesson.id : null,
    order: Number.isFinite(lesson.order) ? lesson.order : null,
    titleJa: compact(lesson.titleJa) || '(untitled)',
    titleVi: compact(lesson.titleVi),
    importance: lesson.importance ?? null,
    grade,
    priority,
    blockCounts: counts,
    missing,
    emptyVietnamese: unique(emptyVietnamese),
    vietnameseLanguageMismatch: unique(vietnameseLanguageMismatch),
    shortFields: unique(shortFields),
    schemaIssues: unique(schemaIssues),
    genericSignals: generic,
    repeatedVietnamese: repeatedVi,
    crossLessonDuplicateSignals: [],
    embeddedExample,
    warningReviewRecommended,
    measurements: {
      summaryJaLength: compact(lesson.summaryJa).length,
      summaryViLength: compact(lesson.summaryVi).length,
      bodyJaLength,
      bodyViLength,
      termCount: terms.length,
    },
    reasons,
    manualKnowledgeReviewRequired: true,
    _fingerprints: {
      titleJa: fingerprint(lesson.titleJa),
      summaryJa: fingerprint(lesson.summaryJa),
      summaryVi: fingerprint(lesson.summaryVi),
      primaryParagraphJa: fingerprint(
        blocks.find((block) => block?.type === 'paragraph')?.ja,
      ),
      primaryParagraphVi: fingerprint(
        blocks.find((block) => block?.type === 'paragraph')?.vi,
      ),
    },
  };
}

function duplicateGroups(lessons, field, minimumLength = 30) {
  const groups = new Map();
  for (const lesson of lessons) {
    const value = lesson._fingerprints?.[field] ?? '';
    if (value.length < minimumLength) continue;
    const group = groups.get(value) ?? [];
    group.push(lesson);
    groups.set(value, group);
  }
  return [...groups.values()]
    .filter((group) => group.length > 1)
    .map((group) => ({
      count: group.length,
      lessons: group.map((lesson) => ({
        key: lesson.key,
        titleJa: lesson.titleJa,
        sourcePath: lesson.sourcePath,
        indexPath: lesson.indexPath,
      })),
    }))
    .sort((a, b) => b.count - a.count);
}

function attachCrossLessonDuplicates(lessons, duplicates) {
  const lessonSignals = new Map();
  for (const [field, groups] of Object.entries(duplicates)) {
    if (field === 'duplicateTitleJa') continue;
    for (const group of groups) {
      for (const lesson of group.lessons) {
        const signals = lessonSignals.get(lesson.key) ?? [];
        signals.push(`${field}:${group.count}`);
        lessonSignals.set(lesson.key, signals);
      }
    }
  }

  for (const lesson of lessons) {
    const signals = lessonSignals.get(lesson.key) ?? [];
    lesson.crossLessonDuplicateSignals = signals;
    if (signals.length > 0 && lesson.grade === 'A') {
      lesson.grade = 'B';
      lesson.priority = lesson.importance === 'high' ? 'P1' : 'P2';
      lesson.reasons = lesson.reasons.filter(
        (reason) => !reason.startsWith('Đạt ngưỡng cấu trúc tự động'),
      );
      lesson.reasons.push(
        `Nội dung trùng chính xác giữa nhiều bài: ${signals.join(', ')}.`,
      );
    } else if (signals.length > 0) {
      lesson.reasons.push(
        `Nội dung trùng chính xác giữa nhiều bài: ${signals.join(', ')}.`,
      );
    }
  }
}

function markdownEscape(value) {
  return String(value).replaceAll('|', '\\|').replaceAll('\n', ' ');
}

function summarizeReasons(lesson) {
  const labels = [];
  if (lesson.nestedInLessonArray) labels.push('nested lessons');
  if (lesson.schemaIssues.length) labels.push('schema');
  if (lesson.emptyVietnamese.length) labels.push('VI trống');
  if (lesson.vietnameseLanguageMismatch.length)
    labels.push('VI nghi còn tiếng Nhật');
  if (lesson.blockCounts.heading === 0) labels.push('thiếu heading');
  if (lesson.blockCounts.paragraph === 0) labels.push('thiếu paragraph');
  if (lesson.blockCounts.point === 0) labels.push('thiếu point');
  if (lesson.blockCounts.example === 0 && !lesson.embeddedExample)
    labels.push('thiếu ví dụ');
  if (lesson.blockCounts.warning === 0 && lesson.warningReviewRecommended) {
    labels.push('cần cân nhắc warning');
  }
  if (lesson.measurements.termCount === 0) labels.push('thiếu terms');
  if (lesson.shortFields.length) labels.push('ngắn');
  if (lesson.genericSignals.length) labels.push('khuôn mẫu/lặp');
  if (lesson.crossLessonDuplicateSignals.length) labels.push('trùng bài khác');
  return labels.join(', ') || 'review thủ công';
}

function renderMarkdown(report) {
  const s = report.statistics;
  const lines = [
    '# FE Theory Content Quality Audit',
    '',
    `> Phạm vi dữ liệu thực tế: \`${report.scope.sourceRoot}\` (yêu cầu ghi \`exams/fe/theory/\`, nhưng repository không có đường dẫn đó). Báo cáo được tạo tự động bởi \`${report.scope.script}\`.`,
    '',
    '## Kết luận chính',
    '',
    `- Tổng số bài học logic: **${s.totalLessons}** trong **${s.chapterFiles}** chapter và **${s.categories}** nhóm.`,
    `- Phân loại cấu trúc: **A ${s.grades.A}**, **B ${s.grades.B}**, **C ${s.grades.C}**. A chỉ có nghĩa là vượt qua heuristic cấu trúc; không phải xác nhận kiến thức đúng hoặc chất lượng cao.`,
    `- Thiếu block: point **${s.missing.point}**, example **${s.missing.example}**, warning **${s.missing.warning}**, terms **${s.missing.terms}**.`,
    `- Terms: **${s.lessonsWithIncompleteBilingualTermDefinitions}** bài thiếu nhãn/định nghĩa Nhật–Việt; **${s.lessonsWithIncompleteTermMetadata}** bài thiếu ít nhất một field metadata bắt buộc (chủ yếu là \`reading\`).`,
    `- Có ít nhất một trường tiếng Việt trống: **${s.lessonsWithEmptyVietnamese}** bài; có trường Việt nghi vẫn là tiếng Nhật: **${s.lessonsWithVietnameseLanguageMismatch}** bài; có phần Việt lặp nguyên văn trong cùng bài: **${s.lessonsWithRepeatedVietnamese}** bài.`,
    `- Có dấu hiệu nội dung khuôn mẫu/chung chung: **${s.lessonsWithGenericSignals}** bài; có trùng chính xác với bài khác: **${s.lessonsWithCrossLessonDuplicates}** bài.`,
    `- Phát hiện **${report.structuralIssues.length}** lỗi cấu trúc file; đáng chú ý có **${s.nestedLessons}** bài nằm trong mảng \`lessons\` bị lồng và không tương thích loader hiện tại.`,
    '',
    '## Bước 1 — Cấu trúc được hỗ trợ',
    '',
    '- `types/fe.ts`: `FeContentBlockType` chỉ gồm `paragraph`, `heading`, `point`, `example`, `warning`; `FeLesson` bắt buộc summary Nhật–Việt, content, terms và tags.',
    '- `lib/fe/loaders.ts`: từng chapter được dynamic import rồi ép kiểu `FeChapter`; không có runtime schema validation.',
    '- `lib/fe/utils.ts`: `getFeLesson` chỉ tìm object cấp một trong `chapter.lessons`.',
    '- `components/fe/fe-lesson-content.tsx`: render summary, 5 loại block, và chỉ hiện khu vực terms khi mảng terms không rỗng. Fallback của block không nhận diện được sẽ bị render như paragraph.',
    `- Bài tham chiếu \`${report.reference.titleJa}\` có summary song ngữ, heading, paragraph, point, example, warning và term song ngữ; script xác nhận bài này là loại **${report.reference.detectedGrade}**.`,
    '',
    '## Phương pháp và giới hạn',
    '',
    'Script kiểm tra schema, độ hiện diện của block, trường rỗng/ngắn, tỷ lệ ký tự Nhật trong trường Việt, lặp nguyên văn trong bài, trùng nguyên văn giữa bài, ví dụ nằm trong prose, tín hiệu dễ nhầm/rủi ro và mẫu ba-block được lặp hàng loạt. Ngưỡng ngắn chỉ là tín hiệu biên tập, không phải thước đo độ đúng.',
    '',
    '- **A**: đủ thành phần phù hợp theo heuristic và không có tín hiệu dữ liệu/khuôn mẫu rõ; vẫn phải review kiến thức riêng.',
    '- **B**: thiếu thành phần học tập quan trọng, quá ngắn, lặp/khuôn mẫu, hoặc có vấn đề dịch nhưng chưa đến mức làm bài không dùng được.',
    '- **C**: lỗi schema/đường truy cập nghiêm trọng, thiếu dữ liệu cốt lõi, không có paragraph, hoặc nội dung song ngữ quá sơ sài.',
    '- `warning` không bị coi là bắt buộc cho mọi bài. Con số “thiếu warning” là thống kê thô; chỉ tín hiệu ngữ nghĩa mới đưa bài vào diện cân nhắc warning.',
    '- Script không và không thể xác nhận độ chính xác kiến thức FE chỉ từ cấu trúc/độ dài.',
    '',
    '## Thống kê theo nhóm',
    '',
    '| Nhóm | Tổng | A | B | C | Thiếu point | Thiếu example | Thiếu warning | Thiếu terms | VI trống | VI nghi sai ngôn ngữ |',
    '|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|',
  ];

  for (const group of report.groups) {
    lines.push(
      `| ${markdownEscape(group.categoryTitleJa)} / ${markdownEscape(group.categoryTitleVi)} | ${group.statistics.total} | ${group.statistics.grades.A} | ${group.statistics.grades.B} | ${group.statistics.grades.C} | ${group.statistics.missing.point} | ${group.statistics.missing.example} | ${group.statistics.missing.warning} | ${group.statistics.missing.terms} | ${group.statistics.lessonsWithEmptyVietnamese} | ${group.statistics.lessonsWithVietnameseLanguageMismatch} |`,
    );
  }

  lines.push(
    '',
    '## Trường hợp không nên thêm block chỉ để đủ cấu trúc',
    '',
    '- Không tự động thêm `warning` cho mọi bài. Chỉ thêm khi có bẫy đề thi, ngoại lệ, nhầm lẫn thường gặp, rủi ro hoặc điều kiện giới hạn cụ thể.',
    '- Không bắt buộc tách `example` thành block riêng nếu paragraph/point đã có ví dụ cụ thể, đúng và đủ nổi bật; script đánh dấu `embeddedExample` để biên tập viên quyết định.',
    '- Không nhân bản summary vào point hay definition chỉ để có đủ field. Point phải chốt mẹo làm bài/quan hệ phân biệt; term definition phải định nghĩa thuật ngữ độc lập.',
    '- Không thêm heading vào bài rất ngắn chỉ để tăng block; trước tiên cần xác định bài có nên gộp với bài liên quan hay cần mở rộng nội dung.',
    `- Hiện có **${s.lessonsWithoutWarningAndNoReviewSignal}** bài thiếu warning nhưng không có tín hiệu tự động cho thấy warning phù hợp; đây là các trường hợp không nên thêm hàng loạt.`,
    `- Hiện có **${s.lessonsWithEmbeddedExampleButNoExampleBlock}** bài không có block example nhưng có ví dụ cụ thể trong prose; cần review khả năng đọc, không chuyển block máy móc.`,
    '',
    '## Kế hoạch nâng cấp ưu tiên',
    '',
    `1. **P0 — Khôi phục khả năng dùng dữ liệu (${s.priorities.P0} bài):** xử lý bài C, trường bắt buộc trống, nội dung Việt trống và lỗi mảng lessons bị lồng. Đây là lỗi dữ liệu/runtime, không chỉ là biên tập.`,
    `2. **P1 — Bài quan trọng và thiếu thành phần cốt lõi (${s.priorities.P1} bài):** ưu tiên importance=high, thiếu point/terms, bản Việt có vấn đề, nội dung ngắn hoặc khuôn mẫu rõ.`,
    `3. **P2 — Nâng chiều sâu (${s.priorities.P2} bài):** bổ sung ví dụ thực sự có giá trị, thay point chung chung, tách nội dung lặp và cân nhắc warning theo ngữ cảnh.`,
    `4. **P3 — Review chuyên môn cho A (${s.priorities.P3} bài):** lấy mẫu theo từng nhóm, đối chiếu syllabus/đề FE, kiểm tra thuật ngữ Nhật–Việt và độ chính xác; không mặc định A là “đạt chất lượng cao”.`,
    '',
    '## Lỗi cấu trúc file',
    '',
  );

  if (report.structuralIssues.length === 0) {
    lines.push('Không phát hiện.', '');
  } else {
    for (const issue of report.structuralIssues) {
      lines.push(
        `- \`${issue.sourcePath}\` tại \`${issue.indexPath}\`: **${issue.code}**${issue.nestedLessonCount ? ` (${issue.nestedLessonCount} bài lồng)` : ''}.`,
      );
    }
    lines.push('');
  }

  lines.push('## Danh sách bài cần nâng cấp theo từng nhóm', '');
  for (const group of report.groups) {
    const upgrades = group.upgradeLessons;
    lines.push(
      `### ${group.categoryFolder} — ${group.categoryTitleJa} / ${group.categoryTitleVi}`,
      '',
      `Cần nâng cấp: **${upgrades.length}** (B ${group.statistics.grades.B}, C ${group.statistics.grades.C}).`,
      '',
    );
    if (upgrades.length === 0) {
      lines.push('- Không có bài bị heuristic xếp B/C.', '');
      continue;
    }
    for (const lesson of upgrades) {
      lines.push(
        `- **${lesson.grade}/${lesson.priority}** ${markdownEscape(lesson.titleJa)} / ${markdownEscape(lesson.titleVi || '(thiếu)')} — \`${lesson.chapterId}/${lesson.id ?? lesson.indexPath}\` — ${lesson.summaryReasons}`,
      );
    }
    lines.push('');
  }

  lines.push(
    '## Cách chạy lại',
    '',
    '```bash',
    'node scripts/audit-fe-theory-content.mjs',
    '```',
    '',
    'Báo cáo JSON chứa record chi tiết cho từng bài, nhóm trùng lặp và toàn bộ reason code để lọc/chạy CI về sau.',
    '',
  );
  return lines.join('\n');
}

function buildStatistics(lessons) {
  const grades = { A: 0, B: 0, C: 0 };
  const priorities = { P0: 0, P1: 0, P2: 0, P3: 0 };
  const missing = { point: 0, example: 0, warning: 0, terms: 0 };
  for (const lesson of lessons) {
    grades[lesson.grade] += 1;
    priorities[lesson.priority] += 1;
    for (const field of Object.keys(missing)) {
      if (lesson.missing.includes(field)) missing[field] += 1;
    }
  }
  return {
    total: lessons.length,
    grades,
    priorities,
    missing,
    lessonsWithEmptyVietnamese: lessons.filter(
      (lesson) => lesson.emptyVietnamese.length > 0,
    ).length,
    lessonsWithVietnameseLanguageMismatch: lessons.filter(
      (lesson) => lesson.vietnameseLanguageMismatch.length > 0,
    ).length,
    lessonsWithRepeatedVietnamese: lessons.filter(
      (lesson) => lesson.repeatedVietnamese.length > 0,
    ).length,
    lessonsWithIncompleteBilingualTermDefinitions: lessons.filter((lesson) =>
      lesson.missing.includes('complete-bilingual-term-definition'),
    ).length,
    lessonsWithIncompleteTermMetadata: lessons.filter((lesson) =>
      lesson.schemaIssues.some((issue) => issue.startsWith('terms[')),
    ).length,
    lessonsWithGenericSignals: lessons.filter(
      (lesson) => lesson.genericSignals.length > 0,
    ).length,
    lessonsWithCrossLessonDuplicates: lessons.filter(
      (lesson) => lesson.crossLessonDuplicateSignals.length > 0,
    ).length,
  };
}

function main() {
  if (!fs.existsSync(sourceRoot)) {
    throw new Error(`FE theory directory not found: ${sourceRoot}`);
  }

  const categories = fs
    .readdirSync(sourceRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
  const lessons = [];
  const structuralIssues = [];
  let chapterFiles = 0;

  for (const categoryFolder of categories) {
    const categoryDir = path.join(sourceRoot, categoryFolder);
    const manifestPath = path.join(categoryDir, 'index.json');
    const manifest = fs.existsSync(manifestPath) ? readJson(manifestPath) : {};
    const chapterJsonFiles = fs
      .readdirSync(categoryDir)
      .filter((file) => file.endsWith('.json') && file !== 'index.json')
      .sort();

    for (const file of chapterJsonFiles) {
      chapterFiles += 1;
      const absolutePath = path.join(categoryDir, file);
      const sourcePath = relative(absolutePath);
      const chapter = readJson(absolutePath);
      const collected = collectLessonEntries(chapter.lessons, sourcePath);
      structuralIssues.push(...collected.issues);
      for (const entry of collected.lessons) {
        const audited = auditLesson(entry, {
          categoryFolder,
          categoryId: manifest.id ?? categoryFolder.replace(/^\d+-/u, ''),
          categoryOrder: manifest.order ?? null,
          categoryTitleJa: manifest.titleJa ?? categoryFolder,
          categoryTitleVi: manifest.titleVi ?? '',
          chapterId: chapter.id ?? file.replace(/\.json$/u, ''),
          chapterOrder: chapter.order ?? null,
          chapterTitleJa: chapter.titleJa ?? '',
          chapterTitleVi: chapter.titleVi ?? '',
        });
        audited.key = `${sourcePath}#${entry.indexPath}`;
        lessons.push(audited);
      }
    }
  }

  const duplicates = {
    duplicateTitleJa: duplicateGroups(lessons, 'titleJa', 2),
    duplicateSummaryJa: duplicateGroups(lessons, 'summaryJa', 30),
    duplicateSummaryVi: duplicateGroups(lessons, 'summaryVi', 40),
    duplicatePrimaryParagraphJa: duplicateGroups(
      lessons,
      'primaryParagraphJa',
      60,
    ),
    duplicatePrimaryParagraphVi: duplicateGroups(
      lessons,
      'primaryParagraphVi',
      80,
    ),
  };
  attachCrossLessonDuplicates(lessons, duplicates);

  lessons.sort(
    (a, b) =>
      (a.categoryOrder ?? 999) - (b.categoryOrder ?? 999) ||
      (a.chapterOrder ?? 999) - (b.chapterOrder ?? 999) ||
      (a.order ?? 999) - (b.order ?? 999) ||
      a.indexPath.localeCompare(b.indexPath),
  );
  const overall = buildStatistics(lessons);
  const grouped = categories.map((categoryFolder) => {
    const categoryLessons = lessons.filter(
      (lesson) => lesson.categoryFolder === categoryFolder,
    );
    const first = categoryLessons[0] ?? {};
    return {
      categoryFolder,
      categoryId: first.categoryId ?? categoryFolder.replace(/^\d+-/u, ''),
      categoryOrder: first.categoryOrder ?? null,
      categoryTitleJa: first.categoryTitleJa ?? categoryFolder,
      categoryTitleVi: first.categoryTitleVi ?? '',
      statistics: buildStatistics(categoryLessons),
      upgradeLessons: categoryLessons
        .filter((lesson) => lesson.grade !== 'A')
        .map((lesson) => ({
          key: lesson.key,
          id: lesson.id,
          chapterId: lesson.chapterId,
          titleJa: lesson.titleJa,
          titleVi: lesson.titleVi,
          grade: lesson.grade,
          priority: lesson.priority,
          summaryReasons: summarizeReasons(lesson),
        })),
    };
  });

  const referenceLesson = lessons.find(
    (lesson) =>
      lesson.categoryFolder === REFERENCE.category &&
      lesson.id === REFERENCE.lessonId,
  );
  const cleanLessons = lessons.map(({ _fingerprints, ...lesson }) => lesson);
  const report = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    scope: {
      requestedRoot: 'exams/fe/theory/',
      sourceRoot: relative(sourceRoot),
      script: relative(fileURLToPath(import.meta.url)),
      scriptVersion: SCRIPT_VERSION,
    },
    reference: {
      ...REFERENCE,
      detectedGrade: referenceLesson?.grade ?? null,
      note: 'Reference confirms the supported learning components; its grade does not validate factual accuracy.',
    },
    rendererSupport: {
      contentBlockTypes: [...ALLOWED_BLOCK_TYPES],
      lessonFields: ['summaryJa', 'summaryVi', 'content', 'terms'],
      runtimeValidation: false,
      unknownBlockBehavior:
        'Renderer falls through to paragraph-like presentation; TypeScript casts do not validate imported JSON at runtime.',
    },
    methodology: {
      classificationMeaning: {
        A: 'Structurally ready under heuristics; factual/depth review still required.',
        B: 'Missing important learning support or showing short/repetitive/generic signals.',
        C: 'Severe schema, accessibility, missing-data, or sparsity problem.',
      },
      thresholds: {
        shortSummaryJa: 25,
        shortSummaryVi: 45,
        shortBodyJaTotal: 80,
        shortBodyViTotal: 120,
        severelyShortBodyJa: 50,
        severelyShortBodyVi: 80,
      },
      caveats: [
        'Block count and text length do not establish factual accuracy.',
        'Warning is contextual and is not required for every lesson.',
        'An embedded concrete example can be sufficient without a separate example block.',
        'Japanese technical terms can legitimately appear in Vietnamese text; mostly-Japanese detection is only a review signal.',
        'Exact-duplicate detection finds reuse, not plagiarism or factual error.',
      ],
    },
    statistics: {
      totalLessons: lessons.length,
      chapterFiles,
      categories: categories.length,
      grades: overall.grades,
      priorities: overall.priorities,
      missing: overall.missing,
      lessonsWithEmptyVietnamese: overall.lessonsWithEmptyVietnamese,
      lessonsWithVietnameseLanguageMismatch:
        overall.lessonsWithVietnameseLanguageMismatch,
      lessonsWithRepeatedVietnamese: overall.lessonsWithRepeatedVietnamese,
      lessonsWithIncompleteBilingualTermDefinitions:
        overall.lessonsWithIncompleteBilingualTermDefinitions,
      lessonsWithIncompleteTermMetadata:
        overall.lessonsWithIncompleteTermMetadata,
      lessonsWithGenericSignals: overall.lessonsWithGenericSignals,
      lessonsWithCrossLessonDuplicates:
        overall.lessonsWithCrossLessonDuplicates,
      nestedLessons: lessons.filter((lesson) => lesson.nestedInLessonArray)
        .length,
      lessonsWithoutWarningAndNoReviewSignal: lessons.filter(
        (lesson) =>
          lesson.blockCounts.warning === 0 && !lesson.warningReviewRecommended,
      ).length,
      lessonsWithEmbeddedExampleButNoExampleBlock: lessons.filter(
        (lesson) => lesson.blockCounts.example === 0 && lesson.embeddedExample,
      ).length,
    },
    structuralIssues,
    doNotForceBlocks: [
      'Do not add warning unless a concrete misconception, exception, risk, or exam trap exists.',
      'Do not split an already-clear embedded example solely to satisfy a block count.',
      'Do not copy summary into point or term definitions to fill fields.',
      'Consider merging an overly narrow lesson before padding it with headings.',
    ],
    upgradePlan: [
      {
        priority: 'P0',
        target: 'C and severe data/runtime accessibility defects',
      },
      {
        priority: 'P1',
        target: 'High-importance B and missing core bilingual support',
      },
      {
        priority: 'P2',
        target: 'Other B: examples, depth, generic points, contextual warnings',
      },
      { priority: 'P3', target: 'Manual factual and pedagogical review of A' },
    ],
    duplicates,
    groups: grouped,
    lessons: cleanLessons,
  };

  fs.mkdirSync(docsDir, { recursive: true });
  fs.writeFileSync(jsonOutput, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
  fs.writeFileSync(markdownOutput, renderMarkdown(report), 'utf8');

  console.log(
    JSON.stringify(
      {
        output: [relative(markdownOutput), relative(jsonOutput)],
        totalLessons: report.statistics.totalLessons,
        grades: report.statistics.grades,
        missing: report.statistics.missing,
        lessonsWithEmptyVietnamese:
          report.statistics.lessonsWithEmptyVietnamese,
        structuralIssues: report.structuralIssues.length,
      },
      null,
      2,
    ),
  );
}

main();
