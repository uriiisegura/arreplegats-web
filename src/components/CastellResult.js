import React, { Component } from "react";

class CastellResult extends Component {
	next() {
		this.props.onNext();
	}
	render() {
		return (
			<div className="game-canvas-center">
				<h1>{this.props.castell}</h1>
				{
					this.props.result ? <>
						<h5 className={this.props.result.toLowerCase()}>{this.props.result}</h5>
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
