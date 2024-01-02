export const loadScript = (src) => {
	return new Promise((resolve, reject) => {
		const script = document.createElement("script");
		script.src = src;
		script.async = true;

		script.onload = () => {
			resolve();
		};

		script.onerror = () => {
			console.error("Script failed to load.");
			reject(new Error(`Script failed to load: ${src}`));
		};

		document.head.appendChild(script);
	});
};
