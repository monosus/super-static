import type { Metadata } from "minista";

import HtmlAppendedLink from "~/components/utils/HtmlAppendedLink";
import demoHtml from "../../public/assets/demo.html?raw";
export const metadata: Metadata = {
	title: "About",
};

export default function () {
	return (
		<>
			<h1 className="image load-bg" style={{ height: "400vh" }}>
				About
			</h1>
			<h1 className="image-1" data-bg="in-view">
				About
			</h1>
			<HtmlAppendedLink href="/">go Home</HtmlAppendedLink>
		</>
	);
}
