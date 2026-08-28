import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const filePath = path.resolve("data/exams/n1/2023-07.json");

// Đọc JSON hiện tại
const raw = await readFile(filePath, "utf8");
const data = JSON.parse(raw);

// Lưu danh sách câu hỏi cũ
const oldItems = data.sections;

if (!Array.isArray(oldItems)) {
  throw new Error("sections is not an array.");
}

// Kiểm tra cấu trúc hiện tại
if (oldItems.length > 0 && "items" in oldItems[0]) {
  throw new Error(
    "This JSON already appears to use the new sections -> items structure.",
  );
}

// Tạo sections mới
data.sections = [];

for (let mondai = 1; mondai <= 13; mondai += 1) {
  const items = oldItems.filter((question) => question.mondai === mondai);

  data.sections.push({
    id: `mondai-${mondai}`,
    title: `問題${mondai}`,
    items,
  });
}

// Ghi đè lại JSON
await writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");

console.log("Migration completed.");
console.log(`Total original items: ${oldItems.length}`);

for (const section of data.sections) {
  console.log(`${section.title}: ${section.items.length} item(s)`);
}
