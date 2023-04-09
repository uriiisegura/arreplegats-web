import React, { Component } from "react";
import WordSearch from "./../components/WordSearch";
import maps from "./../data/sopa-de-lletres.json";

class SopaLletres extends Component {
	render() {
		return (<>
			<section>
				<h2>Sopa de lletres</h2>

				{
					[maps[1]].map((m, i) => {
						const map = [];
						m.map.forEach(r => {
							map.push(r.split(''));
						});
						return <WordSearch
									map={map}
									words={m.words}
									map_id={i}
									key={i}
									/>;
					})
				}
			</section>
		</>);
	}
}

export default SopaLletres;
