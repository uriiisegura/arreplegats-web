import React, { Component } from "react";
import { probCastell } from '../models/joc-castells-probabilities/v3/generateCastellResult'

const NRONDESMAX = 5;

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
	castellFromSameClassHasAlreadyBeenTried(castell) {
		const alreadyTriedSuccessfully = this.props.actuacio
			.filter(intent => ['DESCARREGAT', 'CARREGAT'].includes(intent.resultat))
			.map(intent => intent.castell)

		const sameClass = alreadyTriedSuccessfully
			.filter(c => c.slice(0,2) === castell.slice(0,2))
			.filter(c => (c.indexOf('a') > -1) === (castell.indexOf('a') > -1))

		return sameClass.length > 0
	}
	isCastellPossible(castell) {
		if (this.props.type !== 'actuació') {
			return this.props.castellers >= castell.gent;
		} else if (castell.castell.includes('Pd')) {
			return this.props.castellers >= castell.gent;
		}

		const alreadyTried = this.props.actuacio
			.map(intent => intent.castell)
		
		const alreadyTriedSuccessfully = this.props.actuacio
			.filter(intent => ['DESCARREGAT', 'CARREGAT'].includes(intent.resultat))
			.map(intent => intent.castell)

		const intentatsMesDe2Cops = Object.values(this.props.castells)
			.filter(c => alreadyTried.filter(castell => castell === c.castell).length >= 2)
			.map(c => c.castell)

		const availableCastells = Object.values(this.props.castells)
			.filter(c => c.castell === castell.castell)
			.filter(c => !c?.neta)
			.filter(c => !c.castell.includes('Pd'))
			.filter(c => !alreadyTriedSuccessfully.includes(c.castell))
			.filter(c => !intentatsMesDe2Cops.includes(c.castell))
			.filter(c => c.gent <= this.props.castellers)

		return availableCastells.length > 0 && !this.castellFromSameClassHasAlreadyBeenTried(castell.castell)
	}
	noCastellsLeft() {
		if (this.props.type !== 'actuació') return false;

		const alreadyTried = this.props.actuacio
			.map(intent => intent.castell)
		
		const alreadyTriedSuccessfully = this.props.actuacio
			.filter(intent => ['DESCARREGAT', 'CARREGAT'].includes(intent.resultat))
			.map(intent => intent.castell)

		const intentatsMesDe2Cops = Object.values(this.props.castells)
			.filter(c => alreadyTried.filter(castell => castell === c.castell).length >= 2)
			.map(c => c.castell)

		const availableCastells = Object.values(this.props.castells)
			.filter(c => !c?.neta)
			.filter(c => !c.castell.includes('Pd'))
			.filter(c => !alreadyTriedSuccessfully.includes(c.castell))
			.filter(c => !intentatsMesDe2Cops.includes(c.castell))
			.filter(c => c.gent <= this.props.castellers)
			.filter(c => !this.castellFromSameClassHasAlreadyBeenTried(c.castell))
			.length

		return availableCastells === 0;
	}
	noCastellsLeftInGroup(group) {
		if (this.props.type !== 'actuació') return false;

		const alreadyTried = this.props.actuacio
			.map(intent => intent.castell)
		
		const alreadyTriedSuccessfully = this.props.actuacio
			.filter(intent => ['DESCARREGAT', 'CARREGAT'].includes(intent.resultat))
			.map(intent => intent.castell)

		const intentatsMesDe2Cops = Object.values(this.props.castells)
			.filter(c => alreadyTried.filter(castell => castell === c.castell).length >= 2)
			.map(c => c.castell)

		const availableCastells = Object.values(this.props.castells)
			.filter(c => !c?.neta)
			.filter(c => c.castell.includes(group))
			.filter(c => !alreadyTriedSuccessfully.includes(c.castell))
			.filter(c => !intentatsMesDe2Cops.includes(c.castell))
			.filter(c => c.gent <= this.props.castellers)
			.filter(c => !this.castellFromSameClassHasAlreadyBeenTried(c.castell))
			.length

		return availableCastells === 0;
	}
	isPilarsTurn() {
		if (this.props.type !== 'actuació') return false;

		const nIntentsValids = this.props.actuacio
			.filter(intent => ['DESCARREGAT', 'CARREGAT'].includes(intent.resultat))
			.length

		return this.noCastellsLeft() || nIntentsValids >= 3 || this.props.ronda > NRONDESMAX;
	}
	componentDidMount() {
		if (this.props.ronda) {
			if (!this.isPilarsTurn()) {
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
				this.props.ronda &&
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<h4 style={{ color: 'white' }}>
						{
							this.isPilarsTurn() ? <>RONDA DE PILARS</> :
							<>RONDA {this.props.ronda}</>
						}
					</h4>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-around',
							flexDirection: 'row',
							alignItems: 'center',
							color: 'white',
							gap: 10,
							width: '60%',
							flexWrap: 'wrap'
						}}
					>
						{
							this.props.actuacio
								.sort((a, b) => a.ronda > b.ronda ? 1 : -1)
								.map(ronda => <div style={{ display: 'flex', gap: 5, backgroundColor: 'white', color: 'darkblue', padding: '0 5px', borderRadius: 5, minWidth: 50 }} key={ronda.ronda}>
									<div>{ronda.castell}</div>
									<div
										style={{
											backgroundColor: ronda.resultat === "DESCARREGAT" ? 'darkgreen' :
												ronda.resultat === "CARREGAT" ? 'darkorange' :
												ronda.resultat === "INTENT" ? 'darkred' :
												ronda.resultat === "INTENT DESMUNTAT" ? 'darkred' :
												"black",
											color: 'white',
											padding: '0 5px'
										}}
									>
										{ronda.resultat.split(' ').map(w => w[0]).join('')}
									</div>
								</div>)
								.concat(
									[...Array(NRONDESMAX + 1 - this.props.actuacio.length)]
										.map((_, i) => <div
												style={{
													backgroundColor: this.isPilarsTurn() && i < NRONDESMAX - this.props.actuacio.length ? '#ccc' :
														this.isPilarsTurn() && i === NRONDESMAX - this.props.actuacio.length ? '#ffff77' :
														i === NRONDESMAX - this.props.actuacio.length ? '#ffccff' :
														i === 0 ? '#ffff77' :
														'white',
													padding: '0px 30px',
													borderRadius: 5,
													minWidth: 50,
													display: 'flex',
													justifyContent: 'center',
													color: 'black'
												}}
												key={'ronda-container-' + i}
											>
												{
													this.isPilarsTurn() && i < NRONDESMAX - this.props.actuacio.length ? <>-</> :
													<>&nbsp;</>
												}
											</div>
										)
								)
						}
					</div>
				</div>
			}

			<div className="game-castell-selector">
				<h4>Escull un { this.isPilarsTurn() ? 'pilar' : 'castell' }</h4>
				<div className="box-wrap">
					{
						this.state.from_group ? <>
							{
								this.state.from_group
								.filter(c => c?.neta ? this.state.neta : !this.state.neta)
								.map((c, i) => {
									const blocked = this.isCastellPossible(c) === false;
									
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
											process.env.NODE_ENV === 'development' &&
											<div style={{ fontSize: 11, backgroundColor: 'transparent' }}>
												{ JSON.stringify(
													probCastell(this.props.stats, c.castell)
														.map(perc => Math.round(perc * 100))
												) }
											</div>
										}

										{
											!blocked && !c?.neta &&
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
									return <div className={`group-wrap ${this.noCastellsLeftInGroup(v.component) ? 'disabled' : ''}`} onClick={() => this.setGroup(v.component)} key={i}>
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
					this.props.ronda && this.isPilarsTurn() ? <></> : this.state.from_group && <button className="back-btn" onClick={this.unsetGroup.bind(this)}>ENRERE</button>
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
