import React, { Component } from "react";

class ProtocolAgressions extends Component {
	render() {
		return (<>
			<section>
				<h2>Protocol d'agressions (2022)</h2>

				<object className="fullscreen-pdf" data="/uploads/protocol-agressions-2022.pdf" type="application/pdf">
					<p>No s'ha pogut mostrar el PDF. <a href="/uploads/protocol-agressions-2022.pdf">Descarrega'l</a>.</p>
				</object>
			</section>
		</>);
	}
}

export default ProtocolAgressions;
