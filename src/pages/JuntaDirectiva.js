import React, { Component } from "react";
import junta from "../data/junta-directiva.json";

class JuntaDirectiva extends Component {
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
                <h2>Junta directiva</h2>

				<p>
					La Junta Directiva està dirigida per l'equip de presidència. Ha de constar també de secretaria, tresoreria, comissió tècnica i comissió feminista. Actualment, també existeixen les comissions: material, acolliment social, músics, logística i contractació, promoció i difusió, equip sanitari i activitats.
				</p>

				<p>
					La funció de la Junta Directiva és representar, dirigir i administrar l'associació. Es controla el funcionament de la colla, el balanç i l'estat de comptes, s'organitzen les activitats i espais que es puguin necessitar. També es manté el control de les altes i baixes dins la colla i es convoquen assemblees.
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

export default JuntaDirectiva;
