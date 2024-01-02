import { updateDataBg } from "./modules/background-image-lazy-load";
import { loadScript } from "./modules/load-script";

// loadイベントが完了したらhtmxをimportする
window.addEventListener("load", async () => {
	await loadScript("/assets/ga.js");
	updateDataBg();
	if (
		document.querySelector(
			"[hx-boost], [hx-get], [hx-post], [hx-put], [hx-delete], [hx-patch]",
		)
	) {
		await import("./modules/htmx");
	}
});

window.addEventListener("htmx:afterOnLoad", () => {
	updateDataBg();
});
