import { updateDataBg } from "./modules/background-image-lazy-load";
import { loadScript } from "./modules/load-script";

// loadイベントが完了したらhtmxをimportする
window.addEventListener("load", async () => {
	await loadScript("/assets/ga.js");

	updateDataBg();

	console.table(window.dataLayer);
	if (
		document.querySelector(
			"[hx-boost], [hx-get], [hx-post], [hx-put], [hx-delete], [hx-patch]",
		)
	) {
		import("./modules/htmx");
		console.log("htmx");
	}
});

window.addEventListener("htmx:afterOnLoad", () => {
	updateDataBg();
});
