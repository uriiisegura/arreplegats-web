import React, { Component } from "react";
import { NavLink, useParams } from "react-router-dom";
import NotFound from "../pages/NotFound";
import JuntaTeams from "../components/JuntaTeams";
import junta from "../data/junta-directiva.json";

function withParams(Component) {
	return props => <Component {...props} params={useParams()} />;
}

class JuntaDirectiva extends Component {
	render() {
		const { any } = this.props.params;

		let junta_temporada = junta.actual;
		if (any)
			junta_temporada = junta.antigues[any];
		
		if (!junta_temporada)
			return <NotFound />
		
		return (<>
			<section>
				<h2>Junta directiva</h2>
				{ any && <p className="junta-message"><span>Atenció!</span> Estàs consultant la junta d'una temporada anterior. Per veure'n l'actual fes click <NavLink to="/junta-directiva">aquí</NavLink>.</p> }

				<p>
					La Junta Directiva està dirigida per l'equip de presidència. Ha de constar també de secretaria, tresoreria, comissió tècnica i comissió feminista. Actualment, també existeixen les comissions: material, acolliment social, músics, logística i contractació, promoció i difusió, equip sanitari i activitats.
				</p>

				<p>
					La funció de la Junta Directiva és representar, dirigir i administrar l'associació. Es controla el funcionament de la colla, el balanç i l'estat de comptes, s'organitzen les activitats i espais que es puguin necessitar. També es manté el control de les altes i baixes dins la colla i es convoquen assemblees.
				</p>

				<JuntaTeams
					junta={junta_temporada}
					/>
			</section>
		</>);
	}
}

export default withParams(JuntaDirectiva);
