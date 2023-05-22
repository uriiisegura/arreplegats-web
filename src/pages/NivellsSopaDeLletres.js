import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import maps from "../data/sopa-de-lletres.json";

class NivellsSopaDeLletres extends Component {
	getCookie(name) {
		const cookies = document.cookie.split(';');
		for (let cookie of cookies) {
			cookie = cookie.split(',')[0];
			const [k, v] = cookie.split('=');
			if (k.trim() === name) return v;
		}
		return null;
	}
	render() {
		return (<>
			<section>
				<h2>Sopa de lletres</h2>

				<div className="game-levels">
					{
						maps.map((_, i) => {
							return <NavLink key={i} className={`btn ${this.getCookie(`sopa-${i}`) === 'true' ? '' : 'incomplete'}`} to={`/sopa-de-lletres/${i}`}>Nivell {i+1}</NavLink>;
						})
					}
				</div>
			</section>
		</>);
	}
}

export default NivellsSopaDeLletres;
