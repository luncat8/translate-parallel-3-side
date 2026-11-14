const { test, expect } = require("@playwright/test");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

const root = path.resolve(__dirname, "../..");
const base = process.env.LINGUAMAP_BASE_URL || pathToFileURL(root + path.sep).href;
const pages = [
	"engine/linguamap-template.html",
	"songs/jumping-girl/result.html",
	"songs/sukina-koto-dake-de-ii-desu/result.html"
];
const views = {
	plain: ["btnPlain", "plain"],
	translated: ["btnTranslated", "lines"],
	vocabulary: ["btnVocab", "vocabPanel"],
	validation: ["btnVal", "valPanel"]
};
const languages = ["jp", "tr", "en", "ru"];
const pageUrl = (file = pages[0]) => new URL(file, base).href;
const settings = page => new URLSearchParams(new URL(page.url()).hash.slice(1));

async function expectView(page, selected) {
	for (const [name, [button, panel]] of Object.entries(views)) {
		const active = name === selected;
		await expect(page.locator("#" + button)).toHaveAttribute("aria-pressed", String(active));
		await expect(page.locator("#" + button)).toHaveClass(active ? /\bon\b/ : /^(?!.*\bon\b)/);
		await expect(page.locator("#" + panel)).toBeVisible({ visible: active });
	}
	await expect(page.locator('main > :not([hidden])')).toHaveCount(1);
}

async function expectColumns(page, selected) {
	for (const lang of languages) {
		const visible = selected.includes(lang);
		await expect(page.locator(`#colbox input[value="${lang}"]`)).toBeChecked({ checked: visible });
		expect(await page.locator(`#lines [data-lang="${lang}"], #vlist [data-lang="${lang}"]`)
			.evaluateAll((cells, hidden) => cells.length > 0 && cells.every(cell => cell.hidden === hidden), !visible)).toBe(true);
	}
}

let errors;
test.beforeEach(({ page }) => {
	errors = [];
	page.on("pageerror", error => errors.push(error.message));
});
test.afterEach(() => {
	expect(errors).toEqual([]);
});

for (const file of pages) {
	test.describe(file, () => {
		test("defaults to only the translated song, with labels hidden", async ({ page }) => {
			await page.goto(pageUrl(file));
			await expectView(page, "translated");
			await expect(page.getByLabel("Hide language labels")).toBeChecked();
			await expect(page.locator("#lineHeader .hcell").first()).toBeHidden();
			await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
			await expectColumns(page, languages);
			expect(new URL(page.url()).hash).toBe("");
		});

		test("view buttons are exclusive, stay selected, and survive reloads", async ({ page }) => {
			await page.goto(pageUrl(file));
			for (const view of ["plain", "vocabulary", "validation", "translated", "translated"]) {
				await page.locator("#" + views[view][0]).click();
				await expectView(page, view);
				await expect(page.locator("#legend")).toBeVisible({ visible: view === "translated" });
				await expect(page.locator("#songHint")).toBeVisible({ visible: view === "translated" });
				expect(settings(page).get("view")).toBe(view === "translated" ? null : view);
				await page.reload();
				await expectView(page, view);
			}
		});

		test("settings round-trip through the URL and a fresh browser context", async ({ page, browser }) => {
			await page.goto(pageUrl(file) + "?source=bookmark#note=keep");
			const historyLength = await page.evaluate(() => history.length);
			await page.getByLabel("Hide language labels").uncheck();
			await expect(page.locator("#lineHeader .hcell").first()).toBeVisible();
			await page.locator("#btnTheme").click();
			await page.locator('#colbox input[value="tr"]').uncheck();
			await page.locator('#colbox input[value="ru"]').uncheck();
			await page.locator('#legend .chip[data-pos="n"]').click();
			await page.locator("#btnVocab").click();
			const query = (await page.locator("#vlist .nm").first().textContent()).toUpperCase();
			await page.getByLabel("Filter vocabulary").fill(query);
			expect(Object.fromEntries(settings(page))).toEqual({
				note: "keep", view: "vocabulary", labels: "show", theme: "dark",
				cols: "jp,en", q: query, pos: "n"
			});
			expect(new URL(page.url()).search).toBe("?source=bookmark");
			expect(await page.evaluate(() => history.length)).toBe(historyLength);
			const saved = page.url();
			await page.reload();
			await expectView(page, "vocabulary");
			await expectColumns(page, ["jp", "en"]);
			await expect(page.getByLabel("Filter vocabulary")).toHaveValue(query);
			await expect(page.locator("#vlist .vrow:visible").first()).toBeVisible();
			expect(await page.locator("#vlist .vrow:visible").allTextContents())
				.toEqual(expect.arrayContaining([expect.stringMatching(new RegExp(query, "i"))]));

			const context = await browser.newContext();
			try {
				const shared = await context.newPage();
				shared.on("pageerror", error => errors.push(error.message));
				await shared.goto(saved);
				await expectView(shared, "vocabulary");
				await expectColumns(shared, ["jp", "en"]);
				await expect(shared.getByLabel("Hide language labels")).not.toBeChecked();
				await expect(shared.getByLabel("Filter vocabulary")).toHaveValue(query);
				await expect(shared.locator("html")).toHaveAttribute("data-theme", "dark");
				await expect(shared.locator("#btnTheme")).toHaveAttribute("aria-pressed", "true");
				await expect(shared.locator("body")).toHaveClass(/\bsoloing\b/);
				await expect(shared.locator('#legend .chip[data-pos="n"]')).toHaveClass(/\bactive\b/);
			} finally {
				await context.close();
			}

			await page.getByLabel("Filter vocabulary").fill("");
			await page.locator("#btnTranslated").click();
			await page.getByLabel("Hide language labels").check();
			await page.locator("#btnTheme").click();
			await page.locator('#colbox input[value="tr"]').check();
			await page.locator('#colbox input[value="ru"]').check();
			await page.locator('#legend .chip[data-pos="n"]').click();
			expect(new URL(page.url()).hash).toBe("#note=keep");
			await expectView(page, "translated");
		});

		test("mobile label toggles reclaim the gutter and remain accessible", async ({ page }) => {
			await page.setViewportSize({ width: 390, height: 844 });
			await page.goto(pageUrl(file));
			const checkbox = page.getByLabel("Hide language labels");
			const cell = page.locator("#lines .cell").first();
			const layout = () => cell.evaluate(node => ({
				label: getComputedStyle(node, "::before").content,
				columns: getComputedStyle(node).gridTemplateColumns.split(" ").length,
				left: node.getBoundingClientRect().left,
				textLeft: node.querySelector(".ctext").getBoundingClientRect().left
			}));
			await expect(checkbox).toBeVisible();
			await expect(page.locator("#colbox input")).toHaveCount(4);
			for (const lang of languages) await expect(page.getByRole("checkbox", { name: lang, exact: true })).toBeVisible();
			const hidden = await layout();
			expect(hidden.label).toBe("none");
			expect(hidden.columns).toBe(1);
			expect(hidden.textLeft).toBe(hidden.left);
			await checkbox.focus();
			await page.keyboard.press("Space");
			const shown = await layout();
			expect(shown.label).toBe('"jp"');
			expect(shown.columns).toBe(2);
			expect(shown.textLeft).toBeGreaterThan(shown.left);
			await page.reload();
			await expect(checkbox).not.toBeChecked();
			expect((await layout()).columns).toBe(2);
			await checkbox.check();
			expect((await layout()).columns).toBe(1);
			expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
		});
	});
}

test("invalid URL values fall back to defaults; unknown columns are ignored", async ({ page }) => {
	await page.goto(pageUrl() + "#view=__proto__&labels=invalid&theme=invalid&cols=xx&pos=toString");
	await expectView(page, "translated");
	await expect(page.getByLabel("Hide language labels")).toBeChecked();
	await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
	await expect(page.locator("body")).not.toHaveClass(/\bsoloing\b/);
	await expectColumns(page, languages);
	await page.evaluate(() => { location.hash = "view=plain&cols=xx,en,en"; });
	await expectView(page, "plain");
	await expectColumns(page, ["en"]);
});

test("all languages can be hidden and restored from an empty column setting", async ({ page }) => {
	await page.goto(pageUrl());
	for (const lang of languages) await page.locator(`#colbox input[value="${lang}"]`).uncheck();
	expect(settings(page).get("cols")).toBe("");
	await page.reload();
	await expectColumns(page, []);
	await page.locator('#colbox input[value="en"]').check();
	await expectColumns(page, ["en"]);
	expect(settings(page).get("cols")).toBe("en");
});

test("Unicode and reserved characters in the vocabulary filter survive reload", async ({ page }) => {
	await page.goto(pageUrl() + "#view=vocabulary");
	const query = '雨 & Любовь + # /? = <script>"';
	await page.getByLabel("Filter vocabulary").fill(query);
	expect(settings(page).get("q")).toBe(query);
	await page.reload();
	await expect(page.getByLabel("Filter vocabulary")).toHaveValue(query);
	await expect(page.locator("#vlist .vrow:visible")).toHaveCount(0);
	await page.getByLabel("Filter vocabulary").fill("MUSHROOM");
	await expect(page.locator("#vlist .vrow:visible")).toHaveCount(1);
});

test("hash changes and Back/Forward restore settings without reloading", async ({ page }) => {
	await page.goto(pageUrl());
	await page.evaluate(() => { location.hash = "view=plain&theme=dark&labels=show&cols=en"; });
	await expectView(page, "plain");
	await expectColumns(page, ["en"]);
	await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
	await page.evaluate(() => { location.hash = "view=validation"; });
	await expectView(page, "validation");
	await expectColumns(page, languages);
	await page.goBack();
	await expectView(page, "plain");
	await expectColumns(page, ["en"]);
	await expect(page.getByLabel("Hide language labels")).not.toBeChecked();
	await page.goForward();
	await expectView(page, "validation");
	await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
	await page.evaluate(() => { location.hash = ""; });
	await expectView(page, "translated");
	await expectColumns(page, languages);
	await expect(page.getByLabel("Hide language labels")).toBeChecked();
});

test("printing keeps only the selected view", async ({ page }) => {
	await page.goto(pageUrl());
	for (const [view, [button]] of Object.entries(views)) {
		await page.emulateMedia({ media: "screen" });
		await page.locator("#" + button).click();
		await page.emulateMedia({ media: "print" });
		await expectView(page, view);
		await expect(page.getByRole("group", { name: "Page view", exact: true })).toBeHidden();
	}
});

test("a vocabulary pin survives switching to the translated song", async ({ page }) => {
	await page.goto(pageUrl() + "#view=vocabulary");
	const row = page.locator("#vlist .vrow").first();
	const name = await row.getAttribute("data-n");
	await row.click();
	await expect(row).toHaveClass(/\bactive\b/);
	await page.locator("#btnTranslated").click();
	await expectView(page, "translated");
	await expect(page.locator(`#lines .unit[data-name="${name}"]`).first()).toHaveClass(/\bsync\b/);
	await page.keyboard.press("Escape");
	await expect(page.locator(".unit.sync")).toHaveCount(0);
});
