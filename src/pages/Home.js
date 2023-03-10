import { Component } from "react";
import { NavLink } from "react-router-dom";

class Home extends Component {
	render() {
		return (<>
			<section className="welcome-image">
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
					<div style={{backgroundImage: `url('images/2d8fm-arreplegats-2016_2.png')`}}></div>
					<div style={{backgroundImage: `url('images/2d8fm-arreplegats-2016_2.png')`}}></div>
					<div style={{backgroundImage: `url('images/2d8fm-arreplegats-2016_2.png')`}}></div>
					<div style={{backgroundImage: `url('images/2d8fm-arreplegats-2016_2.png')`}}></div>
				</div>
			</section>
		</>);
	}
}

export default Home;
