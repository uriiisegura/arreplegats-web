import { Component } from "react";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";

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
		if (!part) return <NotFound />;

		console.log(part);

		return (<>
			<section>
				<h4 className="una-nit-de-maig-title">Secció {par}: {part.title}</h4>

				{
					part.text.map((p, i) => <p key={`text-${i}`}>{p}</p>)
				}

				<div className="options-wrap">
					{
						part.options.map((o, i) => <div key={`opt-${i}`} className="btn" onClick={() => this.goTo(o.link)}>
							{
								o.text.map((t, j) => <p key={`opt-${i}-text-${j}`}>{t}</p>)
							}
						</div>)
					}
				</div>
			</section>
		</>);
	}
}

export default withParams(UnaNitDeMaig);
