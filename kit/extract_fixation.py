#!/usr/bin/env python3
"""Step 1 of the LinguaMap workflow: text fixation.

Freezes the source region as plain text and writes the line list the build
harness cross-checks:

	fixation.txt   the selected region, stanzas intact (the human deliverable)
	fixation.json  the non-blank lines of that region, in order

	With --tsv-column the same region is reduced to one field and blank lines
	are preserved as stanza breaks, so a jp/romaji/en table yields the same
	fixation shape as plain lyrics.

Usage:
	python3 kit/extract_fixation.py SONG [--lines A:B] [--out-dir DIR]
	                                  [--tsv-column N] [--json NAME] [--txt NAME]

`--lines` is an inclusive 1-based range into the song file; the whole file is
used when it is omitted. `--tsv-column` picks one field of a tab-separated
source (e.g. the Japanese column of a jp/romaji/english table) and drops the
rest. CRLF and LF input both normalise to LF.
"""
import argparse
import json
from pathlib import Path

MARKS = [("\u3000", "U+3000"), ("！", "FW-excl"), ("？", "FW-quest"),
         ("「", "corner-br"), ("」", "corner-qt"), ("――", "dbl-dash"),
         ("'", "apos"), ("(", "lpar"), (")", "rpar"), (" ", "h-space")]


def parse_range(spec, total):
	if not spec:
		return 1, total
	start, _, end = spec.partition(":")
	start, end = int(start), int(end or total)
	if not 1 <= start <= end <= total:
		raise SystemExit(f"line range {start}:{end} outside 1..{total}")
	return start, end


def fixate(song, out_dir, lines=None, tsv_column=None,
           json_name="fixation.json", txt_name="fixation.txt"):
	"""Write the fixation pair and return (fixation lines, source region)."""
	song = Path(song)
	out_dir = Path(out_dir)
	source = song.read_text(encoding="utf-8").splitlines()
	start, end = parse_range(lines, len(source))
	region = source[start - 1:end]
	if tsv_column:
		region = [line.split("\t")[tsv_column - 1].strip() for line in region]
	fixation = [line for line in region if line.strip()]

	out_dir.mkdir(parents=True, exist_ok=True)
	(out_dir / txt_name).write_text("\n".join(region).rstrip() + "\n", encoding="utf-8")
	(out_dir / json_name).write_text(
		json.dumps(fixation, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
	return fixation, region


def report(song, fixation, region, out_dir, txt_name):
	print(f"source:  {song}")
	print(f"region:  {len(region)} lines, {len(fixation)} non-blank")
	print(f"wrote:   {Path(out_dir) / 'fixation.json'}")
	print(f"wrote:   {Path(out_dir) / txt_name}")
	print()
	for i, line in enumerate(fixation, 1):
		print(f"{i:2d} | {line.replace(chr(0x3000), '␣')}")
	print()
	for i, line in enumerate(fixation, 1):
		marks = [name for ch, name in MARKS if ch in line]
		if marks:
			print(f"{i:2d} | {line!r} | {', '.join(marks)}")


def main():
	ap = argparse.ArgumentParser(description=__doc__,
	                             formatter_class=argparse.RawDescriptionHelpFormatter)
	ap.add_argument("song", help="source lyrics file")
	ap.add_argument("--lines", help="inclusive 1-based range, e.g. 1:63 (default: whole file)")
	ap.add_argument("--out-dir", help="output directory (default: the song file's directory)")
	ap.add_argument("--tsv-column", type=int,
	                help="take this 1-based tab-separated field instead of the whole line")
	ap.add_argument("--json", default="fixation.json", help="line-list filename")
	ap.add_argument("--txt", default="fixation.txt", help="plain-text fixation filename")
	args = ap.parse_args()

	song = Path(args.song)
	out_dir = Path(args.out_dir) if args.out_dir else song.parent
	fixation, region = fixate(song, out_dir, args.lines, args.tsv_column,
	                          json_name=args.json, txt_name=args.txt)
	report(song, fixation, region, out_dir, args.txt)


if __name__ == "__main__":
	main()