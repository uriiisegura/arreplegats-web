import React, { Component } from "react";

class Footer extends Component {
	render() {
		return (
			<footer className="page-footer">
                <div className="social-media">
                    <a href="https://twitter.com/arreplegats" className="icon" target="_blank"><img src="font-awesome/twitter.svg" alt="" /></a>
                    <a href="https://www.instagram.com/arreplegats/" className="icon" target="_blank"><img src="font-awesome/instagram.svg" alt="" /></a>
                    <a href="https://www.youtube.com/channel/UC-RVCefwipBS8WutREwbTmw/videos" className="icon" target="_blank"><img src="font-awesome/youtube.svg" alt="" /></a>
                    <a href="https://www.tiktok.com/@arreplegats" className="icon" target="_blank"><img src="font-awesome/tiktok.svg" alt="" /></a>
                </div>
			</footer>
		);
	}
}

export default Footer;
