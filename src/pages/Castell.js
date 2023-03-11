import React, { Component } from "react";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";
import castells_map from "./../data/castells-top.json";

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class Castell extends Component {
	render() {
        const { castell } = this.props.params;
        const data = castells_map[castell];

        if (data === undefined)
            return <NotFound />;

		return (<>
			<section>
                <h1>{data.name}</h1>
                <img className="top-img" src={data.link} alt={data.name} />
                {
                    data.text.map(e => {
                        return <p>{e}</p>;
                    })
                }
			</section>
		</>);
	}
}

export default withParams(Castell);
