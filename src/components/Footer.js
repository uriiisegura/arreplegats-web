import React, { Component } from "react";

class Footer extends Component {
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
					<a href="mailto:junta.arreplegats@gmail.com" className="icon mail" target="_blank" rel="noreferrer"><img src="/font-awesome/mail.svg" alt="Email" /></a>
					<a href="tel:+34681236024" className="icon phone" target="_blank" rel="noreferrer"><img src="/font-awesome/phone.svg" alt="Phone" /></a>
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
