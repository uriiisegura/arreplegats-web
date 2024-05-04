import { Component } from "react";
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
            timerId: []
        };
    }

    componentDidMount() {
        this.initializeTexts();
    }

    componentDidUpdate(prevProps) {
        if (this.props.params.par !== prevProps.params.par) {
            this.initializeTexts();
        }
    }

    componentWillUnmount() {
        this.state.timerId.forEach(clearTimeout);
    }

    initializeTexts() {
        const { par } = this.props.params;
        const part = unaNitDeMaig[par] || unaNitDeMaig.home;
        const initialTexts = part.text.map(() => "");

        this.setState({
            currentTexts: initialTexts
        });

        part.text.forEach((text, index) => {
            this.handleTextAnimation(text.split(" "), index);
        });
    }

    handleTextAnimation(words, textIndex) {
        let i = 0;
        const intervalId = setInterval(() => {
            if (i >= words.length) {
                clearInterval(intervalId);
                return;
            }
            this.setState(prevState => {
                const newCurrentTexts = [...prevState.currentTexts];
                newCurrentTexts[textIndex] += (i > 0 ? " " : "") + words[i-1];
                return { currentTexts: newCurrentTexts };
            });
            i++;
        }, 20);

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
                    <h4 className="una-nit-de-maig-title">{part.title || 'Default Title'}</h4>
                    {
                        this.state.currentTexts.map((p, i) => <p key={`text-${i}`} className="readable-text">{p}</p>)
                    }
                    <div className="options-wrap">
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
}

export default withParams(UnaNitDeMaig);