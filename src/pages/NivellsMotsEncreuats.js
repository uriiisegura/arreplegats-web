import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import maps from "./../data/mots-encreuats.json";

class NivellsMotsEncreuats extends Component {
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
				<h2>Mots encreuats</h2>

				<div className="game-levels">
					{
						maps.map((_, i) => {
							return <NavLink key={i} className={`btn ${this.getCookie(`mots-${i}`) === 'true' ? '' : 'incomplete'}`} to={`/mots-encreuats/${i}`}>Nivell {i+1}</NavLink>;
						})
					}
				</div>
			</section>
		</>);
	}
}

export default NivellsMotsEncreuats;
