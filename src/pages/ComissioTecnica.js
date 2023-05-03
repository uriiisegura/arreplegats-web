import React, { Component } from "react";

class ComissioTecnica extends Component {
	render() {
		return (<>
			<section>
                <h2>Comissió tècnica</h2>

				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tincidunt enim volutpat elit ullamcorper commodo. Nam tristique dictum justo quis elementum. Praesent auctor scelerisque lacinia. Nulla nisi justo, commodo ut pulvinar quis, imperdiet nec dolor. Curabitur id felis nec mauris tempus tempus tincidunt eu leo. Praesent mattis ac lacus in pulvinar. Phasellus id mauris blandit, pellentesque mi eget, tincidunt ligula.
				</p>

				<div className="juntes tecnica">
					<div className="junta-column">
						<div className="junta-team">
							<h4>Direcció tècnica</h4>
							<p><span>Cap de colla</span>: Xavier Marín i Rísquez</p>
							<p><span>Sots-cap de colla</span>: Pau Coll i Casellas</p>
							<p><span>Presidenta</span>: Clara Montoya i García</p>
							<p><span>Vice-president</span>: Benet Antius i Lozano</p>
						</div>
					</div>
					<div className="junta-column">
						<div className="junta-team">
							<h4>Equip de troncs</h4>
							<p><span>Cap de troncs</span>: Júlia Font i Aguilar</p>
							<p>Laia Boixet i Lladó</p>
							<p>Pau Rosselló i Carreras</p>
							<p>Júlia Montserrat</p>
							<p>Eduard Llorens i Pomé</p>
							<p>David Torras i Martín</p>
							<p>Aina Vila</p>
							<p>Biel Romera i Muñoz</p>
							<p>Queralt Bautista i Rosas</p>
							<p>Ignasi Tortras</p>
						</div>

						<div className="junta-team">
							<h4>Equip de poms</h4>
							<p><span>Cap de poms</span>: Paula Olivé</p>
							<p>Carlota Fornells</p>
							<p>Carla Falguera i Garrido</p>
							<p>Núria Bautista i Rosas</p>
							<p>Ana Paula i Monzón</p>
						</div>
					</div>
					<div className="junta-column">
						<div className="junta-team">
							<h4>Equip de pinyes, folres, i manilles</h4>
							<p><span>Cap de pinyes</span>: Pau Coll i Casellas</p>
							<p>Oriol Segura i Niño</p>
							<p>Edgar Castellanos i Offroy</p>
							<p>Aida Sanfeliu</p>
							<p>Pau Sánchez i Viol</p>
							<p>Martí Puig i Vall</p>
							<p>Bet Romera i Mirabent</p>
							<p>Laia Homs i Vilaseca</p>
							<p>Anna Santamaria i Balaguer</p>
							<p>Jordi Torrens i Camprubí</p>
							<p>Eudald Rovira i Rovira</p>
							<p>Arnau Espinalt</p>
						</div>
					</div>
				</div>
			</section>
		</>);
	}
}

export default ComissioTecnica;
