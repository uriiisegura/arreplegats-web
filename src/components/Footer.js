import React, { Component } from "react";

class Footer extends Component {
	render() {
		return (
			<footer className="page-footer">
				<div className="social-media">
					<a href="https://twitter.com/arreplegats" className="icon twitter" target="_blank" rel="noreferrer"><img src="font-awesome/twitter.svg" alt="" /></a>
					<a href="https://www.instagram.com/arreplegats/" className="icon instagram" target="_blank" rel="noreferrer"><img src="font-awesome/instagram.svg" alt="" /></a>
					<a href="https://www.youtube.com/channel/UC-RVCefwipBS8WutREwbTmw/" className="icon youtube" target="_blank" rel="noreferrer"><img src="font-awesome/youtube.svg" alt="" /></a>
					<a href="https://www.tiktok.com/@arreplegats" className="icon tiktok" target="_blank" rel="noreferrer"><img src="font-awesome/tiktok.svg" alt="" /></a>
					<a href="https://www.facebook.com/arreplegats" className="icon facebook" target="_blank" rel="noreferrer"><img src="font-awesome/facebook.svg" alt="" /></a>
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
