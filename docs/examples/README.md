# Bundle examples

Real files in the wire format of `docs/0.3.0-plan.md`. The fork's parser tests copy them
verbatim; nothing here is generated at test time, so a format change shows up as a diff.

| File | What it proves |
|---|---|
| `jumping-girl.lmz.txt` | Full 53-block song, 4 columns (`jp,tr,ru,en`), palette inline, `#` comments, `@timeFormat none`. The source column is byte-exact against `songs/jumping-girl/sources/fixation.json`, including U+3000 and full-width punctuation. |

## Consuming

```sh
# reference reader (once engine/parse_linguamap.js lands in P0.4)
node engine/parse_linguamap.js docs/examples/jumping-girl.lmz.txt --json

# what a C++ parser must reproduce
grep -v '^#' docs/examples/jumping-girl.lmz.txt | grep -v '^@' | grep -v '^\s*$' | grep -v $'^\t' | wc -l   # 53 source lines
```

## Rules these files follow

- Byte 0 is `#!linguamap 1`; a UTF-8 BOM before it is tolerated on read, never written.
- One header per line, no continuations, no duplicate keys.
- The unindented line of a block is the source, byte-exact. Every TAB-indented line is one
  column, in `@columns` order, source omitted.
- An empty cell is a bare TAB line — never a missing line.
- Timestamps appear only with `@timeFormat lrc`, and the source line then starts with the
  `[mm:ss.cc]` stamp; otherwise `[` is ordinary text.

## Later additions (P0.7)

- `timed/` — a 5-language bundle with `@timeFormat lrc`.
- `invalid/` — one tiny file per rejection case: `no-magic.lmz.txt`,
  `short-block.lmz.txt`, `bad-hex.lmz.txt`, `time-regress.lmz.txt`,
  `unknown-column.lmz.txt`. Each must make the fork log one warning and fall back to plain
  lyrics.
