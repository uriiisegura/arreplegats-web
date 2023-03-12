import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class CastellCard extends Component {
	render() {
		return (
			<div className="castell-card" style={{backgroundImage: `url(${this.props.link})`}}>
				<div className="castell-link">
					<p>{this.props.name}</p>
                    <NavLink to={`/castells/${this.props.notation}`}>Saber-ne més</NavLink>
				</div>
			</div>
		);
	}
}

export default CastellCard;
