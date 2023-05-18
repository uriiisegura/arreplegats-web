import React, { Component } from "react";

class LoseGamePopup extends Component {
	showPopup() {
		document.getElementById('loseGame-popup').classList.add('show');
	}
	closePopup() {
		document.getElementById('loseGame-popup').classList.remove('show');
		if (this.props.function)
			this.props.function();
	}
	render() {
		return (
			<div className="lose-popup" id="loseGame-popup">
				<h3>Mala sort!</h3>
				<h5>Has perdut.</h5>
				<button onClick={this.closePopup.bind(this)} className="btn">OK</button>
			</div>
		);
	}
}

export default LoseGamePopup;
