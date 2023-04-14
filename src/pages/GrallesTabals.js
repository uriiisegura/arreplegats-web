import React, { Component } from "react";

class GrallesTabals extends Component {
	render() {
		return (<>
			<section>
				<h2>Gralles i Tabals</h2>

				<p>
					Els Arreplegats tenim un grup de gent que s'encarrega d'acompanyar musicalment els nostres castells: són els grallers i tabalers. Es tracta d'un grup obert que toquen el "Toc de castells" a cada actuació.
				</p>
			</section>
			<section className="image-divider" style={{backgroundImage: `url('images/gralles.jpg')`}}></section>
			<section>
				<p>
					Qualsevol persona amb ganes de tocar la gralla o el tabal, encara que no en sàpiga, pot formar part del grup. Al llarg de la temporada es realitzen diversos assajos on els nous grallers aprenen les cançons més usuals i els més experimentats perfeccionen la seva tècnica. Així doncs, si tens inquietud per participar a Arreplegats d'una manera més musical, també tens el teu lloc.
				</p>
				<p>
					Sense músics, no hi ha castells!
				</p>
				{/*<div className="read-more">
					<NavLink to="/contacte">CONTACTA'NS</NavLink>
				</div>*/}
			</section>
		</>);
	}
}

export default GrallesTabals;
