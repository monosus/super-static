import { updateDataBg } from "./modules/background-image-lazy-load";
import { loadScript } from "./modules/load-script";
import { ModalHelper } from "./modules/modal-helper";
let modalHelper: ModalHelper | null = null;
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
	if (document.querySelector(".modal")) {
		if (!modalHelper) {
			const { ModalHelper } = await import("./modules/modal-helper");
			modalHelper = new ModalHelper();
		}
	}
});

window.addEventListener("htmx:afterSwap", async (e: Event) => {
	const target = e.target as HTMLElement;
	updateDataBg();
	if (target.tagName === "BODY") {
		await loadScript("/assets/ga.js");
		if (!modalHelper) {
			const { ModalHelper } = await import("./modules/modal-helper");
			modalHelper = new ModalHelper();
		}
	}
});
