import React, { Component } from "react";
import WinGamePopup from "./WinGamePopup";

class MemoryGame extends Component {
	constructor(props) {
		super(props);
		const random = [...this.props.cards, ...this.props.cards];
		random.sort(() => Math.random() - 0.5);
		this.state = {
			pairs: props.cards.length,
			random: random,
			found: 0,
			active: false,
			card: null
		};
	}
	flipCard(e) {
		let card = e.target;
		while (!card.classList.contains('memory-card'))
			card = card.parentElement;
		if (card.classList.contains('flipped')) return;

		card.classList.add('flipped');
		if (this.state.active) {
			if (this.state.card.dataset.card === card.dataset.card) {
				this.setState({ found: this.state.found+1 }, () => {
					if (this.state.found === this.state.pairs) {
						setTimeout(function() {
							this.disableClick();
							this.popup.showPopup();
						}.bind(this), 500);
					}
				});
				this.setState({
					active: false,
					card: null
				});
			} else {
				this.disableClick();
				setTimeout(function() {
					this.state.card.classList.remove('flipped');
					card.classList.remove('flipped');
					this.enableClick();
					this.setState({
						active: false,
						card: null
					});
				}.bind(this), 500);
			}
		} else {
			this.setState({
				active: true,
				card: card
			});
		}
	}
	disableClick() {
		const cards = document.getElementsByClassName('memory-card');
		for (let card of cards)
			card.style.pointerEvents = 'none';
	}
	enableClick() {
		const cards = document.getElementsByClassName('memory-card');
		for (let card of cards)
			card.style.pointerEvents = 'all';
	}
	resetGame() {
		const cards = document.getElementsByClassName('memory-card');
		for (let card of cards)
			card.classList.remove('flipped');
		const random = this.state.random.sort(() => Math.random() - 0.5);
		setTimeout(function() {
			this.enableClick();
			this.setState({
				random: random,
				found: 0,
				active: false,
				card: null
			});
		}.bind(this), 500);
	}
	render() {
		const columns = Math.floor(Math.sqrt(this.state.random.length));
		return (<>
			<div className="memory-container" style={{maxWidth: `calc(${columns}*7.5rem)`}}>
				{
					this.state.random.map((c, i) => {
						return <div key={i} className="memory-card" data-card={c.name} onClick={this.flipCard.bind(this)} style={{width: `calc(${100/columns}% - 0.5rem)`}}>
							<div className="before">?</div>
							<div className="after"><img src={c.image} alt="" /></div>
						</div>;
					})
				}
			</div>
			<WinGamePopup
				ref={instance => { this.popup = instance; }}
				function={this.resetGame.bind(this)}
				/>
		</>);
	}
}

export default MemoryGame;
