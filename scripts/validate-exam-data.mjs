import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const dataRoot = path.resolve("data/exams");

const questionTypes = new Set([
  "KANJI_READING",
  "VOCABULARY",
  "SYNONYM",
  "WORD_USAGE",
  "GRAMMAR",
  "SENTENCE_ORDER",
  "CLOZE",
  "READING",
  "INFORMATION_SEARCH",
]);

const passageTypes = new Set(["CLOZE", "READING", "INFORMATION_SEARCH"]);

const validExamStatuses = new Set(["draft", "approved"]);

/**
 * Recursively find all JSON exam files.
 */
async function findJsonFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });

  const nestedFiles = await Promise.all(
    entries.map((entry) => {
      const entryPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        return findJsonFiles(entryPath);
      }

      if (entry.name.endsWith(".json")) {
        return [entryPath];
      }

      return [];
    }),
  );

  return nestedFiles.flat();
}

/**
 * Check whether an array contains exactly 1,2,3,4.
 */
function isOneToFour(values) {
  if (!Array.isArray(values) || values.length !== 4) {
    return false;
  }

  const sorted = [...values].sort((a, b) => a - b);

  return (
    sorted[0] === 1 && sorted[1] === 2 && sorted[2] === 3 && sorted[3] === 4
  );
}

/**
 * Validate normal multiple-choice fields.
 */
function validateMultipleChoice(question, label, state) {
  const { errors } = state;

  if (
    typeof question.question !== "string" ||
    question.question.trim().length === 0
  ) {
    errors.push(`${label}: question must be a non-empty string.`);
  }

  if (!Array.isArray(question.choices)) {
    errors.push(`${label}: choices must be an array.`);
    return;
  }

  if (question.choices.length !== 4) {
    errors.push(`${label}: choices must contain exactly 4 items.`);
    return;
  }

  const choiceIds = [];

  for (const choice of question.choices) {
    if (!Number.isInteger(choice.id) || choice.id < 1) {
      errors.push(`${label}: every choice id must be a positive integer.`);
    }

    if (typeof choice.text !== "string" || choice.text.trim().length === 0) {
      errors.push(`${label}: every choice must contain non-empty text.`);
    }

    choiceIds.push(choice.id);
  }

  if (new Set(choiceIds).size !== choiceIds.length) {
    errors.push(`${label}: choice ids must be unique.`);
  }

  if (!isOneToFour(choiceIds)) {
    errors.push(`${label}: choice ids must be exactly 1, 2, 3, 4.`);
  }

  if (!choiceIds.includes(question.correctAnswer)) {
    errors.push(`${label}: correctAnswer must reference a valid choice id.`);
  }
}

/**
 * Validate JLPT 文の組み立て.
 *
 * Important:
 * correctAnswer must be the fragment located at ★,
 * not simply the entire correct order.
 */
function validateSentenceOrder(question, label, state) {
  const { errors } = state;

  if (typeof question.sentenceBefore !== "string") {
    errors.push(`${label}: sentenceBefore must be a string.`);
  }

  if (typeof question.sentenceAfter !== "string") {
    errors.push(`${label}: sentenceAfter must be a string.`);
  }

  if (!Array.isArray(question.fragments)) {
    errors.push(`${label}: fragments must be an array.`);
    return;
  }

  if (question.fragments.length !== 4) {
    errors.push(`${label}: SENTENCE_ORDER must contain exactly 4 fragments.`);
    return;
  }

  const fragmentIds = [];

  for (const fragment of question.fragments) {
    if (!Number.isInteger(fragment.id) || fragment.id < 1) {
      errors.push(`${label}: every fragment id must be a positive integer.`);
    }

    if (
      typeof fragment.text !== "string" ||
      fragment.text.trim().length === 0
    ) {
      errors.push(`${label}: every fragment must contain non-empty text.`);
    }

    fragmentIds.push(fragment.id);
  }

  if (new Set(fragmentIds).size !== fragmentIds.length) {
    errors.push(`${label}: fragment ids must be unique.`);
  }

  if (!isOneToFour(fragmentIds)) {
    errors.push(`${label}: fragment ids must be exactly 1, 2, 3, 4.`);
  }

  const order = question.correctOrder;

  if (!Array.isArray(order)) {
    errors.push(`${label}: correctOrder must be an array.`);
    return;
  }

  const hasCompleteOrder =
    order.length === fragmentIds.length &&
    new Set(order).size === fragmentIds.length &&
    fragmentIds.every((id) => order.includes(id));

  if (!hasCompleteOrder) {
    errors.push(
      `${label}: correctOrder must contain every fragment id exactly once.`,
    );
    return;
  }

  if (!isOneToFour(order)) {
    errors.push(`${label}: correctOrder must be a permutation of 1, 2, 3, 4.`);
  }

  if (
    !Number.isInteger(question.starPosition) ||
    question.starPosition < 1 ||
    question.starPosition > order.length
  ) {
    errors.push(`${label}: starPosition must be a valid one-based position.`);
    return;
  }

  const starIndex = question.starPosition - 1;
  const expectedAnswer = order[starIndex];

  if (expectedAnswer !== question.correctAnswer) {
    errors.push(
      `${label}: correctAnswer must be the fragment located at ★. ` +
        `Expected ${expectedAnswer}, received ${question.correctAnswer}.`,
    );
  }
}

/**
 * Validate one answerable question.
 */
function validateQuestion(question, label, expectedType, state) {
  const { errors, warnings, questionIds } = state;

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

  if (typeof question.needsReview !== "boolean") {
    errors.push(`${label}: needsReview must be boolean.`);
  } else if (question.needsReview) {
    warnings.push(`${label}: requires manual review.`);
  }

  if (
    question.explanation !== null &&
    typeof question.explanation !== "string"
  ) {
    errors.push(`${label}: explanation must be a string or null.`);
  }

  if (question.type === "SENTENCE_ORDER") {
    validateSentenceOrder(question, label, state);
  } else {
    validateMultipleChoice(question, label, state);
  }
}

/**
 * Validate reading/cloze/information-search group.
 */
function validatePassageGroup(group, label, state) {
  const { errors, warnings, passageIds, passageGroupIds } = state;

  if (typeof group.id !== "string" || group.id.trim().length === 0) {
    errors.push(`${label}: group id must be a non-empty string.`);
  } else if (passageGroupIds.has(group.id)) {
    errors.push(`${label}: duplicate passage group id ${group.id}.`);
  } else {
    passageGroupIds.add(group.id);
  }

  if (!passageTypes.has(group.type)) {
    errors.push(
      `${label}: passage groups must use CLOZE, READING, or INFORMATION_SEARCH.`,
    );
  }

  if (
    typeof group.passageId !== "string" ||
    group.passageId.trim().length === 0
  ) {
    errors.push(`${label}: passageId must be a non-empty string.`);
  } else if (passageIds.has(group.passageId)) {
    errors.push(`${label}: duplicate passageId ${group.passageId}.`);
  } else {
    passageIds.add(group.passageId);
  }

  if (typeof group.passage !== "string" || group.passage.trim().length === 0) {
    errors.push(`${label}: passage must be a non-empty string.`);
  }

  if (typeof group.needsReview !== "boolean") {
    errors.push(`${label}: needsReview must be boolean.`);
  } else if (group.needsReview) {
    warnings.push(`${label}: passage requires manual review.`);
  }

  if (!Array.isArray(group.questions)) {
    errors.push(`${label}: questions must be an array.`);
    return 0;
  }

  if (group.questions.length === 0) {
    errors.push(`${label}: questions must contain at least one item.`);
    return 0;
  }

  group.questions.forEach((question, index) => {
    validateQuestion(
      question,
      `${label}, question ${index + 1}`,
      group.type,
      state,
    );
  });

  return group.questions.length;
}

/**
 * Validate one full exam.
 */
function validateExam(exam, file) {
  const errors = [];
  const warnings = [];

  const fileLabel = path.relative(process.cwd(), file);

  const state = {
    errors,
    warnings,
    questionIds: new Set(),
    passageIds: new Set(),
    passageGroupIds: new Set(),
  };

  if (typeof exam.id !== "string" || exam.id.trim().length === 0) {
    errors.push(`${fileLabel}: id is required.`);
  }

  if (!["N1", "N2", "N3", "N4", "N5"].includes(exam.level)) {
    errors.push(`${fileLabel}: level must be N1, N2, N3, N4, or N5.`);
  }

  if (!Number.isInteger(exam.year) || exam.year < 2000) {
    errors.push(`${fileLabel}: year must be a valid integer.`);
  }

  if (![7, 12].includes(exam.month)) {
    errors.push(`${fileLabel}: month must be 7 or 12.`);
  }

  if (typeof exam.title !== "string" || exam.title.trim().length === 0) {
    errors.push(`${fileLabel}: title is required.`);
  }

  if (typeof exam.description !== "string") {
    errors.push(`${fileLabel}: description must be a string.`);
  }

  if (!Number.isInteger(exam.questionCount) || exam.questionCount < 1) {
    errors.push(`${fileLabel}: questionCount must be a positive integer.`);
  }

  if (!validExamStatuses.has(exam.status)) {
    errors.push(`${fileLabel}: status must be "draft" or "approved".`);
  }

  if (!Array.isArray(exam.sections)) {
    errors.push(`${fileLabel}: sections must be an array.`);

    return {
      errors,
      warnings,
      loadedQuestionCount: 0,
    };
  }

  const sectionIds = new Set();

  let loadedQuestionCount = 0;

  exam.sections.forEach((section, sectionIndex) => {
    const sectionLabel = `${fileLabel}, section ${sectionIndex + 1}`;

    if (typeof section.id !== "string" || section.id.trim().length === 0) {
      errors.push(`${sectionLabel}: section id must be present.`);
    } else if (sectionIds.has(section.id)) {
      errors.push(`${sectionLabel}: duplicate section id ${section.id}.`);
    } else {
      sectionIds.add(section.id);
    }

    if (
      typeof section.title !== "string" ||
      section.title.trim().length === 0
    ) {
      errors.push(`${sectionLabel}: title must be a non-empty string.`);
    }

    if (!Array.isArray(section.items)) {
      errors.push(`${sectionLabel}: items must be an array.`);
      return;
    }

    section.items.forEach((item, itemIndex) => {
      const itemLabel = `${sectionLabel}, item ${itemIndex + 1}`;

      if (item && typeof item === "object" && "questions" in item) {
        loadedQuestionCount += validatePassageGroup(item, itemLabel, state);
      } else {
        validateQuestion(item, itemLabel, null, state);

        loadedQuestionCount += 1;
      }
    });
  });

  if (loadedQuestionCount > exam.questionCount) {
    errors.push(
      `${fileLabel}: loaded questions (${loadedQuestionCount}) exceed questionCount (${exam.questionCount}).`,
    );
  }

  if (exam.status === "approved") {
    if (loadedQuestionCount !== exam.questionCount) {
      errors.push(
        `${fileLabel}: approved exam must contain exactly ` +
          `${exam.questionCount} questions, but found ${loadedQuestionCount}.`,
      );
    }

    for (let id = 1; id <= exam.questionCount; id += 1) {
      if (!state.questionIds.has(id)) {
        errors.push(`${fileLabel}: missing question id ${id}.`);
      }
    }

    for (const id of state.questionIds) {
      if (id > exam.questionCount) {
        errors.push(
          `${fileLabel}: question id ${id} exceeds questionCount ${exam.questionCount}.`,
        );
      }
    }

    if (
      warnings.some((warning) => warning.includes("requires manual review"))
    ) {
      errors.push(
        `${fileLabel}: approved exam must not contain items requiring manual review.`,
      );
    }
  } else {
    if (loadedQuestionCount !== exam.questionCount) {
      warnings.push(
        `${fileLabel}: draft contains ${loadedQuestionCount}/${exam.questionCount} questions.`,
      );
    }
  }

  return {
    errors,
    warnings,
    loadedQuestionCount,
  };
}

/**
 * Load all exam JSON files.
 */
const files = await findJsonFiles(dataRoot);

const exams = await Promise.all(
  files.map(async (file) => {
    try {
      const raw = await readFile(file, "utf8");

      return {
        file,
        data: JSON.parse(raw),
        parseError: null,
      };
    } catch (error) {
      return {
        file,
        data: null,
        parseError: error,
      };
    }
  }),
);

const allErrors = [];
const allWarnings = [];
const examIds = new Set();

for (const examFile of exams) {
  const { file, data, parseError } = examFile;

  const fileLabel = path.relative(process.cwd(), file);

  if (parseError) {
    allErrors.push(`${fileLabel}: invalid JSON - ${parseError.message}`);
    continue;
  }

  if (examIds.has(data.id)) {
    allErrors.push(`${fileLabel}: duplicate exam id ${data.id}.`);
  } else if (data.id) {
    examIds.add(data.id);
  }

  const result = validateExam(data, file);

  allErrors.push(...result.errors);
  allWarnings.push(...result.warnings);
}

/**
 * Output result.
 */
if (allWarnings.length > 0) {
  console.warn("\nWarnings:");

  for (const warning of allWarnings) {
    console.warn(`- ${warning}`);
  }
}

if (allErrors.length > 0) {
  console.error("\nValidation errors:");

  for (const error of allErrors) {
    console.error(`- ${error}`);
  }

  console.error(
    `\nValidation failed: ${allErrors.length} error(s), ` +
      `${allWarnings.length} warning(s).`,
  );

  process.exitCode = 1;
} else {
  console.log(`\nValidated ${exams.length} exam file(s).`);

  console.log(`${allWarnings.length} warning(s), 0 critical error(s).`);
}
