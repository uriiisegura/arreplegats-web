import React, { Component } from "react";

class Estatuts extends Component {
	render() {
		return (<>
			<section>
				<h2>Reglament de Règim Intern (2023)</h2>

				<object className="fullscreen-pdf" data="/uploads/regim-intern-2023.pdf" type="application/pdf">
					<p>No s'ha pogut mostrar el PDF. <a href="/uploads/regin-intern-2023.pdf">Descarrega'l</a>.</p>
				</object>
			</section>
		</>);
	}
}

export default Estatuts;
