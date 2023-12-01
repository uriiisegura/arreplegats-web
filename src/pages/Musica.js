import React, { Component } from "react";

const partitures = {
	'Toc de castells': 'toc-de-castells.pdf'
};

class Musica extends Component {
	render() {return (<>
			<section>
                <h2>Música</h2>

				<p>
					Els Arreplegats, de del desembre de 2022, tenim un perfil d'<a href="https://open.spotify.com/artist/6aUOk2F87SCtPfCML7YX27" target="_blank" rel="noreferrer">Spotify</a> i d'<a href="https://music.apple.com/es/artist/arreplegats-de-la-zona-universit%C3%A0ria/1676157265" target="_blank" rel="noreferrer">Apple Music</a> en el que hi pugem diverses cançons relacionades amb la colla i els castells. No ho dubtis i fes-li un cop d'ull als nostres últims hits!
				</p>

				<h4 style={{marginTop: '2rem'}}>Partitures</h4>
				<ul className="partitures-list">
					{
						Object.entries(partitures).map(([k, v], i) => {
							return <li>
								<a href={`/uploads/partitures/${v}`} target="_blank" key={`partitura-${i}`} rel="noreferrer">{k}</a>
							</li>;
						})
					}
				</ul>
			</section>
		</>);
	}
}

export default Musica;
