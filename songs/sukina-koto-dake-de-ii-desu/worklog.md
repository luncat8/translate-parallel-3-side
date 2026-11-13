# すきなことだけでいいです

## Steps

- [x] fixation reviewed (79 lines, stanzas intact; U+3000 preserved)
- [x] glossary frozen (86 meanings, one name per meaning across 79 lines)
- [x] segmentation (bundles carry particles and punctuation)
- [x] translation columns (English, Russian)
- [x] data assembly + ord (en/ru reorder; source and romaji never reorder)
- [x] build green (`errors: 0`, 43 intentional refrain-surface warnings)
- [x] human pass (colours, refrain reuse, plain mode, mobile, print)

## Policies frozen for this song

- Unit = smallest independently translatable meaning. Particles and sentence-final
  forms bundle into the unit they serve (`好きなことが`, `好きなんです`,
  `それだけじゃ`, `でいいです`). Punctuation folds into the preceding unit.
- `i_like` covers both `好きなこと` and `すきなこと` (kanji/hiragana refrain
  variation) with particles folded per line function; the chorus fragments use
  the same name. The validator reports these surface variants as warnings by
  design.
- `like` covers every predicative 好き (present 好き, explanatory 好きなんです,
  past 好きでした); `hate` covers the analogous 嫌 forms. The English/Russian
  cells carry the tense; the name binds the meaning, not the form.
- `if` is the fused conditional やったら/なったら (`v`, conditional ending
  stays in the verb unit). The conditional words `から`, `けど`, `でも` are
  `conj`. Do not emit a separate `if` unit for a conditional that is already
  fused into the verb.
- `humanity` folds its case particle per line function; the meaning is one.
  The two `幸せになったら` lines and the four refrain `好きなことやったら`
  lines move the `if` to the front via `ord`, so the conditional reads
  naturally in both target languages.
- Romaji: Hepburn with ASCII long vowels (`juusu`, `mugicha`, `kanmi`), small
  っ rendered as doubled consonant, full-width U+3000 kept as a single U+3000
  inside the tr cell that owns it.
- Classification follows the source grammar (AGENTS.md §POS): 好き/嫌 and
  predicate 幸せ/あべこべ are na-adjectives (`adjna`), 難しい/いい are i-adjectives
  (`adj`), リアル as a nominal is `n`, fused conditionals/continuative forms are
  `v`. The en/ru cells never drive the class.

## Translations

- `sources/expected-translation.en.txt` — the placed English text from the
  original TSV (kept verbatim, line-aligned, stanza gaps intact). This is the
  gold reference; it is intentionally not regenerated from the map.
- `sources/expected-translation.ru.txt` — hand-written Russian gold text,
  line-aligned with the source (one Russian line per Japanese line, stanza
  gaps intact). Register: casual, first-person, chorus carries `все`.
- The map's per-unit en/ru cells are fragment-level by design; the
  line-aligned gold files are the human reference for the lyric. Do not
  overwrite them with `tools/song.py export` output.

## Validation

`python3 tools/song.py build --song sukina-koto-dake-de-ii-desu`

- stats: 79 lines, 232 units, 86 unique meanings
- errors: 0
- warnings: 43 (all audited surface-variant and refrain-format warnings;
  no POS conflicts, no duplicate-occurrence errors)
- fixation cross-check: all 79 `src` lines match `sources/fixation.json` exactly

## Notes

- The English text shipped with the placed TSV mixes capitalisation
  (`I don’t like…` vs `gradually…`, `Really, All…`); kept as placed.
- English lines 26/27 of the TSV ("After all, I guess it would be pretty
  difficult to have only that" / "because If all of humanity was happy,") are
  kept verbatim from the placement, including the stray capital in `If`.

## Next step

- Russian review of the chorus register (`все` vs `всё`, `нравятся` aspect) and,
  if ever needed, a hand-written English gloss pass for the final verse's past
  tense. Refrains reuse glossary names verbatim by design.
