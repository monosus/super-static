import { Comment } from "minista";
import React from "react";
import buildConfig from "../../../minista.config";
import processHref from "./processHref";
const { base } = buildConfig;

type HxTriggerEvent = "load" | "revealed" | "intersect";
interface HxTriggerOptions {
	event: HxTriggerEvent;
	root?: string; // "intersect"イベント用のオプション
	threshold?: number; // "intersect"イベント用のオプション
	delay?: string; // すべてのイベントタイプに適用
}

interface InsertHtmlProps {
	filePath: string;
	shouldAppendHtml?: boolean;
	baseDir?: string;
	hxTrigger?: HxTriggerOptions;
	partName?: string;
}
function hxTriggerAttribute(options: HxTriggerOptions): string {
	const parts: string[] = [options.event];

	if (options.event === "intersect") {
		if (options.root != null) {
			parts.push(`root:${options.root}`);
		}
		if (
			options.threshold !== undefined &&
			options.threshold >= 0.0 &&
			options.threshold <= 1.0
		) {
			parts.push(`threshold:${options.threshold}`);
		}
	}

	if (options.delay != null) {
		parts.push(`delay:${options.delay}`);
	}

	return parts.join(" ");
}

const InsertHtml = ({
	filePath,
	shouldAppendHtml = true,
	baseDir = base ?? "",
	hxTrigger = { event: "load" },
	partName,
}: InsertHtmlProps) => {
	const processedHref = processHref({
		href: `${baseDir}${filePath}`,
		shouldAppendHtml,
	});
	return (
		<>
			{partName != null && <Comment text={`#${partName}`} />}
			<include-file
				hx-get={processedHref}
				hx-trigger={hxTriggerAttribute(hxTrigger)}
			/>
			{partName != null && <Comment text={`/ #${partName}`} />}
		</>
	);
};

export default InsertHtml;
