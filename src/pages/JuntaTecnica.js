import React, { Component } from "react";
import { NavLink, useParams } from "react-router-dom";
import NotFound from "../pages/NotFound";
import JuntaTeams from "../components/JuntaTeams";
import junta from "../data/junta-tecnica.json";

function withParams(Component) {
	return props => <Component {...props} params={useParams()} />;
}

class JuntaTecnica extends Component {
	render() {
		const { any } = this.props.params;

		let junta_temporada = junta.actual;
		if (any)
			junta_temporada = junta.antigues[any];
		
		if (!junta_temporada)
			return <NotFound />

		return (<>
			<section>
				<h2>Junta tècnica{any && ` (${any})`}</h2>
				{ any && <p className="junta-message"><span>Atenció!</span> Estàs consultant la junta d'una temporada anterior. Per veure'n l'actual fes click <NavLink to="/junta-tecnica">aquí</NavLink>.</p> }

				<p>
					La Junta Tècnica està formada per cap de colla i sots-cap de colla al capdavant. Els equips de la Junta Tècnica els decideixen cap i sots-cap de colla. Actualment consta de l'equip de troncs; l'equip de pinyes, folres, i manilles; i l'equip de poms.
				</p>

				<p>
					S'encarrega de vetllar pel desenvolupament de l'activitat castellera. Organitza els assajos i decideix els castells que es faran durant el curs. Forma i prepara als castellers per a fer correctament la seva tasca. La Junta Tècnica és qui decideix, valorant els assajos durant el curs, quins castells es podran fer a les diades.
				</p>

				<JuntaTeams
					junta={junta_temporada}
					/>
			</section>
		</>);
	}
}

export default withParams(JuntaTecnica);
