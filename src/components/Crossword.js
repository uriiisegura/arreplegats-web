import React, { Component } from "react";
import RemoveAccents from "../functions/RemoveAccents";
import WinGamePopup from "./WinGamePopup";

class Crossword extends Component {
	checkResult() {
		let correct = true;
		const table = document.getElementById(`crossword${this.props.map_id}`);
		for (let i = 0; i < table.rows.length; i++) {
			for (let j = 0; j < table.rows[i].cells.length; j++) {
				const cell = table.rows[i].cells[j];
				const input = cell.getElementsByTagName('input')[0];
				if (input === undefined) continue;

				const letter = input.getAttribute('data-letter');
				const value = RemoveAccents(input.value.toUpperCase());
				if (letter !== value) {
					correct = false;
					break;
				}
			}
			if (!correct) break;
		}
		if (correct) {
			document.cookie = `mots-${this.props.map_id}=true,secure`;
			this.popup.showPopup();
		}
	}
	finish() {
		window.location.hash = '#/mots-encreuats';
	}
	render() {
		return(<>
			<div className="game-two-columns">
				<table className="crossword-table square-table" id={`crossword${this.props.map_id}`}><tbody>
					{
						[...Array(this.props.rows).keys()].map((i, key_i) => {
							return (<tr key={key_i}>
								{
									[...Array(this.props.columns).keys()].map((j, key_j) => {
										const e = this.props.words.filter(w => w.x === j && w.y === i);
										const n = e.length > 0 ? this.props.words.indexOf(e[0]) + 1 : false;
										let s = false;
										this.props.words.forEach(w => {
											if (s) return;
											switch (w.direction) {
												case 1:
													if (i >= w.y && i < w.y + w.word.length && w.x === j)
														s = w.word[i - w.y].toUpperCase();
													break;
												default:
													if (j >= w.x && j < w.x + w.word.length && w.y === i)
														s = w.word[j - w.x].toUpperCase();
											}
										});
										return (<td key={key_j}>
											{
												n ? <div className="cw-number">{n}</div>
												: <></>
											}
											{
												s ? <input onChange={this.checkResult.bind(this)} maxLength="1" className="content" data-letter={s} />
												: <></>
											}
										</td>);
									})
								}
							</tr>);
						})
					}
				</tbody></table>
				<div>
					<ol>
						{
							this.props.words.map((w, i) => {
								return <li key={i}>{w.hint}</li>;
							})
						}
					</ol>
				</div>
			</div>
			<WinGamePopup
				ref={instance => { this.popup = instance; }}
				function={this.finish}
				/>
		</>);
	}
}

export default Crossword;
