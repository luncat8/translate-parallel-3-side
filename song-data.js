"use strict";

/* ==================================================================
   Poppin party Jumping girl — LinguaMap data
   Fixation: Japanese lyrics, 53 lines, stanza structure preserved
   (the validator rebuilds every src line character-for-character).

   Columns: ru / en / jp / tr — tr mirrors jp structurally because
   both render the same units[] array (jp word order).

   Policies (AGENTS.md §6–§9), frozen for this project:
   - unit = smallest independently translatable meaning; inflected
     endings stay with their head (つかまえたい = one unit `catch`);
   - particles bundle into the unit they serve (私は, 明日へ,
     「希望」しか); punctuation is never a unit — closing marks fold
     into the preceding unit, opening brackets/quotes fold forward
     into the following one (「永遠」とか, (Jumpin' girls！));
   - the U+3000 and the half-width spaces of the source stay inside
     the jp cell they belong to (夕暮れ　, (夢見てる );
   - romanisation: Hepburn with ASCII long vowels (kyou, mou, berii
     rouru); katakana loans transliterate (furaingu-gimi); full-width
     punctuation is romanised to ASCII in tr (！→!, 「→", U+3000→space);
   - English chant formulae (Jumpin' girls!, Jump up!, Go ahead!…)
     are performance fixed phrases: kept verbatim in en AND ru, and
     classified as interjections;
   - one meaning = one name forever (catch = つかまえたい and
     つかまえに; future = 未来　/ 未来へ　/ 未来 — particles fold per
     line function, so surfaces differ on purpose);
   - call-and-response echoes keep the call's name, so the validator
     reports "occurs twice in one line" warnings on every refrain
     line — all intentional;
   - en/ru cells absorb the function words their language needs and
     carry punctuation where that language needs it; free word order
     is expressed via ord arrays (exact permutations, validator-proved).
   ================================================================== */

const META = {
  title: "Jumping girl — LinguaMap",
  subtitle: "Jumpin' girls! · parallel word map: 日本語 · Romaji · English · Русский",
  credit: "Mapped with the LinguaMap workflow (AGENTS.md): one meaning = one name across all columns · colour = part of speech (based on the Japanese) · romaji mirrors the Japanese word order · English chant refrains stay verbatim. Refrain/duplicate warnings in the Validation panel are intentional (call & response echoes, particles folded per line function).",
  columns: ["ru", "en", "jp", "tr"],
  columnTitles: { ru: "Русский", en: "English", jp: "日本語", tr: "Romaji" },
  trMirror: true,
  posLabels: {
    n: "noun", npr: "proper noun", v: "verb", adj: "i-adj", adjna: "na-adj",
    adv: "adverb", pron: "pronoun", conj: "conjunction",
    interj: "interjection", part: "particle", q: "question word"
  },
  posOrder: ["n", "npr", "v", "adj", "adjna", "adv", "pron", "conj", "interj", "part", "q"]
};

const DATA = [
  { type: "section", label: "Verse 1" },

  /* no.1 — 夕暮れ　空を見上げ */
  { type: "line", src: "夕暮れ　空を見上げ", units: [
    { name: "dusk",    pos: "n", jp: "夕暮れ　", tr: "yuugure ", en: "At dusk,",      ru: "В сумерках" },
    { name: "sky",     pos: "n", jp: "空を",     tr: "sora o",   en: "the sky —",    ru: "небо —" },
    { name: "gaze_up", pos: "v", jp: "見上げ",   tr: "miage",    en: "gazing up at", ru: "смотрим вверх на" }
  ], ord: {
    en: ["dusk", "gaze_up", "sky"],
    ru: ["dusk", "gaze_up", "sky"]
  } },

  /* no.2 — みんなで手を伸ばしてみよう */
  { type: "line", src: "みんなで手を伸ばしてみよう", units: [
    { name: "everyone",  pos: "n", jp: "みんなで",       tr: "minna de",        en: "All together,",      ru: "Все вместе" },
    { name: "hands",     pos: "n", jp: "手を",           tr: "te o",            en: "our hands out —",    ru: "руки —" },
    { name: "reach_out", pos: "v", jp: "伸ばしてみよう", tr: "nobashite miyou", en: "let's try reaching", ru: "попробуем вытянуть" }
  ], ord: {
    en: ["everyone", "reach_out", "hands"],
    ru: ["everyone", "reach_out", "hands"]
  } },

  /* no.3 — 未来　つかまえたい */
  { type: "line", src: "未来　つかまえたい", units: [
    { name: "future", pos: "n", jp: "未来　",         tr: "mirai ",      en: "the future —",     ru: "будущее —" },
    { name: "catch",  pos: "v", jp: "つかまえたい",   tr: "tsukamaetai", en: "I want to seize",  ru: "Так хочется схватить" }
  ], ord: {
    en: ["catch", "future"],
    ru: ["catch", "future"]
  } },

  /* no.4 — 思いと一緒に　今から―― */
  { type: "line", src: "思いと一緒に　今から――", units: [
    { name: "our_feelings", pos: "n",   jp: "思いと",     tr: "omoi to",    en: "with our feelings,",       ru: "с нашими чувствами," },
    { name: "together",     pos: "adv", jp: "一緒に　",   tr: "issho ni ",  en: "together",                 ru: "вместе" },
    { name: "from_now",     pos: "adv", jp: "今から――",   tr: "ima kara――", en: "from this very moment――",  ru: "с этих самых пор――" }
  ], ord: {
    en: ["together", "our_feelings", "from_now"],
    ru: ["together", "our_feelings", "from_now"]
  } },

  { type: "gap" },

  { type: "section", label: "Shout" },

  /* no.5 — 「飛ぶよー！」 */
  { type: "line", src: "「飛ぶよー！」", units: [
    { name: "lets_fly", pos: "v", jp: "「飛ぶよー！」", tr: "\"Tobu yoo!\"", en: "“We'll fly—!”", ru: "«Полетели-и!»" }
  ] },

  { type: "gap" },

  { type: "section", label: "Chorus 1" },

  /* no.6 — Jumpin' girls！(Jumpin' girls！) */
  { type: "line", src: "Jumpin' girls！(Jumpin' girls！)", units: [
    { name: "jumpin_girls", pos: "interj", jp: "Jumpin' girls！",  tr: "Jumpin' girls!",  en: "Jumpin' girls!",  ru: "Jumpin' girls!" },
    { name: "jumpin_girls", pos: "interj", jp: "(Jumpin' girls！)", tr: "(Jumpin' girls!)", en: "(Jumpin' girls!)", ru: "(Jumpin' girls!)" }
  ] },

  /* no.7 — Jumpin' high！(Jumpin' high！) */
  { type: "line", src: "Jumpin' high！(Jumpin' high！)", units: [
    { name: "jumpin_high", pos: "interj", jp: "Jumpin' high！",  tr: "Jumpin' high!",  en: "Jumpin' high!",  ru: "Jumpin' high!" },
    { name: "jumpin_high", pos: "interj", jp: "(Jumpin' high！)", tr: "(Jumpin' high!)", en: "(Jumpin' high!)", ru: "(Jumpin' high!)" }
  ] },

  /* no.8 — Jumpin' sky！(Jumpin' sky！) */
  { type: "line", src: "Jumpin' sky！(Jumpin' sky！)", units: [
    { name: "jumpin_sky", pos: "interj", jp: "Jumpin' sky！",  tr: "Jumpin' sky!",  en: "Jumpin' sky!",  ru: "Jumpin' sky!" },
    { name: "jumpin_sky", pos: "interj", jp: "(Jumpin' sky！)", tr: "(Jumpin' sky!)", en: "(Jumpin' sky!)", ru: "(Jumpin' sky!)" }
  ] },

  /* no.9 — 明日へ(夢見てる Jump up！) */
  { type: "line", src: "明日へ(夢見てる Jump up！)", units: [
    { name: "to_tomorrow", pos: "n",       jp: "明日へ",       tr: "ashita e",      en: "To tomorrow",      ru: "В завтрашний день" },
    { name: "dreaming",    pos: "v",       jp: "(夢見てる ",   tr: "(yumemiteru ",  en: "(dreaming,",       ru: "(мечтая," },
    { name: "jump_up",     pos: "interj",  jp: "Jump up！)",   tr: "Jump up!)",     en: "Jump up!)",        ru: "Jump up!)" }
  ] },

  /* no.10 — (わくわくで Step up！) */
  { type: "line", src: "(わくわくで Step up！)", units: [
    { name: "excited", pos: "adv",    jp: "(わくわくで ", tr: "(wakuwaku de ", en: "(all excited —",         ru: "(в радостном волнении —" },
    { name: "step_up", pos: "interj", jp: "Step up！)",   tr: "Step up!)",     en: "Step up!)",              ru: "Step up!)" }
  ] },

  { type: "gap" },

  { type: "section", label: "Verse 2" },

  /* no.11 — 今日も強くなれた */
  { type: "line", src: "今日も強くなれた", units: [
    { name: "today",         pos: "n", jp: "今日も",     tr: "kyou mo",        en: "Today, too,",           ru: "И сегодня" },
    { name: "become_strong", pos: "v", jp: "強くなれた", tr: "tsuyoku nareta", en: "I've grown stronger.",  ru: "я стала сильнее." }
  ] },

  /* no.12 — みんなの笑顔をみつけて */
  { type: "line", src: "みんなの笑顔をみつけて", units: [
    { name: "everyone", pos: "n", jp: "みんなの", tr: "minna no",  en: "everyone's",  ru: "у всех —" },
    { name: "smiles",   pos: "n", jp: "笑顔を",   tr: "egao o",    en: "smiles",      ru: "улыбки" },
    { name: "find",     pos: "v", jp: "みつけて", tr: "mitsukete", en: "I've found",  ru: "Я отыскала" }
  ], ord: {
    en: ["find", "everyone", "smiles"],
    ru: ["find", "smiles", "everyone"]
  } },

  /* no.13 — (ニコニコで Smile up！) */
  { type: "line", src: "(ニコニコで Smile up！)", units: [
    { name: "beaming",  pos: "adv",    jp: "(ニコニコで ", tr: "(nikoniko de ", en: "(beaming —",       ru: "(сияя улыбками —" },
    { name: "smile_up", pos: "interj", jp: "Smile up！)",  tr: "Smile up!)",    en: "Smile up!)",       ru: "Smile up!)" }
  ] },

  /* no.14 — 信じてもいいかな？ */
  { type: "line", src: "信じてもいいかな？", units: [
    { name: "may_believe", pos: "v", jp: "信じてもいいかな？", tr: "shinjite mo ii kana?", en: "Is it okay to believe", ru: "Можно ли верить" }
  ] },

  /* no.15 — 「永遠」とか「可能性」とか */
  { type: "line", src: "「永遠」とか「可能性」とか", units: [
    { name: "eternity",    pos: "n", jp: "「永遠」とか",   tr: "\"eien\" toka",     en: "in things like “eternity”",  ru: "в такие вещи, как «вечность»" },
    { name: "possibility", pos: "n", jp: "「可能性」とか", tr: "\"kanousei\" toka", en: "or “possibility”?",          ru: "или «возможность»?" }
  ] },

  /* no.16 — (ふたつとも Mash up！) */
  { type: "line", src: "(ふたつとも Mash up！)", units: [
    { name: "both_of_them", pos: "pron",   jp: "(ふたつとも ", tr: "(futatsu tomo ", en: "(with both of them —",  ru: "(и с той и с другой —" },
    { name: "mash_up",      pos: "interj", jp: "Mash up！)",   tr: "Mash up!)",      en: "Mash up!)",             ru: "Mash up!)" }
  ] },

  { type: "gap" },

  { type: "section", label: "Flyin' chorus" },

  /* no.17 — Flyin' girls！(Flyin' girls！) */
  { type: "line", src: "Flyin' girls！(Flyin' girls！)", units: [
    { name: "flyin_girls", pos: "interj", jp: "Flyin' girls！",  tr: "Flyin' girls!",  en: "Flyin' girls!",  ru: "Flyin' girls!" },
    { name: "flyin_girls", pos: "interj", jp: "(Flyin' girls！)", tr: "(Flyin' girls!)", en: "(Flyin' girls!)", ru: "(Flyin' girls!)" }
  ] },

  /* no.18 — Flyin' mode！(Flyin' mode！) */
  { type: "line", src: "Flyin' mode！(Flyin' mode！)", units: [
    { name: "flyin_mode", pos: "interj", jp: "Flyin' mode！",  tr: "Flyin' mode!",  en: "Flyin' mode!",  ru: "Flyin' mode!" },
    { name: "flyin_mode", pos: "interj", jp: "(Flyin' mode！)", tr: "(Flyin' mode!)", en: "(Flyin' mode!)", ru: "(Flyin' mode!)" }
  ] },

  /* no.19 — Flyin' time！(Flyin' time！) */
  { type: "line", src: "Flyin' time！(Flyin' time！)", units: [
    { name: "flyin_time", pos: "interj", jp: "Flyin' time！",  tr: "Flyin' time!",  en: "Flyin' time!",  ru: "Flyin' time!" },
    { name: "flyin_time", pos: "interj", jp: "(Flyin' time！)", tr: "(Flyin' time!)", en: "(Flyin' time!)", ru: "(Flyin' time!)" }
  ] },

  /* no.20 — はやる気持ちを */
  { type: "line", src: "はやる気持ちを", units: [
    { name: "rushing",  pos: "v", jp: "はやる",   tr: "hayaru",    en: "racing ahead —",  ru: "что рвётся вперёд," },
    { name: "feelings", pos: "n", jp: "気持ちを", tr: "kimochi o", en: "This feeling",    ru: "Это чувство," }
  ], ord: {
    en: ["feelings", "rushing"],
    ru: ["feelings", "rushing"]
  } },

  /* no.21 — 抑えきれそうにない */
  { type: "line", src: "抑えきれそうにない", units: [
    { name: "cant_hold_back", pos: "v", jp: "抑えきれそうにない", tr: "osaekiresou ni nai", en: "I just can't seem to hold back.", ru: "его никак не удержать." }
  ] },

  /* no.22 — 未来へ　誰よりも早く */
  { type: "line", src: "未来へ　誰よりも早く", units: [
    { name: "future",      pos: "n",    jp: "未来へ　",   tr: "mirai e ",     en: "to the future,",      ru: "к будущему," },
    { name: "than_anyone", pos: "part", jp: "誰よりも",   tr: "dare yori mo", en: "than anyone else —",  ru: "чем кто угодно —" },
    { name: "faster",      pos: "adv",  jp: "早く",       tr: "hayaku",       en: "faster",              ru: "быстрее," }
  ], ord: {
    en: ["future", "faster", "than_anyone"],
    ru: ["future", "faster", "than_anyone"]
  } },

  /* no.23 — フライング気味に！ */
  { type: "line", src: "フライング気味に！", units: [
    { name: "halfway_flying", pos: "n", jp: "フライング気味に！", tr: "furaingu-gimi ni!", en: "already halfway airborne!", ru: "будто уже в полёте!" }
  ] },

  { type: "gap" },

  { type: "section", label: "Verse 3" },

  /* no.24 — もしも未来映す */
  { type: "line", src: "もしも未来映す", units: [
    { name: "if_ever", pos: "adv", jp: "もしも", tr: "moshimo", en: "If",                  ru: "Если бы" },
    { name: "future",  pos: "n",   jp: "未来",   tr: "mirai",   en: "the future",          ru: "будущее" },
    { name: "reflect", pos: "v",   jp: "映す",   tr: "utsusu",  en: "could be reflected",  ru: "могло отразиться" }
  ] },

  /* no.25 — 望遠鏡　手に入れたら */
  { type: "line", src: "望遠鏡　手に入れたら", units: [
    { name: "telescope",    pos: "n", jp: "望遠鏡　",     tr: "bouenkyou ",    en: "in a telescope,",             ru: "в телескопе," },
    { name: "if_could_get", pos: "v", jp: "手に入れたら", tr: "te ni iretara", en: "I could get my hands on —",   ru: "который удалось бы заполучить —" }
  ] },

  /* no.26 — (ドキドキで Look up！) */
  { type: "line", src: "(ドキドキで Look up！)", units: [
    { name: "hearts_pounding", pos: "adv",    jp: "(ドキドキで ", tr: "(dokidoki de ", en: "(hearts pounding —",  ru: "(сердце колотится —" },
    { name: "look_up",         pos: "interj", jp: "Look up！)",   tr: "Look up!)",     en: "Look up!)",           ru: "Look up!)" }
  ] },

  /* no.27 — そっと覗いてみよう */
  { type: "line", src: "そっと覗いてみよう", units: [
    { name: "softly", pos: "adv", jp: "そっと",         tr: "sotto",         en: "Let's gently",   ru: "Тихонько" },
    { name: "peek",   pos: "v",   jp: "覗いてみよう",   tr: "nozoite miyou", en: "peek inside —",  ru: "заглянем туда —" }
  ] },

  /* no.28 — そこには「希望」しかないよね？ */
  { type: "line", src: "そこには「希望」しかないよね？", units: [
    { name: "there",        pos: "pron", jp: "そこには",     tr: "soko ni wa",      en: "There's",                     ru: "Там" },
    { name: "hope",         pos: "n",    jp: "「希望」しか", tr: "\"kibou\" shika", en: "nothing inside but “hope”,",  ru: "нет ничего, кроме «надежды»," },
    { name: "nothing_else", pos: "v",    jp: "ないよね？",   tr: "nai yo ne?",      en: "right?",                      ru: "ведь правда?" }
  ] },

  /* no.29 — (ふみだそう Start up！) */
  { type: "line", src: "(ふみだそう Start up！)", units: [
    { name: "step_forward", pos: "v",      jp: "(ふみだそう ", tr: "(fumidasou ", en: "(let's step out —",  ru: "(шагнём вперёд —" },
    { name: "start_up",     pos: "interj", jp: "Start up！)",  tr: "Start up!)",  en: "Start up!)",         ru: "Start up!)" }
  ] },

  { type: "gap" },

  { type: "section", label: "Chorus 2" },

  /* no.30 — Jumpin' girls！(Jumpin' girls！) */
  { type: "line", src: "Jumpin' girls！(Jumpin' girls！)", units: [
    { name: "jumpin_girls", pos: "interj", jp: "Jumpin' girls！",  tr: "Jumpin' girls!",  en: "Jumpin' girls!",  ru: "Jumpin' girls!" },
    { name: "jumpin_girls", pos: "interj", jp: "(Jumpin' girls！)", tr: "(Jumpin' girls!)", en: "(Jumpin' girls!)", ru: "(Jumpin' girls!)" }
  ] },

  /* no.31 — Jumpin' high！(Jumpin' high！) */
  { type: "line", src: "Jumpin' high！(Jumpin' high！)", units: [
    { name: "jumpin_high", pos: "interj", jp: "Jumpin' high！",  tr: "Jumpin' high!",  en: "Jumpin' high!",  ru: "Jumpin' high!" },
    { name: "jumpin_high", pos: "interj", jp: "(Jumpin' high！)", tr: "(Jumpin' high!)", en: "(Jumpin' high!)", ru: "(Jumpin' high!)" }
  ] },

  /* no.32 — Jumpin' sky！(Jumpin' sky！) */
  { type: "line", src: "Jumpin' sky！(Jumpin' sky！)", units: [
    { name: "jumpin_sky", pos: "interj", jp: "Jumpin' sky！",  tr: "Jumpin' sky!",  en: "Jumpin' sky!",  ru: "Jumpin' sky!" },
    { name: "jumpin_sky", pos: "interj", jp: "(Jumpin' sky！)", tr: "(Jumpin' sky!)", en: "(Jumpin' sky!)", ru: "(Jumpin' sky!)" }
  ] },

  /* no.33 — ベリーロールで */
  { type: "line", src: "ベリーロールで", units: [
    { name: "belly_roll", pos: "n", jp: "ベリーロールで", tr: "berii rouru de", en: "With a belly roll,", ru: "Сделав бочку," }
  ] },

  /* no.34 — 一緒に飛び越えよう */
  { type: "line", src: "一緒に飛び越えよう", units: [
    { name: "together",  pos: "adv", jp: "一緒に",       tr: "issho ni",   en: "all together,",       ru: "все вместе" },
    { name: "jump_over", pos: "v",   jp: "飛び越えよう", tr: "tobikoeyou", en: "let's leap over it!", ru: "перепрыгнем!" }
  ] },

  { type: "gap" },

  /* no.35 — 何が起きても大丈夫 */
  { type: "line", src: "何が起きても大丈夫", units: [
    { name: "whatever_happens", pos: "v",     jp: "何が起きても", tr: "nani ga okite mo", en: "No matter what happens,",  ru: "Что бы ни случилось —" },
    { name: "all_right",        pos: "adjna", jp: "大丈夫",       tr: "daijoubu",         en: "we'll be alright.",        ru: "всё будет хорошо." }
  ] },

  /* no.36 — Go ahead！　そうでしょ？ */
  { type: "line", src: "Go ahead！　そうでしょ？", units: [
    { name: "go_ahead",    pos: "interj", jp: "Go ahead！　", tr: "Go ahead! ",  en: "Go ahead!",         ru: "Go ahead!" },
    { name: "thats_right", pos: "pron",   jp: "そうでしょ？", tr: "sou desho?",  en: "Isn't that right?", ru: "Ведь так?" }
  ] },

  { type: "gap" },

  { type: "section", label: "Bridge" },

  /* no.37 — 夜が落ちる前に */
  { type: "line", src: "夜が落ちる前に", units: [
    { name: "night", pos: "n", jp: "夜が",       tr: "yoru ga",       en: "Before the night",  ru: "Прежде чем ночь" },
    { name: "falls", pos: "v", jp: "落ちる前に", tr: "ochiru mae ni", en: "falls,",            ru: "опустится," }
  ] },

  /* no.38 — もう一度　高く飛んでみる */
  { type: "line", src: "もう一度　高く飛んでみる", units: [
    { name: "once_more",  pos: "adv", jp: "もう一度　", tr: "mou ichido ", en: "Once more,",      ru: "Ещё раз" },
    { name: "high_up",    pos: "adv", jp: "高く",       tr: "takaku",      en: "high —",          ru: "повыше —" },
    { name: "try_flying", pos: "v",   jp: "飛んでみる", tr: "tonde miru",  en: "I'll try flying", ru: "попробую взлететь" }
  ], ord: {
    en: ["once_more", "try_flying", "high_up"],
    ru: ["once_more", "try_flying", "high_up"]
  } },

  /* no.39 — きらり　いちばん星 */
  { type: "line", src: "きらり　いちばん星", units: [
    { name: "sparkling",  pos: "adv", jp: "きらり　",   tr: "kirari ",       en: "sparkles —",          ru: "ярко блеснула —" },
    { name: "first_star", pos: "n",   jp: "いちばん星", tr: "ichiban-boshi", en: "The very first star", ru: "Первая звезда" }
  ], ord: {
    en: ["first_star", "sparkling"],
    ru: ["first_star", "sparkling"]
  } },

  /* no.40 — 今すぐ　つかまえに行こうよ！ */
  { type: "line", src: "今すぐ　つかまえに行こうよ！", units: [
    { name: "right_now", pos: "adv", jp: "今すぐ　",   tr: "ima sugu ",   en: "This instant —",  ru: "Прямо сейчас" },
    { name: "catch",     pos: "v",   jp: "つかまえに", tr: "tsukamae ni", en: "to catch it!",    ru: "ловить её!" },
    { name: "lets_go",   pos: "v",   jp: "行こうよ！", tr: "ikou yo!",    en: "let's dash out",  ru: "летим" }
  ], ord: {
    en: ["right_now", "lets_go", "catch"],
    ru: ["right_now", "lets_go", "catch"]
  } },

  { type: "gap" },

  { type: "section", label: "Flyin' chorus (reprise)" },

  /* no.41 — Flyin' girls！(Flyin' girls！) */
  { type: "line", src: "Flyin' girls！(Flyin' girls！)", units: [
    { name: "flyin_girls", pos: "interj", jp: "Flyin' girls！",  tr: "Flyin' girls!",  en: "Flyin' girls!",  ru: "Flyin' girls!" },
    { name: "flyin_girls", pos: "interj", jp: "(Flyin' girls！)", tr: "(Flyin' girls!)", en: "(Flyin' girls!)", ru: "(Flyin' girls!)" }
  ] },

  /* no.42 — Flyin' mode！(Flyin' mode！) */
  { type: "line", src: "Flyin' mode！(Flyin' mode！)", units: [
    { name: "flyin_mode", pos: "interj", jp: "Flyin' mode！",  tr: "Flyin' mode!",  en: "Flyin' mode!",  ru: "Flyin' mode!" },
    { name: "flyin_mode", pos: "interj", jp: "(Flyin' mode！)", tr: "(Flyin' mode!)", en: "(Flyin' mode!)", ru: "(Flyin' mode!)" }
  ] },

  /* no.43 — Flyin' time！(Flyin' time！) */
  { type: "line", src: "Flyin' time！(Flyin' time！)", units: [
    { name: "flyin_time", pos: "interj", jp: "Flyin' time！",  tr: "Flyin' time!",  en: "Flyin' time!",  ru: "Flyin' time!" },
    { name: "flyin_time", pos: "interj", jp: "(Flyin' time！)", tr: "(Flyin' time!)", en: "(Flyin' time!)", ru: "(Flyin' time!)" }
  ] },

  /* no.44 — はやる気持ちを */
  { type: "line", src: "はやる気持ちを", units: [
    { name: "rushing",  pos: "v", jp: "はやる",   tr: "hayaru",    en: "racing ahead —",  ru: "что рвётся вперёд," },
    { name: "feelings", pos: "n", jp: "気持ちを", tr: "kimochi o", en: "This feeling",    ru: "Это чувство," }
  ], ord: {
    en: ["feelings", "rushing"],
    ru: ["feelings", "rushing"]
  } },

  /* no.45 — 抑えきれそうにない */
  { type: "line", src: "抑えきれそうにない", units: [
    { name: "cant_hold_back", pos: "v", jp: "抑えきれそうにない", tr: "osaekiresou ni nai", en: "I just can't seem to hold back.", ru: "его никак не удержать." }
  ] },

  /* no.46 — 未来へ　フライング気味に */
  { type: "line", src: "未来へ　フライング気味に", units: [
    { name: "future",         pos: "n", jp: "未来へ　",         tr: "mirai e ",          en: "to the future,",             ru: "к будущему," },
    { name: "halfway_flying", pos: "n", jp: "フライング気味に", tr: "furaingu-gimi ni",  en: "already halfway airborne.",  ru: "будто уже в полёте." }
  ] },

  { type: "gap" },

  { type: "section", label: "Final chorus" },

  /* no.47 — Jumpin' girls！(Jumpin' girls！) */
  { type: "line", src: "Jumpin' girls！(Jumpin' girls！)", units: [
    { name: "jumpin_girls", pos: "interj", jp: "Jumpin' girls！",  tr: "Jumpin' girls!",  en: "Jumpin' girls!",  ru: "Jumpin' girls!" },
    { name: "jumpin_girls", pos: "interj", jp: "(Jumpin' girls！)", tr: "(Jumpin' girls!)", en: "(Jumpin' girls!)", ru: "(Jumpin' girls!)" }
  ] },

  /* no.48 — Jumpin' jump！(Jumpin' jump！) */
  { type: "line", src: "Jumpin' jump！(Jumpin' jump！)", units: [
    { name: "jumpin_jump", pos: "interj", jp: "Jumpin' jump！",  tr: "Jumpin' jump!",  en: "Jumpin' jump!",  ru: "Jumpin' jump!" },
    { name: "jumpin_jump", pos: "interj", jp: "(Jumpin' jump！)", tr: "(Jumpin' jump!)", en: "(Jumpin' jump!)", ru: "(Jumpin' jump!)" }
  ] },

  /* no.49 — Jumpin' jump！(Jumpin' jump！) */
  { type: "line", src: "Jumpin' jump！(Jumpin' jump！)", units: [
    { name: "jumpin_jump", pos: "interj", jp: "Jumpin' jump！",  tr: "Jumpin' jump!",  en: "Jumpin' jump!",  ru: "Jumpin' jump!" },
    { name: "jumpin_jump", pos: "interj", jp: "(Jumpin' jump！)", tr: "(Jumpin' jump!)", en: "(Jumpin' jump!)", ru: "(Jumpin' jump!)" }
  ] },

  /* no.50 — ベリーロールで */
  { type: "line", src: "ベリーロールで", units: [
    { name: "belly_roll", pos: "n", jp: "ベリーロールで", tr: "berii rouru de", en: "With a belly roll,", ru: "Сделав бочку," }
  ] },

  /* no.51 — 一緒に飛び越えよう */
  { type: "line", src: "一緒に飛び越えよう", units: [
    { name: "together",  pos: "adv", jp: "一緒に",       tr: "issho ni",   en: "all together,",       ru: "все вместе" },
    { name: "jump_over", pos: "v",   jp: "飛び越えよう", tr: "tobikoeyou", en: "let's leap over it!", ru: "перепрыгнем!" }
  ] },

  { type: "gap" },

  /* no.52 — 何が起きても大丈夫 */
  { type: "line", src: "何が起きても大丈夫", units: [
    { name: "whatever_happens", pos: "v",     jp: "何が起きても", tr: "nani ga okite mo", en: "No matter what happens,",  ru: "Что бы ни случилось —" },
    { name: "all_right",        pos: "adjna", jp: "大丈夫",       tr: "daijoubu",         en: "we'll be alright.",        ru: "всё будет хорошо." }
  ] },

  /* no.53 — Go ahead！　そうでしょ？ */
  { type: "line", src: "Go ahead！　そうでしょ？", units: [
    { name: "go_ahead",    pos: "interj", jp: "Go ahead！　", tr: "Go ahead! ",  en: "Go ahead!",         ru: "Go ahead!" },
    { name: "thats_right", pos: "pron",   jp: "そうでしょ？", tr: "sou desho?",  en: "Isn't that right?", ru: "Ведь так?" }
  ] }
];
