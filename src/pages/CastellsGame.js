import React, { Component } from "react";
import Colla from "../models/Colla";

class CastellsGame extends Component {
	constructor(props) {
		super(props);
		this.state = {
			colla: null
		};
	}
	loadGame(e) {
		const files = e.target.files;
		if (files.length <= 0)
			return;
		const fr = new FileReader();
		fr.onload = (e) => {
			const result = JSON.parse(e.target.result);
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
		// TODO: save all, not just: this.state.colla
		const file = new Blob([JSON.stringify(this.state.colla, null, 4)], {type: 'json'});
		if (window.navigator.msSaveOrOpenBlob)
			window.navigator.msSaveOrOpenBlob(file, 'joc-castells.json');
		else {
			const a = document.createElement('a');
			const url = URL.createObjectURL(file);
			a.href = url;
			a.download = 'joc-castells.json';
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
	render() {
		return (<>
			{
				this.state.colla === null
				? <div className="flex-page"><div className="btn-wrap">
					<label htmlFor="import" className="btn" id="load-game">Carregar partida</label>
					<input id="import" type="file" onChange={this.loadGame.bind(this)} accept=".json" style={{display: 'none'}} />
					<button className="btn" onClick={this.newGame.bind(this)} id="new-game">Nova partida</button>
					<p id="initial-error" className="game-error"></p>
				</div></div>
				: <>
					<div className="top-bar" style={{backgroundColor: this.state.colla.color, color: this.state.colla.highContrast}}>
						<span>{this.state.colla.name}</span>
						<button className="btn" onClick={this.saveGame.bind(this)}>Guardar</button>
					</div>
					<div className="sub-bar">
						<span>{this.state.colla.castellers} persones a la colla</span>
					</div>
					<div id="screen"></div>
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
		</>);
	}
}

export default CastellsGame;
