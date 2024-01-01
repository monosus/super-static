import { defineConfig } from "minista";
// const DEV_SITE_DIR = 'site';
export default defineConfig({
	resolve: {
		alias: [
			{ find: "~/", replacement: "/src/" },
			{
				find: "@styled-system",
				replacement: "/styled-system/",
			},
		],
	},
	root: "",
	// base: `/${DEV_SITE_DIR}`,
	// out: `dist/${DEV_SITE_DIR}`,
	assets: {
		images: {
			optimize: {
				breakpoints: [640],
			},
		},
	},
	vite: {
		css: {
			postcss: "./tools/build/postcss.config.js",
		},
	},
});
