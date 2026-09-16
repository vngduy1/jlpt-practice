# N2 PDF conversion review

Source: `source/n2/40-de-thi-jlpt-n2.pdf`

This log records only meaningful source defects or transcription ambiguities. Printed wording is preserved in the JSON rather than silently corrected.

## N2-1 / `n2-practice-01.json`

- PDF pages: questions 1–31; answer key 200–201.
- Completeness: Problems 1–14, questions 1–75, and all answer choices are present.
- Answer key: visually checked against the block's own key on pages 200–201.
- Sentence order: all five full fragment orders were reconstructed; each `correctAnswer` matches the fragment at the visually printed star position and the answer key. Question 48's printed fragments produce `意味ありげな笑い浮かべた` because the expected particle `を` is absent from the source; the source fragments are preserved and question 48 is marked `needsReview`.
- Reading 10-03 (question 57): the source prints `水の温度上がる` and `二つ物体`; preserved verbatim and marked `needsReview` on the passage.
- Reading 10-05 (question 59): choice 4 prints `音のよく似ている言葉の聞き違えたから`; preserved verbatim and marked `needsReview` on the question.
- Reading 11-01 (questions 60–62): the source prints an annual import volume of `約8834立方メートル`, although the surrounding totals strongly suggest a missing unit; question 61 also changes the passage's `毎日` framing to `1年`. Both are preserved; the passage and question 61 are marked `needsReview`.
- Reading 11-02 (questions 63–65): the source prints `技術えと` and `小回りが聞き`, while its own note uses `小回りが利く`; preserved and marked `needsReview` on the passage.
- Reading 11-03 (questions 66–68): the source includes `娘がもている`, `付随してきた` split around the note marker, and `どうやってやらなければならいんだろう`; preserved and marked `needsReview` on the passage. For question 67, the key gives choice 4 although the passage's explicit question about adding a photo function most directly matches choice 3; the printed key is preserved and question 67 is marked `needsReview`.
- Reading 13-01 (question 72): the answer key gives choice 3, while the passage's `われわれ自身の「ゲーム」` most directly denotes one's life/lifestyle (choice 1). The printed key is preserved and question 72 is marked `needsReview`.

## N2-2 / `n2-practice-02.json`

- PDF pages: questions 32–55; answer key 202–203. Page 55 is the block's blank trailing page; substantive questions end on page 54.
- Completeness: Problems 1–14, questions 1–75, every choice, all reading passages, and the full information-search notice are present.
- Answer key: visually checked against the block's own key on pages 202–203.
- Boundary check: question 1 (`これからも様々な国との相互理解を深めていこうと思う。`) and question 75 (`1次審査に通ったものは、どうすればいいか。`) were rechecked against pages 33 and 53 respectively.
- Sentence order: questions 45–49 were reconstructed as complete sentences. For each, `correctAnswer` equals `correctOrder[starPosition - 1]` and matches the printed key.
- Question 24: `勘定に入れず` in the room-occupancy context most directly means choice 3 (`合計に含まれない`), but the printed key gives choice 1 (`料金が不要である`). The key is preserved and the question is marked `needsReview`.
- Question 27: the source prints `そろそろ部屋の中に入ってきた`, for which none of the choices is a clean synonym; the printed key gives choice 4 (`しずかに`). The source and key are preserved and the question is marked `needsReview`.
- Cloze (questions 50–54): the source uses blank 53 twice. The printed key for question 52 is choice 2 (`しばらく`), although choice 1 (`なにしろ`) reads as the natural causal connector before `1930年代以来…`; the source/key are preserved and the group plus affected items are marked `needsReview`.
- Reading 10-02 (question 56): the source repeatedly prints `kca1`; it is preserved in the passage. The passage supports choice 1 (`速く歩けば300kcalぐらい消費するから`), while the key gives choice 2. The key is preserved; passage and question are marked `needsReview`.
- Other printed defects preserved in reading material include `ずぐ`, `素材が痛いんで`, `料理を食べてみもせず`, `訓練のつかわれた`, `しなくではならない`, `自分をよく見せない`, `間違いがあったのかもしてない`, `考えられていなかた`, `インタビユー`, `しゃべたがり`, and `意気悪く`. Their containing passages are marked `needsReview`; no silent editorial corrections were made.
- Isolated validator result: 75/75 questions, 0 critical errors, 15 intentional review warnings.

## N2-3 / `n2-practice-03.json`

- PDF pages: questions 56–64; answer key 204–205. Page 56 contains the cover and the beginning of Problem 1; page 64 contains the second Problem 14 notice.
- Completeness: Problems 1–14, questions 1–75, every choice, all reading passages, both employment notices, and both information-search notices are present.
- Answer key: all 75 `correctAnswer` values were visually checked against the block's own key on pages 204–205 and match it exactly.
- Boundary check: question 1 (`額にびっしょり、汗をかいた。`) on page 56 and question 75 (`みどり市のスーパーで働いている62歳の女性が習うことができるのはどれか。`) on page 63, together with the relevant yoga notice on page 64, were rechecked visually.
- Sentence order: questions 45–49 were reconstructed as complete sentences. For each, `correctAnswer` equals `correctOrder[starPosition - 1]` and matches the printed key.
- Question 2: choice 4 is printed as `うあらぎられ`; it is preserved verbatim and the question is marked `needsReview`.
- Reading 10-05 (question 59): the passage prints `日本では生まれた赤ちゃん` and the redundant-looking sequence `アメリカで生まれた赤ちゃんも、アメリカやアジアの諸国で生まれた赤ちゃんも`; these are preserved and the passage is marked `needsReview`.
- Reading 11-01 (questions 60–62): blank 60 and the supplied choices do not form a clean natural sentence (`食事をごちそうしたはずと具体的に…` under the printed key). Question 61's referent/choice wording is also awkward. For question 62, the key gives choice 1 (`外国人には使えない`) although the passage says the expression is difficult for foreigners to say and frames both producing and answering the expression as difficult, which more directly supports choice 4. The printed source and key are preserved; the passage and questions 60–62 are marked `needsReview`.
- Reading 11-02 (questions 63–65): question 63 choice 2 prints `ようにように`; question 64 choice 1 prints `リック`, and choice 2 has visibly defective punctuation/wording. These are preserved; the passage group and questions 63–64 are marked `needsReview`.
- Reading 11-03 (questions 66–68): the passage prints `赤白横色ピンク`. For question 66, choice 3 contradicts the passage's claim about producing various colors of roses, while the printed key gives choice 4. The source/key are preserved and the passage plus question 66 are marked `needsReview`.
- Reading 13-01 (questions 71–73): the opening prints `画国出身`, and the passage repeatedly prints `人括り`; these forms are preserved and the passage is marked `needsReview`.
- Information search (questions 74–75): the yoga notice prints `忙しいの毎日` and says correcting bodily distortion has `体調をよくする効果もありません`, contradicting the surrounding promotional wording. Both defects are preserved and the notice group is marked `needsReview`.
- Isolated validator result: 75/75 questions, Problems 1–14 present, 0 critical errors, 13 intentional review warnings.

## N2-4 / `n2-practice-04.json`

- PDF pages: questions 65–75; answer key 206–207. Page 65 contains the cover and the beginning of Problem 1; page 75 is the block's blank trailing page.
- Completeness: Problems 1–14, questions 1–75, every choice, all reading passages, both email opinion texts, and the complete information-search notice are present.
- Answer key: all 75 `correctAnswer` values were visually checked against the block's own key on pages 206–207 and match it exactly.
- Boundary check: question 1 (`ふかふかの温かいふとんは気持ちがいい。`) and question 75 (`各グループが売ろうと考えている販売品のリストである。販売できる品物がそろっているのはどれか。`) were rechecked against pages 65 and 73–74 respectively.
- Sentence order: questions 45–49 were reconstructed as complete sentences. For each, `correctAnswer` equals `correctOrder[starPosition - 1]` and matches the printed key. Question 47 prints `遅くれそうだ`; it is preserved and marked `needsReview`.
- Question 22 prints `其の件`; question 24 prints `解決していなければならない` in context. Both are preserved and marked `needsReview`.
- Reading 10-02 (question 56): the passage prints `細かい気持ちの誓い`; preserved and the passage is marked `needsReview`.
- Reading 10-03 (question 57): choice 3 prints `アイデアをを考える`; preserved and the question is marked `needsReview`.
- Reading 10-04 (question 58): the passage prints `わっかていても`; preserved and the passage is marked `needsReview`.
- Reading 10-05 (question 59): the choices include `重ねてことで`, `時代に変化`, a missing particle in `イメージ影響`, and `変られる`; preserved and the question is marked `needsReview`.
- Reading 11-01 (questions 60–62): printed defects include `クラッシュして入る`, `エンジンを温かめ`, `会話加わる`, `どれだけ話をしたのが`, `話を振らないと思います`, question 60 choice 1's `ほかの車が払える人`, and question 62 choice 1's `発言量を意識ながら`. They are preserved; the passage and questions 60–62 are marked `needsReview`.
- Reading 11-02 (questions 63–65): the source prints `高年者人口`, `とうぜん`, `同じデザイン大きな版`, and `欠点もありませが`; preserved and the passage is marked `needsReview`.
- Reading 11-03 (questions 66–68): the passage's note prints `胸を頑張って：自信を持って`; preserved and the passage is marked `needsReview`.
- Reading 13-01 (questions 71–73): the passage contains visibly awkward/defective constructions including `九九さえできない的な言い方`, `「教養」を「教養」の定義`, and `模試試験`; these are preserved and the passage is marked `needsReview`.
- Information search (questions 74–75): the notice prints `会場内のほかの店でかったもの`; preserved and the notice group is marked `needsReview`.
- Isolated validator result: 75/75 questions, Problems 1–14 present, 0 critical errors, 15 intentional review warnings.

## N2-5 / `n2-practice-05.json`

- PDF pages: questions 76–86; answer key 208–209. Page 76 contains the cover and the beginning of Problem 1; page 86 is the block's blank trailing page, so substantive questions end on page 85.
- Completeness: Problems 1–14, questions 1–75, every choice, all reading passages, all three comparison texts, and the complete information-search notice are present.
- Answer key: all 75 `correctAnswer` values were checked against the block's own key on pages 208–209 and match it exactly.
- Boundary check: question 1 (`話合いで決まったことを記録する。`) and question 75 (`研修旅行に参加するにはどうすればよいか。`) were checked against pages 76 and 85 respectively.
- Sentence order: questions 45–49 were reconstructed as complete sentences. For each, `correctAnswer` equals `correctOrder[starPosition - 1]` and matches the printed key. Question 46's star is in position 2; its full order is `これは / 義務ではなく / たんに / 自主的な`.
- Questions 37 and 40 print `したっがて` and `本棚にあった1冊の本に手にとって開いた`; both are preserved and marked `needsReview`.
- Cloze (questions 50–54): question 50 prints `にあったては` and `にはたっては`. The source forms and printed key are preserved; the passage group and question 50 are marked `needsReview`.
- Reading 10-01 (question 55): the passage prints `少ししかない木が吸い取られる`, apparently omitting the object being absorbed. The choices also contain visibly defective wording including `環境に適した水を植えなければならない`, `木を大量植える`, and `木をどんどん植えるようと`. They are preserved; passage and question are marked `needsReview`.
- Reading 10-02 (question 56): the letter prints `昨日夏`, `つきましたは`, and `よろしくお願い申し上げす`; preserved and the passage is marked `needsReview`.
- Reading 10-04 (question 58): the passage prints `自身をもたせたり` and `伸びていきようにする--------`; the question prints `ほめるこうい`. These are preserved; passage and question are marked `needsReview`.
- Reading 10-05 (question 59): the passage prints `接したきた` and `オールマイテイ`; preserved and the passage is marked `needsReview`.
- Reading 11-01 (questions 60–62): printed defects include a missing opening quote in `①喜んで食べてもらえる」`, `現代会社`, `他となりません`, and question 62's `食事のするとき`. They are preserved; the passage and question 62 are marked `needsReview`.
- Reading 11-02 (questions 63–65): the source prints `議論としていると` and the awkward construction `忘れてしまうことが往々にしてあります`; preserved and the passage is marked `needsReview`.
- Reading 11-03 (questions 66–68): the speaker says that an increase from 38 kg to 55 kg is 15 kg; the passage also prints `客の乗り物`, `食べったざんす`, and `あたしや②人間を捨てて野犬になりました`. Question 68 refers to `下線②` even though its choices and key concern the later relaxation statement marked ③. The printed text and key are preserved; the passage and question 68 are marked `needsReview`.
- Reading 12-01 (questions 69–70): the comparison text contains visibly broken spacing in `二重敬語はすべてだめだというわけではない 敬語は...` and prints `間違った敬語使い`; preserved and the passage is marked `needsReview`.
- Reading 13-01 (questions 71–73): question 71 choice 1 prints `ストラディパリウス`, differing from the passage's `ストラディバリウス`; the note prints `物やお金を手入れること`. These are preserved; the passage and question 71 are marked `needsReview`.
- Information search (questions 74–75): the notice prints `旅費を出発前日（21日）まだに`; preserved and the notice group is marked `needsReview`.
- Isolated validator result: 75/75 questions, Problems 1–14 present, 0 critical errors, 19 intentional review warnings.

## Batch 1 review / N2-1 through N2-5

- Scope: `n2-practice-01.json` through `n2-practice-05.json` only. N2-6 was not started.
- All five files use `source: "ORIGINAL"` and omit both `year` and `month`.
- Each file declares and loads exactly 75 questions, has continuous IDs 1–75, contains Problems 1–14, and has five `SENTENCE_ORDER` questions whose `correctOrder`, `starPosition`, and `correctAnswer` agree.
- Batch total: 375/375 questions.
- Isolated batch validator result: 5 exam files, 0 critical errors, 71 intentional review warnings (N2-1: 9; N2-2: 15; N2-3: 13; N2-4: 15; N2-5: 19).
- All known source defects and answer-key conflicts remain explicitly recorded above; none were silently corrected.

## N2-6 / `n2-practice-06.json`

- PDF pages: questions 87–95; answer key 210–211. Page 87 contains the cover and the beginning of Problem 1; page 95 contains the complete Problem 14 notice.
- Completeness: Problems 1–14, questions 1–75, every choice, all reading passages, the sleep-duration chart, both opinion emails, and the complete information-search notice are present.
- Answer key: all 75 `correctAnswer` values were visually checked against the block's own key on pages 210–211 and match it exactly.
- Boundary check: question 1 (`登山の途中、山小屋で休息をとった。`) and question 75 (`留学生の友人と屋上での記念撮影はできるか。`) were checked against pages 87 and 95 respectively.
- Sentence order: questions 45–49 were reconstructed as complete sentences. For each, `correctAnswer` equals `correctOrder[starPosition - 1]` and matches the printed key.
- Question 11: choice 4 prints the verb `ながめる` where the sentence requires a noun. The source and key are preserved and the question is marked `needsReview`.
- Question 25: choice 3 prints `ペースした`, apparently omitting `ト`; semantically, `貼り付けた` corresponds to paste, while the key gives choice 2 (`コピーした`). The source/key conflict is preserved and the question is marked `needsReview`.
- Question 32: the printed key gives choice 2 for `いっそう`, although choice 3 (`お酒を加えたら、料理がいっそうおいしくなった。`) is the standard usage and choice 2 requires `いっそ`. The printed key is preserved and the question is marked `needsReview`.
- Question 39: choice 2 prints `おぬきにしては`; preserved and marked `needsReview`.
- Problem 10's instruction prints `一つ選びない`; no question text was silently changed because the defect is in the heading rather than an item.
- Reading 10-03 (question 57): choices print `アンウンス` and `ブラットホーム`; preserved and the question is marked `needsReview`.
- Reading 10-04 (question 58): choice 2 prints `ヤンさんがが`; preserved and the question is marked `needsReview`.
- Reading 10-05 (question 59): the passage prints `睡眠をよる人`. The chart and all percentage combinations were transcribed from the source's embedded text and visually checked; the passage is marked `needsReview`.
- Reading 11-01 (questions 60–62): the passage prints `親元を始めて離れる`; preserved and the passage is marked `needsReview`.
- Reading 11-02 (questions 63–65): the note references for `餌食にする` and `議論のうず` are reversed between the body and note list (`注2`/`注3`). The printed references are preserved and the passage is marked `needsReview`.
- Reading 13-01 (questions 71–73): the passage prints `悩んだもあった`, and question 71 choice 1 prints `本も合ったらいいのに`; preserved and the passage plus question 71 are marked `needsReview`.
- Information search (questions 74–75): the notice prints `記念Yシャツ`, `利用規則に定めるの持ち込み`, and `パスポートの指示`; preserved and the notice group is marked `needsReview`.
- Isolated validator result: 75/75 questions, Problems 1–14 present, 0 critical errors, 12 intentional review warnings.

## N2-7 / `n2-practice-07.json`

- PDF pages: questions 96–105; answer key 212–213. Page 96 contains the cover and the beginning of Problem 1; page 105 contains the complete Problem 14 notice.
- Completeness: Problems 1–14, questions 1–75, every choice, all reading passages, the paired message-board posts, and the complete membership notice are present.
- Answer key: all 75 `correctAnswer` values were visually checked against the block's own key on pages 212–213 and match it exactly.
- Boundary check: question 1 (`部屋の隅に置いてある机にペンキを塗ってください。`) and question 75 (`育達メンバーズクラブに入会するにはどうすればよいか。`) were checked against pages 96 and 105 respectively.
- Sentence order: questions 45–49 were reconstructed as complete sentences. For each, `correctAnswer` equals `correctOrder[starPosition - 1]` and matches the printed key.
- Questions 29 and 30 print `呼ばれば` and `海水溶`; both are preserved and marked `needsReview`.
- Problem 10's instruction prints `一つ選びない`; no question text was silently changed because the defect is in the heading rather than an item.
- Reading 10-02 (question 56): the citation prints `健廉` and ends with a stray backtick; the question prints `合うている`, and choice 1 prints `曲腺`. These are preserved; the passage and question are marked `needsReview`.
- Reading 10-03 (question 57): the passage lacks the closing quotation mark after `「人の身になって考えてみる`; preserved and the passage is marked `needsReview`.
- Reading 10-04 (question 58): choice 1 prints the doubled punctuation `叱り、、`; preserved and the question is marked `needsReview`.
- Reading 10-05 (question 59): the passage opens with `1982年か2002年`; the question prints `とれか`, and choice 3 prints `1992年からにかけて`. These are preserved; the passage and question are marked `needsReview`.
- Reading 11-02 (questions 63–65): the passage prints `料学上`; question 64 choice 2 likewise prints `料学や技術`, and choice 4 prints `ひつよう`. These are preserved; the passage and question 64 are marked `needsReview`.
- Reading 11-03 (questions 66–68): the passage prints `「あなたはですか」`; question 66 choice 3 lacks an opening quotation mark. These are preserved; the passage and question 66 are marked `needsReview`.
- Reading 12-01 (questions 69–70): the posts print `ゴースト対策のしてある` and `引張って`; question 69 choice 4 prints `映ってします`. These are preserved; the passage and question 69 are marked `needsReview`.
- Reading 13-01 (questions 71–73): the passage prints `親の金銭的に、心理的負担`, note 7 defines `成果` as `取られたよい結果`, and question 72 choice 3 prints `子供の勉強しなければの気持`. These are preserved; the passage and question 72 are marked `needsReview`.
- Information search (questions 74–75): question 75 choice 4 uses the currency unit `100元` although the notice gives its fees in yen. The printed choice and key are preserved and question 75 is marked `needsReview`.
- Isolated validator result: 75/75 questions, Problems 1–14 present, 0 critical errors, 17 intentional review warnings.

Last fully completed block: N2-7.

Next block: N2-8 (not started).
