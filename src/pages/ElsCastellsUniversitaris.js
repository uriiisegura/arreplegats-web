import React, { Component } from "react";
import events from "./../data/events-universitaris.json";

class CastellsUniversitaris extends Component {
	renderComponent(e, i) {
		let component;
		const props = e.props ? e.props : {};
		props.key = i;
		if (e.text) {
			component = React.createElement(e.type, props, e.text);
		} else {
			const children = e.components.map((c, j) => {
				return this.renderComponent(c, j);
			});
			component = React.createElement(e.type, props, children);
		}
		return component;
	}
	render() {
		return (<>
			<section>
				<h2>Els castells universitaris</h2>

				<p>
					Tot i ser la millor, els Arreplegats de la Zona Universitària no som l'única colla castellera universitària. A continuació hi podeu trobar un eix cronològic dels esdeveniments que més han marcat el món casteller universitari:
				</p>

				<ul className="timeline">
					{
						events.map((e, i) => {
							return <li key={i}>
								<div className="date" style={{backgroundColor: `var(--${e.color})`}}>{e.date}</div>
								<div className="title">{e.title}</div>
								<div className="descr">{
									e.description instanceof Object ?
										e.description.map((c, j) => {
											return this.renderComponent(c, j)
										})
									: e.description
								}</div>
							</li>
						})
					}
				</ul>
			</section>
		</>);
	}
}

export default CastellsUniversitaris;
