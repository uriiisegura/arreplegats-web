import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import CastellCard from "../components/CastellCard";

class Home extends Component {
	render() {
		return (<>
			<section className="welcome-image" style={{backgroundImage: `url('images/2d8fm-arreplegats-2016_2.png')`}}>
				<div className="overlay"></div>
				<div className="content">
					<h1>ARREPLEGATS</h1>
					<h3>ELS ÚNICS QUE HO PODEN FER</h3>
					<NavLink to="/a" className="hero-btn">UNEIX-T'HI</NavLink>
				</div>
			</section>
			<section className="top-castells">
				<h4>Els millors castells</h4>
				<div className="top-gallery">
					<CastellCard
						name="Torre de 8 amb folre i manilles"
						link="images/2d8fm-arreplegats-2016_2.png"
						/>
					<CastellCard
						name="Pilar de 7 amb folre i manilles"
						link="images/pd7fmC-arreplegats-2022.jpg"
						/>
					<CastellCard
						name="4 de 8 sense folre"
						link="images/4d8-arreplegats.jfif"
						/>
					<CastellCard
						name="9 de 7"
						link="images/9d7-arreplegats_2.jpg"
						/>
				</div>
			</section>
		</>);
	}
}

export default Home;
