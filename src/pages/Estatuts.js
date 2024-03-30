import React, { Component } from "react";
// import Legal from "../components/Legal";
// import estatuts from "../data/estatuts.json";

class Estatuts extends Component {
	render() {
		return (<>
			<section>
				{/* <Legal
					title="Estatuts"
					doc={estatuts.actual}
					/> */}
				<h2>Estatuts (2018)</h2>

				<object className="fullscreen-pdf" data="/uploads/estatuts-2018.pdf" type="application/pdf">
					<p>No s'ha pogut mostrar el PDF. <a href="/uploads/estatuts-2018.pdf">Descarrega'l</a>.</p>
				</object>
			</section>
		</>);
	}
}

export default Estatuts;
