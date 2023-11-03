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
        if (event.key === 'Enter' || event.key === ' ') {
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
			<div
				className="game-canvas-center"
				style={{
					height: '100%',
					width: '100%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
				}}
				onClick={() => {
					const theresStillProves = this.props.provesLeft > 0
					const isActuacio = this.props.type === 'actuació';

					if (theresStillProves || isActuacio) {
						this.next();
					} else {
						this.goBack();
					}
				}}
			>
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
						
						<div
							style={{
								fontSize: '1rem',
								lineHeight: '4rem',
							}}
						>
							Apreta on vulguis per continuar
						</div>

					</> : <>
						<div className="loading game-loading"></div>
					</>
				}
			</div>
		);
	}
}

export default CastellResult;
