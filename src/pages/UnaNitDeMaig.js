import React, { Component } from "react";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";

import unaNitDeMaig from "../data/nit-fresca-per-ser-maig-2024.json";

function withParams(Component) {
	return props => <Component {...props} params={useParams()} />;
}

class UnaNitDeMaig extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTexts: [],
            timerId: [],
            allTextsShown: false,
            currentAnimatingText: 0 // Added to control which text is currently animating
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
            allTextsShown: false,
            currentAnimatingText: 0
        }, () => {
            // Start animating the first text if any
            if (part.text.length > 0) {
                this.handleTextAnimation(part.text[0].split(" "), 0, part.text.length, part);
            }
        });
    }
    handleTextAnimation(words, textIndex, totalTexts, part) {
        let i = 0;
        const intervalId = setInterval(() => {
            if (i >= words.length) {
                clearInterval(intervalId);
                // Check if there are more texts to animate
                if (textIndex < totalTexts - 1) {
                    this.setState(prevState => ({
                        currentAnimatingText: prevState.currentAnimatingText + 1
                    }), () => {
                        const nextTextIndex = this.state.currentAnimatingText;
                        const nextText = part.text[nextTextIndex].split(" ");
                        this.handleTextAnimation(nextText, nextTextIndex, totalTexts, part);
                    });
                } else {
                    this.setState({ allTextsShown: true });
                }
                return;
            }
            this.setState(prevState => {
                const newCurrentTexts = [...prevState.currentTexts];
                newCurrentTexts[textIndex] += (i > 0 ? " " : "") + words[i - 1];
                return { currentTexts: newCurrentTexts };
            });
            i++;
        }, 25);

        this.setState(prevState => ({
            timerId: [...prevState.timerId, intervalId]
        }));
    }
    goTo(n) {
        window.location.pathname = `/nit-fresca-per-ser-maig/${n}`;
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
							<h3 className="nit-fresca-per-ser-maig-title" style={{ textDecoration: 'none' }}>{part.title}</h3>
						: <h4 className="nit-fresca-per-ser-maig-title">{unaNitDeMaig.home.title}</h4>
						/*: <h4 className="nit-fresca-per-ser-maig-title">Secció {par}: {part.title}</h4> */
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
						part.final && this.state.allTextsShown && <>
							<h5 className="final-h5">Has arribat al <u>FINAL {part.final}</u></h5>
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