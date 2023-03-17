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
							<p><span>Cap de pinyes</span>: Pau Coll Casellas</p>
							<p><span>Cap de troncs</span>: Júlia Font</p>
							<p><span>Cap de poms</span>: Paula Olivé</p>
						</div>
					</div>
					<div className="junta-column">
						<div className="junta-team">
							<h4>Equip de pinyes, folres, i manilles</h4>
							<p><span>Cap de pinyes</span>: Pau Coll Casellas</p>
							<p>Pau Sánchez Viol</p>
							<p>Oriol Segura Niño</p>
							<p>Aida Sanfeliu</p>
							<p>Martí Puig Vall</p>
							<p>Bet Romera</p>
							<p>Laia Homs</p>
							<p>Anna Santamaria</p>
							<p>Jordi Torrens</p>
							<p>Eudald Rovira</p>
							<p>Arnau Espinalt</p>
							<p>Edgar Castellanos</p>
						</div>

						<div className="junta-team">
							<h4>Equip d'acollida</h4>
							<p><span>Cap d'acollida</span>: Maria Babià</p>
							<p>Pere Llopart</p>
							<p>Aida Sanfeliu</p>
							<p>Jordina Rué</p>
							<p>Núria Fonts</p>
							<p>Aina Oliu</p>
							<p>Anna Santamaria</p>
							<p>Queralt Casademont</p>
							<p>Gina Giró</p>
							<p>Berta Ramírez</p>
						</div>
					</div>
					<div className="junta-column">
						<div className="junta-team">
							<h4>Equip de troncs</h4>
							<p><span>Cap de troncs</span>: Júlia Font</p>
							<p>xxx</p>
							<p>xxx</p>
							<p>xxx</p>
							<p>xxx</p>
						</div>

						<div className="junta-team">
							<h4>Equip de poms</h4>
							<p><span>Cap de poms</span>: Paula Olivé</p>
							<p>xxx</p>
							<p>xxx</p>
							<p>xxx</p>
							<p>xxx</p>
						</div>
					</div>
				</div>
			</section>
		</>);
	}
}

export default ComissioTecnica;
