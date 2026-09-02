import { readFile } from "node:fs/promises";
import path from "node:path";

const requested = process.argv.slice(2).map(Number);
const examNos = requested.length ? requested : Array.from({ length: 11 }, (_, index) => index + 1);
const failures = [];

function fail(examId, message) {
  failures.push(`${examId}: ${message}`);
}

for (const examNo of examNos) {
  const file = path.resolve(`data/exams/n1/original/n1-original-${String(examNo).padStart(2, "0")}.json`);
  let exam;
  try {
    exam = JSON.parse(await readFile(file, "utf8"));
  } catch (error) {
    fail(`exam-${examNo}`, `JSON parse failed: ${error.message}`);
    continue;
  }
  const sections = exam.sections ?? [];
  if (sections.some((section) => section.id === "listening")) fail(exam.id, "unexpected listening section");
  for (const required of ["vocabulary", "grammar", "reading"]) {
    if (!sections.some((section) => section.id === required)) fail(exam.id, `missing ${required} section`);
  }
  const allQuestions = sections.flatMap((section) => section.items.flatMap((item) => item.questions ?? [item])).filter((item) => Number.isInteger(item.id));
  const expectedTotal = examNo === 1 ? 67 : 60;
  if (allQuestions.length !== expectedTotal) fail(exam.id, `question count ${allQuestions.length}, expected ${expectedTotal}`);
  if (allQuestions.some((question, index) => question.id !== index + 1)) fail(exam.id, "question IDs are not sequential");
  for (const question of allQuestions) {
    if (!question.type || !Number.isInteger(question.mondai) || question.needsReview !== false) fail(exam.id, `required field issue at Q${question.id}`);
    if (["KANJI_READING", "SYNONYM", "WORD_USAGE"].includes(question.type) && !question.target?.trim()) fail(exam.id, `missing target at Q${question.id}`);
    if (question.type === "SENTENCE_ORDER") {
      const ids = question.fragments?.map((fragment) => fragment.id);
      if (ids?.join(",") !== "1,2,3,4" || [...question.correctOrder].sort((a, b) => a - b).join(",") !== "1,2,3,4") fail(exam.id, `invalid sentence-order fragments at Q${question.id}`);
      if (question.correctAnswer !== question.correctOrder[question.starPosition - 1]) fail(exam.id, `★ formula failed at Q${question.id}`);
    } else {
      if (question.choices?.map((choice) => choice.id).join(",") !== "1,2,3,4") fail(exam.id, `invalid choices at Q${question.id}`);
      if (![1, 2, 3, 4].includes(question.correctAnswer) || !question.choices.some((choice) => choice.id === question.correctAnswer)) fail(exam.id, `invalid correctAnswer at Q${question.id}`);
      if (new Set(question.choices.map((choice) => choice.text)).size !== 4) fail(exam.id, `duplicate choices at Q${question.id}`);
    }
  }
  const reading = sections.find((section) => section.id === "reading");
  const readingQuestions = reading.items.flatMap((item) => item.questions ?? []);
  if (readingQuestions.length !== 20) fail(exam.id, `reading count ${readingQuestions.length}`);
  const passageIds = reading.items.map((item) => item.passageId);
  if (passageIds.some((id) => !id) || new Set(passageIds).size !== passageIds.length) fail(exam.id, "passageId missing or duplicated");
  if (reading.items.some((item) => !item.passage?.trim() || item.needsReview !== false)) fail(exam.id, "invalid reading passage fields");
  const paddingMarkers = [
    "このような問題を一つの指標だけで処理すると",
    "制度を作る側には例外に見える事例も",
    "短期的な効率と長期的な信頼は、必ずしも反対ではない",
    "ここで重要なのは、結論を一度で固定することではない",
    "数えやすい成果だけを重視すれば"
  ];
  if (reading.items.some((item) => paddingMarkers.some((marker) => item.passage.includes(marker)))) fail(exam.id, "generic padding remains");
  console.log(`${exam.id}: ${failures.some((entry) => entry.startsWith(`${exam.id}:`)) ? "FAIL" : "PASS"} (${allQuestions.length} questions, ${readingQuestions.length} reading)`);
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
