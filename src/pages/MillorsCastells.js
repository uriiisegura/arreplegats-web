import React, { Component } from "react";
import CastellCard from "../components/CastellCard";
import castells_map from "./../data/castells-top.json";

class MillorsCastells extends Component {
	render() {
		return (<>
			<section>
                <h2>Millors Castells</h2>

                <div className="top-gallery">
                    {
                        Object.values(castells_map).map(e => {
                            return <CastellCard
                                name={e.name}
                                link={e.link}
                                notation={e.notation}
                            />
                        })
                    }
                </div>
			</section>
		</>);
	}
}

export default MillorsCastells;
