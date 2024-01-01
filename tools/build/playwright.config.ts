import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
	outputDir: "vrt-test/out",
	reporter: [["html", { open: "never", outputFolder: "vrt-test/report" }]],
	// device iphone12,android,safari,chrome,firefox
	projects: [
		{
			name: "chrome",
			use: { ...devices["Desktop Chrome"] },
		},
		{
			name: "firefox",
			use: { ...devices["Desktop firefox"] },
		},
		{
			name: "webkit",
			use: { ...devices["Desktop webkit"] },
		},
		{
			name: "iphone12",
			use: {
				browserName: "webkit",
				viewport: { width: 390, height: 844 },
				launchOptions: {
					headless: true,
					slowMo: 50,
				},
				ignoreHTTPSErrors: true,
			},
		},
		{
			name: "android",
			use: {
				browserName: "chromium",
				viewport: { width: 360, height: 640 },
				launchOptions: {
					headless: true,
					slowMo: 50,
				},
				ignoreHTTPSErrors: true,
			},
		},
	],
	// devices: [

	// Run your local dev server before starting the tests.
	webServer: {
		command: "npm run build-storybook && npm run storybook",
		url: "http://127.0.0.1:6006",
		// reuseExistingServer: !process.env.CI,
	},
});
