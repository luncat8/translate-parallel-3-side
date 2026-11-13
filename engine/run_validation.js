// LinguaMap build-time validation harness (Node).
// Usage: node engine/run_validation.js <songs/<id>/result.html> <map/song-data.js> <sources/fixation.json>
//
// Checks, in order:
//  A. ground truth — every line block's src equals the extracted fixation line
//     (same count, same order) — catches transcription drift at the source;
//  B. the template's own pure validator (validateData): I1..I6 invariants —
//     every unit filled in every column, jp cells rebuild src exactly,
//     ord arrays are exact permutations, one POS per name, known POS codes.
// Exit code 1 on any ERROR-level issue or fixation mismatch; warnings allowed.
"use strict";

const fs = require("fs");

const [htmlPath, dataPath, fixationPath] = process.argv.slice(2);

const html = fs.readFileSync(htmlPath, "utf8");
const scripts = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const validatorCode = scripts.find(s => s.includes("function validateData"));
if (!validatorCode) {
  console.error("FATAL: validateData not found in " + htmlPath);
  process.exit(2);
}

const dataCode = fs.readFileSync(dataPath, "utf8");
const fixation = JSON.parse(fs.readFileSync(fixationPath, "utf8"));

let failed = false;

const run = new Function(
  validatorCode + "\n" + dataCode + "\n" + `
  const FIXATION = ${JSON.stringify(fixation)};
  /* stamp rendered line numbers (line blocks in order) so that every
     validator message refers to the number shown on the page */
  let __n = 0;
  DATA.forEach(b => { if (b.type === "line" && !b.no) b.no = ++__n; });
  const res = validateData(META, DATA);
  console.log("stats:    " + JSON.stringify(res.stats));
  console.log("errors:   " + res.errors + "   warnings: " + res.warnings);
  for (const i of res.issues) {
    console.log((i.sev === "err" ? "ERROR: " : "warn : ") + i.msg);
  }

  /* --- A. fixation ground truth --- */
  const lineBlocks = DATA.filter(b => b.type === "line");
  let bad = 0;
  if (lineBlocks.length !== FIXATION.length) {
    console.log("ERROR: line block count " + lineBlocks.length + " != fixation lines " + FIXATION.length);
    bad++;
  }
  lineBlocks.forEach((b, i) => {
    if (b.src !== FIXATION[i]) {
      bad++;
      console.log("ERROR: line " + (i + 1) + " src does not match fixation");
      console.log("   data: " + JSON.stringify(b.src));
      console.log("   fix : " + JSON.stringify(FIXATION[i]));
    }
  });
  if (bad) console.log("fixation cross-check: " + bad + " mismatches");
  else console.log("fixation cross-check: all " + FIXATION.length + " src lines match the extracted fixation exactly");

  if (res.errors || bad) process.exit(1);
  `
);

try {
  run();
} catch (e) {
  console.error("FATAL: harness exception: " + e.stack);
  process.exit(2);
}
