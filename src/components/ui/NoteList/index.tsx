import { randomUUID } from "crypto";
import React from "react";

type NoteListProps = {
	children: React.ReactNode[] | React.ReactNode;
	prefix: string;
};

const NoteList = ({ children, prefix }: NoteListProps) => {
	const isSingleChild = React.Children.count(children) === 1;
	const childArray = React.Children.toArray(children);
	return (
		<ul className="note-list">
			{childArray.map((child, index) => (
				<li
					key={`${prefix}-${index}`}
					data-annotation={isSingleChild ? prefix : `${prefix}${index + 1}`}
				>
					{child}
				</li>
			))}
		</ul>
	);
};

export default NoteList;
