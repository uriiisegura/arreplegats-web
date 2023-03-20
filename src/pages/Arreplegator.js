import React, { Component } from "react";
import ArreplegatorCard from "../components/ArreplegatorCard";

class Arreplegator extends Component {
	render() {
		return (<>
			<section>
				<h2>L'Arreplegator</h2>

				<p>
					Des del moment en que es va crear la colla l'any 1995, els Arreplegats hem tingut una revista interna anomenada, l'Arreplegator.
				</p>

				<div className="arreplegator-wrap">
					{
						[...Array(107+1).keys()].reverse().map(i => {
							return <ArreplegatorCard
								number={i}
								key={i}
							/>;
						})
					}
				</div>
            </section>
		</>);
	}
}

export default Arreplegator;
