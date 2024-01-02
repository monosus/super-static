import type { GlobalProps } from "minista";
import { Head } from "minista";

export default function ({ url, title, children }: GlobalProps) {
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
				<link rel="stylesheet" href="/src/assets/hotfix.css" media="screen" />
				<script type="module" src="/src/assets/entry.ts"></script>
			</Head>
			{url === "/" ? (
				<div className="home" hx-boost="true">
					{children}
				</div>
			) : (
				<div hx-boost="true">{children}</div>
			)}
		</>
	);
}
