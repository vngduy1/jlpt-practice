import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const dataRoot = path.resolve('data/exams');
const questionTypes = new Set([
  'KANJI_READING',
  'VOCABULARY',
  'SYNONYM',
  'WORD_USAGE',
  'GRAMMAR',
  'SENTENCE_ORDER',
  'CLOZE',
  'READING',
  'INFORMATION_SEARCH',
]);
const passageTypes = new Set(['CLOZE', 'READING', 'INFORMATION_SEARCH']);

async function findJsonFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nestedFiles = await Promise.all(
    entries.map((entry) => {
      const entryPath = path.join(directory, entry.name);
      return entry.isDirectory()
        ? findJsonFiles(entryPath)
        : entry.name.endsWith('.json')
          ? [entryPath]
          : [];
    }),
  );

  return nestedFiles.flat();
}

function validateMultipleChoice(question, label, errors) {
  if (!Array.isArray(question.choices) || question.choices.length === 0) {
    errors.push(`${label}: choices must be a non-empty array.`);
    return;
  }

  const choiceIds = question.choices.map((choice) => choice.id);
  if (new Set(choiceIds).size !== choiceIds.length) {
    errors.push(`${label}: choice ids must be unique.`);
  }
  if (!choiceIds.includes(question.correctAnswer)) {
    errors.push(`${label}: correctAnswer must reference a choice id.`);
  }
}

function validateSentenceOrder(question, label, errors) {
  if (!Array.isArray(question.fragments) || question.fragments.length === 0) {
    errors.push(`${label}: fragments must be a non-empty array.`);
    return;
  }

  const fragmentIds = question.fragments.map((fragment) => fragment.id);
  if (
    fragmentIds.some((id) => !Number.isInteger(id) || id < 1) ||
    new Set(fragmentIds).size !== fragmentIds.length
  ) {
    errors.push(`${label}: fragment ids must be positive and unique.`);
  }
  const order = question.correctOrder;
  const hasCompleteOrder =
    Array.isArray(order) &&
    order.length === fragmentIds.length &&
    new Set(order).size === fragmentIds.length &&
    fragmentIds.every((id) => order.includes(id));

  if (!hasCompleteOrder) {
    errors.push(`${label}: correctOrder must contain every fragment id once.`);
    return;
  }

  const starIndex = question.starPosition - 1;
  if (!Number.isInteger(question.starPosition) || !order[starIndex]) {
    errors.push(`${label}: starPosition must be a valid one-based position.`);
  } else if (order[starIndex] !== question.correctAnswer) {
    errors.push(
      `${label}: correctAnswer must be the fragment at the star position.`,
    );
  }
}

function validateQuestion(question, label, expectedType, state) {
  const { errors, questionIds } = state;

  if (!Number.isInteger(question.id) || question.id < 1) {
    errors.push(`${label}: id must be a positive integer.`);
  } else if (questionIds.has(question.id)) {
    errors.push(`${label}: duplicate question id ${question.id}.`);
  } else {
    questionIds.add(question.id);
  }

  if (!Number.isInteger(question.mondai) || question.mondai < 1) {
    errors.push(`${label}: mondai must be a positive integer.`);
  }
  if (!questionTypes.has(question.type)) {
    errors.push(`${label}: unknown question type ${question.type}.`);
  }
  if (expectedType && question.type !== expectedType) {
    errors.push(`${label}: type must match its ${expectedType} passage group.`);
  }
  if (typeof question.needsReview !== 'boolean') {
    errors.push(`${label}: needsReview must be boolean.`);
  }
  if (
    question.explanation !== null &&
    typeof question.explanation !== 'string'
  ) {
    errors.push(`${label}: explanation must be a string or null.`);
  }

  if (question.type === 'SENTENCE_ORDER') {
    validateSentenceOrder(question, label, errors);
  } else {
    validateMultipleChoice(question, label, errors);
  }
}

function validatePassageGroup(group, label, state) {
  const { errors, passageIds } = state;

  if (!passageTypes.has(group.type)) {
    errors.push(`${label}: passage groups must use a passage question type.`);
  }
  if (!group.passageId || passageIds.has(group.passageId)) {
    errors.push(`${label}: passageId must be present and unique.`);
  } else {
    passageIds.add(group.passageId);
  }
  if (typeof group.passage !== 'string' || group.passage.length === 0) {
    errors.push(`${label}: passage must be a non-empty string.`);
  }
  if (typeof group.needsReview !== 'boolean') {
    errors.push(`${label}: needsReview must be boolean.`);
  }
  if (!Array.isArray(group.questions) || group.questions.length === 0) {
    errors.push(`${label}: questions must be a non-empty array.`);
    return 0;
  }

  group.questions.forEach((question, index) =>
    validateQuestion(
      question,
      `${label}, question ${index + 1}`,
      group.type,
      state,
    ),
  );
  return group.questions.length;
}

function validateExam(exam, file) {
  const errors = [];
  const fileLabel = path.relative(process.cwd(), file);
  const state = {
    errors,
    questionIds: new Set(),
    passageIds: new Set(),
  };

  if (!exam.id || !exam.level || !exam.title) {
    errors.push(`${fileLabel}: id, level, and title are required.`);
  }
  if (![7, 12].includes(exam.month)) {
    errors.push(`${fileLabel}: month must be 7 or 12.`);
  }
  if (!Number.isInteger(exam.questionCount) || exam.questionCount < 1) {
    errors.push(`${fileLabel}: questionCount must be a positive integer.`);
  }
  if (!Array.isArray(exam.sections)) {
    errors.push(`${fileLabel}: sections must be an array.`);
    return errors;
  }

  const sectionIds = new Set();
  let loadedQuestionCount = 0;
  exam.sections.forEach((section, sectionIndex) => {
    const sectionLabel = `${fileLabel}, section ${sectionIndex + 1}`;
    if (!section.id || sectionIds.has(section.id)) {
      errors.push(`${sectionLabel}: section id must be present and unique.`);
    } else {
      sectionIds.add(section.id);
    }
    if (!Array.isArray(section.items)) {
      errors.push(`${sectionLabel}: items must be an array.`);
      return;
    }

    section.items.forEach((item, itemIndex) => {
      const itemLabel = `${sectionLabel}, item ${itemIndex + 1}`;
      if ('questions' in item) {
        loadedQuestionCount += validatePassageGroup(item, itemLabel, state);
      } else {
        validateQuestion(item, itemLabel, null, state);
        loadedQuestionCount += 1;
      }
    });
  });

  if (loadedQuestionCount > exam.questionCount) {
    errors.push(`${fileLabel}: loaded questions exceed questionCount.`);
  }
  return errors;
}

const files = await findJsonFiles(dataRoot);
const exams = await Promise.all(
  files.map(async (file) => ({
    file,
    data: JSON.parse(await readFile(file, 'utf8')),
  })),
);

const errors = exams.flatMap(({ data, file }) => validateExam(data, file));
const examIds = new Set();
for (const { data, file } of exams) {
  if (examIds.has(data.id)) {
    errors.push(
      `${path.relative(process.cwd(), file)}: duplicate exam id ${data.id}.`,
    );
  }
  examIds.add(data.id);
}

if (errors.length > 0) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Validated ${exams.length} exam file(s).`);
}
