import InsertHtml from "~/components/utils/InsertHtml";
type ModalProps = {
	id: string;
	as?: React.ElementType;
};

const Modal = (props: ModalProps) => {
	const { id, as } = props;
	const Tag = as || "div";
	return (
		<>
			<Tag id={id} className="modal">
				<a href="#hide-modal" className="modal-backdrop">
					<span>close</span>
				</a>
				<div className="modal-body">
					<a className="modal-close" href="#hide-modal">
						close
					</a>
					<div id="modal-inner-target" />
				</div>
			</Tag>
		</>
	);
};

export default Modal;
