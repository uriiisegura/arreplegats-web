import React, { Component } from "react";
import { Link } from "react-router-dom";

class Arreplegator extends Component {
	render() {
		return (<>
			<section>
				<h2>L'Arreplegator</h2>

				<p>
					Des del moment en que es va crear la colla l'any 1995, els Arreplegats hem tingut una revista interna: l'Arreplegator.
				</p>

				<Link className="link-btn" to="/arreplegator-llista">Accedir a tots els números</Link>
			</section>
		</>);
	}
}

export default Arreplegator;
