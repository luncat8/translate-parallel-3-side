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

## Next step

Re-audit the English chant lines against the current register policy if the
lyric source is ever revised.
