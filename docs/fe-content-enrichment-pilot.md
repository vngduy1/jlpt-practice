# FE Theory — Phase 2 Content Enrichment Pilot

## Phạm vi

Pilot chỉ xử lý 10 lesson đầu tiên trong:

`data/fe/theory/19-business-strategy-management/01-business-strategy-methods.json`

Không thực hiện lại Phase 1, không sửa frontend, không sửa JLPT và không tạo commit. Các trường `id`, `order`, `titleJa`, `titleVi`, `importance` và `tags` của cả 10 bài được giữ nguyên.

Trạng thái audit trước Phase 2, sau khi chạy lại audit trên kết quả Phase 1:

- Tổng lesson FE: 2.596
- A: 133
- B: 2.455
- C: 8
- Structural issue: 0

## 1. Danh sách 10 bài đã xử lý

| Order | ID | Bài học | Trước | Sau |
|---:|---|---|---|---|
| 1 | `corporate-philosophy` | 企業理念 / Triết lý doanh nghiệp | B | A |
| 2 | `diversification` | 多角化 / Đa dạng hóa kinh doanh | B | A |
| 3 | `synergy-effect` | シナジー効果 / Hiệu ứng cộng hưởng | B | A |
| 4 | `economies-of-scale` | 規模の経済 / Lợi thế kinh tế theo quy mô | B | A |
| 5 | `economies-of-scope` | 範囲の経済 / Lợi thế kinh tế theo phạm vi | B | A |
| 6 | `innovation` | イノベーション / Đổi mới sáng tạo | B | A |
| 7 | `change-management` | チェンジマネジメント / Quản lý thay đổi | B | A |
| 8 | `dynamic-capability` | ダイナミックケイパビリティ / Năng lực động | B | A |
| 9 | `benchmarking` | ベンチマーキング / Đối sánh chuẩn | B | A |
| 10 | `best-practice` | ベストプラクティス / Thực tiễn tốt | B | A |

Sau Phase 2, audit toàn FE là A/B/C **143/2.445/8**. Chênh lệch đúng 10 bài từ B sang A; đây là kết quả heuristic cấu trúc, không thay thế review chuyên môn của con người.

## 2. Các block và field đã thay đổi

Cả 10 bài trước pilot đều có cùng cấu trúc tối thiểu:

```text
heading → paragraph → point
```

Sau pilot, mỗi bài có:

```text
heading → paragraph → point → example → warning
```

Thay đổi tổng hợp:

- Viết lại 10 `summaryJa` và 10 `summaryVi` để tóm tắt khác với term definition và nêu đúng trọng tâm FE.
- Chỉnh 10 heading để phản ánh nội dung học thay vì chỉ dùng mẫu “Xとは”.
- Mở rộng 10 paragraph Nhật–Việt, giữ toàn bộ ý đúng trước đó và bổ sung quan hệ/điều kiện cần thiết.
- Thay 10 point lặp lại summary bằng điểm phân biệt hoặc mẹo nhận dạng trong FE.
- Thêm 10 example cụ thể, có thể dùng để kiểm tra hiểu khái niệm.
- Thêm 10 warning có nội dung riêng cho từng bài; không dùng một cảnh báo khuôn mẫu.
- Chỉnh 10 term definition Nhật–Việt để độc lập với summary.
- Điền `reading` còn trống cho 5 term: イノベーション, チェンジマネジメント, ダイナミックケイパビリティ, ベンチマーキング, ベストプラクティス.
- Không thêm hoặc xóa term.

## 3. Nội dung giữ lại và phần làm sâu hơn

| Bài | Kiến thức hợp lệ đã giữ | Nội dung được làm sâu hơn | Warning có cơ sở |
|---|---|---|---|
| 企業理念 | Giá trị và mục đích tồn tại định hướng hành vi | Vai trò với quyết định, văn hóa, stakeholder; phân biệt philosophy, vision và mục tiêu số | Không nhầm triết lý dài hạn với khẩu hiệu hoặc mục tiêu ngắn hạn |
| 多角化 | Mở sang sản phẩm/thị trường mới để tăng trưởng và phân tán phụ thuộc | Đa dạng hóa liên quan/không liên quan; vị trí sản phẩm mới–thị trường mới trong growth matrix | Đa dạng hóa có thể tăng độ phức tạp và không bảo đảm giảm rủi ro |
| シナジー効果 | Kết hợp tạo hiệu quả lớn hơn hoạt động riêng | Cost/revenue/technology/channel synergy; nguồn lực bổ trợ | Synergy dự kiến có thể bị chi phí tích hợp hoặc xung đột văn hóa triệt tiêu |
| 規模の経済 | Sản lượng tăng làm chi phí đơn vị giảm | Phân bổ fixed cost, chuyên môn hóa; ví dụ số học | Quy mô không làm chi phí giảm vô hạn; có thể xuất hiện diseconomies of scale |
| 範囲の経済 | Chia sẻ nguồn lực giữa nhiều sản phẩm để giảm tổng chi phí | Điều kiện chi phí sản xuất chung thấp hơn sản xuất riêng; quan hệ với đa dạng hóa | Chỉ có nhiều sản phẩm chưa đủ; phải có hiệu quả chia sẻ nguồn lực |
| イノベーション | Tạo mới/cải tiến sản phẩm, dịch vụ, quy trình và mô hình | Giá trị phải được hiện thực hóa; phân biệt invention và innovation | Áp dụng công nghệ mới không tự động tạo giá trị mới |
| チェンジマネジメント | Hỗ trợ tổ chức tiếp nhận hệ thống/quy trình mới | Stakeholder, truyền thông, đào tạo, phản hồi, adoption; phân biệt project management | Go-live kỹ thuật không đồng nghĩa thay đổi đã được tiếp nhận |
| ダイナミックケイパビリティ | Thích ứng và tái cấu hình nguồn lực | Ba năng lực Sensing–Seizing–Transforming; phân biệt ordinary capability | Phản ứng nhanh mà không tái cấu hình nguồn lực chưa đủ |
| ベンチマーキング | So sánh với tổ chức/thực tiễn tốt để cải tiến | Chu trình chỉ tiêu–gap–practice–áp dụng; benchmark/benchmarking/best practice | Không chỉ xếp hạng hoặc sao chép máy móc |
| ベストプラクティス | Cách làm hiệu quả dùng làm tham khảo | Điều kiện, quy trình tạo kết quả, chuẩn hóa và cải tiến liên tục | Không có một best practice tối ưu cho mọi bối cảnh |

## 4. Đối chiếu nguồn

### Nguồn xác nhận phạm vi FE

- [IPA — 基本情報技術者試験（レベル2）シラバス Ver.9.0](https://www.ipa.go.jp/shiken/syllabus/nq6ept00000014dv-att/syllabus_fe_ver9_0_henkou.pdf): mục 経営戦略手法 liệt kê đủ cả 10 thuật ngữ của pilot và yêu cầu hiểu khái quát các phương pháp chiến lược tiêu biểu.

### Nguồn theo nội dung

- **企業理念:** [J-Net21/SMRJ — 経営理念](https://j-net21.smrj.go.jp/startup/manual/list2/2-3-6.html), xác nhận vai trò giá trị nền tảng, tiêu chuẩn hành động nội bộ và truyền đạt lập trường ra bên ngoài.
- **多角化:** [中小企業庁 — 2017年版中小企業白書 第3章](https://www.chusho.meti.go.jp/pamflet/hakusyo/H29/PDF/chusho/00Hakusyo_zentai.pdf), xác nhận vị trí “sản phẩm/dịch vụ mới × thị trường mới” trong ma trận tăng trưởng; [METI — 多角化度と収益性](https://www.meti.go.jp/shingikai/economy/global_cx/pdf/20240603_1.pdf), dùng để kiểm tra cảnh báo rằng đa dạng hóa và độ phức tạp cao không tự động tạo lợi nhuận tốt hơn.
- **シナジー効果:** [METI — CGS研究会（第2期）報告書](https://www.meti.go.jp/shingikai/economy/cgs_kenkyukai/pdf/20190628_cgs2_hokokusho.pdf), phân biệt financial synergy và operational synergy, đồng thời nhấn mạnh sự phù hợp với cấu trúc tập đoàn.
- **規模の経済・範囲の経済:** [JFTC — 日本の国鉄改革に関する検証](https://www.jftc.go.jp/cprc/discussionpapers/h22/index_files/CPDP-44-J.pdf), xác nhận cách hiểu chi phí của scale economies và điều kiện tổng chi phí sản xuất chung thấp hơn sản xuất riêng của scope economies.
- **イノベーション:** [METI — 日本企業におけるイノベーション創出に向けた経営](https://www.meti.go.jp/policy/economy/keiei_innovation/kodoshishin/kodoshishin.html), dùng để kiểm tra trọng tâm tạo và quản trị giá trị mới, không giới hạn ở phát minh kỹ thuật.
- **チェンジマネジメント:** [METI — 2018年版ものづくり白書](https://www.meti.go.jp/report/whitepaper/mono/2018/honbun/mobile/honbun_mb/101034_4mb.html), mô tả đây là phương pháp thúc đẩy, tăng tốc và dẫn dắt thành công thay đổi nghiệp vụ/tổ chức.
- **ダイナミックケイパビリティ:** [METI — ダイナミック・ケイパビリティ](https://www.meti.go.jp/meti_lib/report/2022FY/000280.pdf), xác nhận cấu trúc Sensing–Seizing–Transforming và việc tái sử dụng/tái cấu hình nguồn lực trong ngoài doanh nghiệp.
- **ベンチマーキング:** [IPA/SEC — ソフトウェア開発データが語るメッセージ](https://www.ipa.go.jp/archive/files/000053363.pdf), xác nhận benchmark là thông tin tham chiếu và benchmarking bao gồm đo lường, nhận diện gap, học best practice và cải tiến.
- **ベストプラクティス:** [IPA/SEC — プロセス改善ナビゲーションガイド](https://www.ipa.go.jp/archive/publish/secbooks20080212.html), xác nhận best practice là thực tiễn đã được áp dụng, có giá trị tham khảo và được dùng cho cải tiến quy trình.

## 5. Nội dung đã xác minh và nội dung còn cần kiểm tra

Đã xác minh bằng nguồn chính thức:

- Cả 10 thuật ngữ thuộc phạm vi FE.
- Quan hệ scale/scope, ba thành phần của dynamic capabilities và chu trình benchmarking.
- Vai trò định hướng của corporate philosophy.
- Trọng tâm giá trị của innovation và trọng tâm con người/tổ chức của change management.
- Synergy không chỉ có một loại và diversification không bảo đảm hiệu quả tài chính.

Còn cần review thủ công:

- Các example là tình huống giáo dục tổng hợp, không phải tuyên bố về doanh nghiệp có thật. Chúng đã được kiểm tra về tính nhất quán với định nghĩa nhưng không được gắn nhãn là case study đã kiểm chứng.
- Bản tiếng Việt là bản biên tập song ngữ cho người học FE, chưa được một dịch giả độc lập kiểm tra lần hai.
- Ranh giới cách dùng `企業理念`, `経営理念`, mission và vision có thể khác nhau giữa tổ chức; bài dùng cách phân biệt phục vụ FE và đã tránh tuyên bố đây là định nghĩa duy nhất.
- Cần người dùng kiểm tra trực quan độ dài paragraph/example/warning ở chế độ mobile và bilingual.

## 6. Số lượng trước và sau

| Chỉ số | Trước | Sau |
|---|---:|---:|
| Lesson trong file | 36 | 36 |
| Term trong file | 36 | 36 |
| Lesson trong pilot | 10 | 10 |
| Term trong pilot | 10 | 10 |
| Block trong pilot | 30 | 50 |
| Example block trong pilot | 0 | 10 |
| Warning block trong pilot | 0 | 10 |
| Term thiếu reading trong pilot | 5 | 0 |
| ID trùng trong file | 0 | 0 |

So sánh tự động với phiên bản Git trước sửa xác nhận identity fields của 10/10 lesson không đổi. Toàn bộ khái niệm hợp lệ trước đó vẫn hiện diện trong summary, paragraph, point hoặc example mới; phần lặp nguyên văn giữa summary/paragraph/term được thay bằng nội dung có vai trò riêng.

## 7. Validation

| Kiểm tra | Kết quả |
|---|---|
| JSON parse | Pass |
| Targeted FE schema validation | Pass, 10/10 |
| Actual `getFeLesson()` loader access | Pass, 10/10 |
| Identity, lesson count, term count, duplicate ID | Pass |
| `node scripts/audit-fe-theory-content.mjs` | Pass; A/B/C = 143/2.445/8, structural issue = 0 |
| `npm run lint` | Pass |
| `npm run typecheck` | Pass |
| `npm run build` | Pass; gồm prerender và FE dynamic routes |
| `git diff --check` | Pass |

Không chạy `npm run data:validate` làm tiêu chí cho pilot vì validator toàn dự án có 124 lỗi JLPT đã tồn tại và không phải FE-specific. Không thay đổi dữ liệu JLPT để xử lý các lỗi đó.

## 8. Nguy cơ ảnh hưởng frontend

- Không có thay đổi schema hoặc block type. Renderer hiện hỗ trợ đầy đủ `heading`, `paragraph`, `point`, `example`, `warning` và terms.
- Nội dung dài hơn làm tăng chiều cao trang, thời lượng text-to-speech và khả năng wrap dòng trong bilingual grid; đây là rủi ro trình bày cần kiểm tra giao diện, không phải lỗi build/runtime.
- Mỗi bài thêm hai card (`example`, `warning`), nên mật độ card tăng. Build thành công nhưng vẫn cần kiểm tra cảm nhận đọc trên mobile.
- Không thay đổi route, loader, metadata identity hoặc khóa React của lesson/term.
