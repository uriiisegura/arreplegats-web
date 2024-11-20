import React, { Component } from "react";

class Footer extends Component {
	state = {
		copied: false
	};

	handleCopy = () => {
		navigator.clipboard.writeText('junta@arreplegats.cat');
		this.setState({ copied: true });
		setTimeout(() => {
			this.setState({ copied: false });
		}, 500); // Show check for 0.5 seconds
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
				</div>
				<div className="email">
					<span className="email-text">junta@arreplegats.cat</span>
					<button 
						className={`copy-btn ${this.state.copied ? 'copied' : ''}`}
						onClick={this.handleCopy}
					>
						<img 
							src={this.state.copied ? "/font-awesome/check.svg" : "/font-awesome/copy.svg"} 
							alt={this.state.copied ? "Copied" : "Copy"} 
						/>
					</button>
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
			</footer>
		);
	}
}

export default Footer;
