import type { GlobalProps } from "minista";
import { Head } from "minista";
import { Modal } from "~/components/";

export default function ({ url, title, children, modal }: GlobalProps) {
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta property="description" content="description" />
				<link rel="stylesheet" href="/src/assets/base.css" media="screen" />
				<link rel="stylesheet" href="/src/assets/tokens.css" media="screen" />
				<link rel="stylesheet" href="/src/assets/theme.css" media="screen" />
				<link rel="stylesheet" href="/src/assets/ui.css" media="screen" />
				<link rel="stylesheet" href="/src/assets/layout.css" media="screen" />
				<link rel="stylesheet" href="/src/assets/page.css" media="screen" />
				<link rel="stylesheet" href="/src/assets/state.css" media="screen" />
				<link rel="stylesheet" href="/src/assets/hotfix.css" media="screen" />
				<script src="/src/assets/entry.ts" type="module" />
			</Head>
			{url === "/" ? (
				// data-hx-boost: https://htmx.org/attributes/data-hx-boost/
				<div className="home faux-body" data-hx-boost="true">
					{children}
				</div>
				// urlが/inc/**/*の場合はfaux-bodyをつけない
			) : url.match(/^\/include\//) ? (
				<div className="include">{children}</div>
			) : (
				<div className="faux-body" data-hx-boost="true">
					{children}
				</div>
			)}
			{modal && (
				<>
					<Modal id="modal" />
				</>
			)}
		</>
	);
}
