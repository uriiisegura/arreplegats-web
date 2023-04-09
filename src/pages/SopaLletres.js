import React, { Component } from "react";
import maps from "../data/sopa-de-lletres.json";

const MAP = maps[0];
let cell = null;

class SopaLletres extends Component {
	selectLetter(i, j) {
		document.getElementById('selector').classList.toggle('show');

		// select origin
		if (cell === null) {
			cell = document.getElementsByClassName('table-row')[i].getElementsByTagName('td')[j];
			this.handleMouseMove(
				{
					clientX: cell.offsetLeft + cell.offsetParent.offsetLeft + cell.clientWidth / 2,
					clientY: cell.offsetTop + cell.offsetParent.offsetTop + cell.clientWidth / 2
				});
		}
		// check if correct
		else {
			const origin_x = cell.closest('tr').rowIndex;
			const origin_y = cell.cellIndex;
			const diff_x = i - origin_x;
			const diff_y = j - origin_y;
			if (diff_x === 0 || diff_y === 0 || diff_x === diff_y || diff_x === -diff_y) {
				const table = document.getElementById('wordsearch');
				const letters = [];
				for (let m = Math.min(0, diff_x); m <= Math.max(0, diff_x); m++) {
					for (let n = Math.min(0, diff_y); n <= Math.max(0, diff_y); n++) {
						if (diff_x === diff_y && m !== n) continue;
						if (diff_x === -diff_y && m !== -n) continue;
						const index_x = origin_x + m;
						const index_y = origin_y + n;
						letters.push(table.rows[index_x].cells[index_y].getElementsByTagName('div')[0].innerHTML);
					}
				}
				const word = letters.join('');
				const word_i = letters.reverse().join('');
				MAP.words.forEach(w => {
					if (w.toUpperCase() === word || w.toUpperCase() === word_i)
						this.markWord(origin_x, origin_y, i, j, w);
				});
			}

			cell = null;
		}
	}
	handleMouseMove(e) {
		if (cell === null) return;

		const selector = document.getElementById('selector');

		const off_x = cell.offsetParent.offsetLeft;
		const off_y = cell.offsetParent.offsetTop;
		const off_cell = cell.clientWidth / 2;

		const cell_x = cell.offsetLeft + off_x;
		const cell_y = cell.offsetTop + off_y;
		const mouse_x = e.clientX - off_cell;
		const mouse_y = e.clientY - off_cell;

		const length = Math.sqrt(((cell_x - mouse_x) * (cell_x - mouse_x)) + ((cell_y - mouse_y) * (cell_y - mouse_y)));
		const angle = Math.atan2((cell_y - mouse_y), (cell_x - mouse_x)) * (180 / Math.PI);

		const sel_x = ((cell_x + mouse_x) / 2) - (length / 2) - off_x;
		const sel_y = ((cell_y + mouse_y) / 2) - (selector.style.height / 2) - off_y;

		selector.style.width = `${length}px`;
		selector.style.transform = `rotate(${angle}deg)`;
		selector.style.left = `${sel_x}px`;
		selector.style.top = `${sel_y}px`;
	}
	markWord(oi, oj, di, dj, word) {
		const words = document.getElementsByClassName('words');
		for (let li of words) {
			if (li.getAttribute('data-word') === word) {
				if (li.className.includes('done')) return;
				li.classList.add('done');
			}
		}

		const selector = document.createElement('div');
		const origin = document.getElementById('wordsearch').rows[oi].cells[oj];
		const destination  = document.getElementById('wordsearch').rows[di].cells[dj];

		const off_x = origin.offsetParent.offsetLeft;
		const off_y = origin.offsetParent.offsetTop;

		const origin_x = origin.offsetLeft + off_x;
		const origin_y = origin.offsetTop + off_y;
		const destination_x = destination.offsetLeft + off_x;
		const destination_y = destination.offsetTop + off_y;

		const length = Math.sqrt(((origin_x - destination_x) * (origin_x - destination_x)) + ((origin_y - destination_y) * (origin_y - destination_y)));
		const angle = Math.atan2((origin_y - destination_y), (origin_x - destination_x)) * (180 / Math.PI);

		const sel_x = ((origin_x + destination_x) / 2) - (length / 2) - off_x;
		const sel_y = ((origin_y + destination_y) / 2) - (selector.style.height / 2) - off_y;

		selector.className = 'selector show';
		selector.style.left = `${sel_x}px`;
		selector.style.top = `${sel_y}px`;
		selector.style.width = `${length}px`;
		selector.style.transform = `rotate(${angle}deg)`;
		document.getElementById('wordsearch-wrap').appendChild(selector);
	}
	render() {
		window.addEventListener('mousemove', this.handleMouseMove);

		return (<>
			<section>
				<h2>Sopa de lletres</h2>

				<div className="game-two-columns">
					<div style={{position: 'relative'}} id="wordsearch-wrap">
						<table className="word-search-table square-table" id="wordsearch"><tbody>
							{
								MAP.map.map((r, i) => {
									return <tr key={i} className="table-row">
										{
											r.map((e, j) => {
												return <td key={j}>
													<div
														onClick={() => this.selectLetter(i, j)}
														className="content"
														>{e}</div>
												</td>;
											})
										}
									</tr>;
								})
							}
						</tbody></table>
						<div id="selector" className="selector"></div>
					</div>
					<div>
						<ul className="word-search-list">
							{
								MAP.words.sort().map((w, i) => {
									return <li key={i} className="words" data-word={w.toUpperCase()}>{w}</li>;
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
