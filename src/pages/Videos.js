import React, { Component } from "react";
import { $ } from 'react-jquery-plugin'

class Videos extends Component {
	loadVideos(videos) {
		const wrap = document.getElementById('videos-wrap');
		if (wrap.childElementCount !== 0)
			return;
		videos.forEach(e => {
			const iframe = document.createElement('iframe');
			iframe.src = "https://youtube.com/embed/" + e.id + "?controls=0&showinfo=0&rel=0";
			iframe.title = e.title;
			wrap.appendChild(iframe);
		})
	}
	render() {
		const CHANNEL_ID = 'UC-RVCefwipBS8WutREwbTmw';
		const REQUEST_URL = "https://www.youtube.com/feeds/videos.xml?channel_id=";
		
		$.getJSON("https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent(REQUEST_URL)+CHANNEL_ID, (data) => {
			const videos = [];
			data.items.forEach(e => {
				const link = e.link;
				const id = link.substr(link.indexOf("=")+1);
				videos.push({
					"title": e.title,
					"id": id
				});
			})
			this.loadVideos(videos);
		});

		return (<>
			<section>
                <h2>Vídeos</h2>

				<p>
					Els Arreplegats, des de fa temps, tenim un canal de <a href="https://www.youtube.com/channel/UC-RVCefwipBS8WutREwbTmw/" target="_blank" rel="noreferrer">YouTube</a> en el que hi pugem contingut divers relacionat amb la colla. Hi pots trobar els vídeos dels castells de cada actuació, els vídeos promocionals de la colla o d'algun esdeveniment, cançons de la família verd quiròfan, i molt més!
				</p>
				<p>
					A continuació hi trobaràs els 10 últims vídeos perquè comencis a nodrir-te d'essència Arreplegada:
				</p>

				<div id="videos-wrap"></div>
			</section>
		</>);
	}
}

export default Videos;
