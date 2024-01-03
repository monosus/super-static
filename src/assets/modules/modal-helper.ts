declare global {
	interface Document {
		__defineOriginalHashes?: () => void;
	}
}
export class ModalHelper {
	modalDepth: number;
	readonly focusableElements: string =
		"a, button:not([hidden]), input, select, textarea";

	constructor() {
		this.modalDepth = 0;
		this.init();
	}

	getHashModal() {
		if (location.hash.length < 2) return null;
		const target = document.body.querySelector(
			`[id="${location.hash.substr(1)}"]`,
		);
		if (target?.classList.contains("modal")) return target;
		return null;
	}

	getFocusable(): NodeListOf<HTMLElement> {
		return document.querySelectorAll(this.focusableElements);
	}

	checkHash() {
		if (location.hash.length > 1) {
			const target = this.getHashModal();
			if (target) {
				this.modalDepth++;
				for (const e of this.getFocusable()) {
					e.tabIndex =
						e.closest(".modal") === target
							? parseInt(e.dataset.originalTabIndex || "0", 10)
							: -1;
					if (Number.isNaN(e.tabIndex)) {
						e.tabIndex = -1;
					}
				}
				const first = target.querySelector("input, select, textarea");
				if (first instanceof HTMLElement) {
					first.focus();
				} else if (document.activeElement) {
					(document.activeElement as HTMLElement).blur();
				}
				return;
			}
		}
		for (const e of this.getFocusable()) {
			e.tabIndex = e.closest(".modal")
				? -1
				: parseInt(e.dataset.originalTabIndex || "0", 10);
			if (Number.isNaN(e.tabIndex)) {
				e.tabIndex = 0;
			}
		}
	}

	modalClose(e: Event) {
		e.preventDefault();
		if (this.modalDepth > 0) {
			do {
				history.back();
			} while (--this.modalDepth > 0);
		} else {
			location.hash = "#";
		}
	}

	init() {
		if (!document.__defineOriginalHashes) {
			Object.defineProperty(document, "__defineOriginalHashes", {
				value: () => {
					for (const e of this.getFocusable()) {
						if (e.dataset.originalTabIndex === undefined) {
							e.dataset.originalTabIndex = (e.tabIndex || 0).toString();
						}
					}
					this.checkHash();
				},
				configurable: true,
			});
		}

		window.addEventListener("hashchange", this.checkHash.bind(this));
		this.checkHash();

		document.addEventListener("keydown", (e) => {
			const target = this.getHashModal();
			if (!target || e.key !== "Escape") return;
			this.modalClose(e);
		});

		document.addEventListener("click", (e) => {
			const target = e.target as Element;
			if (target.matches(".modal-close") || target.matches(".modal-backdrop")) {
				this.modalClose(e);
			}
		});
	}
}
