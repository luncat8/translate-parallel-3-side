#!/usr/bin/env python3
"""Song-folder workflow: import sources, generate a starter map, build and check.

Every song is self-contained under songs/<id>/. Paths are resolved from that
folder's song.json; no absolute paths or per-song command lines are needed.
"""
import argparse
import hashlib
import html
import json
import re
import subprocess
import sys
from pathlib import Path, PurePosixPath

ROOT = Path(__file__).resolve().parents[1]
ENGINE = ROOT / "engine"
SONGS = ROOT / "songs"
TEMPLATE = ENGINE / "linguamap-template.html"
VALIDATOR = ENGINE / "run_validation.js"
EXPORTER = ENGINE / "export_translations.js"

COLUMNS = ["ru", "en", "jp", "tr"]
TSV_OUTPUT = {
	"japanese": "sources/source.ja.txt",
	"romaji": "sources/source.tr.txt",
	"english": "sources/expected-translation.en.txt",
	"russian": "sources/expected-translation.ru.txt"
}
REQUIRED = ["source", "transliteration", "fixation", "map", "result", "expectedTranslations"]


class SongError(Exception):
	pass


def song_ids():
	return sorted(p.name for p in SONGS.iterdir() if (p / "song.json").is_file())


def load_song(song_id):
	song_dir = SONGS / song_id
	manifest = song_dir / "song.json"
	if not manifest.is_file():
		raise SongError(f"no song.json for {song_id!r}")
	cfg = json.loads(manifest.read_text(encoding="utf-8"))
	if cfg.get("id") != song_id:
		raise SongError(f"{manifest}: id must be {song_id!r}")
	for key in REQUIRED:
		if key not in cfg:
			raise SongError(f"{manifest}: missing {key!r}")
	return song_dir, cfg


def resolve(song_dir, value, label):
	rel = PurePosixPath(value)
	if rel.is_absolute() or ".." in rel.parts:
		raise SongError(f"{label}: path must stay inside the song folder: {value!r}")
	return song_dir / rel


def read_lines(path):
	return path.read_text(encoding="utf-8").splitlines()


def write_lines(path, lines):
	path.parent.mkdir(parents=True, exist_ok=True)
	path.write_text("\n".join(lines) + "\n", encoding="utf-8")


def has_content(line):
	return bool(line.strip(" \t"))


def nonblank(lines):
	return [line for line in lines if has_content(line)]


def assert_aligned(source_lines, other_lines, label):
	if len(source_lines) != len(other_lines):
		raise SongError(f"{label}: {len(other_lines)} lines, expected {len(source_lines)}")
	for pos, (src, other) in enumerate(zip(source_lines, other_lines), 1):
		if has_content(src) != has_content(other):
			raise SongError(f"{label}: line {pos} breaks the source stanza pattern")


def js(value):
	return json.dumps(value, ensure_ascii=False)


def check_alignment(song_id):
	song_dir, cfg = load_song(song_id)
	source_path = resolve(song_dir, cfg["source"], "source")
	tr_path = resolve(song_dir, cfg["transliteration"], "transliteration")
	fixation_path = resolve(song_dir, cfg["fixation"], "fixation")
	source_lines = read_lines(source_path)
	fixation = json.loads(fixation_path.read_text(encoding="utf-8"))
	if fixation != nonblank(source_lines):
		raise SongError(f"{fixation_path}: does not match the nonblank source lines")
	assert_aligned(source_lines, read_lines(tr_path), str(tr_path))
	for lang, rel in cfg["expectedTranslations"].items():
		path = resolve(song_dir, rel, f"expectedTranslations.{lang}")
		assert_aligned(source_lines, read_lines(path), str(path))


def write_fixation(song_id):
	song_dir, cfg = load_song(song_id)
	source_path = resolve(song_dir, cfg["source"], "source")
	fixation_path = resolve(song_dir, cfg["fixation"], "fixation")
	fixation = nonblank(read_lines(source_path))
	fixation_path.parent.mkdir(parents=True, exist_ok=True)
	fixation_path.write_text(
		json.dumps(fixation, ensure_ascii=False, indent="\t") + "\n",
		encoding="utf-8")
	print(f"fixation: {fixation_path.relative_to(ROOT)} ({len(fixation)} lines)")


def unit_name(tr, en, cache):
	key = re.sub(r"[^a-z0-9]+", "", tr.lower())
	if key in cache:
		return cache[key]
	digest = hashlib.sha1(key.encode("utf-8")).hexdigest()[:8]
	words = [w for w in re.sub(r"[^a-z0-9]+", "_", en.lower()).split("_") if w][:4]
	cache[key] = "line_" + ("_".join(words) or "unit") + "_" + digest
	return cache[key]


def starter_map(song_id):
	song_dir, cfg = load_song(song_id)
	source_path = resolve(song_dir, cfg["source"], "source")
	tr_path = resolve(song_dir, cfg["transliteration"], "transliteration")
	en_path = resolve(song_dir, cfg["expectedTranslations"]["en"], "expectedTranslations.en")
	ru_path = resolve(song_dir, cfg["expectedTranslations"]["ru"], "expectedTranslations.ru")
	jp_lines = read_lines(source_path)
	tr_lines = read_lines(tr_path)
	en_lines = read_lines(en_path)
	ru_lines = read_lines(ru_path)
	for path, lines in [(tr_path, tr_lines), (en_path, en_lines), (ru_path, ru_lines)]:
		assert_aligned(jp_lines, lines, str(path))

	blocks = []
	names = {}
	stanza = 1
	start = True
	for pos, jp in enumerate(jp_lines):
		if not has_content(jp):
			if not start:
				blocks.append('\t{ type: "gap" }')
			start = True
			continue
		if start:
			blocks.append(f'\t{{ type: "section", label: "Stanza {stanza}" }}')
			stanza += 1
			start = False
		tr, en, ru = tr_lines[pos].strip(" "), en_lines[pos].strip(" "), ru_lines[pos].strip(" ")
		if not all(has_content(cell) for cell in [tr, en, ru]):
			raise SongError(f"{source_path}: line {pos + 1} has an empty aligned cell")
		jp = jp.strip(" ")
		blocks.append(
			f'\t{{ type: "line", src: {js(jp)}, units: [\n'
			f'\t\t{{ name: {js(unit_name(tr, en, names))}, pos: "n", '
			f'jp: {js(jp)}, tr: {js(tr)}, en: {js(en)}, ru: {js(ru)} }}\n'
			'\t] }')

	title = cfg["title"]
	meta = [
		'"use strict";',
		'',
		'/* Line-aligned starter map: refine one-unit lines into meaning units. */',
		'const META = {',
		f'\ttitle: {js(cfg.get("pageTitle", title + " — LinguaMap"))},',
		f'\tsubtitle: {js("Parallel word map: 日本語 · Romaji · English · Русский")},',
		'\tcredit: "Generated from line-aligned expected translations by tools/song.py. '
		'One unit per source line; colours and POS are placeholders until word-level segmentation. '
		'Repeated refrains share names, so surface-variant warnings are intentional.",',
		f'\tcolumns: {js(COLUMNS)},',
		'\tcolumnTitles: { ru: "Русский", en: "English", jp: "日本語", tr: "Romaji" },',
		'\ttrMirror: true,',
		'\tposLabels: { n: "line (starter map)" },',
		'\tposOrder: ["n"]',
		'};',
		'',
		'const DATA = [',
		',\n'.join(blocks),
		'];',
		''
	]
	map_path = resolve(song_dir, cfg["map"], "map")
	map_path.parent.mkdir(parents=True, exist_ok=True)
	map_path.write_text("\n".join(meta), encoding="utf-8")
	cfg["mapMode"] = "line-starter"
	write_manifest(song_dir, cfg)
	print(f"starter map: {map_path.relative_to(ROOT)} ({stanza - 1} stanzas)")


def write_manifest(song_dir, cfg):
	(song_dir / "song.json").write_text(
		json.dumps(cfg, ensure_ascii=False, indent="\t") + "\n",
		encoding="utf-8")


def render_html(song_id):
	song_dir, cfg = load_song(song_id)
	map_path = resolve(song_dir, cfg["map"], "map")
	template = TEMPLATE.read_text(encoding="utf-8")
	data_src = map_path.read_text(encoding="utf-8").rstrip() + "\n"
	data_block = '<script id="data">\n' + data_src + "</script>"
	page, count = re.subn(
		r'<script id="data">[\s\S]*?</script>',
		lambda _: data_block, template, count=1)
	if count != 1:
		raise SongError(f"{TEMPLATE}: data script hook not found")
	page_title = html.escape(cfg.get("pageTitle", cfg["title"] + " — LinguaMap"), quote=False)
	page, count = re.subn(
		r"<title>LinguaMap — parallel text engine \(demo\)</title>",
		lambda _: f"<title>{page_title}</title>", page, count=1)
	if count != 1:
		raise SongError(f"{TEMPLATE}: demo title not found")
	return page


def build_song(song_id):
	check_alignment(song_id)
	song_dir, cfg = load_song(song_id)
	result_path = resolve(song_dir, cfg["result"], "result")
	result_path.parent.mkdir(parents=True, exist_ok=True)
	result_path.write_text(render_html(song_id), encoding="utf-8")
	res = subprocess.run(
		["node", str(VALIDATOR), str(result_path),
		 str(resolve(song_dir, cfg["map"], "map")),
		 str(resolve(song_dir, cfg["fixation"], "fixation"))],
		cwd=ROOT, capture_output=True, text=True)
	if res.returncode:
		print(res.stdout + res.stderr, file=sys.stderr)
		raise SongError(f"validation failed for {song_id!r}")
	summary = next((line for line in res.stdout.splitlines() if line.startswith("errors:")), "")
	print(f"built: {result_path.relative_to(ROOT)}  {summary}")


def check_song(song_id):
	check_alignment(song_id)
	song_dir, cfg = load_song(song_id)
	result_path = resolve(song_dir, cfg["result"], "result")
	if not result_path.is_file():
		raise SongError(f"{result_path}: missing; run build --song {song_id}")
	if result_path.read_text(encoding="utf-8") != render_html(song_id):
		raise SongError(f"{result_path}: stale; run build --song {song_id}")
	res = subprocess.run(
		["node", str(VALIDATOR), str(result_path),
		 str(resolve(song_dir, cfg["map"], "map")),
		 str(resolve(song_dir, cfg["fixation"], "fixation"))],
		cwd=ROOT, capture_output=True, text=True)
	if res.returncode:
		print(res.stdout + res.stderr, file=sys.stderr)
		raise SongError(f"result validation failed for {song_id!r}")
	print(f"ok: {song_id}")


def export_song(song_id):
	song_dir, cfg = load_song(song_id)
	args = [
		"node", str(EXPORTER),
		str(resolve(song_dir, cfg["map"], "map")),
		str(resolve(song_dir, cfg["source"], "source")),
		str(song_dir / "sources")
	]
	res = subprocess.run(args, cwd=ROOT, capture_output=True, text=True)
	if res.returncode:
		print(res.stdout + res.stderr, file=sys.stderr)
		raise SongError(f"export failed for {song_id!r}")
	print(res.stdout.strip())
	for lang, rel in cfg["expectedTranslations"].items():
		if not resolve(song_dir, rel, f"expectedTranslations.{lang}").is_file():
			raise SongError(f"export did not produce {rel}")


def import_tsv(source_path, song_dir, expected_ru=None):
	lines = read_lines(source_path)
	if not lines:
		raise SongError(f"{source_path}: empty source")
	headers = [h.strip().lower() for h in lines[0].split("\t")]
	unknown = [h for h in headers if h not in TSV_OUTPUT]
	if unknown:
		raise SongError(f"{source_path}: unknown TSV columns: {', '.join(unknown)}")
	indexes = {name: headers.index(name) for name in TSV_OUTPUT if name in headers}
	for name in ["japanese", "romaji", "english"]:
		if name not in indexes:
			raise SongError(f"{source_path}: missing {name!r} column")
	if "russian" in indexes and expected_ru:
		raise SongError("TSV already has a Russian column; omit --expected-ru")
	if "russian" not in indexes and not expected_ru:
		raise SongError("provide a Russian column or --expected-ru")

	outputs = {name: [] for name in indexes}
	for pos, line in enumerate(lines[1:], 2):
		if not has_content(line):
			for values in outputs.values():
				values.append("")
			continue
		fields = [field.strip(" ") for field in line.split("\t")]
		for name, index in indexes.items():
			if index >= len(fields):
				raise SongError(f"{source_path}: line {pos} has no {name!r} cell")
			outputs[name].append(fields[index])

	if expected_ru:
		ru_lines = read_lines(Path(expected_ru))
		outputs["russian"] = ru_lines
		assert_aligned(outputs["japanese"], ru_lines, str(expected_ru))

	sources = song_dir / "sources"
	sources.mkdir(parents=True, exist_ok=True)
	(sources / "original.tsv").write_text("\n".join(lines) + "\n", encoding="utf-8")
	for name, rel in TSV_OUTPUT.items():
		if name in outputs:
			write_lines(song_dir / rel, outputs[name])
	return outputs["japanese"]


def new_song(args):
	if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", args.song):
		raise SongError("--song must be a lowercase kebab-case id")
	song_dir = SONGS / args.song
	if song_dir.exists():
		raise SongError(f"{song_dir}: already exists")
	source_path = Path(args.source)
	if not source_path.is_file():
		raise SongError(f"{source_path}: source not found")
	song_dir.mkdir(parents=True)
	cfg = {
		"id": args.song,
		"title": args.title,
		"pageTitle": args.page_title or args.title + " — LinguaMap",
		"sourceLanguage": "ja",
		"sourceFormat": "tsv",
		"columns": COLUMNS,
		"source": "sources/source.ja.txt",
		"transliteration": "sources/source.tr.txt",
		"fixation": "sources/fixation.json",
		"map": "map/song-data.js",
		"result": "result.html",
		"mapMode": "line-starter",
		"expectedTranslations": {
			"en": "sources/expected-translation.en.txt",
			"ru": "sources/expected-translation.ru.txt"
		}
	}
	write_manifest(song_dir, cfg)
	try:
		jp_lines = import_tsv(source_path, song_dir, args.expected_ru)
		write_fixation(args.song)
		starter_map(args.song)
		build_song(args.song)
		check_song(args.song)
	except Exception:
		for path in sorted(song_dir.rglob("*"), reverse=True):
			if path.is_file():
				path.unlink()
		for path in sorted(song_dir.rglob("*"), reverse=True):
			if path.is_dir():
				path.rmdir()
		song_dir.rmdir()
		raise
	print(f"new song: {song_dir.relative_to(ROOT)} ({len(nonblank(jp_lines))} lines)")


def selected(args, parser):
	if bool(args.all) == bool(args.song):
		parser.error("pass exactly one of --song or --all")
	return song_ids() if args.all else [args.song]


def main():
	parser = argparse.ArgumentParser(description=__doc__)
	sub = parser.add_subparsers(dest="command", required=True)

	p = sub.add_parser("build", help="build result HTML and gate on validation")
	p.add_argument("--song")
	p.add_argument("--all", action="store_true")

	p = sub.add_parser("check", help="check layout, alignment, result freshness and validation")
	p.add_argument("--song")
	p.add_argument("--all", action="store_true")

	p = sub.add_parser("fixation", help="regenerate fixation.json from source.ja.txt")
	p.add_argument("--song", required=True)

	p = sub.add_parser("starter-map", help="generate a line-level map from aligned sources")
	p.add_argument("--song", required=True)

	p = sub.add_parser("export", help="export expected translations from a word-level map")
	p.add_argument("--song", required=True)

	p = sub.add_parser("new", help="scaffold, map and build a song from a TSV source")
	p.add_argument("--song", required=True)
	p.add_argument("--title", required=True)
	p.add_argument("--source", required=True)
	p.add_argument("--expected-ru")
	p.add_argument("--page-title")

	args = parser.parse_args()
	try:
		if args.command in ["build", "check"]:
			for song_id in selected(args, parser):
				{"build": build_song, "check": check_song}[args.command](song_id)
		elif args.command == "fixation":
			write_fixation(args.song)
		elif args.command == "starter-map":
			starter_map(args.song)
		elif args.command == "export":
			export_song(args.song)
		elif args.command == "new":
			new_song(args)
	except SongError as exc:
		print(f"ERROR: {exc}", file=sys.stderr)
		return 1
	return 0


if __name__ == "__main__":
	sys.exit(main())
