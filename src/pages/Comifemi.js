import React, { Component } from "react";

class Comifemi extends Component {
	render() {
		return (<>
			<section>
				<h2>Comissió feminista</h2>

				<object className="comifemi-pdf" data="/uploads/protocol-agressions-2022.pdf" type="application/pdf">
					<p>No s'ha pogut mostrar el PDF. <a href="/uploads/protocol-agressions-2022.pdf">Descarrega'l</a>.</p>
				</object>
			</section>
		</>);
	}
}

export default Comifemi;
