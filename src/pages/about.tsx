import type { Metadata } from "minista";

import { Modal } from "~/components/";
import HtmlAppendedLink from "~/components/utils/HtmlAppendedLink";
export const metadata: Metadata = {
	title: "About",
	modal: true,
};

const modalId = "#modal";
export default function () {
	return (
		<>
			<main>
				<h1 className="image load-bg" style={{ height: "400vh" }}>
					About
				</h1>
				<button type="button" popoverTarget="d1">
					open d1
				</button>
				<div id="d1" popover="manual">
					d1
					<a href="http://" target="_blank" rel="noopener noreferrer">
						link
					</a>
					<button type="button" popoverTarget="d1" popoverTargetAction="hide">
						close d1
					</button>
				</div>

				<h1 className="image-1" data-bg="in-view">
					About
				</h1>
			</main>
			<HtmlAppendedLink href="/">go Home</HtmlAppendedLink>
		</>
	);
}
