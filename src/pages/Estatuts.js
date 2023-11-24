import React, { Component } from "react";

class Estatuts extends Component {
	render() {
		return (<>
			<section>
				<h2>Estatuts (2018)</h2>

				<object className="fullscreen-pdf" data="/uploads/estatuts-2018.pdf" type="application/pdf">
					<p>No s'ha pogut mostrar el PDF. <a href="/uploads/estatuts-2018.pdf">Descarrega'l</a>.</p>
				</object>
			</section>
		</>);
	}
}

export default Estatuts;
