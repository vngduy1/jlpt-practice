# FE Theory — Phase 1 Critical Data Repair

## Phạm vi và kết quả

Phase này chỉ sửa lỗi cấu trúc khiến 18 bài FE tồn tại trong JSON nhưng không thể được `getFeLesson()` truy cập. Không có nội dung Nhật–Việt, term, tag, importance, ID hay order nào bị sửa; không sửa frontend, loader hoặc dữ liệu JLPT.

Kết quả cuối cùng:

- `data/fe/theory/03-computer-components/05-input-output-equipment.json` parse JSON thành công và chứa 58 `FeLesson` ở cấp một.
- Cả 18 bài mục tiêu được chính `lib/fe/utils.ts#getFeLesson()` trả về đúng ID và order.
- Không còn nested lesson array trong toàn bộ `data/fe/theory`.
- Tổng số bài logic vẫn là 2.596; không có lesson bị mất.
- Không phát sinh ID trùng trong chapter.
- FE audit sau sửa báo `nestedLessons: 0` và `structuralIssues: []`.

## 1. File và 18 lesson bị ảnh hưởng

File duy nhất chứa lỗi:

`data/fe/theory/03-computer-components/05-input-output-equipment.json`

Mảng bị lồng trước sửa nằm tại `lessons[40]` và chứa:

| Nested index cũ | Order | Lesson ID | Tiêu đề Nhật | Tiêu đề Việt |
|---:|---:|---|---|---|
| 0 | 41 | `digital-to-analog-converter` | D/Aコンバータ | Bộ chuyển đổi D/A |
| 1 | 42 | `projector` | プロジェクター | Máy chiếu |
| 2 | 43 | `audio-output-device` | 音声出力装置 | Thiết bị xuất âm thanh |
| 3 | 44 | `hard-disk-drive` | ハードディスク装置 | Ổ đĩa cứng HDD |
| 4 | 45 | `ssd` | SSD | SSD (Ổ cứng thể rắn) |
| 5 | 46 | `sd-card-reader` | SDカードリーダー | Đầu đọc thẻ SD |
| 6 | 47 | `cd-r-rw-drive` | CD-R/RW ドライブ | Ổ đĩa CD-R/RW |
| 7 | 48 | `blu-ray-drive` | ブルーレイドライブ | Ổ đĩa Blu-ray |
| 8 | 49 | `dvd-r-rw-drive` | DVD-R/RW ドライブ | Ổ đĩa DVD-R/RW |
| 9 | 50 | `magnetic-tape-device` | 磁気テープ装置 | Thiết bị băng từ |
| 10 | 51 | `track-disk` | トラック（補助記憶装置） | Rãnh (Track) trên ổ đĩa |
| 11 | 52 | `cylinder` | シリンダ | Hình trụ (Cylinder) trong ổ đĩa cứng |
| 12 | 53 | `block-factor` | ブロック化因数 | Hệ số khối (Block Factor) |
| 13 | 54 | `block-interval` | ブロック間隔 | Khoảng cách khối |
| 14 | 55 | `sector` | セクター | Sector |
| 15 | 56 | `defragmentation` | デフラグメンテーション | Chống phân mảnh (Defragmentation) |
| 16 | 57 | `wired-lan-card` | 有線 LAN インタフェースカード | Card giao diện mạng LAN có dây |
| 17 | 58 | `wireless-lan-card` | 無線 LAN インタフェースカード | Card giao diện mạng LAN không dây |

## 2. Loader, type và cấu trúc hợp lệ

- `types/fe.ts` khai báo `FeChapter.lessons: FeLesson[]`; phần tử của `lessons` phải là `FeLesson`, không phải `FeLesson[]`.
- `lib/fe/loaders.ts` dynamic-import chapter này dưới key `computer-components/input-output-equipment` rồi cast thành `FeChapter`. Cast TypeScript không kiểm tra cấu trúc JSON ở runtime.
- `lib/fe/utils.ts#getFeLesson()` dùng `record.chapter.lessons.find(item => item.id === lessonId)`. Một array lồng không có `id`, nên không lesson nào bên trong nó có thể được tìm thấy.
- Renderer nhận một `FeLesson` sau khi loader tìm thấy. Do lỗi xảy ra trước bước này, không có bằng chứng cần sửa renderer.

Sau sửa, toàn bộ 58 lesson trong chapter thỏa shape dùng bởi các type hiện tại: field lesson bắt buộc, `content` với 5 block type hợp lệ, `terms` với metadata dạng string và `tags` dạng string array. Riêng 18 bài mục tiêu đều qua kiểm tra schema không có issue.

## 3. Nguyên nhân

Nguyên nhân trực tiếp là một cặp dấu `[` / `]` thừa bao quanh lesson order 41–58. File vẫn là JSON hợp lệ, nên JSON parser, dynamic import và TypeScript typecheck không phát hiện lỗi. Tuy nhiên cấu trúc runtime là:

```text
lessons = [FeLesson, ..., FeLesson, [FeLesson × 18]]
```

thay vì:

```text
lessons = [FeLesson × 58]
```

Git history cho thấy file và đoạn dữ liệu này được thêm cùng commit ban đầu `72fc3aa`; không có bằng chứng lỗi do thay đổi loader về sau. Hình dạng lỗi phù hợp với việc một batch 18 lesson đã bị bọc thêm một array khi ghép dữ liệu.

## 4. Thay đổi tối thiểu

### `data/fe/theory/03-computer-components/05-input-output-equipment.json`

- Xóa đúng hai dấu ngoặc mảng bao ngoài 18 lesson.
- Không serialize hoặc format lại toàn file.
- Không thay đổi bất kỳ field nội dung nào của 18 lesson.

### `data/fe/categories.json`

- Cập nhật `computer-components.count` từ 174 thành 191.
- Trước sửa, metadata 174 phản ánh số phần tử cấp một khi nested array bị tính như một phần tử. Sau flatten có thêm 17 phần tử cấp một (`18 - 1`), nên count đúng là 191.

### Báo cáo audit

Chạy lại `node scripts/audit-fe-theory-content.mjs` để đồng bộ:

- `docs/fe-content-quality-audit.md`
- `docs/fe-content-quality-audit.json`

Không thay đổi logic của script audit trong Phase 1.

## 5. Đối chiếu số lượng trước và sau

| Phạm vi | Trước | Sau | Giải thích |
|---|---:|---:|---|
| Phần tử cấp một trong chapter | 41 | 58 | Trước gồm 40 lesson object + 1 nested array; sau gồm 58 lesson object. |
| Lesson logic trong chapter | 58 | 58 | Không thêm hoặc xóa lesson. |
| Lesson chapter mà loader truy cập được | 40 | 58 | 18 lesson được khôi phục khả năng truy cập. |
| Phần tử cấp một toàn FE | 2.579 | 2.596 | Một nested array được thay bằng 18 lesson object, chênh lệch +17. |
| Lesson logic toàn FE | 2.596 | 2.596 | Không mất dữ liệu. |
| Lesson logic không truy cập được do nesting | 18 | 0 | Lỗi mục tiêu đã được loại bỏ. |
| `computer-components.count` | 174 | 191 | Metadata được đồng bộ với dữ liệu thực. |

Digest SHA-256 của chuỗi 58 lesson theo thứ tự logic, sau khi flatten cấu trúc trước sửa, là:

`a1010635a9220ca2506e83896967fe76a69deaf4bba089b9ea13a0ff049e524f`

Digest của mảng 58 lesson sau sửa giống hệt. Digest riêng của cả 18 lesson cũng khớp trước/sau; đây là bằng chứng không field nội dung nào bị thay đổi.

## 6. Kết quả validation

| Kiểm tra | Kết quả |
|---|---|
| Parse chapter JSON và `categories.json` | Pass |
| Schema toàn chapter 58 lesson | Pass |
| Schema riêng 18 lesson mục tiêu | Pass |
| 18 ID được tìm qua `getFeLesson('computer-components', 'input-output-equipment', id)` | Pass, 18/18 |
| ID trùng trong chapter | Pass, 0 ID trùng |
| Nested lesson array toàn FE | Pass, 0 |
| Bảo toàn lesson count và digest | Pass |
| `node scripts/audit-fe-theory-content.mjs` | Pass; 2.596 lesson, 0 structural issue |
| `npm run lint` | Pass |
| `npm run typecheck` | Pass |
| `npm run build` | Pass |

Lần build đầu trong sandbox đã compile xong năm môi trường nhưng bị chặn kết nối tới production server cục bộ `127.0.0.1` khi prerender (`EACCES`). Chạy lại cùng lệnh ngoài sandbox hoàn tất thành công, gồm prerender và route `/fe/category/:categoryId/:chapterId/:lessonId`.

Không dùng `npm run data:validate` toàn dự án làm tiêu chí cho sửa chữa này vì validator đó bao gồm các lỗi JLPT N1/N2/N3 đã biết và không kiểm tra riêng cấu trúc FE theory.

## 7. Ngoài phạm vi

- Không sửa nội dung hay phân loại A/B/C của bài học. Việc audit sau sửa đổi phân bố A/B/C là hệ quả 18 bài không còn bị ép vào C bởi lỗi nesting.
- Không xử lý các issue chất lượng nội dung, metadata term hoặc các bài C khác.
- Không sửa loader/frontend vì loader hoạt động đúng khi dữ liệu tuân thủ `FeLesson[]`.
- Không thay đổi dữ liệu JLPT và không tạo commit.
