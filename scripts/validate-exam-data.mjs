import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const dataRoot = path.resolve('data/exams');

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

function validateExam(exam, file) {
  const errors = [];
  const label = path.relative(process.cwd(), file);

  if (!exam.id || !exam.level || !exam.title) {
    errors.push(`${label}: id, level, and title are required.`);
  }

  if (![7, 12].includes(exam.month)) {
    errors.push(`${label}: month must be 7 or 12.`);
  }

  if (!Array.isArray(exam.questions)) {
    errors.push(`${label}: questions must be an array.`);
    return errors;
  }

  const numbers = new Set();
  for (const question of exam.questions) {
    if (numbers.has(question.number)) {
      errors.push(`${label}: duplicate question number ${question.number}.`);
    }
    numbers.add(question.number);

    const optionIds = new Set(question.options?.map((option) => option.id));
    if (!optionIds.has(question.correctOptionId)) {
      errors.push(
        `${label}: question ${question.number} has an invalid answer.`,
      );
    }
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
const ids = new Set();
for (const { data, file } of exams) {
  if (ids.has(data.id)) {
    errors.push(
      `${path.relative(process.cwd(), file)}: duplicate exam id ${data.id}.`,
    );
  }
  ids.add(data.id);
}

if (errors.length > 0) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Validated ${exams.length} exam file(s).`);
}
