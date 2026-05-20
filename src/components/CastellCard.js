import React, { Component } from "react";
import { NavLink } from "react-router-dom";

const optimizedCardImages = {
	"/images/2d8fm-arreplegats-2016.png": "/images/2d8fm-arreplegats-2016.webp",
};

class CastellCard extends Component {
	render() {
		const backgroundImage = optimizedCardImages[this.props.link] || this.props.link;

		return (
			<div className="castell-card" style={{backgroundImage: `url(${backgroundImage})`}}>
				<div className="castell-link">
					<p>{this.props.name}</p>
					<NavLink to={`/castells/${this.props.notation}`}>Saber-ne més</NavLink>
				</div>
			</div>
		);
	}
}

export default CastellCard;
