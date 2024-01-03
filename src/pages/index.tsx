import type { Metadata } from "minista";
import HtmlAppendedLink from "~/components/utils/HtmlAppendedLink";
export const metadata: Metadata = {
	title: "Home",
};

export default function () {
	return (
		<>
			<h1>index</h1>
			<div>
				<HtmlAppendedLink
					href="/about"
					// hx-boost="true"
				>
					go about
				</HtmlAppendedLink>
			</div>
		</>
	);
}
