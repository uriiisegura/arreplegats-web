import React, { Component } from "react";

class JuntaTeams extends Component {
	renderTeam(team, key) {
		return (
			<div className="junta-team" key={key}>
				<h4>{team.titol}</h4>
				{
					team.components.map((p, i) => {
						if (p.type)
							return React.createElement(p.type, { key: i, ...p.props }, null);
						return <p key={i}>{p.carrec ? <><span>{p.carrec}:</span> </> : <></>}{p.nom}</p>;
					})
				}
			</div>
		);
	}
	render() {
		const dirreccio = this.props.junta.direccio;
		const equips = this.props.junta.junta;
		const col_1 = equips.slice(0, Math.ceil(equips.length / 2));
		const col_2 = equips.slice(Math.ceil(equips.length / 2), equips.length);

		return (
			<div className="juntes">
				<div className="junta-column">
					{
						this.renderTeam(dirreccio, 0)
					}
				</div>
				<div className="junta-column">
					{
						col_1.map((t, i) => {
							return this.renderTeam(t, i);
						})
					}
				</div>
				<div className="junta-column">
					{
						col_2.map((t, i) => {
							return this.renderTeam(t, i);
						})
					}
				</div>
			</div>
		);
	}
}

export default JuntaTeams;
