import React, { Component } from "react";
import { useParams } from "react-router-dom";

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

<<<<<<< HEAD
					{
						home.text.map((p, i) => <p key={`text-${i}`} dangerouslySetInnerHTML={{ __html: p }} />)
					}
=======
    componentDidUpdate(prevProps) {
        if (this.props.params.par !== prevProps.params.par) {
            this.initializeTexts();
        }
    }
>>>>>>> ed3da019a8230389f8b6c64fceb87afa3efc832d

    componentWillUnmount() {
        this.state.timerId.forEach(clearTimeout);
    }

<<<<<<< HEAD
		const part = unaNitDeMaig[par];
		if (!part) this.goTo("0");

		return (<>
			<section>
				{/* <h4 className="una-nit-de-maig-title">Secció {par}: {part.title}</h4> */}

				{
					part.text.map((p, i) => <p key={`text-${i}`} dangerouslySetInnerHTML={{ __html: p }} />)
				}

				{
					part.options && (
						part.options.length > 1 ? (
							<div className="options-wrap">
								{
									part.options.map((o, i) => <div key={`opt-${i}`} className="btn" onClick={() => this.goTo(o.link)}>
										{
											o.text.map((t, j) => <p key={`opt-${i}-text-${j}`} dangerouslySetInnerHTML={{ __html: t }} />)
										}
									</div>)
								}
							</div>
						) : (
							<div className="options-wrap single-option">
								<div className="btn" onClick={() => this.goTo(part.options[0].link)}>
									{
										part.options[0].text.map((t, i) => <p key={`text-${i}`} dangerouslySetInnerHTML={{ __html: t }} />)
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
=======
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
                    <h4 className="una-nit-de-maig-title">{part.title || 'Un dijous de maig: el joc'}</h4>
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
                </section>
            </>
        );
    }
>>>>>>> ed3da019a8230389f8b6c64fceb87afa3efc832d
}

export default withParams(UnaNitDeMaig);