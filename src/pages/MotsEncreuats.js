import React, { Component } from "react";
import Crossword from "./../components/Crossword";
import maps from "./../data/mots-encreuats.json";

class MotsEncreuats extends Component {
	render() {
		return (<>
			<section>
				<h2>Mots encreuats</h2>

				{
					[maps[0]].map((m, i) => {
						return <Crossword
								rows={m.rows}
								columns={m.columns}
								words={m.words}
								map_id={i}
								key={i}
								/>
					})
				}
			</section>
		</>);
	}
}

export default MotsEncreuats;
