import React, { Component } from "react";

class JuntaDirectiva extends Component {
	render() {
		return (<>
			<section>
                <h2>Junta directiva</h2>

				<p>
					La Junta Directiva està dirigida per l'equip de presidència. Ha de constar també de secretaria, tresoreria, comissió tècnica i comissió feminista. Actualment, també existeixen les comissions: material, acolliment social, músics, logística i contractació, promoció i difusió, equip sanitari i activitats.
				</p>

				<p>
					La funció de la Junta Directiva és representar, dirigir i administrar l'associació. Es controla el funcionament de la colla, el balanç i l'estat de comptes, s'organitzen les activitats i espais que es puguin necessitar. També es manté el control de les altes i baixes dins la colla i es convoquen assemblees.
				</p>

				<div className="juntes tecnica">
					<div className="junta-column">
						<div className="junta-team">
							<h4>Direcció tècnica</h4>
							<p><span>Presidenta</span>: Clara Montoya i García</p>
							<p><span>Vice-president</span>: Benet Antius i Lozano</p>
							<p><span>Secretàries</span>: Cristina Oliveira i Coll, Aina Oliu i Cordomí</p>
							<p><span>Cap de colla</span>: Xavier Marín i Rísquez</p>
						</div>
					</div>
					<div className="junta-column">
						<div className="junta-team">
							<h4>Tresoreria</h4>
							<p><span>Tresorer</span>: Pere Llopart</p>
							<p>Hèctor Carmona i López</p>
							<p>Guillem Canals</p>
						</div>

						<div className="junta-team">
							<h4>Promoció i difusió</h4>
							<p><span>Cap de promoció</span>: Núria Fonts</p>
							<p>Martina Soler i Collell</p>
							<p>Arianda Sánchez i Rodríguez</p>
							<p>Jordi Casañas i Dalmau</p>
							<p>Ermengol Passola i Lizandra</p>
							<p>Jordina Rué i Alcové</p>
						</div>

						<div className="junta-team">
							<h4>Logística i contractació</h4>
							<p><span>Cap de logística</span>: Carla Rubio i Masferrer</p>
							<p>Jaume Oriol i Lladó</p>
							<p>Arnau Mallén i Boronat</p>
							<p>Eduard Càmara i Frias</p>
							<p>Martí Gumà i Marín</p>
							<p>Clara Llonch i Pulido</p>
						</div>

						<div className="junta-team">
							<h4>Equip d'acollida</h4>
							<p><span>Cap d'acollida</span>: Maria Babià i Soler</p>
							<p>Pere Llopart</p>
							<p>Aida Sanfeliu Gubern</p>
							<p>Jordina Rué i Alcové</p>
							<p>Núria Fonts</p>
							<p>Aina Oliu i Cordomí</p>
							<p>Anna Santamaria i Balaguer</p>
							<p>Queralt Casademont</p>
							<p>Gina Giró i Aguilar</p>
							<p>Berta Ramírez i Jou</p>
						</div>

						<div className="junta-team">
							<h4>Gralles i tabals</h4>
							<p><span>Cap de músics</span>: Genís Soler i Rafart</p>
							<p>Oriol Pérez i Fernández</p>
							<p>Blai Bolea i Galvez</p>
						</div>
					</div>
					<div className="junta-column">
						<div className="junta-team">
							<h4>Sanitaris</h4>
							<p><span>Cap de sanitaris</span>: Laia Soto i Gustamante</p>
							<p>Laura Llopis i Colom</p>
							<p>Maria Llorach i Pulido</p>
							<p>Blai Rosell i Ollé</p>
							<p>Ares Font i Urpí</p>
							<p>David Pato</p>
							<p>Laura Baus</p>
						</div>

						<div className="junta-team">
							<h4>Material</h4>
							<p><span>Cap de material</span>: Sabina García i Sàbat</p>
							<p>Queralt Casademont</p>
							<p>Laura Ribó i Roca</p>
							<p>Marta Arnau i Piculla</p>
						</div>

						<div className="junta-team">
							<h4>Activitats</h4>
							<p><span>Cap d'activitats</span>: Pere Llopart</p>
							<p>Ermengol Passola i Lizandra</p>
							<p>Andreu Huguet i Segarra</p>
							<p>Edgar Tena i Marqués</p>
							<p>Jordina Rué i Alcové</p>
							<p>Anna Santamaria i Balaguer</p>
						</div>

						<div className="junta-team">
							<h4>Comissió feminista</h4>
							<p><span>Cap</span>: Clàudia Massachs</p>
							<p>Edgar Tena i Marqués</p>
							<p>Bet Romera i Mirabent</p>
							<p>Marina de la Torre i Lozano</p>
						</div>
					</div>
				</div>
			</section>
		</>);
	}
}

export default JuntaDirectiva;
