import React, { Component } from "react";
import maps from "../data/sopa-de-lletres.json";

let cell = null;

class SopaLletres extends Component {
	selectLetter(i, j) {
		cell = document.getElementsByClassName('table-row')[i].getElementsByTagName('td')[j];
		document.getElementById('selector').className = 'show';
	}
	handleMouseMove(e) {
		if (cell === null) return;

		const selector = document.getElementById('selector');

		const off_x = cell.offsetParent.offsetLeft;
		const off_y = cell.offsetParent.offsetTop;
		const off_cell = cell.clientWidth;

		const cell_x = cell.offsetLeft + off_x;
		const cell_y = cell.offsetTop + off_y;
		const mouse_x = e.clientX - off_cell;
		const mouse_y = e.clientY - off_cell / 2;

		const length = Math.sqrt(((cell_x - mouse_x) * (cell_x - mouse_x)) + ((cell_y - mouse_y) * (cell_y - mouse_y)));
		const angle = Math.atan2((cell_y - mouse_y), (cell_x - mouse_x)) * (180 / Math.PI);

		const sel_x = ((cell_x + mouse_x) / 2) - (length / 2) - off_x;
		const sel_y = ((cell_y + mouse_y) / 2) - (selector.style.height / 2) - off_y;

		selector.style.width = `${length}px`;
		selector.style.transform = `rotate(${angle}deg)`;
		selector.style.left = `${sel_x}px`;
		selector.style.top = `${sel_y}px`;
	}
	unselect() {
		cell = null;
		document.getElementById('selector').className = '';
	}
	render() {
		const MAP = maps[0];
		window.addEventListener('mousemove', this.handleMouseMove);

		return (<>
			<section>
				<h2>Sopa de lletres</h2>

				<div className="game-two-columns">
					<div style={{position: 'relative'}}>
						<table className="word-search-table square-table"><tbody>
							{
								MAP.map.map((r, i) => {
									return <tr key={i} className="table-row">
										{
											r.map((e, j) => {
												return <td key={j}>
													<div
														onMouseDown={() => this.selectLetter(i, j)}
														onMouseUp={() => this.unselect()}
														className="content"
														>{e}</div>
												</td>;
											})
										}
									</tr>;
								})
							}
						</tbody></table>
						<div id="selector"></div>
					</div>
					<div>
						<ul className="word-search-list">
							{
								MAP.words.sort().map((w, i) => {
									return <li key={i}>{w}</li>;
								})
							}
						</ul>
					</div>
				</div>
			</section>
		</>);
	}
}

export default SopaLletres;
