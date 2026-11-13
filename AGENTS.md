# AGENTS.md — LinguaMap: multilingual parallel-text word maps

Reusable brief for turning any source text (lyrics, poems, prose) into a
standalone HTML parallel map: source + transliteration + translations, one
stable `name` per meaning, coloured by part of speech, rendered by the LinguaMap
engine. The engine lives in `linguamap-template.html`; project data lives in
`<text>-data.js` (`META` + `DATA`).

## role

You are a professional linguist in the source language and all target languages,
**and** an HTML/JS engineer. Your output must survive both kinds of review: a
linguist checking segmentation, register and morphology, and an engineer checking
that every mechanical invariant holds.

## style

- Single tab indentation. LF endings.
- DOM helper: `const $ = id => document.getElementById(id);`
- Avoid deep `{}` nesting and long if-else chains. Flatten with early returns,
	helper functions, or flat data tables.
- Avoid duplication. Prefer descriptive names over comments.
- No per-frame loop here. Keep render and validation loops allocation-light:
	hoist constants, reuse arrays/buffers, do not rebuild lookup tables per unit.
- Only essential concise comments: explain why and the decision, not what. Name
	things so comments are rarely needed.
- No legacy support, old versions, outdated browsers, polyfills, leftovers, or
	defensive code for impossible edge cases. Clean architecture.
- Prefer `obj.action(obj.data)` / `obj.data.action()` over
	`getObj().data().action()`.
- The built HTML is an artifact. Edit `<text>-data.js` and rebuild; never
	hand-edit the page.
- `plan*.md` is not an implementation log. Keep the final plan as a standalone
	artifact for a fork or reimplementation: no chat references, no "what was
	done" history.
- Plan numbers (`0.1`, `0.2`) are subject labels, not a version sequence. Continue
	an old number by subject and implement in any useful order.
- These are guidelines, not strict rules; use judgement.

## runtime

- `file://` friendly: classic `<script>` tags, no ES modules, no page-time build.
- The offline build (`build_linguamap.py` + Node harness) emits one standalone
	HTML file; the page makes no external requests.
- Guard `module.exports` so shared JS also runs under Node (the template does).
- No internet links. Vendor any library as a local JS file; the engine is
	dependency-free.
- Data files are plain classic scripts (`META` + `DATA`). The Node harness reads
	them as text and evaluates them; do not add ESM syntax.

## concepts

| Term | Meaning |
|------|---------|
| **unit** | one meaning chunk: a word, idiom, or word+particles bundle |
| **name** | globally stable English `snake_case` id of a unit's meaning |
| **block** | a unit object holding the SAME meaning in every language column |
| **fixation** | step 1: the plain source text, which everything must reconstruct |
| **mirror** | the transliteration column: it copies source order, never reorders |
| **ord** | per-line reorder arrays for free-order target languages |

One object per meaning holds all languages. This is the core safety property:

```js
// units[] is in SOURCE word order.
// Reference engine source key is "jp"; mirror key is "tr"; META.columns defines
// the rendered columns (typically ru/en/jp/tr).
{
	type: "line",
	src: "もし明日晴れたら、私はキノコ狩りに行きます。",
	units: [
		{ name: "if", pos: "adv", jp: "もし", tr: "Moshi", en: "If", ru: "Если" },
		{ name: "tomorrow", pos: "n", jp: "明日", tr: "ashita", en: "tomorrow", ru: "завтра" },
		{ name: "is_sunny", pos: "v", jp: "晴れたら、", tr: "haretara,", en: "it is sunny,", ru: "будет солнечно," },
		{ name: "I", pos: "pron", jp: "私は", tr: "watashi wa", en: "I", ru: "я" },
		{ name: "mushroom_hunting", pos: "n", jp: "キノコ狩りに", tr: "kinoko gari ni", en: "mushroom hunting.", ru: "за грибами." },
		{ name: "will_go", pos: "v", jp: "行きます。", tr: "ikimasu.", en: "will go", ru: "пойду" }
	],
	ord: {
		en: ["if", "is_sunny", "tomorrow", "I", "will_go", "mushroom_hunting"],
		ru: ["if", "tomorrow", "is_sunny", "I", "will_go", "mushroom_hunting"]
	}
}
```

The example is invented; any source language uses the same shape. Invariants:

- **Source/mirror order is structural.** Both columns render the same `units`
	array, so the classic "transliteration reordered to translation order" bug
	cannot be written.
- **One object per meaning.** Synonym drift is visible in one place.
- **Coverage is complete.** Every language renders every unit.
- **`src` is a test.** The validator rebuilds the source column and diffs it
	against `src` character-for-character (including U+3000 and punctuation).
- **`ord` is checked.** Reorder arrays must be exact permutations of the line's
	names.

Do not invent a different structure per project. Swap the data, not the model.

## files

- `findings-pitfalls-skills.md` — agent notes: good approaches and new pitfalls.
- `archive/` — plans and worklogs (`0.1.0-plan.md`, `0.1.0-worklog.md`).
- `experiments/` — measurement/validation scripts (Node), not loaded by the page;
	`experiments/logs/` keeps only data useful for comparing regressions.
- `qa/` — browser QA screenshots.
- Kit: `linguamap-template.html`, `build_linguamap.py`, `run_validation.js`,
	`extract_fixation.py`, `<text>-data.js`, `fixation.json`.
- Built page: `<text>_linguamap.html` (artifact).
- `0.1.x-draft.md` — human thoughts on goals/design; user prompts may be stored
	as drafts.

Example subject layout:

```
0.1.x-draft.md
archive/0.1.0-plan.md
archive/0.1.0-worklog.md
0.1.1-plan.md
gui.1-plan.md
0.1.3-draft.md
```

## sandbox

- `git push` returning `Invalid username or token` is expected. Do not
	investigate or report it; the user applies it manually.

## workflow

Start each session by reviewing the previous task: another agent did it; look
for a better approach or issues, but do not rerun tests already validated. Then
take the next plan item, improve the plan if you find better ideas, implement,
validate, and record.

Per text, in strict order:

1. **Fixation.** Output the source as plain text, stanzas intact. This freezes
	the meaning and becomes each line's `src`.
2. **Segmentation.** Split every line into units; give each meaning a `name` and
	`pos`. Build a glossary first for recurring items (titles, names, refrain
	words). Repeated meaning ⇒ same `name`, forever.
3. **Translation.** Fill the transliteration column (mechanical mirror) and the
	free-order target columns (natural order, natural punctuation).
4. **Data assembly.** Write the data file in the canonical model. Add `ord` arrays
	for target lines whose natural order differs from the source.
5. **Build + validate.** `python3 build_linguamap.py --data <text>-data.js
	--fixation fixation.json --out <out>.html --title "<title>"`; ERROR-level
	issues fail. Fix data, never the validator.
6. **Human pass.** Read the page top to bottom: colours sensible? POS colours
	correct? refrain lines reuse names? Validation badge = OK?

For long texts (>40 lines), deliver in stanzas: freeze the glossary after the
first two stanzas, get format approval, then batch the rest.

Record development steps and validation in `archive/<plan>-worklog.md`. End the
job with a next-step suggestion.

## segmentation rules

- **Unit = smallest independently translatable meaning.** Not every morpheme,
	never half an idiom.
	- A compound lexical item is one unit (`mushroom_hunting`, not `mushroom` +
	`hunting`).
	- A greeting is one unit (`good_night`, not `good` + `night`).
	- A set image may be one unit (`golden_axe`) or two (`golden` + `axe`) — pick
	one policy per project and keep it.
- **Inflected forms stay with their head.** A fused conditional is one verb unit
	whose translation carries the whole nuance. Never emit a separate `if` unit
	for a conditional already fused into the verb ending.
- **Function words bundle into the unit they serve** (illustrated with Japanese;
	apply the analogous rule to your source language):
	- case particles (が を に で から へ より) attach to the phrase they mark:
		`私は`, `キノコ狩りに`;
	- sentence-final particles (よ ね わ か な) attach to their predicate:
		`行きます。`, `気分よ`;
	- topic/contrast は attaches to its topic;
	- standalone connectives (けど, でも, だから, 〜と "quoting") may be their own
		unit (pos `conj`).
- **Punctuation is never a unit.** It folds into the preceding unit's cell text
	(`しないで`, `気分よ。`). A full-width space (U+3000) folds the same way
	(`ねえ　`), so source cells still rebuild the fixation exactly.
- **Refrains and repeats:** re-derive names from the glossary; surface variations
	keep the same name. The validator surfaces these as warnings; confirm each is
	intentional.

## naming

- English, `snake_case`, lowercase (proper nouns may capitalise: `alice`,
	`romeo`).
- Name the concept, not the surface: `悲劇のジュリエット` → `tragedy` + `Juliet`;
	a descriptive verb form → an English gloss, not a romanised stem.
- Same meaning ⇒ same name across all lines and languages. Different meaning ⇒
	different name, even if the surface word repeats.
- Bundle names may describe the whole bundle: `in_just_my_uniform`,
	`to_papa_and_mama`.
- Keep a running glossary; before coining a name, search existing ones.

## POS classification (colour = grammar)

Classify by the **source language grammar**, by the head of the bundle — never
by the translation's word class. Extend `META.posLabels`/`posOrder` and the CSS
palette together if you must add a code.

| code | class | colour family | source-language notes |
|------|-------|---------------|-----------------------|
| `n` | noun | blue | includes bundles headed by a noun |
| `npr` | proper noun | indigo | character/place names |
| `v` | verb | red | includes fused conditionals |
| `adj` | adjective | green | attributive forms |
| `adjna` | na-adjective | olive | adjectival nouns / nominal adjectives |
| `adv` | adverb | purple | degree/manner expressions |
| `pron` | pronoun | teal | personal/demonstrative pronouns |
| `conj` | conjunction | orange | connectives |
| `interj` | interjection | magenta | greetings, calls, fixed exclamations |
| `part` | particle | warm gray | standalone particles/postpositions |
| `q` | question word | amber | interrogatives |

Rules of thumb: a bundle takes the POS of its head (`キノコ狩りに` → `n`,
`優しくして` → `v`, `そうだった` → `pron`). One POS per name, identical in every
line (validator-enforced). For a language without an `adjna`-style class, drop
the code from `META` rather than forcing units into it.

## column rules

- **Source.** Fixed word order = fixation text. No added spaces, no
	normalisation, punctuation exactly as in the source.
- **Transliteration (mirror).** Mechanically mirrors the source, unit by unit.
	Choose one romanisation system and stay consistent (Japanese: Hepburn; ASCII
	long vowels `mou`, `kyou`, `shiawase`). Katakana: common loans transliterate
	(`kyarameru`, `masukara`); established names use conventional Latin forms
	(`Cinderella`, `Romeo`). If the source is already in the target script, omit
	the transliteration column from `META.columns` and set `META.trMirror` to
	`false`.
- **Translations.** Natural word order via `ord`; each cell may absorb the
	function words its language needs (`very` → "is very", `by_you` → "ты меня").
	Punctuation lives where that language needs it — a unit ending the source
	sentence may carry the target full stop even if it appears early in the target
	order. Russian: one ё-policy; inflect freely per line; the name binds the
	meaning, not the form.

## pitfalls

1. **Transliteration reorder (the classic).** Writing the mirror "as it should
	sound in the translation". The mirror must copy source order exactly.
2. **Name drift.** Second occurrence of a concept gets a fresh name
	(`alice` → `alice_2` → `girl`), or one name covers different
	meanings. Glossary first; check the per-name POS/surface report.
3. **Idiom splitting.** A fixed expression split into literal parts. Unit =
	independently translatable meaning.
4. **Over-merging.** A whole clause in one span leaves nothing to align. Split at
	predicates; fused endings stay with their predicate but never swallow a second
	predicate.
5. **Double-translating fused grammar.** A separate `if` unit *and* a predicate
	that already contains "if". The nuance lives inside the one unit.
6. **Particle orphans.** Bare function words unwrapped, or wrapped as their own
	units. Bundle them.
7. **Punctuation orphans.** Stray punctuation outside every unit; the `src` diff
	 catches it. Fold punctuation into the preceding unit.
8. **POS by translation lens.** Classifying by the English gloss instead of the
	source head; missing adjectival nouns. Keep `adj` vs `adjna` apart.
9. **Register drift.** Mixing polite/plain forms, scripts, macrons and ASCII
	romanisation. Freeze register + romanisation policy at the start.
10. **Space handling.** Injecting spaces into source cells, or losing U+3000 — the
	fixation diff fails. Spaces belong in transliteration/translation cells.
11. **Escaping.** Apostrophes, «ёлочки», `&`, `<` in lyrics. Data files are JS
	strings; prefer plain `"` quoting; escape attribute values if emitting raw
	span markup.
12. **Layout collapse.** Long translation lines in narrow columns. Engine wraps
	(`overflow-wrap`) and stacks on mobile; do not remove `minmax(0,1fr)`.
13. **One POS per name violation.** A name tagged `v` in one line and `n` in
	another fails validation.
14. **Colour noise.** Inventing per-line palettes. Colour encodes grammar: same
	class ⇒ same hue family everywhere, in both themes and print.
15. **Silent model edits.** Hand-editing the built HTML. Edit `<text>-data.js` and
	rebuild, or the fix evaporates and validation stops covering it.
16. **Fixation skipped.** "I'll fix the text later" → hallucinated source,
	useless diffs. Fixation is step 1 and becomes `src`.
17. **Units array in target order.** `units[]` must stay in source order; the
	reorder belongs in `ord` alone. The `src` diff catches it, but fix the mental
	model: `units` = source order, always.
18. **Unaudited warnings.** Shipping with unread warnings, or "fixing" intentional
	ones (call-and-response echoes, refrain punctuation variants). Read every
	warning; document intentional ones in `META.credit`.

## validation checklist

Automated (build harness + page Validation panel — must be green):

- [ ] every unit: name, known POS, non-empty text in every column
- [ ] source cells rebuild each `src` line character-for-character
- [ ] source/mirror order (structural; `trOrd` optional explicit check)
- [ ] `ord` arrays are exact permutations of their line's names
- [ ] one POS per name across the file (surface variants reported as warnings)
- [ ] warnings audited; intentional duplicates/surface variants documented in
	`META.credit`

Human:

- [ ] refrain lines reuse glossary names
- [ ] colours read as grammar, not decoration; legend counts sensible
- [ ] hover/pin lights the same meaning in every column
- [ ] plain-text mode shows the fixation; vocabulary index complete
- [ ] mobile stack and print output readable

## reuse and layout

1. Copy the kit: `linguamap-template.html` (engine — CSS, validator, renderer,
	demo data), `build_linguamap.py`, `run_validation.js`, and optionally
	`extract_fixation.py`. Engine code never changes.
2. Fixate the source (workflow step 1) by hand or with `extract_fixation.py`.
	Keep a `fixation.json` line list for the harness cross-check.
3. Write `<text>-data.js`: `META` (title, columns, `columnTitles`, POS labels,
	optional `trMirror`) + `DATA` (title/section/gap/line blocks). The template's
	embedded demo covers every POS colour.
4. Build and gate: the Node harness must report `errors: 0` before shipping.
5. Browser QA: validation badge OK; hover/pin sync; plain mode `[= source OK]`;
	vocabulary index complete; dark theme, narrow viewport, print readable. Keep
	screenshots in `qa/`.

Column sets are configurable via `META.columns` + `columnTitles`. The reference
engine ships with four columns and a matching CSS grid; if you change the count,
adjust the grid. For RTL targets add a `dir` rule in the template CSS. POS
palette: add the class pair in the template CSS (`--pos-x` light/dark) and the
label in `META`.

Reference column keys: `META.columns` (four entries), source `jp`, transliteration
`tr`, translations `en`/`ru`. Rename only by editing the engine's hard-coded
source/mirror keys and CSS grid together; otherwise keep the keys and swap the
data.