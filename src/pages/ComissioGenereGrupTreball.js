import React, { Component } from "react";
import { NavLink, useParams } from "react-router-dom";
import NotFound from "../pages/NotFound";
import JuntaTeams from "../components/JuntaTeams";
import junta from "../data/comissio-genere-grup-treball.json";

function withParams(Component) {
	return props => <Component {...props} params={useParams()} />;
}

class ComissioGenereGrupTreball extends Component {
	render() {
		const { any } = this.props.params;

		let junta_temporada = junta.actual;
		if (any)
			junta_temporada = junta.anteriors[any];

		if (!junta_temporada)
			return <NotFound />

		return (<>
			<section>
				<h2>Comissió de gènere i grup treball</h2>
				{ any && <p className="junta-message"><span>Atenció!</span> Estàs consultant la comissió d'una temporada anterior. Per veure'n l'actual fes click <NavLink to="/comissio-genere-grup-treball">aquí</NavLink>.</p> }

				<p>
					La Comissió de Gènere té com a objectiu promoure la igualtat de gènere i prevenir qualsevol tipus de discriminació dins la colla. Treballa per crear un entorn segur i respectuós per a tothom.
				</p>

				<p>
					El Grup Treball s'encarrega de coordinar i executar diferents tasques i projectes específics de la colla, donant suport a les activitats i iniciatives de l'associació.
				</p>

				{Object.keys(junta.anteriors).length > 0 && <>
					<p style={{color: 'var(--grey-400)'}}>Consulta la comissió de gènere i grup treball de temporades anteriors:</p>
					<div className="junta-year-wrap">
						{
							Object.keys(junta.anteriors).map((y, i) => {
								return <NavLink className={`junta-year ${junta_temporada === junta.anteriors[y]}`} to={`/comissio-genere-grup-treball/${y}`} key={`year-${i}`}>{y}</NavLink>;
							})
						}
						<NavLink className={`junta-year ${junta_temporada === junta.actual}`} to="/comissio-genere-grup-treball">ACTUAL</NavLink>
					</div>
				</>}

				<JuntaTeams
					junta={junta_temporada}
					/>
			</section>
		</>);
	}
}

export default withParams(ComissioGenereGrupTreball);
