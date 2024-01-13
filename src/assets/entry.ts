import { updateDataBg } from "./modules/background-image-lazy-load";
import { setupDialogManagerObserver } from "./modules/dialog";
import { loadScript } from "./modules/load-script";
import "./modules/popover-helper";

window.addEventListener("load", async () => {
	await loadScript("/assets/ga.js");
	updateDataBg();
	if (
		document.querySelector(
			"[data-hx-boost], [data-hx-get], [data-hx-post], [data-hx-put], [data-hx-delete], [data-hx-patch]",
		)
	) {
		await import("./modules/htmx");
	}
	if (document.querySelector("dialog")) {
		setupDialogManagerObserver();
	}
	if (document.querySelector(".modal")) {
	}
});

window.addEventListener("htmx:afterSwap", async (e: Event) => {
	const target = e.target as HTMLElement;
	updateDataBg();
	if (target.tagName === "BODY") {
		await loadScript("/assets/ga.js");
	}
});
