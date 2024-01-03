import InsertHtml from "~/components/utils/InsertHtml";
type ModalProps = {
	id: string;
	as?: React.ElementType;
};

const closeHref = "#";
const Modal = (props: ModalProps) => {
	const { id, as } = props;
	const Tag = as || "div";
	return (
		<>
			<Tag id={id} className="modal">
				<a href={closeHref} className="modal-backdrop" hidden>
					<span>close</span>
				</a>
				<div className="modal-body">
					<a className="modal-close" href={closeHref} hidden>
						close
					</a>
					<div id="modal-inner-target" />
				</div>
			</Tag>
		</>
	);
};

export default Modal;
