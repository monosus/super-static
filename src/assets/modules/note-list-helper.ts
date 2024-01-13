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
		const annotValue = listItem.dataset.annotation || "";

		// Calculate the length of the 'data-annot' value in 'em' units
		const emValue = calculateEmLength(annotValue);

		// Assign the calculated 'em' value to a CSS variable for this specific list item
		listItem.style.setProperty("--annotation-size", emValue);

		// If the length is 0, also set --annot-gap to 0
		if (emValue === "0") {
			listItem.style.setProperty("--annotation-spacing", "0");
		}
	}
}
