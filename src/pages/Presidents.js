import React, { Component } from "react";
import PersonCard from "../components/PersonCard";
import presidents from "./../data/presidents.json";

class Presidents extends Component {
	render() {
		return (<>
			<section>
                <h2>Llista de presidents</h2>

                <div className="people-gallery">
                    {
                        presidents.map(e => {
                            return <PersonCard
                                name={e.name}
                                mote={e.mote}
                                from={e.from}
                                to={e.to}
                                link={e.link}
                                text={e.text}
                            />
                        })
                    }
                </div>
			</section>
		</>);
	}
}

export default Presidents;
