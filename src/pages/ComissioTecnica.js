import React, { Component } from "react";
import junta from "../data/junta-tecnica.json";

class ComissioTecnica extends Component {
	renderTeam(team, key) {
		return (
			<div className="junta-team" key={key}>
				<h4>{team.titol}</h4>
				{
					team.components.map((p, i) => {
						return <p key={i}>{p.carrec ? <><span>{p.carrec}</span>: </> : <></>}{p.nom}</p>;
					})
				}
			</div>
		);
	}
	render() {
		const dirreccio = junta.actual.direccio;
		const equips = junta.actual.junta;
		const col_1 = equips.slice(0, Math.ceil(equips.length / 2));
		const col_2 = equips.slice(Math.ceil(equips.length / 2), equips.length);

		return (<>
			<section>
                <h2>Comissió tècnica</h2>

				<p>
					La Comissió Tècnica està formada per cap de colla i sots-cap de colla al capdavant. Forma part de la Junta Directiva. Els equips de la Comissió Tècnica els decideixen cap i sots-cap de colla. Actualment consta de l'equip de troncs; l'equip de pinyes, folres, i manilles; i l'equip de poms.
				</p>

				<p>
					S'encarrega de vetllar pel desenvolupament de l'activitat castellera. Organitza els assajos i decideix els castells que es faran durant el curs. Forma i prepara als castellers per a fer correctament la seva tasca. La Comissió Tècnica és qui decideix, valorant els assajos durant el curs, quins castells es podran fer a les diades.
				</p>

				<div className="juntes">
					<div className="junta-column">
						{
							this.renderTeam(dirreccio, 0)
						}
					</div>
					<div className="junta-column">
						{
							col_1.map((t, i) => {
								return this.renderTeam(t, i);
							})
						}
					</div>
					<div className="junta-column">
						{
							col_2.map((t, i) => {
								return this.renderTeam(t, i);
							})
						}
					</div>
				</div>
			</section>
		</>);
	}
}

export default ComissioTecnica;
