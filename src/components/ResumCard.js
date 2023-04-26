import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class ResumCard extends Component {
	render() {
		const card = <>
			<div className="resum-card-front">
				<h4>{this.props.castell}</h4>
				<h6>
					{this.props.descarregats > 0 ? this.props.descarregats : ''}
					{this.props.carregats > 0 ? <span>{this.props.descarregats > 0 ? ' +' : ''} {this.props.carregats}c</span> : <></>}
				</h6>
			</div>
		</>;

		return this.props.link ?
			<div className="resum-card">
				<div className="resum-card-inner">
					{card}
					<div className="resum-card-back">
						<NavLink to={`/castells/${this.props.castell}`}>
							<span>Saber-ne més</span>
						</NavLink>
					</div>
				</div>
			</div>
		:
			<div className="resum-card locked-card">
				<div className="resum-card-inner">
					{card}
				</div>
			</div>;
	}
}

export default ResumCard;
