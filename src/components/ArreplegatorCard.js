import React, { Component } from "react";

class ArreplegatorCard extends Component {
	render() {
		return (
			<a href={`arreplegator/${this.props.number}.pdf`} target="_blank" rel="noreferrer"><div className="arreplegator" style={{backgroundImage: `url(arreplegator/${this.props.number}.png)`}}>
			</div></a>
		);
	}
}

export default ArreplegatorCard;
