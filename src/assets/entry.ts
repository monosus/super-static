// loadイベントが完了したらhtmxをimportする
window.addEventListener("load", () => {
	if (
		document.querySelector(
			"[hx-boost], [hx-get], [hx-post], [hx-put], [hx-delete], [hx-patch]",
		)
	) {
		import("./modules/htmx");
		console.log("htmx");
	}
});
