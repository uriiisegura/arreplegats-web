import React, { Component } from "react";
import Contactar from "./Contactar";

class Contractacions extends Component {
	render() {
		return (<>
			<section>
				<h1>Contractar castellers</h1>

				<p>
					Contracta castellers pel teu congrés, sopar d'empresa, conferència, boda… D'una colla amb més de 25 anys d'experiència, els Arreplegats de la Zona Universitària.
				</p>

				<h3>Cas d'èxit: Arreplegats a Eufòria (TV3)</h3>

				<iframe
					className="contract-vid"
					src="https://youtube.com/embed/bXJlnNdIobY?controls=0&showinfo=0&rel=0"
					title="Els Arreplegats a Eufòria (TV3)"
					/>
				
				<p>
					Si vols sorprendre els teus convidats amb un espectacle emocionant i autèntic, contracta castellers Arreplegats de la Zona Universitària.
				</p>

				<p>
					No dubtis en contactar-nos. Et respondrem en menys de 24 hores! Cap compromís. 
				</p>

				<h3>Què t'oferim al contractar castellers?</h3>

				<p>
					Alcem castells, torres o pilars al teu esdeveniment. Si vols, pots contractar un sol pilar o castell o una actuació completa.
				</p>

				<div className="img-gallery">
					<img
						src="/images/comercial-boda.jpeg"
						alt="Contracte d'un pilar a una boda al Penedès"
						/>

					<img
						src="/images/comercial-blanes.jpeg"
						alt="Contracte d'un castell a un sopar d'empresa"
						/>
				</div>

				<h3>Qui som els castellers Arreplegats?</h3>

				<p>
					Els Arreplegats som una colla amb més d'un quart de segle d'història –fundada el 1995– i només fem castells amb persones matrículades a la universitat. Fins i tot les enxanetes són adultes!
				</p>

				<p>
					Tot i aquesta restricció única, hem aconseguit arribar a nivells d'altíssima qualitat en les nostres actuacions. Ara alcem castells, torres i pilars de fins a 8 pisos com el 4d8, la Td8fm, el Pd7fm, i el 3d8f, capaços de satisfer el públic més exigent.
				</p>

				<img
					className="img contract-img"
					style={{objectFit: 'contain'}}
					alt="Contractació castellers Arreplegats al Cavall Bernat (Montserrat) Moreneta"
					src="/images/td8fm-arreplegats-2016.png"
					/>

				<p>
					Contractar castellers Arreplegats de la Zona Universitària és una oportunitat perfecta per a qualsevol organitzador que busqui regalar un record inoblidable al seu públic local o extranger.
				</p>

				<img
					className="img contract-img"
					alt="Contractació castellers Arreplegats al Cavall Bernat (Montserrat) Moreneta"
					src="/images/cavall-bernat.jpeg"
					/>

				<p>
					Envia'ns un missatge per conèixer les nostres tarifes i disponibilitat. Et respondrem en menys de 24 hores amb tota la informació!
				</p>

				<Contactar
					subject="El vostre correu electrònic"
					text="Quin tipus de servei busqueu contractar?"
					/>
			</section>
		</>);
	}
}

export default Contractacions;
