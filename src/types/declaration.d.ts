declare namespace JSX {
	interface IntrinsicElements {
		"include-file": React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLElement>,
			HTMLElement
		>;
		div: React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLDivElement> &
				HxAttributes & {
					popover?: "auto" | "manual";
				},
			HTMLDivElement
		>;
		button: React.DetailedHTMLProps<
			React.ButtonHTMLAttributes<HTMLButtonElement> & {
				popoverTarget?: string;
				popover?: string;
				popoverTargetAction?: "hide" | "show" | "toggle";
			},
			HTMLButtonElement
		>;
	}
}

declare global {
	interface Document {
		__defineOriginalHashes?: () => void;
	}
}
