import React, { Component } from "react";
import { useParams } from "react-router-dom";

import unaNitDeMaig from "../data/una-nit-de-maig-2024.json";

function withParams(Component) {
	return props => <Component {...props} params={useParams()} />;
}

class UnaNitDeMaig extends Component {
	goTo(n) {
		window.location.pathname = `/una-nit-de-maig/${n}`;
	}
	render() {
		const { par } = this.props.params;

		if (!par || par === "0") {
			const home = unaNitDeMaig.home;
			return (<>
				<section>
					<h1>{home.title}</h1>

					{
						home.text.map((p, i) => <p key={`text-${i}`}>{p}</p>)
					}

					<div className="una-nit-de-maig-btn">
						<button className="btn" onClick={() => this.goTo(home.button.link)}>{home.button.text}</button>
					</div>
				</section>
			</>);
		}

		const part = unaNitDeMaig[par];
		if (!part) this.goTo("0");

		return (<>
			<section>
				{/* <h4 className="una-nit-de-maig-title">Secció {par}: {part.title}</h4> */}

				{
					part.text.map((p, i) => <p key={`text-${i}`}>{p}</p>)
				}

				{
					part.options && (
						part.options.length > 1 ? (
							<div className="options-wrap">
								{
									part.options.map((o, i) => <div key={`opt-${i}`} className="btn" onClick={() => this.goTo(o.link)}>
										{
											o.text.map((t, j) => <p key={`opt-${i}-text-${j}`}>{t}</p>)
										}
									</div>)
								}
							</div>
						) : (
							<div className="options-wrap single-option">
								<div className="btn" onClick={() => this.goTo(part.options[0].link)}>
									{
										part.options[0].text.map((t, i) => <p key={`text-${i}`}>{t}</p>)
									}
								</div>
							</div>
						)
					)
				}

				{
					part.final && <>
						<h5 className="final-h5">Has arribat al <u>FINAL {part.final}</u></h5>
						{part.extra && <p className="final-extra">({part.extra})</p>}
						<div className="final-btn">
							<button className="btn" onClick={() => this.goTo("0")}>Torna-hi a jugar</button>
						</div>
					</>
				}
			</section>
		</>);
	}
}

export default withParams(UnaNitDeMaig);
