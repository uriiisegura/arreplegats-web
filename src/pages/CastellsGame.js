import React, { Component } from "react";
import Howler, { Howl } from 'howler';

import castells from "../data/joc-castells.json";
import CastellSelector from "../components/CastellSelector";
import CastellResult from "../components/CastellResult";
import CastellStats from "../components/CastellStats";
import TimestampToString from "../functions/TimestampToString";
import Colla from "../models/Colla";

Howler.autoUnlock = true;
Howler.html5PoolSize = 100;

const FILES_DICT = {
	"pujada": '/sounds/toc-de-castells-pujada.mp3',
	"baixada": '/sounds/toc-de-castells-baixada.mp3',
	"aleta": '/sounds/toc-de-castells-aleta.mp3',
	"sortida": '/sounds/toc-de-castells-sortida.mp3',
	"caiguda": '/sounds/caiguda.mp3'
}

// Recursive function to play a segment from each audio file
function playAudioFiles(files, durations, index = 0) {
	return new Promise((resolve, reject) => {
	  if (index >= files.length) {
		resolve(); // end of files array reached, resolve promise
		return;
	  }

	  let idSound;
	
	  let sound = new Howl({
		html5: true,
		src: [files[index]],
		sprite: {
		  segment: [0, durations[index] * 1000]  // Howler.js uses milliseconds
		},
		onend: function() {
			sound.unload();
			sound.stop(idSound);

		  playAudioFiles(files, durations, index + 1)
		  	.then(resolve)
			.catch(reject)
		},
		onloaderror: function(id, error) {
		  reject(error); // if there's an error loading the sound, reject promise
		}
	  });
	
	  idSound = sound.play('segment');
	});
}

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
		this.loadGame();
	}
	componentDidUpdate(prevProps, prevState) {
		this.saveGame();
	}
	componentWillUnmount() {
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
		const files = !this.state.results.includes(resultat) ? [] :
			// DESCARREGAT
			resultat === this.state.results[0] ? ['pujada', 'aleta', 'baixada', 'sortida'] :
			// CARREGAT
			resultat === this.state.results[1] ? ['pujada', 'aleta', 'baixada', 'caiguda'] :
			// INTENT 
			resultat === this.state.results[2] ? ['pujada', 'caiguda'] :
			// INTENT DESMUNTAT
			resultat === this.state.results[3] ? ['pujada', 'baixada'] :
			// ERROR
			[]

		const file_paths = files.map(f => FILES_DICT[f]);

		const times = !this.state.results.includes(resultat) ? [] :
			// DESCARREGAT
			resultat === this.state.results[0] ? [18, 6, 14, 8] :
			// CARREGAT
			resultat === this.state.results[1] ? [18, 6, 6, 2] :
			// INTENT 
			resultat === this.state.results[2] ? [13, 3] :
			// INTENT DESMUNTAT
			resultat === this.state.results[3] ? [18, 8] :
			// ERROR
			[]

		document.getElementById('game-screen').style.pointerEvents = 'none';

		try {
			if (process.env.NODE_ENV !== 'development') {
				await playAudioFiles(file_paths, times)
			}
		} catch	(e) {
			console.error(e);
		}

		document.getElementById('game-screen').style.pointerEvents = 'all';
			
		this.setState({
			selectedResult: resultat
		})
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
	addTenCastellers() {
		this.state.colla.addCastellers(10);
		this.forceUpdate();
	}
	advanceDay() {
		const confirm = this.state.colla.today['type'] === 'assaig' && this.state.colla.today['provesLeft'] > 0;

		if (!confirm || window.confirm(`Segur que vols avançar de dia? Encara tens ${this.state.colla.today['provesLeft']} prov${this.state.colla.today['provesLeft'] > 1 ? 'es' : 'a'} per fer.`)) {
			this.state.colla.nextDay();
			this.forceUpdate();
		}
	}
	deleteGame(root) {
		if (root || window.confirm('Segur que vols eliminar la partida? Aquesta acció no es pot desfer.')) {
			localStorage.removeItem('game');
			window.location.reload();
		}
	}
	render() {
		return (<><div id="game-screen" className="castells-game">
			{
				this.state.colla === null
				? <div className="flex-page">
					<div className="btn-wrap">
						<button className="btn" onClick={this.newGame.bind(this)} id="new-game">Nova partida</button>
						<button className={`btn ${localStorage.getItem('game') ? '' : 'disabled'}`} onClick={this.loadGame.bind(this)}>Carregar partida</button>
						<label htmlFor="import" className="btn" id="load-game">Importar partida</label>
						<input id="import" type="file" onChange={this.loadGameFile.bind(this)} accept=".bin" style={{display: 'none'}} />
						<p id="initial-error" className="game-error"></p>
					</div>
				</div>
				: <>
					<div className="top-bar" style={{backgroundColor: this.state.colla.color, color: this.state.colla.highContrast}}>
						<span>{this.state.colla.name}</span>
						{
							this.state.colla.today['provesLeft'] > 0 ?
								<div className="game-proves-left-short">
									<span className={`game-current-day ${this.state.colla.highContrast === 'black' ? 'invert' : ''}`}>
										<img src="/font-awesome/align-justify.svg" alt="calendar" /></span>
										<span>{this.state.colla.today['provesLeft']}</span>
								</div>
							:
								<button
									className="btn"
									style={{backgroundColor: this.state.colla.color, color: this.state.colla.highContrast}}
									onClick={this.advanceDay.bind(this)}
								>Avança</button>
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
									<div className="game-header">
										<div className="game-menu-time game-day-title">DIA D'{this.state.colla.today['type'] === 'assaig' ? 'ASSAIG' : 'ACTUACIÓ'}</div>
										<div className="game-menu-time game-current-day"><img src="/font-awesome/calendar.svg" alt="calendar"/><span>{TimestampToString(this.state.colla.date)}</span></div>
										<button className={`game-menu-time game-advance-day ${this.state.colla.today['type'] === 'actuacio' && !this.state.colla.today['done'] ? 'disabled' : ''}`} onClick={this.advanceDay.bind(this)}>Avança al següent dia</button>
									</div>
									
									<button className={`btn ${this.state.colla.today['type'] === 'assaig' && this.state.colla.today.provesLeft > 0 ? '' : 'disabled'}`} onClick={() => this.changeScreen('ASSAIG')}>
										<span>ASSAIG</span>
									</button>
									<button className={`btn ${this.state.colla.castellers < 31 || this.state.colla.today['type'] !== 'actuacio' || (this.state.colla.today['type'] === 'actuacio' && this.state.colla.today['done']) ? 'disabled' : ''}`} onClick={() => this.changeScreen('ACTUACIO')}>
										<span>ACTUACIÓ</span>
									</button>
									<button className="btn" onClick={() => this.changeScreen('CASTELLS')}>
										<span>CASTELLS</span>
									</button>
									<button className={`btn ${this.state.colla.historic.length === 0 ? 'disabled' : ''}`} onClick={() => this.changeScreen('HISTORIC')}>
										<span>HISTÒRIC</span>
									</button>
									<button className="btn disabled" onClick={() => this.changeScreen('MISSIONS')}>
										<span>MISSIONS</span>
									</button>
									<button className="btn" onClick={() => this.changeScreen('AJUDA')}>
										<span>AJUDA</span>
									</button>
									<button className={`btn ${this.state.colla.tried.length === 0 ? 'disabled' : ''}`} onClick={() => this.changeScreen('STATS')}>
										<span>ESTADÍSTIQUES</span>
									</button>
									{process.env.NODE_ENV === 'development' && <button className="btn" onClick={this.addTenCastellers.bind(this)}>
										<span>+10 castellers</span>
									</button>}
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
									proves_left={this.state.colla.today.provesLeft}
									onBack={this.goBack.bind(this)}
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
						this.state.screen === 'AJUDA' ? <>
							<button className="back-btn" onClick={this.goBack.bind(this)}>ENRERE</button>
							<div className="game-full-wrap game-help">
								<h3>Ajuda</h3>
								<p>
									Ets putoganàpia o què? Enfaixa't i posat a la feina!
								</p>
								<div className="btn game-export-game" onClick={this.saveGameFile.bind(this)}>EXPORTA LA PARTIDA</div>
								<div className="btn game-delete-game" onClick={() => {this.deleteGame(false)}}>BORRA LA PARTIDA</div>
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
