import React, { Component } from "react";

class CastellResult extends Component {
	next() {
		this.props.onNext();
	}
	render() {
		const history = this.props.stats.stats.map(outcome => outcome.split(' ').map(w => w.charAt(0)).join('')).slice(-5);

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

						<button className="back-btn" onClick={this.next.bind(this)}>CONTINUA</button>
					</> : <>
						<div className="loading game-loading"></div>
					</>
				}
			</div>
		);
	}
}

export default CastellResult;
