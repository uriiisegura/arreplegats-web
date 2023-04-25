import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./ImageResizes.css"

class Uneixthi extends Component {
	render() {
		return (<>
			<section>
				<h2>Uneix-t'hi</h2>
				
				<p>
					Vine i forma part de la gran família verd quiròfan!
				</p>
			</section>
			<section className="image-divider qui-som" style={{backgroundImage: `url('images/colla-all.jpg')`}}></section>
			<section>
				<h3>Fes-te <span>Arreplegat</span></h3>

				<p>
					Tant si ja has fet castells abans com si no, tothom pot ser Arreplegat! Tot el que necessites és una camisa vella i moltes ganes de passar-ho bé i fer noves amistats. No ho dubtis, deixa't caure per un assaig!
				</p>
				<p>
					Quan arribis el primer dia l'equip d'acolliment t'explicarà tot el que necessites saber dels castells universitaris i del funcionament de la colla.
				</p>
				<div className="read-more">
					<NavLink to="/assajos">HORARIS D'ASSAIG</NavLink>
				</div>
			</section>
		</>);
	}
}

export default Uneixthi;
