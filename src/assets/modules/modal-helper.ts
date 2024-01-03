declare global {
	interface Document {
		__defineOriginalHashes?: () => void;
	}
}

export class ModalHelper {
	modalDepth: number; // この行を追加
	focusableElements: string;

	constructor() {
		this.modalDepth = 1;
		this.focusableElements = "a, button:not([hidden]), input, select, textarea";
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
					// parseIntの結果がNaNの場合は-1を代入
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
			// parseIntの結果がNaNの場合は0を代入
			if (Number.isNaN(e.tabIndex)) {
				e.tabIndex = 0;
			}
		}
	}

	modalClose(e: Event) {
		e.preventDefault();
		if (this.modalDepth) {
			do {
				history.back();
				console.log("back");
			} while (--this.modalDepth);
		} else location.hash = "#";
	}

	init() {
		if (!document.__defineOriginalHashes) {
			Object.defineProperty(document, "__defineOriginalHashes", {
				value: () => {
					for (const e of this.getFocusable()) {
						if (e.dataset.originalTabIndex === undefined) {
							// tabIndexを文字列に変換してdatasetに設定
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
		this.modalDepth = 0;

		document.addEventListener("keydown", (e) => {
			const target = this.getHashModal();
			if (!target || e.key !== "Escape") return;
			console.log(this);
			this.modalClose(e);
		});

		// イベント委譲を使用してmodal-closeとmodal-backdropのクリックイベントを処理
		document.addEventListener("click", (e) => {
			const target = e.target as Element;

			// クリックされた要素が.modal-closeまたは.modal-backdropに一致するか確認
			if (target.matches(".modal-close") || target.matches(".modal-backdrop")) {
				this.modalClose(e);
			}
		});
	}
}
