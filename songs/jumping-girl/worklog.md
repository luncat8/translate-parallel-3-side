# Poppin'Party Jumping girl

## Steps

- [x] fixation reviewed (53 lines, stanzas intact)
- [x] glossary frozen
- [x] segmentation
- [x] translation columns (ru / en)
- [x] data assembly + ord
- [x] build green (`errors: 0`, 38 refrain warnings audited)
- [x] human pass

## Notes

- `mapMode: "word"` — hand-segmented map; English chant formulae
  (`Jumpin' girls!`, `Jump up!`, `Go ahead!`) are fixed phrases kept verbatim
  in en and ru and coloured as interjections.
- Expected translations were exported from this map
  (`tools/song.py export --song jumping-girl`).
- Columns read source first, its mirror next, then the translations
  (`jp`, `tr`, `en`, `ru`); the header labels are the two-letter codes and
  `META.columnNames` carries the full names for the tooltip.
- `そこには` is the only は topic in the song, so it carries `topic: true` and
  is underlined in every column.

## Page controls — 2026-11-14

- Rebuilt from the shared engine with exclusive Plain text / Translated song /
  Vocabulary / Validation views; Translated song is the default.
- Language labels are hidden by default with an accessible checkbox to show
  them; mobile text uses the freed gutter space.
- View, columns, labels, theme, vocabulary filter and POS focus round-trip in
  the URL fragment, including offline pages. Language toggles also apply to
  vocabulary; pins survive switching back to the translated song.
- Validation: `make check` passes (5 regression tests, 0 data errors; the 38
  audited warnings are unchanged). All 18 browser tests pass over both
  `file://` and HTTP, including mobile labels and selected-view printing.

## Next step

Re-audit the English chant lines against the current register policy if the
lyric source is ever revised.
