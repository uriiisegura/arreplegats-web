import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import CastellCard from "../components/CastellCard";
import Quote from "../components/Quote";
import castells_map from "../data/castells-top.json";
import quotes from "../data/quotes.json";

class Home extends Component {
	render() {
		const random_quotes = quotes.sort(() => 0.5 - Math.random()).slice(0, 3);

		const imageSizes = [
			{ size: '576', url: 'images/resized/2d8fm-arreplegats-2016-576_x_384.jpeg' },
			{ size: '768', url: 'images/resized/2d8fm-arreplegats-2016-768_x_512.jpeg' },
			{ size: '992', url: 'images/resized/2d8fm-arreplegats-2016-992_x_661.jpeg' },
			{ size: '1200', url: 'images/resized/2d8fm-arreplegats-2016-1200_x_800.jpeg' },
			{ size: '1920', url: 'images/resized/2d8fm-arreplegats-2016-1920_x_1280.jpeg' },
			{ size: 'max', url: 'images/2d8fm-arreplegats-2016.png' },
		];

		return (<>
			{
				imageSizes.map((img, i) => (
					<section key={`resized-section-${i}`} className={`welcome-image resized-img img-${img.size}`} style={{backgroundImage: `url('${img.url}')`}}>
						<div className="overlay"></div>
						<div className="content">
							<h1>ARREPLEGATS</h1>
							<h3>ELS ÚNICS QUE HO PODEN FER</h3>
							<NavLink to="/assajos" className="hero-btn">UNEIX-T'HI</NavLink>
							<NavLink to="/assajos" className="hero-btn" style={{ marginLeft: 10 }}>AGENDA</NavLink>
						</div>
					</section>
				))
			}
			<section style={{paddingTop: `2rem`}}>
				<div className="floating-titles">
					<h4>Els millors castells</h4>
					<NavLink to="/millors-castells">Descobreix-los tots!</NavLink>
				</div>
				<div className="top-gallery">
					{
						Object.values(castells_map).slice(0, 4).map((e, i) => {
							return <CastellCard
								name={e.name}
								link={e.link}
								notation={e.notation}
								key={i}
							/>
						})
					}
				</div>
			</section>
			{<section>
				<h4>Què diu la gent?</h4>
				<div className="quotes">
					{
						random_quotes.map((e, i) => {
							return <Quote
								quote={e.quote}
								author={e.author}
								key={i}
							/>
						})
					}
				</div>
			</section>}
		</>);
	}
}

export default Home;
