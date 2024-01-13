export function noteListHelper() {
	// Select all <li> elements with the 'data-annot' attribute
	const listItems = document.querySelectorAll<HTMLElement>(
		"li[data-annotation]",
	);

	// Function to calculate the length in em units
	function calculateEmLength(str: string): string {
		let length = 0;
		for (const char of str) {
			// Check if the character is half-width (ASCII range)
			length += char.match(/[\u0020-\u007E]/) ? 0.5 : 1;
		}
		return length === 0 ? "0" : `${length}em`;
	}

	// Use a for...of loop to iterate over the NodeList
	for (const listItem of listItems) {
		// Get the value of the 'data-annot' attribute
		const annotValue = listItem.dataset.annotation;
		if (annotValue) {
			const emValue = calculateEmLength(annotValue);
			listItem.style.setProperty("--annotation-size", emValue);
		} else {
			listItem.style.setProperty("--annotation-spacing", "0");
		}
	}
}
