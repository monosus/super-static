import type { Metadata } from "minista";

import HtmlAppendedLink from "~/components/utils/HtmlAppendedLink";
export const metadata: Metadata = {
	title: "About",
};

export default function () {
	return (
		<>
			<h1>About</h1>
			<HtmlAppendedLink href="/">go Home</HtmlAppendedLink>
		</>
	);
}
