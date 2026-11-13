# LinguaMap

Multilingual parallel word maps for songs: source text + transliteration + translations, one stable `name` per meaning, colour-coded by part of speech. The engine is shared; **every song lives in its own folder** with its sources, map and generated result HTML.

## Layout

```
engine/                         reusable HTML engine, Node validator, translation exporter
tools/song.py                   one CLI for the whole song-folder workflow
songs/<song-id>/
├── song.json                   manifest: title and relative paths
├── sources/
│   ├── original.*              placed source, kept for provenance
│   ├── source.ja.txt            exact fixation, stanza gaps intact
│   ├── source.tr.txt            line-aligned Romaji mirror
│   ├── fixation.json            ground-truth nonblank source lines
│   ├── expected-translation.en.txt
│   └── expected-translation.ru.txt
├── map/
│   └── song-data.js            canonical META + DATA map
├── result.html                 standalone, offline deliverable
├── worklog.md                  per-song checklist (fixes the plan in place)
└── qa/                         per-song screenshots and manual QA notes
```

Expected translations are plain line-aligned gold text: one target line per source line, with the same blank stanza lines. `result.html` is generated from `map/song-data.js`; never hand-edit it.

## Included songs

| Folder | Source | Map | Example |
|---|---|---|---|
| `songs/jumping-girl/` | Japanese / Romaji / English text | hand-segmented word map with English + Russian | full 53-line LinguaMap; expected translations exported from the map |
| `songs/sukina-koto-dake-de-ii-desu/` | the placed Japanese / Romaji / English TSV | hand-segmented word map with English + Russian | **expected-translation example**: the placed English text (kept verbatim) plus a line-aligned hand-written Russian translation, rendered side by side in `result.html` |

Both songs' `mapMode` is `word`: meaning-level units, stable glossary names, real POS classes. A freshly scaffolded song gets `mapMode: "line-starter"` — a valid line-level preview with one unit per source line and placeholder POS labels, which you replace with a hand-segmented word map when the linguistic pass begins, then rebuild. The `<title>` of `result.html` comes from the map's `META.title`; `song.json` carries no page title.

## Commands

```sh
make build                         # rebuild every result.html and run validation
make check                         # build + layout/alignment/freshness checks + tests

python3 tools/song.py build --all
python3 tools/song.py check --all
python3 tools/song.py fixation --song <id>
python3 tools/song.py export --song <id>
python3 tools/song.py starter-map --song <id>
```

To add a song, prepare a TSV with `Japanese`, `Romaji`, `English` and optional `Russian` columns; otherwise pass `--expected-ru` with a line-aligned Russian text file:

```sh
python3 tools/song.py new \
  --song my-song \
  --title "My song" \
  --source /path/to/song.tsv \
  --expected-ru /path/to/expected-ru.txt
```

That command creates `songs/my-song/`, splits the sources, writes `fixation.json`, generates a starter `map/song-data.js`, builds `result.html` and validates it. Replace the starter map with a hand-segmented word map when the linguistic pass begins, then rebuild. See `songs/README.md` and `AGENTS.md` for the full contract.

## Copyright

Song lyrics, titles and trademarks are the property of their respective owners
(lyricists, composers, publishers, labels). They are included here for
linguistic study and commentary only; no infringement is intended. The
software in this repo is MIT-licensed — the lyrics are not.
