# LinguaMap

Multilingual parallel word maps for songs: source text + transliteration + translations, one stable `name` per meaning, colour-coded by part of speech.

Every text is a self-contained song folder; the shared engine and tooling live in `kit/`.

## Layout

```
kit/                            reusable engine + tooling (never song-specific)
  linguamap-template.html       engine: CSS, validator, renderer, demo data
  build_song.py                 build one song (or --all) + validation gate
  run_validation.js             Node harness: fixation cross-check + I1..I6
  extract_fixation.py           step 1: source text -> fixation.txt/.json
  new_song.py                   scaffold a song folder
songs/<slug>/
  sources/lyrics.txt            raw source, untouched
  sources/fixation.txt          plain-text fixation, stanzas intact
  sources/fixation.json         line list the harness cross-checks
  map/song-data.js              META + DATA — the only file to edit
  result/<slug>_linguamap.html  built page (artifact)
  qa/                           optional screenshots
  worklog.md                    per-song checklist
```

Every song is independent: `sources/` in, `map/` in the middle, `result/` out.
The kit holds the engine and the build/validation harness; no song ever edits it.

## New song

```sh
python3 kit/new_song.py <slug> --source <file>        # scaffold + fixate
python3 kit/build_song.py <slug>                      # build + validate
```

`<slug>` is a lowercase ASCII directory name (`jumping_girl`). The build fails on any validation ERROR; warnings are expected on refrains and must be audited.

A tab-separated source (Japanese / romaji / English) is reduced to one column at scaffold time, and that column becomes the fixation:

```sh
python3 kit/new_song.py <slug> --source <file> --tsv-column 1 --lines 2:93 \
        --columns en,ru,jp,tr --source-key jp --translit-key tr
```

`--columns` sets the rendered columns; `--source-key` names the column that must rebuild `src` character-for-character; `--translit-key` names the column that mirrors it. The defaults (`en,ru,jp,tr`, `jp`, `tr`) work for any Japanese song; change them for a different source language.

## Build everything

```sh
python3 kit/build_song.py --all
```

Songs missing `map/song-data.js`, `sources/fixation.json` or units are skipped with a reason. The build prints `stats` (lines, units, unique meanings, spans) and `errors` / `warnings`; `errors: 0` is the gate.

## Songs

| slug | source | status |
|------|--------|--------|
| `jumping_girl` | Japanese lyrics | mapped (53 lines), built |
| `suki_na_koto_dake_de_ii_desu` | Japanese lyrics (jp/romaji/en table) | mapped (79 lines, 86 meanings), built |

## Copyright

Song lyrics, titles and trademarks are the property of their respective owners
(lyricists, composers, publishers, labels). They are included here for
linguistic study and commentary only; no infringement is intended. The
software in this repo is MIT-licensed — the lyrics are not.