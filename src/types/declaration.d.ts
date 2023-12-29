declare namespace JSX {
	interface IntrinsicElements {
		"include-file": React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLElement>,
			HTMLElement
		>;
		div: React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLDivElement> & HxAttributes,
			HTMLDivElement
		>;
	}
}

interface HxAttributes {
	"hx-get"?: string;
	"hx-trigger"?: string;
	"hx-boost"?: string;
}
