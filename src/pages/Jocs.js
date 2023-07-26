import React, { Component } from "react";
import { NavLink } from "react-router-dom";

const jocs_list = {
	//'Crea la teva pròpia colla!': 'joc-castells'
	//'Penjat': 'penjat',
	'Memory': 'memory',
	'Mots encreuats': 'mots-encreuats',
	'Sopa de lletres': 'sopa-de-lletres',
};

class Jocs extends Component {
	render() {
		return (<>
			<section>
				<h2>Jocs</h2>

				<div className="games">
					{
						Object.entries(jocs_list).map(([k, v], i) => {
							return <NavLink key={i} className="game btn" to={`/${v}`}>
								{k}
							</NavLink>;
						})
					}
				</div>
			</section>
		</>);
	}
}

export default Jocs;
