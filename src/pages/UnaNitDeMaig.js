import React, { Component } from "react";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";

import unaNitDeMaig from "../data/una-nit-de-maig-2024.json";

function withParams(Component) {
	return props => <Component {...props} params={useParams()} />;
}

class UnaNitDeMaig extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentTexts: [],
			timerId: [],
			allTextsShown: false
		};
	}
	componentDidMount() {
		this.initializeTexts();
	}
	componentDidUpdate(prevProps) {
		if (this.props.params.par !== prevProps.params.par)
			this.initializeTexts();
	}
	componentWillUnmount() {
		this.state.timerId.forEach(clearTimeout);
	}
	initializeTexts() {
		const { par } = this.props.params;
		const part = unaNitDeMaig[par] || unaNitDeMaig.home;
		const initialTexts = part.text.map(() => "");

		this.setState({
			currentTexts: initialTexts,
			allTextsShown: false
		});

		part.text.forEach((text, index) => {
			this.handleTextAnimation(text.split(" "), index, part.text.length);
		});
	}
	handleTextAnimation(words, textIndex, totalTexts) {
		let i = 0;
		const intervalId = setInterval(() => {
			if (i >= words.length) {
				clearInterval(intervalId);
				if (textIndex === totalTexts - 1) { // This is the last text part
					this.setState({ allTextsShown: true });
				}
				return;
			}
			this.setState(prevState => {
				const newCurrentTexts = [...prevState.currentTexts];
				newCurrentTexts[textIndex] += (i > 0 ? " " : "") + words[i-1];
				return { currentTexts: newCurrentTexts };
			});
			i++;
		}, 25);

		this.setState(prevState => ({
			timerId: [...prevState.timerId, intervalId]
		}));
	}
	goTo(n) {
		window.location.pathname = `/una-nit-de-maig/${n}`;
	}
	render() {
		const { par } = this.props.params;
		const part = unaNitDeMaig[par] || unaNitDeMaig.home;

		if (!part) return <NotFound />;

		return (
			<>
				<section>
					{
						part === unaNitDeMaig.home ?
							<h1 className="una-nit-de-maig-title" style={{ textDecoration: 'none' }}>{part.title}</h1>
						: <h4 className="una-nit-de-maig-title">{unaNitDeMaig.home.title}</h4>
						/*: <h4 className="una-nit-de-maig-title">Secció {par}: {part.title}</h4> */
					}

					{
						this.state.currentTexts.map((p, i) => <p key={`text-${i}`} className="readable-text">{p}</p>)
					}

					<div className={`options-wrap ${this.state.allTextsShown ? "show-options" : ""}`}>
						{
							part.options?.map((o, i) => (
								<div key={`opt-${i}`} className="btn" onClick={() => this.goTo(o.link)}>
									{o.text.map((t, j) => <p key={`opt-${i}-text-${j}`}>{t}</p>)}
								</div>
							))
						}
					</div>

					{
						part.final && <>
							{/* <h5 className="final-h5">Has arribat al <u>FINAL {part.final}</u></h5> */}
							<h5 className="final-h5">FINAL</h5>
							{part.extra && <p className="final-extra">({part.extra})</p>}
							<div className="final-btn">
								<button className="btn" onClick={() => this.goTo("1")}>Torna-hi a jugar</button>
							</div>
						</>
					}
				</section>
			</>
		);
	}
}

export default withParams(UnaNitDeMaig);