import React, { Component } from "react";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";
import Crossword from "./../components/Crossword";
import maps from "./../data/mots-encreuats.json";

function withParams(Component) {
	return props => <Component {...props} params={useParams()} />;
}

class MotsEncreuats extends Component {
	render() {
		const { idx } = this.props.params;
		const map = maps[idx];

		if (map === undefined)
			return <NotFound />;

		return (<>
			<section>
				<h2>Mots encreuats: Nivell {parseInt(idx)+1}</h2>

				<Crossword
					rows={map.rows}
					columns={map.columns}
					words={map.words}
					map_id={parseInt(idx)}
					/>
			</section>
		</>);
	}
}

export default withParams(MotsEncreuats);
