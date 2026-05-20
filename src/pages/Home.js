import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import CastellCard from "../components/CastellCard";
import HomeHero from "../components/HomeHero";
import Quote from "../components/Quote";
import castells_map from "../data/castells-top.json";
import quotes from "../data/quotes.json";

class Home extends Component {
	render() {
		const randomQuotes = [...quotes].sort(() => 0.5 - Math.random()).slice(0, 3);

		return (<>
			<HomeHero />
			<section style={{paddingTop: `2rem`}}>
				<div className="floating-titles">
					<h4>Els millors castells</h4>
					<NavLink to="/millors-castells/">Descobreix-los tots!</NavLink>
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
						randomQuotes.map((e, i) => {
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
