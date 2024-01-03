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
			<h1 className="image load-bg" style={{ height: "400vh" }}>
				About
			</h1>

			<a
				href={modalId}
				hx-get="/include/inc"
				hx-target="#modal-inner-target"
				hx-swap="innerHtml"
			>
				open modal
			</a>
			<a
				href={modalId}
				hx-get="/include/inc2"
				hx-target="#modal-inner-target"
				hx-swap="innerHtml"
			>
				open modal
			</a>

			<h1 className="image-1" data-bg="in-view">
				About
			</h1>
			<HtmlAppendedLink href="/">go Home</HtmlAppendedLink>
		</>
	);
}
