import React, { Component } from "react";

class CastellCard extends Component {
	render() {
		return (
			<div className="castell-card" style={{backgroundImage: `url(${this.props.link})`}}>
				<div className="castell-link">
					<p>{this.props.name}</p>
				</div>
			</div>
		);
	}
}

export default CastellCard;
