import React, { Component } from "react";
import GetTemporada from "./../functions/GetTemporada";
import GetCastell from "./../functions/GetCastell";

class MillorsDiades extends Component {
	render() {
		const { diades, puntuacions } = this.props;

		const todaySeason = GetTemporada(new Date());

		const getCastellPuntuation = (castell) => {
			const [c, descarregat] = GetCastell(castell);
			let points = 0;
			try {
				points = puntuacions[c][descarregat ? 0 : 1]
			} catch {}
			return points;
		}

		const getTopThreeWithPilar = (castells) => {
			const score = [];
			const pilar = [];
			castells.forEach(c => {
				const castell = Object.values(c)[0];
				if (score.filter(e => e.castell === castell).length > 0)
					return;
				const points = getCastellPuntuation(castell);
				if (points === 0)
					return;
				if (castell.includes('Pd')) {
					pilar.push({
						"castell": castell,
						"score": points
					});
				} else {
					score.push({
						"castell": castell,
						"score": points
					});
				}
			})
			const top3 = score.sort((a,b) => b.score - a.score).slice(0, 3);
			const top = pilar.sort((a,b) => b.score - a.score).slice(0, 1)[0];
			try {
				if (parseInt(top.castell.replace('Pd', '')) > 4)
					top3.push(top);
			} catch {}
			return top3;
		}

		const array_to_diada = (castells, top_castells) => {
			let components = [];
			let found = {};
			top_castells.forEach(k => { found[k.castell] = false; });
			castells.forEach(c => {
				c = Object.values(c)[0];
				if (c.includes("Pd4")) return;
				top_castells.forEach(k => {
					if (found[k.castell]) return;
					if (k.castell === c) {
						components.push(<span className="castell-count">{c}</span>);
						found[k.castell] = true;
					}
				})
				if (!found[c])
					components.push(<span>{c}</span>);
			});
			return components;
		}

		let diades_array = [...Object.values(diades)];
		diades_array.forEach(d => {
			d.top_castells = getTopThreeWithPilar(d.castells);
			let score = 0;
			d.top_castells.forEach(c => {
				score += c.score;
			})
			d.score = score;
		});

		diades_array.sort((a,b) => {
			return b.score - a.score;
		});
		diades_array = diades_array.slice(0, 100);

		let count = 0;

		return (<>
			<section>
				<h2>Millors Diades</h2>

				<h4>Top 100</h4>

				<p>
					La columna "Castells" no inclou els Pd4 de l'actuació.
				</p>

				<table className="best-diades">
					<thead>
						<tr>
							<th></th>
							<th></th>
							<th>Data</th>
							<th>Actuació</th>
							<th>Població</th>
							<th>Castells</th>
							<th>Punts</th>
						</tr>
					</thead>
					<tbody>
						{
							diades_array.map(d => {
								count += 1;
								return <tr>
									<td>{GetTemporada(d.info.data) === todaySeason ? <img src="font-awesome/star.svg" alt="star" className="this-season" /> : <></>}</td>
									<td>{count}</td>
									<td>{d.info.data}</td>
									<td>{d.info.motiu}</td>
									<td>{d.info.ciutat}</td>
									<td>{
										array_to_diada(d.castells, d.top_castells)
											.map(c => {
												return c;
											})
											.reduce((prev,curr) => [prev, ', ', curr])
									}</td>
									<td>{d.score}</td>
								</tr>;
							})
						}
					</tbody>
				</table>
			</section>
		</>);
	}
}

export default MillorsDiades;
