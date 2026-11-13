#!/usr/bin/env python3
"""LinguaMap build: inject song data into the engine template, then gate on
the Node validation harness (ERROR-level issues fail the build; AGENTS.md §5.5).

The HTML is a build artefact — edit scripts/linguamap/song-data.js and rebuild,
never hand-edit the output (AGENTS.md pitfall 15).
"""
import argparse
import re
import subprocess
import sys
from pathlib import Path

ap = argparse.ArgumentParser(description="LinguaMap build: data -> template + validation gate")
ap.add_argument("--template", default="/home/z/my-project/upload/linguamap-template.html",
                help="engine template containing the <script id=\"data\"> block")
ap.add_argument("--data", default="/home/z/my-project/scripts/linguamap/song-data.js",
                help="data file to inject (META + DATA in the canonical model)")
ap.add_argument("--fixation", default="/home/z/my-project/scripts/linguamap/fixation.json",
                help="ground-truth line list for the harness cross-check")
ap.add_argument("--harness", default="/home/z/my-project/scripts/linguamap/run_validation.js",
                help="Node validation harness")
ap.add_argument("--out", default="/home/z/my-project/download/popin_jumping_girl_linguamap.html",
                help="built page path")
ap.add_argument("--title", default="popin Jumping girl — LinguaMap",
                help="page <title>")
args = ap.parse_args()

TEMPLATE = Path(args.template)
DATA_JS = Path(args.data)
FIXATION = Path(args.fixation)
HARNESS = Path(args.harness)
OUT_HTML = Path(args.out)

html = TEMPLATE.read_text(encoding="utf-8")
data_src = DATA_JS.read_text(encoding="utf-8").rstrip() + "\n"

# 1) swap the demo data script for the song data (keep the id="data" hook)
new_block = '<script id="data">\n' + data_src + "</script>"
html, n = re.subn(r'<script id="data">[\s\S]*?</script>', lambda m: new_block, html, count=1)
if n != 1:
    sys.exit("FATAL: could not locate the <script id=\"data\"> block in the template")

# 2) page <title> (template ships with the demo title below)
html, n = re.subn(
    r"<title>LinguaMap — parallel text engine \(demo\)</title>",
    f"<title>{args.title}</title>", html, count=1)
if n != 1:
    sys.exit("FATAL: could not locate the demo <title> in the template")

OUT_HTML.parent.mkdir(parents=True, exist_ok=True)
OUT_HTML.write_text(html, encoding="utf-8")
print(f"built: {OUT_HTML}  ({OUT_HTML.stat().st_size:,} bytes)")

# 3) validation gate
res = subprocess.run(
    ["node", str(HARNESS), str(OUT_HTML), str(DATA_JS), str(FIXATION)],
)
sys.exit(res.returncode)
