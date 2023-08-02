import React, { Component } from "react";
import { probCastell } from '../models/joc-castells-probabilities/v3/generateCastellResult'

class CastellSelector extends Component {
	constructor(props) {
		super(props);
		this.state = {
			structures: {
				1: {
					component: 'Pd',
					name: 'Pilar'
				},
				2: {
					component: 'Td',
					name: 'Torre'
				},
				3: {
					component: '3d',
					name: 'Tres'
				},
				4: {
					component: '4d',
					name: 'Quatre'
				},
				5: {
					component: '5d',
					name: 'Cinc'
				},
				7: {
					component: '7d',
					name: 'Set'
				},
				9: {
					component: '9d',
					name: 'Nou'
				},
				10: {
					component: '10d',
					name: 'Deu'
				}
			},
			from_group: null
		};
	}
	componentDidMount() {
		if (this.props.ronda) {
			if (this.props.ronda < 4) {
				const no_pilars = this.state.structures;
				delete no_pilars[1];
				this.setState({structures: no_pilars});
			} else
				this.setGroup('Pd');
		}
	}
	setNeta(neta) {
		this.setState({
			neta: neta
		});
	}
	setGroup(group) {
		this.setState({
			from_group: Object.values(this.props.castells)
				.filter(c => c.castell.includes(group))
		});
	}
	unsetGroup() {
		this.setState({
			from_group: null,
			neta: false
		});
	}
	selectCastell(castell) {
		this.props.onSelectCastell(castell);
	}
	probToBracket(prob) {
		if (prob > 0.75) return 4
		else if (prob > 0.5) return 3
		else if (prob > 0.25) return 2
		else return 1
	}
	render() {
		return !this.props.hide && (<>
			{
				this.props.ronda && this.props.ronda < 4 &&
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					<h4 style={{ color: 'white' }}>
						RONDA {this.props.ronda}
					</h4>
				</div>
			}

			<div className="game-castell-selector">
				<h4>Escull un castell</h4>
				<div className="box-wrap">
					{
						this.state.from_group ? <>
							{
								this.state.from_group
								.filter(c => c?.neta ? this.state.neta : !this.state.neta)
								.map((c, i) => {
									const blocked = c.gent > this.props.castellers;
									
									const difficulty = this.probToBracket(
										probCastell(this.props.stats, c.castell)?.[0] || 0
									);

									const difficulty_color = {
										1: 'darkred',
										2: 'darkorange',
										3: 'gold',
										4: 'seagreen'
									}[difficulty];

									return <div className={`game-selector-single ${blocked ? 'disabled' : ''}`} onClick={() => this.selectCastell(c.castell)} key={i}>
										<span className="castell">{c.castell}</span>
										{
											blocked ? <span className="gent">{c.gent} persones</span> : <div className="game-castell-difficulty-wrap">
												<div style={{backgroundColor: difficulty > 0 ? difficulty_color : '#eee'}}></div>
												<div style={{backgroundColor: difficulty > 1 ? difficulty_color : '#eee'}}></div>
												<div style={{backgroundColor: difficulty > 2 ? difficulty_color : '#eee'}}></div>
												<div style={{backgroundColor: difficulty > 3 ? difficulty_color : '#eee'}}></div>
											</div>
										}

										{
											!blocked && this.props.type === 'actuació' &&
											<div
												style={{
													display: 'flex',
													justifyContent: 'space-around',
													flexDirection: 'row',
													backgroundColor: 'transparent',
													gap: 10,
												}}
											>
												<div
													style={{
														color: 'white',
														display: 'flex',
														alignItems: 'center',
														backgroundColor: blocked ? '#555' : '#000',
														padding: '1px 5px',
														borderRadius: 5,
														fontSize: 12,
													}}
												>
													{this.props.stats?.[c.castell]?.descarregat}p
												</div>

												<div
													style={{
														color: 'white',
														display: 'flex',
														alignItems: 'center',
														backgroundColor: blocked ? '#555' : '#af6000',
														padding: '1px 5px',
														borderRadius: 5,
														fontSize: 12,
													}}
												>
													{this.props.stats?.[c.castell]?.carregat}p
												</div>
											</div>
										}
									</div>;
								})
							}
						</> : <>
							{
								Object.values(this.state.structures).map((v, i) => {
									return <div className="group-wrap" onClick={() => this.setGroup(v.component)} key={i}>
										<span className="castell">{v.name}</span>
									</div>;
								})
							}
						</>
					}
				</div>
				{
					this.props.is_assaig && this.state.from_group && <div className="game-proves-extra">
						<div onClick={() => this.setNeta(!this.state.neta)}>
							{ !this.state.neta ? ' Netes i a terra' : 'Pinyes i soques' }
						</div>
					</div>
				}
				{
					this.props.ronda && this.props.ronda >= 4 ? <></> : this.state.from_group && <button className="back-btn" onClick={this.unsetGroup.bind(this)}>ENRERE</button>
				}
				{
					this.props.is_assaig ? <div className={`game-proves-left ${this.props.proves_left === 1 ? 'game-last-prova' : ''}`}>
						{this.props.proves_left > 1 ? `Queden ${this.props.proves_left} proves` : 'ÚLTIMA PROVA'}
					</div> : <></>
				}
			</div>
		</>);
	}
}

export default CastellSelector;
