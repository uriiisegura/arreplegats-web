import React, { Component } from "react";

class CastellResult extends Component {
	constructor(props) {
        super(props);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }
	next() {
		this.props.onNext();
	}
	advanceDay() {
		this.props.advanceDay();
		this.props.goBack();
	}
	goBack() {
		this.props.goBack();
	}
	handleKeyDown(event) {
        if (event.key === 'Enter') {
			this.props.onNext();
        }
    }
    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
    }
    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
    }
	render() {
		const history = this.props.stats.stats.map(r => r?.resultat?.split(' ')?.map(w => w.charAt(0))?.join('') || '?').slice(-5);

		return (
			<div className="game-canvas-center">
				<h1>{this.props.castell}</h1>
				{
					this.props.result ? <>
						<h5 className={this.props.result.toLowerCase()}>{this.props.result}</h5>

						<div className="game-castell-history">
							{
								history.map((o, i) => {
									return <span key={i} className={o.toLowerCase()}>{o}</span>;
								})
							}
						</div>

						{
							this.props.provesLeft > 0 || this.props.type === 'actuació' ?
								<button className="back-btn" onClick={this.next.bind(this)}>
									CONTINUA
								</button>
							:
								<>
									<button className="back-btn" style={{ margin: 5, marginTop: 30 }} onClick={this.advanceDay.bind(this)}>
										AVANÇA DE DIA
									</button>

									<button className="back-btn" style={{ margin: 5 }} onClick={this.goBack.bind(this)}>
										ENRERE
									</button>
								</>
						}
						
					</> : <>
						<div className="loading game-loading"></div>
					</>
				}
			</div>
		);
	}
}

export default CastellResult;
