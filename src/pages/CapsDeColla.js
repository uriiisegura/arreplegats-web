import React, { Component } from "react";
import PersonCard from "../components/PersonCard";
import caps_de_colla from "./../data/caps-de-colla.json";

class CapsDeColla extends Component {
	render() {
		return (<>
			<section>
                <h2>Llista de caps de colla</h2>

                <div className="people-gallery">
                    {
                        caps_de_colla.map((e, i) => {
                            return <PersonCard
                                name={e.name}
                                mote={e.mote}
                                from={e.from}
                                to={e.to}
                                link={e.link}
                                text={e.text}
                                key={i}
                            />
                        })
                    }
                </div>
			</section>
		</>);
	}
}

export default CapsDeColla;
