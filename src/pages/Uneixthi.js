import React, { Component } from "react";
import Assajos from "./Assajos";
// import Agenda from "./Agenda";

class Uneixthi extends Component {
	render() {
		const imageSizes = [
			{ size: '576', url: 'images/resized/colla-all-576_x_273.jpg' },
			{ size: '768', url: 'images/resized/colla-all-768_x_365.jpg' },
			{ size: '992', url: 'images/resized/colla-all-992_x_472.jpg' },
			{ size: '1200', url: 'images/resized/colla-all-1200_x_571.jpg' },
			{ size: '1920', url: 'images/resized/colla-all-1920_x_914.jpg' },
			{ size: 'max', url: 'images/colla-all.jpg' },
		];

		return (<>
			<Assajos />
			{/* <Agenda /> */}
			<section>
				<h2>Uneix-t'hi</h2>
				
				<p>
					Vine i forma part de la gran família verd quiròfan!
				</p>
			</section>
			{
				imageSizes.map((img, i) => (
					<section key={`resized-section-${i}`} className={`image-divider resized-img img-${img.size}`} style={{backgroundImage: `url('${img.url}')`}}></section>
				))
			}
			<section>
				<h3>Fes-te <span>Arreplegat</span></h3>

				<p>
					Tant si ja has fet castells abans com si no, tothom pot ser Arreplegat! Tot el que necessites és una camisa vella i moltes ganes de passar-ho bé i fer noves amistats. No ho dubtis, deixa't caure per un assaig!
				</p>
				<p>
					Quan arribis el primer dia l'equip d'acolliment t'explicarà tot el que necessites saber dels castells universitaris i del funcionament de la colla.
				</p>
			</section>
		</>);
	}
}

export default Uneixthi;
