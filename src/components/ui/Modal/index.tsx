import InsertHtml from "~/components/utils/InsertHtml";
type ModalProps = {
	children: React.ReactNode;
	id: string;
};

const Modal = (props: ModalProps) => {
	const { id } = props;
	return (
		<>
			<div id={id} className="modal">
				<a href="#hide-modal" className="modal-backdrop">
					<span>close</span>
				</a>
				<div className="modal-body">
					<a className="modal-close" href="#hide-modal">
						close
					</a>
					<div id="modal-inner-target" />
				</div>
			</div>
		</>
	);
};

export default Modal;
