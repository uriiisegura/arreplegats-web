import React, { Component } from "react";
import sponsors from "../data/sponsors.json"

class Patrocinadors extends Component {
	render() {
		return (<>
			<section>
				<h2>Patrocinadors i col·laboradors</h2>
				{
					Object.entries(sponsors).map(([title, entities], i) => {
						return <div key={`sponsors-${i}`}>
							<h4 className="sponsors-title">{title}</h4>
							<div className="sponsors-wrap">
								{
									entities.map((e, j) => {
										return <div className="sponsor" title={e.name} style={{backgroundImage: `url('/sponsors/${e.image}')`}} key={`sponsors-${i}-${j}`}>
										</div>;
									})
								}
							</div>
						</div>;
					})
				}
			</section>
		</>);
	}
}

export default Patrocinadors;
