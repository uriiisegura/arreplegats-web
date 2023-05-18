import React, { Component } from "react";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";
import PenjatGame from "../components/PenjatGame";
import maps from "./../data/penjat.json";

function withParams(Component) {
	return props => <Component {...props} params={useParams()} />;
}

class Penjat extends Component {
	render() {
		const { idx } = this.props.params;
		const word = maps[idx]?.toUpperCase();

		if (word === undefined)
			return <NotFound />;
		
		return (<>
			<section>
				<h2>Penjat: Nivell {parseInt(idx)+1}</h2>

				<PenjatGame
					word={word}
					map_id={idx}
					/>
			</section>
		</>);
	}
}

export default withParams(Penjat);
