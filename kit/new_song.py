#!/usr/bin/env python3
"""Scaffold one song folder: sources/, map/, result/.

Creates songs/<slug>/ with a source copy, a fixation pair, a map skeleton and an
empty result directory. The page is built later with kit/build_song.py.

Usage:
	python3 kit/new_song.py <slug> [--source FILE] [--title T]
	                         [--columns en,ru,jp,tr] [--source-key jp]
	                         [--translit-key tr] [--lines A:B]
	                         [--tsv-column N] [--move] [--no-fixate]

<slug> is the directory name: lowercase, ascii, underscores (e.g.
`jumping_girl`). Without --source the song is scaffolded empty and the
fixation is written by hand or with kit/extract_fixation.py. A tab-separated
source (jp / romaji / en table) is reduced to one column with --tsv-column,
which also becomes the source key.
"""
import argparse
import shutil
import sys
from pathlib import Path

from extract_fixation import fixate

ROOT = Path(__file__).resolve().parent.parent
SONGS = ROOT / "songs"
TITLES = {"ru": "Русский", "en": "English", "jp": "日本語", "tr": "Romaji"}
POS_LABELS = {
	"n": "noun", "npr": "proper noun", "v": "verb", "adj": "i-adj", "adjna": "na-adj",
	"adv": "adverb", "pron": "pronoun", "conj": "conjunction",
	"interj": "interjection", "part": "particle", "q": "question word",
}
POS_ORDER = list(POS_LABELS)


def map_skeleton(slug, title, columns, source_key="jp", translit_key="tr"):
	"""A ready-to-fill map: META defaults, no units yet."""
	cols = ", ".join(f'"{c}"' for c in columns)
	titles = ", ".join(f'{c}: "{TITLES[c]}"' for c in columns)
	labels = ",\n    ".join(f'{code}: "{label}"' for code, label in POS_LABELS.items())
	order = ", ".join(f'"{c}"' for c in POS_ORDER)
	return f'''"use strict";

/* {title} — LinguaMap map
   Source:    sources/lyrics.txt
   Fixation:  sources/fixation.json
   units[] stay in SOURCE ({source_key}) word order; translations reorder via
   ord. Build: python3 kit/build_song.py {slug} */

const META = {{
  title: "{title} — LinguaMap",
  subtitle: "{title} · parallel word map",
  credit: "Mapped with the LinguaMap workflow (AGENTS.md).",
  columns: [{cols}],
  columnTitles: {{ {titles} }},
  sourceKey: "{source_key}",
  translitKey: "{translit_key}",
  trMirror: {str(translit_key in columns).lower()},
  posLabels: {{
    {labels}
  }},
  posOrder: [{order}]
}};

const DATA = [
];
'''


def main():
	ap = argparse.ArgumentParser(description=__doc__,
	                             formatter_class=argparse.RawDescriptionHelpFormatter)
	ap.add_argument("slug", help="song directory name under songs/")
	ap.add_argument("--source", help="source lyrics file to copy into sources/")
	ap.add_argument("--title", help="page title (default: the slug)")
	ap.add_argument("--columns", default="en,ru,jp,tr",
	                help="comma-separated column keys (default: en,ru,jp,tr)")
	ap.add_argument("--source-key", default="jp",
	                help="column that holds the fixation text (default: jp)")
	ap.add_argument("--translit-key", default="tr",
	                help="column that mirrors the source (default: tr)")
	ap.add_argument("--tsv-column", type=int,
	                help="take this 1-based tab-separated field as the fixation")
	ap.add_argument("--lines", help="inclusive 1-based fixation range, e.g. 1:63")
	ap.add_argument("--move", action="store_true",
	                help="move the source file instead of copying it")
	ap.add_argument("--no-fixate", action="store_true",
	                help="copy the source but do not write the fixation pair")
	args = ap.parse_args()

	slug = args.slug
	base = SONGS / slug
	if base.exists():
		sys.exit(f"FATAL: {base.relative_to(ROOT)} already exists")
	title = args.title or slug
	columns = [c.strip() for c in args.columns.split(",") if c.strip()]
	if args.source_key not in columns:
		sys.exit(f"FATAL: --source-key {args.source_key} is not in --columns")
	if args.translit_key not in columns:
		sys.exit(f"FATAL: --translit-key {args.translit_key} is not in --columns")
	unknown = [c for c in columns if c not in TITLES]
	if unknown:
		sys.exit(f"FATAL: unknown column keys: {', '.join(unknown)}")

	for sub in ("sources", "map", "result", "qa"):
		(base / sub).mkdir(parents=True)
	(base / "result" / ".gitkeep").write_text("", encoding="utf-8")
	(base / "qa" / ".gitkeep").write_text("", encoding="utf-8")

	if args.source:
		source = Path(args.source)
		if not source.is_file():
			sys.exit(f"FATAL: missing source file: {source}")
		lyrics = base / "sources" / "lyrics.txt"
		if args.move:
			shutil.move(str(source), lyrics)
		else:
			shutil.copyfile(source, lyrics)
		print(f"source:  {lyrics.relative_to(ROOT)}")
		if not args.no_fixate:
			fixation, _ = fixate(lyrics, base / "sources", args.lines,
			                       tsv_column=args.tsv_column)
			print(f"fixation: {len(fixation)} lines")
	else:
		(base / "sources" / ".gitkeep").write_text("", encoding="utf-8")

	map_file = base / "map" / "song-data.js"
	map_file.write_text(map_skeleton(slug, title, columns, args.source_key,
	                                 args.translit_key), encoding="utf-8")
	(base / "worklog.md").write_text(
		f"# {title}\n\n## Steps\n\n- [ ] fixation reviewed\n"
		"- [ ] glossary frozen (recurring names)\n"
		"- [ ] segmentation\n- [ ] translation columns\n"
		"- [ ] data assembly + ord\n- [ ] build green\n"
		"- [ ] human pass (colours, refrains, mobile, print)\n", encoding="utf-8")
	print(f"map:     {map_file.relative_to(ROOT)}")
	print(f"result:  {base / 'result'}")
	print(f"\nnext: fill the units in {map_file.relative_to(ROOT)}, then "
	      f"python3 kit/build_song.py {slug}")


if __name__ == "__main__":
	main()