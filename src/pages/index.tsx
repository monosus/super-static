import type { Metadata } from "minista";
import { NoteList } from "~/components";
import HtmlAppendedLink from "~/components/utils/HtmlAppendedLink";
export const metadata: Metadata = {
	title: "Home",
};

const noteData = [
	"test1 test1 test1 test1 test1 test1 test1 test1 test1 test1 test1",
	<>
		test2
		<br />
		test
	</>,
	"test3",
	"test4",
];

export default function () {
	return (
		<>
			<h1>index</h1>
			<button popoverTarget="candle-01" type="button">
				Quick Shop
			</button>
			<div style={{ width: "15ch" }}>
				<NoteList prefix="注">{noteData}</NoteList>
				<NoteList prefix="注">
					test1 test1 test1 test1 test1 test1 test1 test1 test1 test1 test1
				</NoteList>
			</div>
			<div style={{ height: "60vh" }} />
			<div popover="auto" id="candle-01" data-modal="true">
				<button
					type="button"
					className="close-btn"
					popoverTarget="candle-01"
					popoverTargetAction="hide"
				>
					...
				</button>
				<div className="product-preview-container">...</div>
				<a href="http://" target="_blank" rel="noopener noreferrer">
					a
				</a>
				<a href="http://" target="_blank" rel="noopener noreferrer">
					b
				</a>
				<a href="http://" target="_blank" rel="noopener noreferrer">
					c
				</a>
			</div>

			<HtmlAppendedLink href="/about">go about</HtmlAppendedLink>
			<div style={{ height: "60vh" }} />
			<button
				type="button"
				data-js-dialog="dummy"
				data-hx-trigger="load"
				data-hx-get="/include/inc"
				data-hx-target="body"
				data-hx-swap="beforeend"
			>
				open dialog
			</button>
			<div style={{ height: "60vh" }} />
			<HtmlAppendedLink href="/about">go about</HtmlAppendedLink>
		</>
	);
}
