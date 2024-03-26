import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class QuiSom extends Component {
	render() {
		const imageSizes = [
			{ size: '576', url: 'images/resized/3d8f-cors-576_x_384.jpg' },
			{ size: '768', url: 'images/resized/3d8f-cors-768_x_511.jpg' },
			{ size: '992', url: 'images/resized/3d8f-cors-992_x_660.jpg' },
			{ size: '1200', url: 'images/resized/3d8f-cors-1200_x_799.jpg' },
			{ size: '1920', url: 'images/resized/3d8f-cors-1920_x_1279.jpg' },
			{ size: 'max', url: 'images/3d8f-cors.jpg' },
		];

		return (<>
			<section>
				<h2>Qui som?</h2>
				
				<div className="dictionary-entry">
					<h4>arreplegat -ada</h4>
					<p><span>adj. i m. i f.</span> [LC] Dit d'un grup de persones considerades incompetents per a una feina concreta. <i>Una colla d'arreplegats.</i></p>
				</div>
			</section>
			{
				imageSizes.map((img, i) => (
					<section key={`resized-3d8f-${i}`} className={`image-divider resized-img img-${img.size}`} style={{backgroundImage: `url('${img.url}')`}}></section>
				))
			}
			<section>
				<h3>Som els <span>Arreplegats</span> de la Zona Universitària</h3>

				<p>
					Els Arreplegats som una colla castellera amb més de 25 anys d'història que només fem castells amb persones matriculades a la universitat. Fins i tot les enxanetes són adultes!
				</p>
				<p>
					Tot i aquesta restricció única, hem aconseguit arribar a nivells molt alts en les nostres actuacions. Alcem castells, torres i pilars de fins a 8 pisos com el <NavLink to="/castells/4d8">4 de 8</NavLink>, la <NavLink to="/castells/Td8fm">torre de 8 amb folre i manilles</NavLink>, o el <NavLink to="/castells/3d8f">tres de 8 amb folre</NavLink>, capaços de satisfer el públic més exigent.
				</p>
				<div className="read-more">
					<NavLink to="/historia-de-la-colla">DESCOBREIX LA NOSTRA HISTÒRIA!</NavLink>
				</div>
			</section>
		</>);
	}
}

export default QuiSom;
