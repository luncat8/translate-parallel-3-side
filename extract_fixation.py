#!/usr/bin/env python3
"""Step 1 of the LinguaMap workflow: text fixation.

Reads the song file, extracts the Japanese source block (first 63 lines,
stanzas intact), verifies it character by character, and writes:
  - fixation.json  (list of 53 non-blank source lines, in order)
  - fixation.txt   (the plain-text fixation deliverable)
  - a repr listing to stdout so exact codepoints are visible
"""
import argparse
import json
from pathlib import Path

ap = argparse.ArgumentParser(description="LinguaMap step 1: text fixation")
ap.add_argument("--song", default="/home/z/my-project/upload/popin Jumping girl.txt",
                help="source lyrics file (jp block first, then romaji block)")
ap.add_argument("--jp-lines", type=int, default=63,
                help="length of the jp block region at the top of the file")
ap.add_argument("--romaji-start", default="Yūgure",
                help="expected first token of the romaji block (sanity check)")
ap.add_argument("--out-dir", default="/home/z/my-project/scripts/linguamap",
                help="where fixation.json is written")
ap.add_argument("--dl-dir", default="/home/z/my-project/download",
                help="where the fixation .txt deliverable is written")
ap.add_argument("--name", default="popin_jumping_girl",
                help="deliverable basename: <name>_fixation.txt")
args = ap.parse_args()

SONG = Path(args.song)
OUT_DIR = Path(args.out_dir)
DL = Path(args.dl_dir)
N_JP = args.jp_lines

raw = SONG.read_text(encoding="utf-8")
lines = raw.splitlines()

# The Japanese fixation is everything before the romaji block (starts at "Yūgure")
jp_block = []
for line in lines[:N_JP]:
    jp_block.append(line)

# sanity: the jp block must be followed by a blank line, then the romaji block
assert lines[N_JP].strip() == "", f"line {N_JP + 1} expected blank, got {lines[N_JP]!r}"
assert lines[N_JP + 1].startswith(args.romaji_start), \
    f"line {N_JP + 2} expected romaji start ({args.romaji_start!r}), got {lines[N_JP + 1]!r}"

fixation = [l for l in jp_block if l.strip()]
blank_positions = [i + 1 for i, l in enumerate(jp_block) if not l.strip()]

print(f"total lines in jp block region: {len(jp_block)}")
print(f"non-blank (fixation) lines:     {len(fixation)}")
print(f"blank lines at txt positions:   {blank_positions}")
print()

OUT_DIR.mkdir(parents=True, exist_ok=True)
DL.mkdir(parents=True, exist_ok=True)

# write fixation deliverable (plain text, stanza structure preserved)
(DL / f"{args.name}_fixation.txt").write_text(
    "\n".join(jp_block).rstrip() + "\n", encoding="utf-8")

# write fixation json for the build-time cross-check
(OUT_DIR / "fixation.json").write_text(
    json.dumps(fixation, ensure_ascii=False, indent=1), encoding="utf-8")

# print a repr listing so every special codepoint is visible
for i, l in enumerate(fixation, 1):
    vis = l.replace("\u3000", "␣")
    print(f"{i:2d} | {vis}")
print()
for i, l in enumerate(fixation, 1):
    marks = []
    if "\u3000" in l:
        marks.append("U+3000")
    for ch, nm in [("！", "FW-excl"), ("？", "FW-quest"), ("「", "corner-br"),
                   ("」", "corner-qt"), ("――", "dbl-dash"), ("'", "apos"),
                   ("(", "lpar"), (")", "rpar"), (" ", "h-space")]:
        if ch in l:
            marks.append(nm)
    print(f"{i:2d} | {l!r} | {','.join(marks)}")
