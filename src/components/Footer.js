import React, { Component } from "react";

class Footer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showPopup: false,
			popupContent: "",
			copyButtonText: "Copiar"
		};
	}

	togglePopup = (content) => {
		this.setState({
			showPopup: !this.state.showPopup,
			popupContent: content,
			copyButtonText: "Copiar"
		});
	};

	copyToClipboard = () => {
		navigator.clipboard.writeText(this.state.popupContent);
		this.setState({ copyButtonText: "Copiat!" });
		setTimeout(() => {
			this.setState({ copyButtonText: "Copiar" });
		}, 2000);
	};

	closePopup = (e) => {
		this.setState({ showPopup: false });
	};

	render() {
		return (
			<footer className="page-footer">
				<div className="social-media">
					<a href="https://www.x.com/arreplegats" className="icon twitter-x" target="_blank" rel="noreferrer"><img src="/font-awesome/twitter-x.svg" alt="Twitter" /></a>
					<a href="https://www.instagram.com/arreplegats" className="icon instagram" target="_blank" rel="noreferrer"><img src="/font-awesome/instagram.svg" alt="Instagram" /></a>
					<a href="https://www.youtube.com/channel/UC-RVCefwipBS8WutREwbTmw" className="icon youtube" target="_blank" rel="noreferrer"><img src="/font-awesome/youtube.svg" alt="YouTube" /></a>
					<a href="https://www.twitch.tv/arreplegatszu" className="icon twitch" target="_blank" rel="noreferrer"><img src="/font-awesome/twitch.svg" alt="Twitch" /></a>
					<a href="https://www.tiktok.com/@arreplegats" className="icon tiktok" target="_blank" rel="noreferrer"><img src="/font-awesome/tiktok.svg" alt="TikTok" /></a>
					<a href="https://www.facebook.com/arreplegats" className="icon facebook" target="_blank" rel="noreferrer"><img src="/font-awesome/facebook.svg" alt="Facebook" /></a>
					<div className="icon mail" onClick={() => this.togglePopup("junta.arreplegats@gmail.com")}><img src="/font-awesome/mail.svg" alt="Email" /></div>
					<div className="icon phone" onClick={() => this.togglePopup("+34 681 236 024")}><img src="/font-awesome/phone.svg" alt="Phone" /></div>
				</div>
				<div className="universities">
					<img
						src="/ub.png"
						alt="Universitat de Barcelona"
						/>
					<img
						src="/upc.png"
						alt="Universitat Politècnica de Catalunya"
						/>
				</div>
				{this.state.showPopup && (
					<div className="popup" onClick={e => e.target.className === "popup" && this.closePopup()}>
						<div className="popup-content">
							<div className="close-popup" onClick={this.closePopup}>
								<img src="/font-awesome/close.svg" alt="Close" />
							</div>
							<p className="popup-text">{this.state.popupContent}</p>
							<div className="popup-buttons">
								<button className="popup-button copy-button" onClick={this.copyToClipboard}>
									{this.state.copyButtonText}
								</button>
							</div>
						</div>
					</div>
				)}
			</footer>
		);
	}
}

export default Footer;
