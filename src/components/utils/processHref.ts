interface ProcessHrefOptions {
	href: string;
	shouldAppendHtml: boolean;
	isProd?: boolean;
}

function processHref(options: ProcessHrefOptions): string {
	const { href, shouldAppendHtml, isProd = import.meta.env.PROD } = options;
	let processedHref = href;

	if (isProd && shouldAppendHtml && !href.endsWith("/")) {
		processedHref += ".html";
	}

	return processedHref;
}

export default processHref;
