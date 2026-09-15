from pathlib import Path
import sys

from pypdf import PdfReader


source = Path(sys.argv[1])
start = int(sys.argv[2])
end = int(sys.argv[3])
output = Path(sys.argv[4])

reader = PdfReader(source)
chunks = []
for page_number in range(start, end + 1):
    page = reader.pages[page_number - 1]
    chunks.append(f"\n===== PDF PAGE {page_number} =====\n")
    chunks.append(page.extract_text(extraction_mode="layout") or "")

output.write_text("\n".join(chunks), encoding="utf-8")
