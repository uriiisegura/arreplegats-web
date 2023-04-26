import React, { Component } from "react";
import { Link } from "react-router-dom";

class Contractacions extends Component {
	render() {
		return (<>
			<section>
				<h2>Contractacions</h2>

				<p>
					Tant esteu buscant afegir un toc d'emoció i autenticitat a la vostra pròxima conferència o congrés, com si busqueu una imatge espectacular i única que quedarà gravada en la ment dels nuvis a qualsevol boda: Arreplegats pot ser la solució perfecta!
				</p>

				<p>
					No dubtis en contactar-nos. Et respondrem en menys de 24 hores! Cap compromís. 
				</p>

				<Link className="link-btn middle-btn big-btn" to="/contactar">CONTACTA'NS</Link>

				<div className="contract-two-cols">
					<div>
						<p>
							Tenim una àmplia experiència actuant a:
						</p>

						<ul className="contract-list">
							<li>Eufòria (programa de la TV3).</li>
							<li>Festa de les Associacions d'Industrials de Barcelona.</li>
							<li>Saló de l'Ensenyament.</li>
							<li>XII Symposium on Computational Statistics.</li>
							<li>4º Congreso Internacional de la Sociedad Española de Didáctica de la Lengua y la Literatura.</li>
							<li>Posada de la primera pedra de la nova seu de la ONCE.</li>
							<li>International Conference on Advancements in Palliative and End of Life Care.</li>
						</ul>

						<p>
							...i molt més!
						</p>
					</div>
					<div className="spinner-wrap">
						<div className="spinner">
							<div className="face1" style={{backgroundImage: `url('images/comercial-boda.jpeg')`}}></div>
							<div className="face2" style={{backgroundImage: `url('images/cavall-bernat.jpeg')`}}></div>
							<div className="face3" style={{backgroundImage: `url('images/comercial-blanes.jpeg')`}}></div>
							<div className="face4" style={{backgroundImage: `url('images/comercial-vertex.jpeg')`}}></div>
							<div className="face5" style={{backgroundImage: `url('none.webp')`}}></div>
							<div className="face6" style={{backgroundImage: `url('none.webp')`}}></div>
						</div>
					</div>
				</div>

				<iframe
					className="contract-vid"
					src="https://youtube.com/embed/bXJlnNdIobY?controls=0&showinfo=0&rel=0"
					title="Els Arreplegats a Eufòria (TV3)"
					/>
			</section>
		</>);
	}
}

export default Contractacions;
