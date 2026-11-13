# Song folder contract

Each directory directly under `songs/` with a `song.json` is a song. Discovery is automatic: `tools/song.py build --all` and `check --all` find every manifest.

## Required files

| Path | Purpose |
|---|---|
| `song.json` | `id`, `title`, relative paths, `columns`, `mapMode`, `expectedTranslations` |
| `sources/original.*` | the placed source text, retained unchanged in LF form |
| `sources/source.ja.txt` | the fixation: exact Japanese lines, with blank stanza lines |
| `sources/source.tr.txt` | Romaji mirror, line-aligned with the fixation |
| `sources/fixation.json` | nonblank source lines in order, used by the validator |
| `sources/expected-translation.en.txt` | line-aligned expected English |
| `sources/expected-translation.ru.txt` | line-aligned expected Russian |
| `map/song-data.js` | canonical `META` + `DATA` classic script |
| `result.html` | generated standalone page, committed as the deliverable |
| `worklog.md` | per-song checklist and decisions log; records the audited warnings |
| `qa/` | per-song screenshots and manual QA notes |

All paths in `song.json` are relative to the song folder. Every aligned text file must have the same number of lines and the same blank-line positions as `source.ja.txt`. The page `<title>` is taken from the map's `META.title` at build time.

## Add a song

1. Prepare a TSV whose header has `Japanese`, `Romaji`, `English` and optionally `Russian` columns. If there is no Russian column, also prepare a line-aligned Russian text file.
2. Run:
   ```sh
   python3 tools/song.py new --song <id> --title "<title>" \
     --source /path/to/song.tsv [--expected-ru /path/to/ru.txt]
   ```
3. Review `sources/expected-translation.*.txt` and `result.html`.
4. Replace the generated `map/song-data.js` with a hand-segmented word map; set `mapMode` to `word`.
5. Run `python3 tools/song.py build --all && python3 tools/song.py check --all`.

`mapMode: "line-starter"` means one unit per source line and placeholder POS labels. It is a valid, renderable preview, but not a finished linguistic segmentation. `mapMode: "word"` means the map has meaning-level units, stable glossary names and real POS classes.

`tools/song.py export --song <id>` derives expected English/Russian files from a finished word map, using each line's `ord` arrays — use it when the gold files should mirror the map (jumping-girl does this). If the gold text is the human reference (as in sukina-koto-dake-de-ii-desu, where the English is the placed text and the Russian is hand-written), keep those files and do not regenerate them. `tools/song.py starter-map --song <id>` does the reverse: it builds a preview map from aligned expected translations.
