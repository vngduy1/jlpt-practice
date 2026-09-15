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

Last fully completed block: N2-4.

Next block: N2-5 (not started).
