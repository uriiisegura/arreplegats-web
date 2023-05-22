import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import maps from "../data/penjat.json";

class NivellsPenjat extends Component {
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
				<h2>Penjat</h2>

				<div className="game-levels">
					{
						maps.map((_, i) => {
							return <NavLink key={i} className={`btn ${this.getCookie(`penjat-${i}`) === 'true' ? '' : 'incomplete'}`} to={`/penjat/${i}`}>Nivell {i+1}</NavLink>;
						})
					}
				</div>
			</section>
		</>);
	}
}

export default NivellsPenjat;
