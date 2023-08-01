import React, { Component } from "react";
import castells from "../data/joc-castells.json";
import CastellSelector from "../components/CastellSelector";
import CastellResult from "../components/CastellResult";
import CastellStats from "../components/CastellStats";
import Delay from "../functions/Delay";
import Colla from "../models/Colla";

const pujada = new Audio('/sounds/toc-de-castells-pujada.mp3');
const baixada = new Audio('/sounds/toc-de-castells-baixada.mp3');
const aleta = new Audio('/sounds/toc-de-castells-aleta.mp3');
const sortida = new Audio('/sounds/toc-de-castells-sortida.mp3');
const caiguda = new Audio('/sounds/caiguda.mp3');

class CastellsGame extends Component {
	constructor(props) {
		super(props);
		this.state = {
			colla: null,
			screen: 'HOME',
			history: ['HOME'],
			selectedCastell: null,
			selectedResult: null,
			actuacio: [],
			results: [
				'DESCARREGAT',
				'CARREGAT',
				'INTENT',
				'INTENT DESMUNTAT'
			],
			showStatsCastell: null
		};
	}
	componentDidMount() {
		this.loadGame()
	}
	componentDidUpdate(prevProps, prevState) {
		this.saveGame();
	}
	componentWillUnmount() {
		pujada.pause();
		baixada.pause();
		aleta.pause();
		sortida.pause();
		caiguda.pause();

		if (this.state.colla)
			this.saveGame();
	}
	loadGameFile(e) {
		const files = e.target.files;
		if (files.length <= 0)
			return;
		const fr = new FileReader();
		fr.onload = (e) => {
			const result = JSON.parse(atob(e.target.result));
			try {
				this.setState({
					colla: Colla.fromJson(result)
				});
			} catch (e) {
				document.getElementById('initial-error').innerHTML = e.message;
			}
		};
		fr.readAsText(files[0]);
	}
	saveGameFile() {
		const file = new Blob([btoa(JSON.stringify(this.state.colla, null, 4))], {type: 'bin'});
		if (window.navigator.msSaveOrOpenBlob)
			window.navigator.msSaveOrOpenBlob(file, 'joc-castells.bin');
		else {
			const a = document.createElement('a');
			const url = URL.createObjectURL(file);
			a.href = url;
			a.download = 'joc-castells.bin';
			document.body.appendChild(a);
			a.click();
			setTimeout(() => {
				document.body.removeChild(a);
				window.URL.revokeObjectURL(url);
			}, 0);
		}
	}
	loadGame() {
		try {
			const fromLocalStorage = localStorage.getItem('game');
			if (!fromLocalStorage) return;

			const result = JSON.parse(atob(fromLocalStorage));

			this.setState({
				colla: Colla.fromJson(result)
			});
		} catch (e) {
			document.getElementById('initial-error').innerHTML = e.message;
		}
	}
	saveGame() {
		try {
			localStorage.setItem('game', btoa(JSON.stringify(this.state.colla, null, 4)));
		} catch (e) {
			console.error(e);
		}
	}	
	newGame() {
		document.getElementById('create-game').style.display = 'flex';
		document.getElementById('load-game').style.pointerEvents = 'none';
		document.getElementById('new-game').style.pointerEvents = 'none';
	}
	cancelCreate() {
		document.getElementById('create-game').style.display = 'none';
		document.getElementById('load-game').style.pointerEvents = 'all';
		document.getElementById('new-game').style.pointerEvents = 'all';
	}
	createColla() {
		document.getElementById('create-game').style.display = 'none';
		this.setState({
			colla: new Colla(	document.getElementById('colla-name').value,
								document.getElementById('colla-color').value
							)
		});
	}
	changeScreen(screen) {
		const history = this.state.history;
		history.push(this.state.screen)
		this.setState({
			screen: screen,
			history: history
		});
	}
	selectCastell(castell) {
		this.setState({selectedCastell: castells[castell]}, this.solveCastell);
	}
	solveCastell() {
		this.playCastell(this.state.colla.getCastellResult(this.state.selectedCastell, this.state.screen === 'ASSAIG'));
	}
	waitAudioToFinish(audio) {
		return new Promise(res => {
			audio.play();
			audio.onended = res;
		});
	}
	async playCastell(resultat) {
		if (process.env.NODE_ENV !== 'development') {
			pujada.currentTime = 0;
			baixada.currentTime = 0;
			aleta.currentTime = 0;
			sortida.currentTime = 0;
			caiguda.currentTime = 0;

			document.getElementById('game-screen').style.pointerEvents = 'none';

			pujada.play();
			await Delay(13000);
			if (resultat === this.state.results[2]) { // INTENT
				pujada.pause();
				caiguda.play();
				await Delay(3000);
				caiguda.pause();
			} else {
				await Delay(5000);
				pujada.pause();
				if (resultat !== this.state.results[3]) { // not INTENT DESMUNTAT = DESCARREGAT or CARREGAT
					await this.waitAudioToFinish(aleta);
					baixada.play();
					await Delay(6000);
					if (resultat === this.state.results[1]) { // CARREGAT
						baixada.pause();
						caiguda.play();
						await Delay(2000);
						caiguda.pause();
					} else { // not CARREGAT = DESCARREGAT
						await Delay(8000);
						baixada.pause();
					}
				}
				if (resultat !== this.state.results[1]) { // not CARREGAT = DESCARREGAT or INTENT DESMUNTAT
					sortida.play();
					await Delay(8000);
					sortida.pause();
				}
			}

			document.getElementById('game-screen').style.pointerEvents = 'all';
		}

		this.setState({
			selectedResult: resultat
		});
	}
	restartAssaig() {
		this.setState({
			selectedCastell: null,
			selectedResult: null
		});
	}
	nextRonda() {
		const actuacio = this.state.actuacio;
		actuacio.push({
			ronda: this.state.actuacio.length + 1,
			castell: this.state.selectedCastell.castell,
			resultat: this.state.selectedResult,
			punts: this.state.selectedResult.includes('INTENT') ? 0 : this.state.selectedCastell[this.state.selectedResult.toLowerCase()]
		});

		this.setState({
			selectedCastell: null,
			selectedResult: null,
			actuacio: actuacio
		});
	}
	endActuacio() {
		this.state.colla.addActuacio(this.state.actuacio);
		this.goBack();
	}
	formatCastell(castell, result) {
		if (result === this.state.results[1])
			return castell + 'C';
		if (result === this.state.results[2])
			return 'i' + castell;
		if (result === this.state.results[3])
			return 'id' + castell;
		return castell;
	}
	statsSelect(e) {
		this.setState({
			showStatsCastell: e.target.value ? this.state.colla.stats[e.target.value] : null
		})
	}
	goBack() {
		const history = this.state.history;
		const lastScreen = history.pop();
		this.setState({
			screen: lastScreen,
			history: history,
			selectedCastell: null,
			selectedResult: null,
			actuacio: [],
			showStatsCastell: null
		});
	}
	sortByIntentatAt(a, b) {
		const intentatAtA = this.state.colla.stats[a].stats[
			this.state.colla.stats[a].stats
				.map(intent => intent.intentat_at)
				.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0)
		].intentat_at;

		const intentatAtB = this.state.colla.stats[b].stats[
			this.state.colla.stats[b].stats
				.map(intent => intent.intentat_at)
				.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0)
		].intentat_at;

		return intentatAtA > intentatAtB ? -1 : 1;
	}
	render() {
		return (<><div id="game-screen" className="castells-game">
			{
				this.state.colla === null
				? <div className="flex-page"><div className="btn-wrap">
					<label htmlFor="import" className="btn" id="load-game">Carregar partida</label>
					<input id="import" type="file" onChange={this.loadGameFile.bind(this)} accept=".bin" style={{display: 'none'}} />
					<button className="btn" onClick={this.newGame.bind(this)} id="new-game">Nova partida</button>
					<p id="initial-error" className="game-error"></p>
				</div></div>
				: <>
					<div className="top-bar" style={{backgroundColor: this.state.colla.color, color: this.state.colla.highContrast}}>
						<span>{this.state.colla.name}</span>
						{
							this.state.screen === 'HOME' ? <button className="btn" onClick={this.saveGameFile.bind(this)} style={{backgroundColor: this.state.colla.color, color: this.state.colla.highContrast}}>Exportar</button> : <></>
						}
					</div>
					<div className="sub-bar">
						<span>{this.state.colla.castellers} persones a la colla</span>
					</div>
					<div id="game-background"></div>
					{
						this.state.screen === 'HOME' ? <>
							<div className="game-full-wrap game-bigger-wrap">
								<div className="menu">
									<button onClick={() => this.changeScreen('ASSAIG')}>
										<span>ASSAIG</span>
									</button>
									<button className={this.state.colla.castellers < 31 ? 'disabled' : ''} onClick={() => this.changeScreen('ACTUACIO')}>
										<span>ACTUACIÓ</span>
									</button>
									<button onClick={() => this.changeScreen('CASTELLS')}>
										<span>CASTELLS</span>
									</button>
									<button className={this.state.colla.historic.length === 0 ? 'disabled' : ''} onClick={() => this.changeScreen('HISTORIC')}>
										<span>HISTÒRIC</span>
									</button>
									<button className="disabled" onClick={() => this.changeScreen('MISSIONS')}>
										<span>MISSIONS</span>
									</button>
									<button className="disabled">
										<span>AJUDA</span>
									</button>
									<button className={this.state.colla.tried.length === 0 ? 'disabled' : ''} onClick={() => this.changeScreen('STATS')}>
										<span>ESTADÍSTIQUES</span>
									</button>
									<button onClick={() => {this.state.colla.addCastellers(10)}}>
										<span>+10 castellers</span>
									</button>
								</div>
							</div>
						</> : <></>
					}
					{
						this.state.screen === 'ASSAIG' ? <>
							{!this.state.selectedCastell && <button className="back-btn" onClick={this.goBack.bind(this)}>ENRERE</button>}
							<div className={`game-full-wrap ${this.state.selectedCastell ? 'game-bigger-wrap' : ''}`}>
								{
									this.state.selectedCastell &&
										<CastellResult
											castell={this.state.selectedCastell.castell}
											result={this.state.selectedResult}
											onNext={this.restartAssaig.bind(this)}
											stats={this.state.colla.stats[this.state.selectedCastell.castell]}
											/>
								}
								<CastellSelector
									castells={castells}
									castellers={this.state.colla.castellers}
									onSelectCastell={this.selectCastell.bind(this)}
									hide={this.state.selectedCastell !== null}
									stats={this.state.colla.stats}
									is_assaig={true}
									/>
							</div>
						</> : <></>
					}
					{
						this.state.screen === 'ACTUACIO' ? <>
							{
								this.state.actuacio.length === 0 && !this.state.selectedCastell ? <button className="back-btn" onClick={this.goBack.bind(this)}>ENRERE</button> : <></>
							}
							{
								this.state.actuacio.length < 4 ? <>
									<div className={`game-full-wrap ${this.state.actuacio.length === 0 && !this.state.selectedCastell ? '' : 'game-bigger-wrap'}`}>
										{
											this.state.selectedCastell ? <>
												<CastellResult
													castell={this.state.selectedCastell.castell}
													result={this.state.selectedResult}
													onNext={this.nextRonda.bind(this)}
													stats={this.state.colla.stats[this.state.selectedCastell.castell]}
													/>
											</> : <>
												<CastellSelector
													castells={castells}
													castellers={this.state.colla.castellers}
													onSelectCastell={this.selectCastell.bind(this)}
													ronda={this.state.actuacio.length + 1}
													stats={this.state.colla.stats}
													is_assaig={false}
												/>
											</>
										}
									</div>
								</> : <>
									<div className="game-full-wrap game-bigger-wrap">
										<div className="game-actuacio-result">
											{
												this.state.actuacio.map((r, i) => {
													return <div key={`ronda-${i}`}>
														<h4>{r.ronda}a Ronda<span>{r.punts} punts</span></h4>
														<p>{r.castell}{
															r.resultat !== 'DESCARREGAT' ? <span className={r.resultat.toLowerCase()}>{r.resultat.toLowerCase()}</span> : <></>
														}</p>
													</div>;
												})
											}
											<h3>TOTAL: {this.state.actuacio.reduce((sum, next) => { return { punts: sum.punts + next.punts } }).punts}</h3>

											<button className="back-btn" onClick={this.endActuacio.bind(this)}>
												CONTINUA
											</button>
										</div>
									</div>
								</>
							}
						</> : <></>
					}
					{
						this.state.screen === 'CASTELLS' ? <>
							<button className="back-btn" onClick={this.goBack.bind(this)}>ENRERE</button>
							<div className="game-table-wrap">
								{
									[...Array(9).keys()].map((g, i) => {
										return <table className="score-table" key={`group-${i}`}>
											<thead>
												<tr>
													<th colSpan="4">Grup {g}</th>
												</tr>
												<tr>
													<th>Castell</th>
													<th>Carregat</th>
													<th>Descarregat</th>
													<th>Gent</th>
												</tr>
											</thead>
											<tbody>
												{
													Object.values(castells)
													.filter(c => !c?.neta)
													.map((c, j) => {
														if (c.grup !== g) return <></>;
														return <tr className={this.state.colla.castellers >= c.gent ? '' : 'locked'} key={`group-${i}-row-${j}`}>
															<td>{c.castell}</td>
															<td>{c.carregat}</td>
															<td>{c.descarregat}</td>
															<td>
																{c.gent}
																{/* TODO: <span className="help">?</span>*/}
															</td>
														</tr>;
													})
												}
											</tbody>
										</table>;
									})
								}
							</div>
						</> : <></>
					}
					{
						this.state.screen === 'HISTORIC' ? <>
							<button className="back-btn" onClick={this.goBack.bind(this)}>ENRERE</button>
							<div className="game-table-wrap">
								<table className="game-historic-table">
									<thead>
										<tr>
											<th>Dia</th>
											<th>Hora</th>
											<th>Actuació</th>
											<th>Punts</th>
										</tr>
									</thead>
									<tbody>
										{
											this.state.colla.historic.map((a, i) => {
												const og_date = new Date(a.data);
												const offset = og_date.getTimezoneOffset();
												const date = new Date(og_date.getTime() - (offset * 60000));
												const datetime = date.toISOString().split('T');
												const rondes = [];
												for (let castell of a.castells)
													rondes.push(this.formatCastell(castell.castell, castell.resultat));
												return <tr key={`historic-${i}`}>
													<td>{datetime[0]}</td>
													<td>{datetime[1].split(':').reverse().slice(1).reverse().join(':')}</td>
													<td>{rondes.join(', ')}</td>
													<td>{a.punts}</td>
												</tr>;
											})
										}
									</tbody>
								</table>
							</div>
						</> : <></>
					}
					{
						this.state.screen === 'MISSIONS' ? <>
							<button className="back-btn" onClick={this.goBack.bind(this)}>ENRERE</button>
							<div className="game-full-wrap game-missions">
								<h3>Missions</h3>
								<div className="game-missions-wrap">
								</div>
							</div>
						</> : <></>
					}
					{
						this.state.screen === 'STATS' ? <>
							<button className="back-btn" onClick={this.goBack.bind(this)}>ENRERE</button>
							<div className="game-full-wrap game-stats">
								<h3>Progrés dels últims castells intentats</h3>

								<div className="game-stats-wrap">
									{
										this.state.colla.tried
											.filter(castell => this.state.colla.stats[castell])
											.sort(this.sortByIntentatAt.bind(this))
											.map(castell => {
												return <CastellStats
													castell={castell}
													initial={castells[castell]['probabilitats']['unique']}
													stats={this.state.colla.stats[castell]}
													key={`stats-${castell}`}
												/>
											})
									}
								</div>
							</div>
						</> : <></>
					}
				</>
			}
			<div id="create-game" className="game-popup create-colla">
				<label htmlFor="colla-name">Nom de la nova colla:</label>
				<input id="colla-name" type="text" defaultValue="Arreplegats de la ZU" required />
				<label htmlFor="colla-color">Color de la nova colla:</label>
				<input id="colla-color" type="color" defaultValue="#15A884" required />
				<button className="btn" onClick={this.createColla.bind(this)}>Comença!</button>
				<p className="cancel-btn" onClick={this.cancelCreate}>Cancel·la</p>
			</div>
		</div>
		<div className="cant-play">
			<h2>Cal una pantalla d'almenys 1200px d'amplada per poder jugar a aquest joc</h2>
		</div></>);
	}
}

/*
<div className="person-animation" style={{backgroundImage: 'url("/joc-castells/person-animation.png")'}}></div>
*/

export default CastellsGame;
