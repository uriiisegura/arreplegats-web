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
							<p><span>Cap de colla</span>: Xavier Marín Rísquez</p>
							<p><span>Sots-cap de colla</span>: Pau Coll Casellas</p>
							<p><span>Presidenta</span>: Clara Montoya García</p>
							<p><span>Vice-president</span>: Benet Antius Lozano</p>
						</div>
					</div>
					<div className="junta-column">
						<div className="junta-team">
							<h4>Equip de troncs</h4>
							<p><span>Cap de troncs</span>: Júlia Font Aguilar</p>
							<p>Laia Boixet Lladó</p>
							<p>Ana Paula Monzón</p>
							<p>Pau Rosselló Carreras</p>
							<p>Júlia Montserrat</p>
							<p>Eduard Llorens Pomé</p>
						</div>

						<div className="junta-team">
							<h4>Equip de pilars</h4>
							<p><span>Cap de pilars</span>: Joan Massip Camprodon</p>
							<p>David Torras Martín</p>
							<p>Aina Vila</p>
							<p>Biel Romera Muñoz</p>
							<p>Queralt Bautista Rosas</p>
						</div>

						<div className="junta-team">
							<h4>Equip de poms</h4>
							<p><span>Cap de poms</span>: Paula Olivé</p>
							<p>Carlota Fornells</p>
							<p>Carla Falguera Garrido</p>
							<p>Núria Bautista Rosas</p>
						</div>
					</div>
					<div className="junta-column">
						<div className="junta-team">
							<h4>Equip de pinyes, folres, i manilles</h4>
							<p><span>Cap de pinyes</span>: Pau Coll Casellas</p>
							<p>Oriol Segura Niño</p>
							<p>Edgar Castellanos Offroy</p>
							<p>Aida Sanfeliu</p>
							<p>Pau Sánchez Viol</p>
							<p>Martí Puig Vall</p>
							<p>Bet Romera Mirabent</p>
							<p>Laia Homs Vilaseca</p>
							<p>Anna Santamaria Balaguer</p>
							<p>Jordi Torrens Camprubí</p>
							<p>Eudald Rovira Rovira</p>
							<p>Arnau Espinalt</p>
						</div>
					</div>
				</div>
			</section>
		</>);
	}
}

export default ComissioTecnica;
