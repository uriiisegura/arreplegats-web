import React, { Component } from "react";
import WinGamePopup from "./WinGamePopup";
import LoseGamePopup from "./LoseGamePopup";
import RemoveAccents from "../functions/RemoveAccents";

class PenjatGame extends Component {
	constructor(props) {
		super(props);
		this.state = {
			letters: ['A', 'B', 'C', 'Ç', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
			correct: 0,
			errors: 0,
			length: 0
		};
	}
	checkLetter(e) {
		const l = e.target.innerHTML;
		const letters = document.getElementsByClassName('letter');
		let correct = 0;
		for (let lt of letters) {
			if (RemoveAccents(lt.dataset.letter) === l) {
				lt.getElementsByTagName('span')[0].innerHTML = lt.dataset.letter;
				correct += 1;
			}
		}
		if (correct > 0) {
			e.target.classList.add('valid')
			this.setState({
				correct: this.state.correct + correct
			}, () => {
				if (this.state.correct === letters.length) {
					document.cookie = `penjat-${this.props.map_id}=true,secure`;
					this.disableAll();
					this.win.showPopup();
				}
			});
		} else {
			e.target.classList.add('invalid');
			// TODO: advance hangman
			this.setState({
				errors: this.state.errors + 1
			}, () => {
				// TODO: limit errors
				if (this.state.errors >= 5) {
					this.disableAll();
					this.lose.showPopup();
				}
			});
		}
		e.target.style.pointerEvents = 'none';
	}
	disableAll() {
		const keys = document.getElementsByClassName('keys');
		for (let k of keys)
			k.style.pointerEvents = 'none';
	}
	finish() {
		window.location.hash = '#/penjat';
	}
	render() {
		const gaps = this.props.word.split('');

		return (<>
			<div className="penjat-word">
				{
					gaps.map((g, i) => {
						if (g === ' ')
							return <div key={i} className="space"></div>;
						if (g === '·')
							return <div key={i} className="geminada"><span>·</span></div>;
						return <div key={i} data-letter={g} className="letter"><span></span></div>;
					})
				}
			</div>
			<div className="penjat-keyboard">
				{
					this.state.letters.map((l, i) => {
						return <div key={i} onClick={this.checkLetter.bind(this)} className="keys">{l}</div>;
					})
				}
			</div>
			<WinGamePopup
				ref={instance => { this.win = instance; }}
				function={this.finish}
				/>
			<LoseGamePopup
				ref={instance => { this.lose = instance; }}
				function={() => window.location.reload()}
				/>
		</>);
	}
}

export default PenjatGame;
