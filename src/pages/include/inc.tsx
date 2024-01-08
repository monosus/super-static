const inc = () => {
	return (
		<>
			<dialog data-js-dialog="dummy">
				<div>
					<button type="button" data-js-dialog="dummy">
						close dialog!!
					</button>
					<a
						href="http://"
						className="lik"
						target="_blank"
						rel="noopener noreferrer"
					>
						inner link
					</a>

					<div>
						Enter
						<button
							type="button"
							// popoverTargetAction="toggle"
							// popoverTarget="pop2"
							data-js-dialog="pop2"
						>
							open next modal
						</button>
					</div>
				</div>
			</dialog>
			<dialog
				data-js-dialog="pop2"
				// popover="manual"
			>
				<header>
					<h2 id="modal-title">include2</h2>
				</header>
				body
				<a href="http://" target="_blank" rel="noopener noreferrer">
					link
				</a>
				<a href="http://" target="_blank" rel="noopener noreferrer">
					link
				</a>
				<footer>
					footer
					<button type="button" data-js-dialog="dummy">
						prev
					</button>
				</footer>
			</dialog>
		</>
	);
};

export default inc;
