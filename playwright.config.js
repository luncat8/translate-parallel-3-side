const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
	testDir: "./tests/browser",
	fullyParallel: true,
	workers: 2,
	reporter: "list",
	use: {
		browserName: "chromium",
		viewport: { width: 1280, height: 900 },
		launchOptions: {
			executablePath: process.env.CHROMIUM_EXECUTABLE_PATH
		}
	}
});
