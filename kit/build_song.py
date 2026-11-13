#!/usr/bin/env python3
"""Build one song's standalone LinguaMap page, then gate it on validation.

Song layout (see AGENTS.md):

	songs/<slug>/sources/fixation.json   ground-truth line list
	songs/<slug>/map/song-data.js        META + DATA (the map)
	songs/<slug>/result/<slug>_linguamap.html   build artefact

The HTML is an artefact — edit the map and rebuild, never hand-edit the page
(AGENTS.md pitfall 15).

Usage:
	python3 kit/build_song.py <slug> [--title T] [--data P] [--fixation P] [--out P]
	python3 kit/build_song.py --all
"""
import argparse
import html
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
KIT = Path(__file__).resolve().parent
SONGS = ROOT / "songs"
TEMPLATE = KIT / "linguamap-template.html"
HARNESS = KIT / "run_validation.js"

DATA_BLOCK = re.compile(r'<script id="data">[\s\S]*?</script>')
DEMO_TITLE = "<title>LinguaMap — parallel text engine (demo)</title>"
META_TITLE = re.compile(r'^\s*title:\s*"([^"]*)"', re.M)
LINE_BLOCK = re.compile(r'type:\s*"line"')


def song_paths(slug, args):
	"""Resolve the four paths of one song; explicit args win over the layout."""
	base = SONGS / slug
	data = Path(args.data) if args.data else base / "map" / "song-data.js"
	fixation = Path(args.fixation) if args.fixation else base / "sources" / "fixation.json"
	out = Path(args.out) if args.out else base / "result" / f"{slug}_linguamap.html"
	return base, data, fixation, out


def page_title(data_src, fallback):
	found = META_TITLE.search(data_src)
	return found.group(1) if found else fallback


def build(slug, args):
	base, data_path, fixation_path, out_path = song_paths(slug, args)
	for path, what in ((data_path, "map"), (fixation_path, "fixation")):
		if not path.is_file():
			sys.exit(f"FATAL: {slug}: missing {what}: {path}")
	template = Path(args.template)
	if not template.is_file():
		sys.exit(f"FATAL: missing engine template: {template}")

	data_src = data_path.read_text(encoding="utf-8").rstrip() + "\n"
	page = template.read_text(encoding="utf-8")

	page, n = DATA_BLOCK.subn(
		lambda _: '<script id="data">\n' + data_src + "</script>", page, count=1)
	if n != 1:
		sys.exit('FATAL: could not locate the <script id="data"> block in the template')

	title = html.escape(args.title or page_title(data_src, slug))
	page, n = re.subn(re.escape(DEMO_TITLE), f"<title>{title}</title>", page, count=1)
	if n != 1:
		sys.exit("FATAL: could not locate the demo <title> in the template")

	out_path.parent.mkdir(parents=True, exist_ok=True)
	out_path.write_text(page, encoding="utf-8")
	print(f"built: {out_path.relative_to(ROOT)}  ({out_path.stat().st_size:,} bytes)")

	res = subprocess.run(
		["node", str(HARNESS), str(out_path), str(data_path), str(fixation_path)])
	return res.returncode


def not_ready(slug):
	"""Why a song cannot be built yet, or None when it can."""
	base = SONGS / slug
	map_file = base / "map" / "song-data.js"
	if not map_file.is_file():
		return "missing map/song-data.js"
	if not (base / "sources" / "fixation.json").is_file():
		return "missing sources/fixation.json"
	if not LINE_BLOCK.search(map_file.read_text(encoding="utf-8")):
		return "no units yet"
	return None


def buildable():
	"""Every song that is ready to build, in stable slug order."""
	return [p.name for p in sorted(SONGS.iterdir()) if p.is_dir() and not_ready(p.name) is None]


def main():
	ap = argparse.ArgumentParser(description=__doc__,
	                             formatter_class=argparse.RawDescriptionHelpFormatter)
	ap.add_argument("slug", nargs="?", help="song directory name under songs/")
	ap.add_argument("--all", action="store_true", help="build every buildable song")
	ap.add_argument("--title", help="page <title> (default: META.title)")
	ap.add_argument("--data", help="map file (default: <song>/map/song-data.js)")
	ap.add_argument("--fixation", help="fixation file (default: <song>/sources/fixation.json)")
	ap.add_argument("--out", help="output HTML (default: <song>/result/<slug>_linguamap.html)")
	ap.add_argument("--template", default=str(TEMPLATE), help="engine template")
	args = ap.parse_args()

	if args.all:
		if args.slug:
			ap.error("give either a slug or --all, not both")
		for opt in ("title", "data", "fixation", "out"):
			if getattr(args, opt):
				ap.error(f"--{opt} makes no sense with --all")
		built = failed = skipped = 0
		for slug in sorted(p.name for p in SONGS.iterdir() if p.is_dir()):
			reason = not_ready(slug)
			if reason:
				print(f"skip: {slug}  ({reason})")
				skipped += 1
				continue
			if build(slug, args):
				failed += 1
			else:
				built += 1
		print(f"built {built}, failed {failed}, skipped {skipped}")
		sys.exit(1 if failed else 0)

	if not args.slug:
		ap.error("give a song slug or --all")
	sys.exit(build(args.slug, args))


if __name__ == "__main__":
	main()