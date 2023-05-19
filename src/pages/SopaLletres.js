import React, { Component } from "react";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";
import WordSearch from "./../components/WordSearch";
import maps from "./../data/sopa-de-lletres.json";

function withParams(Component) {
	return props => <Component {...props} params={useParams()} />;
}

class SopaLletres extends Component {
	render() {
		const { idx } = this.props.params;
		const sopa = maps[idx];

		if (sopa === undefined)
			return <NotFound />;

		const map = [];
		sopa.map.forEach(r => {
			map.push(r.split(''));
		});

		return (<>
			<section>
				<h2>Sopa de lletres: Nivell {parseInt(idx)+1}</h2>

				<WordSearch
					map={map}
					words={sopa.words}
					map_id={parseInt(idx)}
					/>
			</section>
		</>);
	}
}

export default withParams(SopaLletres);
