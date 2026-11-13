// Export line-aligned expected translations from a canonical word-level map.
// Usage: node engine/export_translations.js <song-data.js> <source text> <out-dir>
// Target languages = META.columns minus META.sourceKey/META.translitKey.
"use strict";

const fs = require("fs");
const path = require("path");

const [dataPath, sourcePath, outDir] = process.argv.slice(2);
if (!dataPath || !sourcePath || !outDir) {
	console.error("usage: export_translations.js <song-data.js> <source.ja.txt> <out-dir>");
	process.exit(2);
}

const readLines = file => fs.readFileSync(file, "utf8").split(/\r?\n/).filter((line, i, all) => i < all.length - 1 || line !== "");
const hasContent = line => line.replace(/^[ \t]+|[ \t]+$/g, "") !== "";
const sourceLines = readLines(sourcePath);
const { META, DATA } = new Function(
	fs.readFileSync(dataPath, "utf8") + "\nreturn { META: META, DATA: DATA };"
)();

function clean(text) {
	return text
		.replace(/\s+([,.;:!?…)\]}»”])/g, "$1")
		.replace(/([(\[{«“])\s+/g, "$1")
		.replace(/\s+/g, " ")
		.trim();
}

function renderLine(block, lang) {
	const byName = new Map();
	block.units.forEach(unit => {
		if (!byName.has(unit.name)) byName.set(unit.name, unit);
	});
	const order = block.ord && block.ord[lang];
	const units = order
		? order.map(name => byName.get(name))
		: block.units;
	return clean(units.map(unit => unit[lang] || "").join(" "));
}

function weave(rendered) {
	let index = 0;
	return sourceLines.map(line => hasContent(line) ? rendered[index++] : "");
}

const lineBlocks = DATA.filter(block => block.type === "line");
const sourceCount = sourceLines.filter(hasContent).length;
if (lineBlocks.length !== sourceCount) {
	console.error(`map has ${lineBlocks.length} lines, source has ${sourceCount}`);
	process.exit(1);
}

const srcKey = META.sourceKey || "jp";
const trKey = META.translitKey || "tr";
const targets = META.columns.filter(lang => lang !== srcKey && lang !== trKey);
fs.mkdirSync(outDir, { recursive: true });
targets.forEach(lang => {
	const rendered = lineBlocks.map(block => renderLine(block, lang));
	if (rendered.some(line => !line)) {
		console.error(`empty expected translation line for ${lang}`);
		process.exit(1);
	}
	const outPath = path.join(outDir, `expected-translation.${lang}.txt`);
	fs.writeFileSync(outPath, weave(rendered).join("\n") + "\n", "utf8");
	console.log(`exported: ${path.relative(process.cwd(), outPath)} (${rendered.length} lines)`);
});
