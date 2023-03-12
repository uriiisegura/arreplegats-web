import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import CastellCard from "../components/CastellCard";
import castells_map from "./../data/castells-top.json";

class Home extends Component {
	render() {
		return (<>
			<section className="welcome-image" style={{backgroundImage: `url('images/2d8fm-arreplegats-2016_2.png')`}}>
				<div className="overlay"></div>
				<div className="content">
					<h1>ARREPLEGATS</h1>
					<h3>ELS ÚNICS QUE HO PODEN FER</h3>
					<NavLink to="/uneixthi" className="hero-btn">UNEIX-T'HI</NavLink>
				</div>
			</section>
			<section className="top-castells">
                <div className="floating-titles">
                    <h4>Els millors castells</h4>
                    <NavLink to="/millors-castells">Descobreix-los tots!</NavLink>
                </div>
				<div className="top-gallery">
                    {
                        Object.values(castells_map).slice(0, 4).map(e => {
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

export default Home;
