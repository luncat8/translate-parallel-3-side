"use strict";

/* すきなことだけでいいです — LinguaMap map
   Source:   sources/source.ja.txt (romaji mirror in source.tr.txt;
             placed origin in original.tsv with the English text)
   Fixation: sources/fixation.json (79 lines, stanzas intact)
   Build:    python3 tools/song.py build --song sukina-koto-dake-de-ii-desu

   units[] stay in SOURCE (jp) word order; en/ru reorder via ord.
   tr mirrors the source mechanically, so tr cells follow jp order and
   punctuation. One meaning = one name for the whole song. */

const META = {
  title: "すきなことだけでいいです — LinguaMap",
  subtitle: "すきなことだけでいいです · parallel word map: 日本語 · Romaji · English · Русский",
  credit: "Mapped with the LinguaMap workflow (AGENTS.md): one meaning = one name across all columns · colour = part of speech (based on the Japanese) · romaji mirrors the Japanese word order. Chorus and refrain lines deliberately reuse the same names; the validator reports the resulting duplicate-occurrence warnings as intended.",
  columns: ["ru", "en", "jp", "tr"],
  columnTitles: { ru: "Русский", en: "English", jp: "日本語", tr: "Romaji" },
  sourceKey: "jp",
  translitKey: "tr",
  trMirror: true,
  posLabels: {
    n: "noun", npr: "proper noun", v: "verb", adj: "i-adj", adjna: "na-adj",
    adv: "adverb", pron: "pronoun", conj: "conjunction",
    interj: "interjection", part: "particle", q: "question word"
  },
  posOrder: ["n", "npr", "v", "adj", "adjna", "adv", "pron", "conj", "interj", "part", "q"]
};

const DATA = [
  { type: "section", label: "Verse 1 — weekdays vs. weekend" },

  /* no.1 — 平日は嫌　休みが好き */
  { type: "line", src: "平日は嫌　休みが好き", units: [
    { name: "weekday", pos: "n", jp: "平日は", tr: "heijitsu wa", en: "weekdays", ru: "будни" },
    { name: "hate", pos: "adjna", jp: "嫌　", tr: "iya ", en: "I hate", ru: "ненавижу" },
    { name: "holiday", pos: "n", jp: "休みが", tr: "yasumi ga", en: "the weekend", ru: "выходной" },
    { name: "like", pos: "adjna", jp: "好き", tr: "suki", en: "I love", ru: "люблю" }
  ]
  },

  /* no.2 — 仕事は嫌　二度寝が好き */
  { type: "line", src: "仕事は嫌　二度寝が好き", units: [
    { name: "work", pos: "n", jp: "仕事は", tr: "shigoto wa", en: "work", ru: "работу" },
    { name: "hate", pos: "adjna", jp: "嫌　", tr: "iya ", en: "I hate", ru: "ненавижу" },
    { name: "second_sleep", pos: "n", jp: "二度寝が", tr: "nidone ga", en: "going back to sleep", ru: "поспать ещё" },
    { name: "like", pos: "adjna", jp: "好き", tr: "suki", en: "I love", ru: "люблю" }
  ]
  },

  /* no.3 — 怠けたまま暮らすの無理 */
  { type: "line", src: "怠けたまま暮らすの無理", units: [
    { name: "lazy", pos: "v", jp: "怠けたまま", tr: "namaketa mama", en: "lazily", ru: "лениво" },
    { name: "living", pos: "v", jp: "暮らすの", tr: "kurasu no", en: "living", ru: "жить" },
    { name: "impossible", pos: "adjna", jp: "無理", tr: "muri", en: "is impossible", ru: "невозможно" }
  ]
  },

  /* no.4 — 遠のいていく意識 */
  { type: "line", src: "遠のいていく意識", units: [
    { name: "distant", pos: "v", jp: "遠のいていく", tr: "toonoite iku", en: "recedes", ru: "уходит" },
    { name: "consciousness", pos: "n", jp: "意識", tr: "ishiki", en: "my consciousness", ru: "сознание" }
  ]
  },

  { type: "section", label: "Verse 2 — vegetables and sweets" },

  /* no.5 — 野菜は嫌　ハンバーグが好き */
  { type: "line", src: "野菜は嫌　ハンバーグが好き", units: [
    { name: "vegetable", pos: "n", jp: "野菜は", tr: "yasai wa", en: "vegetables", ru: "овощи" },
    { name: "hate", pos: "adjna", jp: "嫌　", tr: "iya ", en: "I hate", ru: "ненавижу" },
    { name: "hamburger", pos: "n", jp: "ハンバーグが", tr: "hanbaagu ga", en: "hamburgers", ru: "бургеры" },
    { name: "like", pos: "adjna", jp: "好き", tr: "suki", en: "I love", ru: "люблю" }
  ]
  },

  /* no.6 — 麦茶は嫌　ジュースが好き */
  { type: "line", src: "麦茶は嫌　ジュースが好き", units: [
    { name: "barley_tea", pos: "n", jp: "麦茶は", tr: "mugicha wa", en: "barley tea", ru: "ячменный чай" },
    { name: "hate", pos: "adjna", jp: "嫌　", tr: "iya ", en: "I hate", ru: "ненавижу" },
    { name: "juice", pos: "n", jp: "ジュースが", tr: "juusu ga", en: "juice", ru: "сок" },
    { name: "like", pos: "adjna", jp: "好き", tr: "suki", en: "I love", ru: "люблю" }
  ]
  },

  /* no.7 — 甘えんな　でも甘味は好き */
  { type: "line", src: "甘えんな　でも甘味は好き", units: [
    { name: "dont_be_sweet", pos: "v", jp: "甘えんな　", tr: "amaenna ", en: "don't be sweet on me,", ru: "не будь со мной милым," },
    { name: "but", pos: "conj", jp: "でも", tr: "demo", en: "but", ru: "но" },
    { name: "sweetness", pos: "n", jp: "甘味は", tr: "kanmi wa", en: "sweet things", ru: "сладкое" },
    { name: "like", pos: "adjna", jp: "好き", tr: "suki", en: "I love", ru: "люблю" }
  ], ord: { en: ["dont_be_sweet", "but", "like", "sweetness"], ru: ["dont_be_sweet", "but", "like", "sweetness"] }
  },

  /* no.8 — 生前の１ページ */
  { type: "line", src: "生前の１ページ", units: [
    { name: "lifetime", pos: "n", jp: "生前の", tr: "seizen no", en: "from my life", ru: "из моей жизни" },
    { name: "one_page", pos: "n", jp: "１ページ", tr: "ichi-peeji", en: "the first page", ru: "первая страница" }
  ]
  },

  { type: "section", label: "Pre-chorus — staring only at what I like" },

  /* no.9 — 好きなことだけ見つめて */
  { type: "line", src: "好きなことだけ見つめて", units: [
    { name: "i_like", pos: "n", jp: "好きなこと", tr: "suki na koto", en: "things I like,", ru: "то, что мне нравится," },
    { name: "only", pos: "adv", jp: "だけ", tr: "dake", en: "only", ru: "только" },
    { name: "stare_at", pos: "v", jp: "見つめて", tr: "mitsumete", en: "I look at", ru: "смотрю на" }
  ], ord: { en: ["only", "i_like", "stare_at"], ru: ["only", "i_like", "stare_at"] }
  },

  /* no.10 — だんだん　視力が弱くなる */
  { type: "line", src: "だんだん　視力が弱くなる", units: [
    { name: "little_by_little", pos: "adv", jp: "だんだん　", tr: "dandan ", en: "gradually", ru: "постепенно" },
    { name: "eyesight", pos: "n", jp: "視力が", tr: "shiryoku ga", en: "my eyesight", ru: "зрение" },
    { name: "weaken", pos: "v", jp: "弱くなる", tr: "yowaku naru", en: "grows weaker", ru: "слабеет" }
  ]
  },

  /* no.11 — 好きなことで満たされて */
  { type: "line", src: "好きなことで満たされて", units: [
    { name: "i_like", pos: "n", jp: "好きなことで", tr: "suki na koto de", en: "with things I like", ru: "тем, что нравится," },
    { name: "filling", pos: "v", jp: "満たされて", tr: "mitasarete", en: "I am filled", ru: "наполняюсь" }
  ], ord: { en: ["filling", "i_like"], ru: ["filling", "i_like"] }
  },

  /* no.12 — だんだん　頭が悪くなる */
  { type: "line", src: "だんだん　頭が悪くなる", units: [
    { name: "little_by_little", pos: "adv", jp: "だんだん　", tr: "dandan ", en: "gradually", ru: "постепенно" },
    { name: "head", pos: "n", jp: "頭が", tr: "atama ga", en: "my mind", ru: "голова" },
    { name: "dull", pos: "v", jp: "悪くなる", tr: "waruku naru", en: "grows duller", ru: "тупеет" }
  ]
  },

  { type: "section", label: "Chorus — only what I like" },

  /* no.13 — すきなことだけでいいです */
  { type: "line", src: "すきなことだけでいいです", units: [
    { name: "i_like", pos: "n", jp: "すきなこと", tr: "suki na koto", en: "the things I like,", ru: "то, что нравится," },
    { name: "only", pos: "adv", jp: "だけ", tr: "dake", en: "only", ru: "только" },
    { name: "thats_fine", pos: "adj", jp: "でいいです", tr: "de ii desu", en: "is fine with me", ru: "меня устраивает" }
  ], ord: { en: ["only", "i_like", "thats_fine"] }
  },

  /* no.14 — みんな　好きなことが好きなんです */
  { type: "line", src: "みんな　好きなことが好きなんです", units: [
    { name: "everyone", pos: "n", jp: "みんな　", tr: "minna ", en: "everyone", ru: "все" },
    { name: "i_like", pos: "n", jp: "好きなことが", tr: "suki na koto ga", en: "the things they like", ru: "то, что нравится," },
    { name: "like", pos: "adjna", jp: "好きなんです", tr: "suki nan desu", en: "they love", ru: "они любят" }
  ]
  },

  /* no.15 — すきなことだけでいいです */
  { type: "line", src: "すきなことだけでいいです", units: [
    { name: "i_like", pos: "n", jp: "すきなこと", tr: "suki na koto", en: "the things I like,", ru: "то, что нравится," },
    { name: "only", pos: "adv", jp: "だけ", tr: "dake", en: "only", ru: "только" },
    { name: "thats_fine", pos: "adj", jp: "でいいです", tr: "de ii desu", en: "is fine with me", ru: "меня устраивает" }
  ], ord: { en: ["only", "i_like", "thats_fine"] }
  },

  /* no.16 — みんな　嫌なことは嫌なんです */
  { type: "line", src: "みんな　嫌なことは嫌なんです", units: [
    { name: "everyone", pos: "n", jp: "みんな　", tr: "minna ", en: "everyone", ru: "все" },
    { name: "dislike", pos: "n", jp: "嫌なことは", tr: "iya na koto wa", en: "the things they dislike", ru: "то, что не нравится," },
    { name: "hate", pos: "adjna", jp: "嫌なんです", tr: "iya nan desu", en: "they hate", ru: "они ненавидят" }
  ]
  },

  /* no.17 — すきなことだけでいいです */
  { type: "line", src: "すきなことだけでいいです", units: [
    { name: "i_like", pos: "n", jp: "すきなこと", tr: "suki na koto", en: "the things I like,", ru: "то, что нравится," },
    { name: "only", pos: "adv", jp: "だけ", tr: "dake", en: "only", ru: "только" },
    { name: "thats_fine", pos: "adj", jp: "でいいです", tr: "de ii desu", en: "is fine with me", ru: "меня устраивает" }
  ], ord: { en: ["only", "i_like", "thats_fine"] }
  },

  /* no.18 — ほんと　すきなことだけでいいです */
  { type: "line", src: "ほんと　すきなことだけでいいです", units: [
    { name: "really", pos: "adv", jp: "ほんと　", tr: "honto ", en: "really", ru: "правда" },
    { name: "i_like", pos: "n", jp: "すきなこと", tr: "suki na koto", en: "the things I like,", ru: "то, что нравится," },
    { name: "only", pos: "adv", jp: "だけ", tr: "dake", en: "only", ru: "только" },
    { name: "thats_fine", pos: "adj", jp: "でいいです", tr: "de ii desu", en: "is fine with me", ru: "меня устраивает" }
  ], ord: { en: ["really", "only", "i_like", "thats_fine"] }
  },

  /* no.19 — 全人類が好きなことやったら */
  { type: "line", src: "全人類が好きなことやったら", units: [
    { name: "humanity", pos: "n", jp: "全人類が", tr: "zenjinrui ga", en: "all of humanity", ru: "всё человечество" },
    { name: "i_like", pos: "n", jp: "好きなこと", tr: "suki na koto", en: "did the things they like,", ru: "сделало то, что нравится," },
    { name: "if", pos: "v", jp: "やったら", tr: "yattara", en: "if", ru: "если" }
  ], ord: { en: ["if", "humanity", "i_like"], ru: ["if", "humanity", "i_like"] }
  },

  /* no.20 — 世界は滅亡するけど */
  { type: "line", src: "世界は滅亡するけど", units: [
    { name: "world", pos: "n", jp: "世界は", tr: "sekai wa", en: "the world", ru: "мир" },
    { name: "perish", pos: "v", jp: "滅亡する", tr: "metsubou suru", en: "would turn to ruin", ru: "погиб бы," },
    { name: "though", pos: "conj", jp: "けど", tr: "kedo", en: "though", ru: "но" }
  ], ord: { en: ["though", "world", "perish"], ru: ["though", "world", "perish"] }
  },

  { type: "section", label: "Verse 3 — you and someone else" },

  /* no.21 — すきなことだけでいいです */
  { type: "line", src: "すきなことだけでいいです", units: [
    { name: "i_like", pos: "n", jp: "すきなこと", tr: "suki na koto", en: "the things I like,", ru: "то, что нравится," },
    { name: "only", pos: "adv", jp: "だけ", tr: "dake", en: "only", ru: "только" },
    { name: "thats_fine", pos: "adj", jp: "でいいです", tr: "de ii desu", en: "is fine with me", ru: "меня устраивает" }
  ], ord: { en: ["only", "i_like", "thats_fine"] }
  },

  /* no.22 — 君のことが　ほんとに好きなんです */
  { type: "line", src: "君のことが　ほんとに好きなんです", units: [
    { name: "about_you", pos: "n", jp: "君のことが　", tr: "kimi no koto ga ", en: "about you", ru: "в тебе" },
    { name: "really", pos: "adv", jp: "ほんとに", tr: "honto ni", en: "really", ru: "по-настоящему" },
    { name: "like", pos: "adjna", jp: "好きなんです", tr: "suki nan desu", en: "I like", ru: "люблю" }
  ]
  },

  /* no.23 — すきなことだけでいいです */
  { type: "line", src: "すきなことだけでいいです", units: [
    { name: "i_like", pos: "n", jp: "すきなこと", tr: "suki na koto", en: "the things I like,", ru: "то, что нравится," },
    { name: "only", pos: "adv", jp: "だけ", tr: "dake", en: "only", ru: "только" },
    { name: "thats_fine", pos: "adj", jp: "でいいです", tr: "de ii desu", en: "is fine with me", ru: "меня устраивает" }
  ], ord: { en: ["only", "i_like", "thats_fine"] }
  },

  /* no.24 — 君は違う誰かが好きなんです */
  { type: "line", src: "君は違う誰かが好きなんです", units: [
    { name: "you", pos: "pron", jp: "君は", tr: "kimi wa", en: "you", ru: "ты" },
    { name: "another", pos: "n", jp: "違う誰かが", tr: "chigau dareka ga", en: "someone else", ru: "кто-то другой" },
    { name: "like", pos: "adjna", jp: "好きなんです", tr: "suki nan desu", en: "you like", ru: "тебе нравится" }
  ]
  },

  /* no.25 — すきなことだけでいいです */
  { type: "line", src: "すきなことだけでいいです", units: [
    { name: "i_like", pos: "n", jp: "すきなこと", tr: "suki na koto", en: "the things I like,", ru: "то, что нравится," },
    { name: "only", pos: "adv", jp: "だけ", tr: "dake", en: "only", ru: "только" },
    { name: "thats_fine", pos: "adj", jp: "でいいです", tr: "de ii desu", en: "is fine with me", ru: "меня устраивает" }
  ], ord: { en: ["only", "i_like", "thats_fine"] }
  },

  { type: "section", label: "Bridge — if everyone did what they like" },

  /* no.26 — やっぱ　それだけじゃ難しいです */
  { type: "line", src: "やっぱ　それだけじゃ難しいです", units: [
    { name: "after_all", pos: "adv", jp: "やっぱ　", tr: "yappa ", en: "after all", ru: "в конце концов" },
    { name: "only_that", pos: "adv", jp: "それだけじゃ", tr: "sore dake ja", en: "only that", ru: "только это" },
    { name: "hard", pos: "adj", jp: "難しいです", tr: "muzukashii desu", en: "is difficult", ru: "сложно" }
  ]
  },

  /* no.27 — 全人類が幸せになったら */
  { type: "line", src: "全人類が幸せになったら", units: [
    { name: "humanity", pos: "n", jp: "全人類が", tr: "zenjinrui ga", en: "all of humanity", ru: "всё человечество" },
    { name: "happy", pos: "adjna", jp: "幸せに", tr: "shiawase ni", en: "became happy,", ru: "стало счастливым," },
    { name: "if", pos: "v", jp: "なったら", tr: "nattara", en: "if", ru: "если" }
  ], ord: { en: ["if", "humanity", "happy"], ru: ["if", "humanity", "happy"] }
  },

  /* no.28 — 宇宙が迷惑するから */
  { type: "line", src: "宇宙が迷惑するから", units: [
    { name: "universe", pos: "n", jp: "宇宙が", tr: "uchuu ga", en: "the universe", ru: "вселенная" },
    { name: "trouble", pos: "v", jp: "迷惑する", tr: "meiwaku suru", en: "would be troubled", ru: "возмутилась бы," },
    { name: "because", pos: "conj", jp: "から", tr: "kara", en: "because", ru: "потому что" }
  ], ord: { en: ["because", "universe", "trouble"], ru: ["because", "universe", "trouble"] }
  },

  { type: "section", label: "Verse 4 — tastes" },

  /* no.29 — 天使は嫌　悪魔が好き */
  { type: "line", src: "天使は嫌　悪魔が好き", units: [
    { name: "angel", pos: "n", jp: "天使は", tr: "tenshi wa", en: "angels", ru: "ангелы" },
    { name: "hate", pos: "adjna", jp: "嫌　", tr: "iya ", en: "I hate", ru: "ненавижу" },
    { name: "demon", pos: "n", jp: "悪魔が", tr: "akuma ga", en: "demons", ru: "демоны" },
    { name: "like", pos: "adjna", jp: "好き", tr: "suki", en: "I love", ru: "люблю" }
  ]
  },

  /* no.30 — 天国は嫌　地獄が好き */
  { type: "line", src: "天国は嫌　地獄が好き", units: [
    { name: "heaven", pos: "n", jp: "天国は", tr: "tengoku wa", en: "heaven", ru: "рай" },
    { name: "hate", pos: "adjna", jp: "嫌　", tr: "iya ", en: "I hate", ru: "ненавижу" },
    { name: "hell", pos: "n", jp: "地獄が", tr: "jigoku ga", en: "hell", ru: "ад" },
    { name: "like", pos: "adjna", jp: "好き", tr: "suki", en: "I love", ru: "люблю" }
  ]
  },

  /* no.31 — あべこべだった　君の趣味 */
  { type: "line", src: "あべこべだった　君の趣味", units: [
    { name: "upside_down", pos: "adjna", jp: "あべこべだった　", tr: "abekobe datta ", en: "were the opposite", ru: "были наоборот" },
    { name: "your_taste", pos: "n", jp: "君の趣味", tr: "kimi no shumi", en: "your tastes", ru: "твои вкусы" }
  ]
  },

  /* no.32 — 人それぞれのクレイジー */
  { type: "line", src: "人それぞれのクレイジー", units: [
    { name: "each_person", pos: "n", jp: "人それぞれの", tr: "hito sorezore no", en: "each person's", ru: "у каждого своё" },
    { name: "crazy", pos: "n", jp: "クレイジー", tr: "kureijii", en: "crazy", ru: "сумасшествие" }
  ]
  },

  { type: "section", label: "Verse 5 — living things, the real, the virtual" },

  /* no.33 — 生物は嫌　機械が好き */
  { type: "line", src: "生物は嫌　機械が好き", units: [
    { name: "creature", pos: "n", jp: "生物は", tr: "seibutsu wa", en: "living things", ru: "живое" },
    { name: "hate", pos: "adjna", jp: "嫌　", tr: "iya ", en: "I hate", ru: "ненавижу" },
    { name: "machine", pos: "n", jp: "機械が", tr: "kikai ga", en: "machines", ru: "машины" },
    { name: "like", pos: "adjna", jp: "好き", tr: "suki", en: "I love", ru: "люблю" }
  ]
  },

  /* no.34 — リアルは嫌　虚像が好き */
  { type: "line", src: "リアルは嫌　虚像が好き", units: [
    { name: "real", pos: "n", jp: "リアルは", tr: "riaru wa", en: "the real", ru: "реальное" },
    { name: "hate", pos: "adjna", jp: "嫌　", tr: "iya ", en: "I hate", ru: "ненавижу" },
    { name: "virtual", pos: "n", jp: "虚像が", tr: "kyozou ga", en: "the virtual", ru: "иллюзию" },
    { name: "like", pos: "adjna", jp: "好き", tr: "suki", en: "I love", ru: "люблю" }
  ]
  },

  /* no.35 — 偏っていた　君の趣味 */
  { type: "line", src: "偏っていた　君の趣味", units: [
    { name: "biased", pos: "v", jp: "偏っていた　", tr: "katayotte ita ", en: "were biased", ru: "были однобоки" },
    { name: "your_taste", pos: "n", jp: "君の趣味", tr: "kimi no shumi", en: "your tastes", ru: "твои вкусы" }
  ]
  },

  /* no.36 — 悪化して思考停止 */
  { type: "line", src: "悪化して思考停止", units: [
    { name: "worsening", pos: "v", jp: "悪化して", tr: "akka shite", en: "worsening", ru: "ухудшаясь" },
    { name: "thinking_stops", pos: "v", jp: "思考停止", tr: "shikouteishi", en: "thinking stops", ru: "мышление останавливается" }
  ]
  },

  { type: "section", label: "Pre-chorus 2 — surrounded by likes" },

  /* no.37 — 好きなことに囲まれて */
  { type: "line", src: "好きなことに囲まれて", units: [
    { name: "surrounded", pos: "v", jp: "好きなことに囲まれて", tr: "suki na koto ni kakomarete", en: "surrounded by things I like", ru: "окружённый тем, что нравится" }
  ]
  },

  /* no.38 — 嫌なことが許せなくなる */
  { type: "line", src: "嫌なことが許せなくなる", units: [
    { name: "unforgiving", pos: "v", jp: "嫌なことが許せなくなる", tr: "iya na koto ga yurusenaku naru", en: "I stop forgiving what I dislike", ru: "перестаю прощать то, что не нравится" }
  ]
  },

  /* no.39 — 好きなことだけで生きて */
  { type: "line", src: "好きなことだけで生きて", units: [
    { name: "living_only", pos: "v", jp: "好きなことだけで生きて", tr: "suki na koto dake de ikite", en: "living only with what I like", ru: "жить только тем, что нравится" }
  ]
  },

  /* no.40 — どこかの誰かに恨まれる */
  { type: "line", src: "どこかの誰かに恨まれる", units: [
    { name: "resented", pos: "v", jp: "どこかの誰かに恨まれる", tr: "dokoka no dareka ni uramareru", en: "resented by someone, somewhere", ru: "кто-то где-то меня ненавидит" }
  ]
  },

  { type: "section", label: "Chorus — only what I like (reprise)" },

  /* no.41 — すきなことだけでいいです */
  { type: "line", src: "すきなことだけでいいです", units: [
    { name: "i_like", pos: "n", jp: "すきなこと", tr: "suki na koto", en: "the things I like,", ru: "то, что нравится," },
    { name: "only", pos: "adv", jp: "だけ", tr: "dake", en: "only", ru: "только" },
    { name: "thats_fine", pos: "adj", jp: "でいいです", tr: "de ii desu", en: "is fine with me", ru: "меня устраивает" }
  ], ord: { en: ["only", "i_like", "thats_fine"] }
  },

  /* no.42 — みんな　好きなことが好きなんです */
  { type: "line", src: "みんな　好きなことが好きなんです", units: [
    { name: "everyone", pos: "n", jp: "みんな　", tr: "minna ", en: "everyone", ru: "все" },
    { name: "i_like", pos: "n", jp: "好きなことが", tr: "suki na koto ga", en: "the things they like", ru: "то, что нравится," },
    { name: "like", pos: "adjna", jp: "好きなんです", tr: "suki nan desu", en: "they love", ru: "они любят" }
  ]
  },

  /* no.43 — すきなことだけでいいです */
  { type: "line", src: "すきなことだけでいいです", units: [
    { name: "i_like", pos: "n", jp: "すきなこと", tr: "suki na koto", en: "the things I like,", ru: "то, что нравится," },
    { name: "only", pos: "adv", jp: "だけ", tr: "dake", en: "only", ru: "только" },
    { name: "thats_fine", pos: "adj", jp: "でいいです", tr: "de ii desu", en: "is fine with me", ru: "меня устраивает" }
  ], ord: { en: ["only", "i_like", "thats_fine"] }
  },

  /* no.44 — みんな　嫌なことは嫌なんです */
  { type: "line", src: "みんな　嫌なことは嫌なんです", units: [
    { name: "everyone", pos: "n", jp: "みんな　", tr: "minna ", en: "everyone", ru: "все" },
    { name: "dislike", pos: "n", jp: "嫌なことは", tr: "iya na koto wa", en: "the things they dislike", ru: "то, что не нравится," },
    { name: "hate", pos: "adjna", jp: "嫌なんです", tr: "iya nan desu", en: "they hate", ru: "они ненавидят" }
  ]
  },

  /* no.45 — すきなことだけでいいです */
  { type: "line", src: "すきなことだけでいいです", units: [
    { name: "i_like", pos: "n", jp: "すきなこと", tr: "suki na koto", en: "the things I like,", ru: "то, что нравится," },
    { name: "only", pos: "adv", jp: "だけ", tr: "dake", en: "only", ru: "только" },
    { name: "thats_fine", pos: "adj", jp: "でいいです", tr: "de ii desu", en: "is fine with me", ru: "меня устраивает" }
  ], ord: { en: ["only", "i_like", "thats_fine"] }
  },

  /* no.46 — ほんと　すきなことだけでいいです */
  { type: "line", src: "ほんと　すきなことだけでいいです", units: [
    { name: "really", pos: "adv", jp: "ほんと　", tr: "honto ", en: "really", ru: "правда" },
    { name: "i_like", pos: "n", jp: "すきなこと", tr: "suki na koto", en: "the things I like,", ru: "то, что нравится," },
    { name: "only", pos: "adv", jp: "だけ", tr: "dake", en: "only", ru: "только" },
    { name: "thats_fine", pos: "adj", jp: "でいいです", tr: "de ii desu", en: "is fine with me", ru: "меня устраивает" }
  ], ord: { en: ["really", "only", "i_like", "thats_fine"] }
  },

  /* no.47 — 全人類が好きなことやったら */
  { type: "line", src: "全人類が好きなことやったら", units: [
    { name: "humanity", pos: "n", jp: "全人類が", tr: "zenjinrui ga", en: "all of humanity", ru: "всё человечество" },
    { name: "i_like", pos: "n", jp: "好きなこと", tr: "suki na koto", en: "did the things they like,", ru: "сделало то, что нравится," },
    { name: "if", pos: "v", jp: "やったら", tr: "yattara", en: "if", ru: "если" }
  ], ord: { en: ["if", "humanity", "i_like"], ru: ["if", "humanity", "i_like"] }
  },

  /* no.48 — 世界は滅亡するけど */
  { type: "line", src: "世界は滅亡するけど", units: [
    { name: "world", pos: "n", jp: "世界は", tr: "sekai wa", en: "the world", ru: "мир" },
    { name: "perish", pos: "v", jp: "滅亡する", tr: "metsubou suru", en: "would turn to ruin", ru: "погиб бы," },
    { name: "though", pos: "conj", jp: "けど", tr: "kedo", en: "though", ru: "но" }
  ], ord: { en: ["though", "world", "perish"], ru: ["though", "world", "perish"] }
  },

  { type: "section", label: "Verse 6 — friends" },

  /* no.49 — すきなことだけでいいです */
  { type: "line", src: "すきなことだけでいいです", units: [
    { name: "i_like", pos: "n", jp: "すきなこと", tr: "suki na koto", en: "the things I like,", ru: "то, что нравится," },
    { name: "only", pos: "adv", jp: "だけ", tr: "dake", en: "only", ru: "только" },
    { name: "thats_fine", pos: "adj", jp: "でいいです", tr: "de ii desu", en: "is fine with me", ru: "меня устраивает" }
  ], ord: { en: ["only", "i_like", "thats_fine"] }
  },

  /* no.50 — ずっと　仲間と笑っていたいんです */
  { type: "line", src: "ずっと　仲間と笑っていたいんです", units: [
    { name: "always", pos: "adv", jp: "ずっと　", tr: "zutto ", en: "all the time", ru: "всё время" },
    { name: "friends", pos: "n", jp: "仲間と", tr: "nakama to", en: "with my friends", ru: "с друзьями" },
    { name: "want_smile", pos: "v", jp: "笑っていたいんです", tr: "waratte itai n desu", en: "I want to smile", ru: "хочу улыбаться" }
  ], ord: { en: ["friends", "always", "want_smile"], ru: ["friends", "always", "want_smile"] }
  },

  /* no.51 — すきなことだけでいいです */
  { type: "line", src: "すきなことだけでいいです", units: [
    { name: "i_like", pos: "n", jp: "すきなこと", tr: "suki na koto", en: "the things I like,", ru: "то, что нравится," },
    { name: "only", pos: "adv", jp: "だけ", tr: "dake", en: "only", ru: "только" },
    { name: "thats_fine", pos: "adj", jp: "でいいです", tr: "de ii desu", en: "is fine with me", ru: "меня устраивает" }
  ], ord: { en: ["only", "i_like", "thats_fine"] }
  },

  /* no.52 — だけど　仲間が全然いないんです */
  { type: "line", src: "だけど　仲間が全然いないんです", units: [
    { name: "but", pos: "conj", jp: "だけど　", tr: "dakedo ", en: "but", ru: "но" },
    { name: "friends", pos: "n", jp: "仲間が", tr: "nakama ga", en: "my friends", ru: "друзья" },
    { name: "not_at_all", pos: "adv", jp: "全然", tr: "zenzen", en: "at all", ru: "совсем" },
    { name: "have", pos: "v", jp: "いないんです", tr: "inai n desu", en: "are not there", ru: "не рядом" }
  ]
  },

  /* no.53 — すきなことだけでいいです */
  { type: "line", src: "すきなことだけでいいです", units: [
    { name: "i_like", pos: "n", jp: "すきなこと", tr: "suki na koto", en: "the things I like,", ru: "то, что нравится," },
    { name: "only", pos: "adv", jp: "だけ", tr: "dake", en: "only", ru: "только" },
    { name: "thats_fine", pos: "adj", jp: "でいいです", tr: "de ii desu", en: "is fine with me", ru: "меня устраивает" }
  ], ord: { en: ["only", "i_like", "thats_fine"] }
  },

  { type: "section", label: "Bridge 2 — wishes" },

  /* no.54 — やっぱ　それだけじゃ難しいです */
  { type: "line", src: "やっぱ　それだけじゃ難しいです", units: [
    { name: "after_all", pos: "adv", jp: "やっぱ　", tr: "yappa ", en: "after all", ru: "в конце концов" },
    { name: "only_that", pos: "adv", jp: "それだけじゃ", tr: "sore dake ja", en: "only that", ru: "только это" },
    { name: "hard", pos: "adj", jp: "難しいです", tr: "muzukashii desu", en: "is difficult", ru: "сложно" }
  ]
  },

  /* no.55 — 全人類の願いが叶ったら */
  { type: "line", src: "全人類の願いが叶ったら", units: [
    { name: "humanity", pos: "n", jp: "全人類の", tr: "zenjinrui no", en: "all of humanity's", ru: "всего человечества" },
    { name: "wish", pos: "n", jp: "願いが", tr: "negai ga", en: "wishes", ru: "желания" },
    { name: "granted", pos: "v", jp: "叶ったら", tr: "kanattara", en: "were granted,", ru: "сбылись бы," }
  ], ord: { ru: ["wish", "humanity", "granted"] }
  },

  /* no.56 — 地球が爆発するから */
  { type: "line", src: "地球が爆発するから", units: [
    { name: "earth", pos: "n", jp: "地球が", tr: "chikyuu ga", en: "the earth", ru: "земля" },
    { name: "explode", pos: "v", jp: "爆発する", tr: "bakuhatsu suru", en: "would explode", ru: "взорвалась бы," },
    { name: "because", pos: "conj", jp: "から", tr: "kara", en: "because", ru: "потому что" }
  ], ord: { en: ["because", "earth", "explode"], ru: ["because", "earth", "explode"] }
  },

  { type: "section", label: "Outro — the promise and the rain" },

  /* no.57 — 待ち合わせの約束があった */
  { type: "line", src: "待ち合わせの約束があった", units: [
    { name: "meeting", pos: "n", jp: "待ち合わせの約束が", tr: "machiawase no yakusoku ga", en: "a promise to meet", ru: "обещание встретиться" },
    { name: "there_was", pos: "v", jp: "あった", tr: "atta", en: "I had made", ru: "было" }
  ]
  },

  /* no.58 — 雨が嫌だから　行かなかった */
  { type: "line", src: "雨が嫌だから　行かなかった", units: [
    { name: "rain", pos: "n", jp: "雨が嫌だから　", tr: "ame ga iya dakara ", en: "because I dislike the rain,", ru: "потому что ненавижу дождь," },
    { name: "not_go", pos: "v", jp: "行かなかった", tr: "ikanakatta", en: "I did not go", ru: "не пошёл" }
  ]
  },

  /* no.59 — 出かけてたら　良いことあったかな */
  { type: "line", src: "出かけてたら　良いことあったかな", units: [
    { name: "if_went", pos: "v", jp: "出かけてたら　", tr: "dekaketetara ", en: "if I had gone out", ru: "если бы вышел" },
    { name: "good_thing", pos: "n", jp: "良いこと", tr: "ii koto", en: "something good", ru: "что-то хорошее" },
    { name: "would_have_happened", pos: "v", jp: "あったかな", tr: "atta kana", en: "would have happened", ru: "случилось бы" }
  ]
  },

  /* no.60 — 今際の際の走馬灯 */
  { type: "line", src: "今際の際の走馬灯", units: [
    { name: "last_moment", pos: "n", jp: "今際の際の", tr: "imawakiwa no", en: "in my last moments", ru: "в последний миг" },
    { name: "life_flashes", pos: "n", jp: "走馬灯", tr: "soumatou", en: "my life flashes before my eyes", ru: "жизнь проносится перед глазами" }
  ]
  },

  { type: "section", label: "Final chorus — fading" },

  /* no.61 — 好きなことだけでいいです… */
  { type: "line", src: "好きなことだけでいいです…", units: [
    { name: "i_like", pos: "n", jp: "好きなこと", tr: "suki na koto", en: "the things I like,", ru: "то, что нравится," },
    { name: "only", pos: "adv", jp: "だけ", tr: "dake", en: "only", ru: "только" },
    { name: "thats_fine", pos: "adj", jp: "でいいです…", tr: "de ii desu …", en: "is fine with me", ru: "меня устраивает" }
  ], ord: { en: ["only", "i_like", "thats_fine"] }
  },

  /* no.62 — 全人類が好きなことやったら */
  { type: "line", src: "全人類が好きなことやったら", units: [
    { name: "humanity", pos: "n", jp: "全人類が", tr: "zenjinrui ga", en: "all of humanity", ru: "всё человечество" },
    { name: "i_like", pos: "n", jp: "好きなこと", tr: "suki na koto", en: "did the things they like,", ru: "сделало то, что нравится," },
    { name: "if", pos: "v", jp: "やったら", tr: "yattara", en: "if", ru: "если" }
  ], ord: { en: ["if", "humanity", "i_like"], ru: ["if", "humanity", "i_like"] }
  },

  /* no.63 — 世界は滅亡するけど */
  { type: "line", src: "世界は滅亡するけど", units: [
    { name: "world", pos: "n", jp: "世界は", tr: "sekai wa", en: "the world", ru: "мир" },
    { name: "perish", pos: "v", jp: "滅亡する", tr: "metsubou suru", en: "would turn to ruin", ru: "погиб бы," },
    { name: "though", pos: "conj", jp: "けど", tr: "kedo", en: "though", ru: "но" }
  ], ord: { en: ["though", "world", "perish"], ru: ["though", "world", "perish"] }
  },

  { type: "section", label: "Final verse — what used to be" },

  /* no.64 — すきなことだけでいいです */
  { type: "line", src: "すきなことだけでいいです", units: [
    { name: "i_like", pos: "n", jp: "すきなこと", tr: "suki na koto", en: "the things I like,", ru: "то, что нравится," },
    { name: "only", pos: "adv", jp: "だけ", tr: "dake", en: "only", ru: "только" },
    { name: "thats_fine", pos: "adj", jp: "でいいです", tr: "de ii desu", en: "is fine with me", ru: "меня устраивает" }
  ], ord: { en: ["only", "i_like", "thats_fine"] }
  },

  /* no.65 — みんな　好きなことが好きでした */
  { type: "line", src: "みんな　好きなことが好きでした", units: [
    { name: "everyone", pos: "n", jp: "みんな　", tr: "minna ", en: "everyone", ru: "все" },
    { name: "i_like", pos: "n", jp: "好きなことが", tr: "suki na koto ga", en: "the things they liked", ru: "то, что нравилось," },
    { name: "like", pos: "adjna", jp: "好きでした", tr: "suki deshita", en: "they loved", ru: "они любили" }
  ]
  },

  /* no.66 — すきなことだけでいいです */
  { type: "line", src: "すきなことだけでいいです", units: [
    { name: "i_like", pos: "n", jp: "すきなこと", tr: "suki na koto", en: "the things I like,", ru: "то, что нравится," },
    { name: "only", pos: "adv", jp: "だけ", tr: "dake", en: "only", ru: "только" },
    { name: "thats_fine", pos: "adj", jp: "でいいです", tr: "de ii desu", en: "is fine with me", ru: "меня устраивает" }
  ], ord: { en: ["only", "i_like", "thats_fine"] }
  },

  /* no.67 — みんな　嫌なことは嫌でした */
  { type: "line", src: "みんな　嫌なことは嫌でした", units: [
    { name: "everyone", pos: "n", jp: "みんな　", tr: "minna ", en: "everyone", ru: "все" },
    { name: "dislike", pos: "n", jp: "嫌なことは", tr: "iya na koto wa", en: "the things they disliked", ru: "то, что не нравилось," },
    { name: "hate", pos: "adjna", jp: "嫌でした", tr: "iya deshita", en: "they hated", ru: "они ненавидели" }
  ]
  },

  /* no.68 — すきなことだけでいいです */
  { type: "line", src: "すきなことだけでいいです", units: [
    { name: "i_like", pos: "n", jp: "すきなこと", tr: "suki na koto", en: "the things I like,", ru: "то, что нравится," },
    { name: "only", pos: "adv", jp: "だけ", tr: "dake", en: "only", ru: "только" },
    { name: "thats_fine", pos: "adj", jp: "でいいです", tr: "de ii desu", en: "is fine with me", ru: "меня устраивает" }
  ], ord: { en: ["only", "i_like", "thats_fine"] }
  },

  /* no.69 — ほんと　すきなことだけでいいです */
  { type: "line", src: "ほんと　すきなことだけでいいです", units: [
    { name: "really", pos: "adv", jp: "ほんと　", tr: "honto ", en: "really", ru: "правда" },
    { name: "i_like", pos: "n", jp: "すきなこと", tr: "suki na koto", en: "the things I like,", ru: "то, что нравится," },
    { name: "only", pos: "adv", jp: "だけ", tr: "dake", en: "only", ru: "только" },
    { name: "thats_fine", pos: "adj", jp: "でいいです", tr: "de ii desu", en: "is fine with me", ru: "меня устраивает" }
  ], ord: { en: ["really", "only", "i_like", "thats_fine"] }
  },

  /* no.70 — 全人類が好きなことやったら */
  { type: "line", src: "全人類が好きなことやったら", units: [
    { name: "humanity", pos: "n", jp: "全人類が", tr: "zenjinrui ga", en: "all of humanity", ru: "всё человечество" },
    { name: "i_like", pos: "n", jp: "好きなこと", tr: "suki na koto", en: "did the things they like,", ru: "сделало то, что нравится," },
    { name: "if", pos: "v", jp: "やったら", tr: "yattara", en: "if", ru: "если" }
  ], ord: { en: ["if", "humanity", "i_like"], ru: ["if", "humanity", "i_like"] }
  },

  /* no.71 — 世界は滅亡したけど */
  { type: "line", src: "世界は滅亡したけど", units: [
    { name: "world", pos: "n", jp: "世界は", tr: "sekai wa", en: "the world", ru: "мир" },
    { name: "perished", pos: "v", jp: "滅亡した", tr: "metsubou shita", en: "turned to ruin", ru: "погиб," },
    { name: "though", pos: "conj", jp: "けど", tr: "kedo", en: "though", ru: "но" }
  ], ord: { en: ["though", "world", "perished"], ru: ["though", "world", "perished"] }
  },

  /* no.72 — すきなことだけでいいです */
  { type: "line", src: "すきなことだけでいいです", units: [
    { name: "i_like", pos: "n", jp: "すきなこと", tr: "suki na koto", en: "the things I like,", ru: "то, что нравится," },
    { name: "only", pos: "adv", jp: "だけ", tr: "dake", en: "only", ru: "только" },
    { name: "thats_fine", pos: "adj", jp: "でいいです", tr: "de ii desu", en: "is fine with me", ru: "меня устраивает" }
  ], ord: { en: ["only", "i_like", "thats_fine"] }
  },

  /* no.73 — 君のことが　ほんとに好きでした */
  { type: "line", src: "君のことが　ほんとに好きでした", units: [
    { name: "about_you", pos: "n", jp: "君のことが　", tr: "kimi no koto ga ", en: "about you", ru: "в тебе" },
    { name: "really", pos: "adv", jp: "ほんとに", tr: "honto ni", en: "really", ru: "по-настоящему" },
    { name: "like", pos: "adjna", jp: "好きでした", tr: "suki deshita", en: "I liked", ru: "любил" }
  ]
  },

  /* no.74 — すきなことだけでいいです */
  { type: "line", src: "すきなことだけでいいです", units: [
    { name: "i_like", pos: "n", jp: "すきなこと", tr: "suki na koto", en: "the things I like,", ru: "то, что нравится," },
    { name: "only", pos: "adv", jp: "だけ", tr: "dake", en: "only", ru: "только" },
    { name: "thats_fine", pos: "adj", jp: "でいいです", tr: "de ii desu", en: "is fine with me", ru: "меня устраивает" }
  ], ord: { en: ["only", "i_like", "thats_fine"] }
  },

  /* no.75 — 君は違う誰かが好きでした */
  { type: "line", src: "君は違う誰かが好きでした", units: [
    { name: "you", pos: "pron", jp: "君は", tr: "kimi wa", en: "you", ru: "ты" },
    { name: "another", pos: "n", jp: "違う誰かが", tr: "chigau dareka ga", en: "someone else", ru: "кто-то другой" },
    { name: "like", pos: "adjna", jp: "好きでした", tr: "suki deshita", en: "you liked", ru: "ты любил" }
  ]
  },

  /* no.76 — すきなことだけでいいです */
  { type: "line", src: "すきなことだけでいいです", units: [
    { name: "i_like", pos: "n", jp: "すきなこと", tr: "suki na koto", en: "the things I like,", ru: "то, что нравится," },
    { name: "only", pos: "adv", jp: "だけ", tr: "dake", en: "only", ru: "только" },
    { name: "thats_fine", pos: "adj", jp: "でいいです", tr: "de ii desu", en: "is fine with me", ru: "меня устраивает" }
  ], ord: { en: ["only", "i_like", "thats_fine"] }
  },

  /* no.77 — やっぱ　それだけじゃ難しいです */
  { type: "line", src: "やっぱ　それだけじゃ難しいです", units: [
    { name: "after_all", pos: "adv", jp: "やっぱ　", tr: "yappa ", en: "after all", ru: "в конце концов" },
    { name: "only_that", pos: "adv", jp: "それだけじゃ", tr: "sore dake ja", en: "only that", ru: "только это" },
    { name: "hard", pos: "adj", jp: "難しいです", tr: "muzukashii desu", en: "is difficult", ru: "сложно" }
  ]
  },

  /* no.78 — 全人類が幸せになったら */
  { type: "line", src: "全人類が幸せになったら", units: [
    { name: "humanity", pos: "n", jp: "全人類が", tr: "zenjinrui ga", en: "all of humanity", ru: "всё человечество" },
    { name: "happy", pos: "adjna", jp: "幸せに", tr: "shiawase ni", en: "became happy,", ru: "стало счастливым," },
    { name: "if", pos: "v", jp: "なったら", tr: "nattara", en: "if", ru: "если" }
  ], ord: { en: ["if", "humanity", "happy"], ru: ["if", "humanity", "happy"] }
  },

  /* no.79 — 宇宙が迷惑するから */
  { type: "line", src: "宇宙が迷惑するから", units: [
    { name: "universe", pos: "n", jp: "宇宙が", tr: "uchuu ga", en: "the universe", ru: "вселенная" },
    { name: "trouble", pos: "v", jp: "迷惑する", tr: "meiwaku suru", en: "would be troubled", ru: "возмутилась бы," },
    { name: "because", pos: "conj", jp: "から", tr: "kara", en: "because", ru: "потому что" }
  ], ord: { en: ["because", "universe", "trouble"], ru: ["because", "universe", "trouble"] }
  },
];
