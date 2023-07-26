import React, { Component } from "react";
import castells from "../data/joc-castells.json";
import Delay from "../functions/Delay";
import Colla from "../models/Colla";

import CastellSelector from "../components/CastellSelector";
import CastellResultat from "../components/CastellResultat";

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
			results: [
				'DESCARREGAT',
				'CARREGAT',
				'INTENT',
				'INTENT DESMUNTAT'
			]
		};
	}
	componentWillUnmount() {
		pujada.pause();
		baixada.pause();
		aleta.pause();
		sortida.pause();
		caiguda.pause();

		if (this.state.colla) {
			if (window.confirm('Vols guardar la partida abans de marxar?\n\nAquest missatge apareix sempre que surts del joc, hagis o no guardat la partida prèviament. Si ja l\'has guardat, ignora\'l.'))
				this.saveGame();
		}
	}
	loadGame(e) {
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
	saveGame() {
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
	goBack() {
		const history = this.state.history;
		const lastScreen = history.pop();
		this.setState({
			screen: lastScreen,
			history: history,
			selectedCastell: null,
			selectedResult: null
		});
	}
	selectCastell(castell) {
		this.setState({selectedCastell: castells.filter(c => c.castell === castell)[0]}, this.solveCastell);
	}
	solveCastell() {
		this.playCastell(this.state.colla.getCastellResult(this.state.selectedCastell));
	}
	waitAudioToFinish(audio) {
		return new Promise(res => {
			audio.play();
			audio.onended = res;
		});
	}
	async playCastell(resultat) {
		if (!process.env.REACT_APP_DEV_MODE === 'true') {
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

		}

		document.getElementById('game-screen').style.pointerEvents = 'all';

		this.state.colla.addCastellers(30);
		this.state.colla.takeCastellers(30);

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
	render() {
		return (<><div id="game-screen" className="castells-game">
			{
				this.state.colla === null
				? <div className="flex-page"><div className="btn-wrap">
					<label htmlFor="import" className="btn" id="load-game">Carregar partida</label>
					<input id="import" type="file" onChange={this.loadGame.bind(this)} accept=".bin" style={{display: 'none'}} />
					<button className="btn" onClick={this.newGame.bind(this)} id="new-game">Nova partida</button>
					<p id="initial-error" className="game-error"></p>
				</div></div>
				: <>
					<div className="top-bar" style={{backgroundColor: this.state.colla.color, color: this.state.colla.highContrast}}>
						<span>{this.state.colla.name}</span>
						<button className="btn" onClick={this.saveGame.bind(this)} style={{backgroundColor: this.state.colla.color, color: this.state.colla.highContrast}}>Guardar</button>
					</div>
					<div className="sub-bar">
						<span>{this.state.colla.castellers} persones a la colla</span>
					</div>
					<div id="screen"></div>
					{
						this.state.screen === 'HOME' ? <>
							<div className="menu">
								<button onClick={() => this.changeScreen('ASSAIG')}>
									<span>ASSAIG</span>
								</button>
								<button className="disabled">
									<span>ACTUACIÓ</span>
								</button>
								<button onClick={() => this.changeScreen('CASTELLS')}>
									<span>CASTELLS</span>
								</button>
								<button className="disabled">
									<span>HISTÒRIC</span>
								</button>
								<button className="disabled">
									<span>MISSIONS</span>
								</button>
								<button className="disabled">
									<span>AJUDA</span>
								</button>
							</div>
						</> : <></>
					}
					{
						this.state.screen === 'CASTELLS' ? <>
							<button className="back-btn" onClick={this.goBack.bind(this)}>ENRERE</button>
							<div className="game-table-wrap">
								{
									[...Array(9).keys()].map((g, i) => {
										return <table className="score-table" key={i}>
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
													castells.map((c, j) => {
														if (c.grup !== g) return <></>;
														return <tr className={this.state.colla.castellers >= c.gent ? '' : 'locked'} key={j}>
															<td>{c.castell}</td>
															<td>{c.carregat}</td>
															<td>{c.descarregat}</td>
															<td>
																{c.gent}
																<span className="help">?</span>
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
						this.state.screen === 'ASSAIG' ? <>
							<button className="back-btn" onClick={this.goBack.bind(this)}>ENRERE</button>
							<div className="game-full-wrap">
								{
									this.state.selectedCastell !== null &&
									<CastellResultat
										selectedCastell={this.state.selectedCastell}
										selectedResult={this.state.selectedResult}
										restartAssaig={this.restartAssaig.bind(this)}
									/>
										
								}

								<CastellSelector
									castells={castells}
									castellers={this.state.colla.castellers}
									onSelectCastell={this.selectCastell.bind(this)}
									hide={this.state.selectedCastell !== null}
								/>
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
