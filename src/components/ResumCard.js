import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class ResumCard extends Component {
	render() {
		const card = <>
			<div className="resum-card">
				<h4>{this.props.castell}</h4>
				<h6>
					{this.props.descarregats > 0 ? this.props.descarregats : ''}
					{this.props.carregats > 0 ? <span>{this.props.descarregats > 0 ? ' +' : ''} {this.props.carregats}c</span> : <></>}
				</h6>
			</div>
		</>;

		return this.props.link ? <NavLink to={`/castells/${this.props.castell}`}>{card}</NavLink> : card;
	}
}

export default ResumCard;
