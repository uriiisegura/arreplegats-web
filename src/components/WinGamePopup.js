import React, { Component } from "react";

class WinGamePopup extends Component {
	showPopup() {
		document.getElementById('winGame-popup').classList.add('show');
	}
	closePopup() {
		document.getElementById('winGame-popup').classList.remove('show');
		if (this.props.function)
			this.props.function();
	}
	render() {
		return (
			<div className="win-popup" id="winGame-popup">
				<h3>Enhorabona!</h3>
				<h5>T'has passat el joc.</h5>
				<button onClick={this.closePopup.bind(this)} className="btn">OK</button>
			</div>
		);
	}
}

export default WinGamePopup;
