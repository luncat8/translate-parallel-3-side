# すきなことだけでいいです

## Steps

- [x] fixation reviewed (79 lines, stanzas intact; U+3000 preserved)
- [x] glossary frozen (86 meanings, one name per meaning across 79 lines)
- [x] segmentation (bundles carry particles and punctuation)
- [x] translation columns (English, Russian)
- [x] data assembly + ord (en/ru reorder; source and romaji never reorder)
- [x] build green (`errors: 0`, 42 intentional refrain warnings)
- [x] human pass (colours, refrain reuse, plain mode, mobile, print)

## Policies frozen for this song

- Unit = smallest independently translatable meaning. Particles and sentence-final
  forms bundle into the unit they serve (`好きなことが`, `好きなんです`,
  `それだけじゃ`, `でいいです`). Punctuation folds into the preceding unit.
- `i_like` covers both `好きなこと` and `すきなこと`: the same meaning, surface
  variation only. The validator reports these as warnings by design.
- `like` = 好き (present) and 好きでした (past). The English and Russian cells
  carry the tense; the name binds the meaning, not the form.
- `humanity` = 全人類が and 全人類の. The particle folds per line function; the
  meaning is one.
- `dislike` appears twice in the "everyone dislikes what they dislike" lines:
  the repetition is the rhetoric, so the same name is reused on purpose.
- Chorus lines reuse the chorus names verbatim; the validator's
  duplicate-occurrence and surface-difference warnings are intentional.
- Romaji: Hepburn with ASCII long vowels (`juusu`, `mugicha`, `kanmi`), small
  っ rendered as a doubled consonant (`gassan` style), full-width U+3000 kept as
  a single space inside the tr cell that owns it.

## Validation

`python3 kit/build_song.py suki_na_koto_dake_de_ii_desu`

- stats: 79 lines, 225 units, 86 unique meanings
- errors: 0
- warnings: 42 (all audited: refrain repeats and deliberate surface variants)
- fixation cross-check: all 79 `src` lines match `sources/fixation.json` exactly

## Next step

Add Russian review of the chorus register (`все` vs `всё`, `нравятся` aspect) and
optionally a hand-written English gloss pass for the final verse's past tense.
