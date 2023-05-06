import React, { Component } from "react";
import Assajos from "./Assajos";

class Uneixthi extends Component {
	render() {
		return (<>
			<section>
				<h2>Uneix-t'hi</h2>
				
				<p>
					Vine i forma part de la gran família verd quiròfan!
				</p>
			</section>
			<section className="image-divider img-576" style={{backgroundImage: `url('images/resized/colla-all-576_x_273.jpg')`}}></section>
			<section className="image-divider img-768" style={{backgroundImage: `url('images/resized/colla-all-768_x_365.jpg')`}}></section>
			<section className="image-divider img-992" style={{backgroundImage: `url('images/resized/colla-all-992_x_472.jpg')`}}></section>
			<section className="image-divider img-1200" style={{backgroundImage: `url('images/resized/colla-all-1200_x_571.jpg')`}}></section>
			<section className="image-divider img-1920" style={{backgroundImage: `url('images/resized/colla-all-1920_x_914.jpg')`}}></section>
			<section className="image-divider img-max" style={{backgroundImage: `url('images/colla-all.jpg')`}}></section>
			<section>
				<h3>Fes-te <span>Arreplegat</span></h3>

				<p>
					Tant si ja has fet castells abans com si no, tothom pot ser Arreplegat! Tot el que necessites és una camisa vella i moltes ganes de passar-ho bé i fer noves amistats. No ho dubtis, deixa't caure per un assaig!
				</p>
				<p>
					Quan arribis el primer dia l'equip d'acolliment t'explicarà tot el que necessites saber dels castells universitaris i del funcionament de la colla.
				</p>
			</section>
			<Assajos />
		</>);
	}
}

export default Uneixthi;
