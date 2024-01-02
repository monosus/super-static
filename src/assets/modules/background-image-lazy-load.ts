/**
 * Update the `data-bg` attribute of elements based on their visibility in the viewport.
 * Elements with `data-bg="in-view"` are observed for entering the viewport.
 * Once observed in the viewport, their `data-bg` is set to 'loaded'.
 * Elements with `data-bg="lazy"` are immediately set to 'loaded'.
 */
export function updateDataBg(): void {
	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					const element = entry.target as HTMLElement;
					element.dataset.bg = "loaded";
					observer.unobserve(element);
				}
			}
		},
		{
			rootMargin: "500px",
			threshold: 0,
		},
	);

	try {
		// Observe elements that should load when in view
		const elementsInView = document.querySelectorAll('[data-bg="in-view"]');
		for (const element of elementsInView) {
			if (element instanceof HTMLElement) {
				observer.observe(element);
			}
		}

		// Immediately load elements marked as 'lazy'
		const elementsInit = document.querySelectorAll('[data-bg="lazy"]');
		for (const element of elementsInit) {
			if (element instanceof HTMLElement) {
				element.dataset.bg = "loaded";
			}
		}
	} catch (error) {
		console.error("Error in updateDataBg:", error);
	}
}
