import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class CastellCard extends Component {
	render() {
		return (
			<div className="castell-card" style={{backgroundImage: `url(${this.props.link})`}}>
				<NavLink to={`/castells/${this.props.notation}`}><div className="castell-link">
					<p>{this.props.name}</p>
				</div></NavLink>
			</div>
		);
	}
}

export default CastellCard;
