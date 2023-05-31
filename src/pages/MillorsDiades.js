import React, { Component } from "react";
import * as Papa from 'papaparse';
import GetTemporada from "../functions/GetTemporada";
import GetCastell from "../functions/GetCastell";

const CASTELLS_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRzvM_JNeX_MUNi4ZarVZDcj5CdyrDBTPbf3lDUrvUs_HvaX3S0k07yLmJKolAPf0BA6iM1FW4w1u83/pub?gid=0&single=true&output=csv";
const SCORE_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQeAif6pgFuLUAXHif4IsrSXzG8itYhirTHGdmNzA5RmrEPcJe7lcfwfNVLBEcgnn3mZbThqaZdouiP/pub?gid=1401475200&single=true&output=csv";

class MillorsDiades extends Component {
	constructor(props) {
		super(props);
		this.state = {
			diades: {},
			puntuacions: {},
			load: false
		};
	}
	aggregate(rows) {
		const pad = (n, width, z) => {
			z = z || '0';
			n = n + '';
			return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
		};
		const parseDate = (row) => pad(row["dia"],2)+"/"+pad(row["mes"],2)+"/"+row["any"];
		const get_diada_hash = (row) => parseDate(row) + " - " + row["motiu"];
		const diades = [...new Set(rows.map(row => get_diada_hash(row)))];

		let diades_dict = {};
		diades.forEach(diada_hash => {
			diades_dict[diada_hash] = {};
			const by_diada = rows.filter(row => get_diada_hash(row) === diada_hash);
			if (by_diada.length === 0) return;
			diades_dict[diada_hash]["info"] = (({ dia, mes, any, situació, ciutat, motiu }) => ({ dia, mes, any, situació, ciutat, motiu }))(by_diada[0]);
			
			diades_dict[diada_hash]["castells"] = by_diada.map(castell => (({ tipus, alçada, agulla, pinya, altres, ordre, resolució }) => ({ tipus, alçada, agulla, pinya, altres, ordre, resolució }))(castell));
			diades_dict[diada_hash]["castells"].forEach((castell, i) => {
				let resultat = castell["resolució"];
				const ordre = castell["ordre"];
				let resultatDavant = "";
				if (resultat.includes("pd") || resultat.includes("i")) {
					resultatDavant = resultat;
					resultat = "";
				}
				const agulla = castell["agulla"] === "1" ? "a" : "";
				const perSota = castell["altres"] === "ps" ? "s" : "";
				const caminant = castell["altres"] === "cam" ? "cam" : "";
				const build = castell["tipus"].toUpperCase() + "d" + castell["alçada"] + perSota + agulla + castell["pinya"] + caminant;
				diades_dict[diada_hash]["castells"][i] = {};
				diades_dict[diada_hash]["castells"][i][ordre] = resultatDavant + build + resultat.toUpperCase();
			});
			diades_dict[diada_hash]["info"]["data"] = parseDate(diades_dict[diada_hash]["info"]);
			delete diades_dict[diada_hash]["info"]["dia"];
			delete diades_dict[diada_hash]["info"]["mes"];
			delete diades_dict[diada_hash]["info"]["any"];
		});

		return diades_dict;
	}
	process_puntuacions(data) {
		let puntuacions_dict = {};
		data.forEach(castell => {
			puntuacions_dict[castell.castell] = [parseInt(castell["Descarregat"]), parseInt(castell["Carregat"])];
		});
		puntuacions_dict["Pd3cam"] = [14, 14];
		puntuacions_dict["Pd4cam"] = [119, 119];
		puntuacions_dict["Vd5"] = [571, 571];
		puntuacions_dict["Vd6f"] = [1911, 1911];
		puntuacions_dict["3d7+4d7"] = [2301, 2301];

		return puntuacions_dict;
	}
	componentDidMount() {
		Papa.parse(CASTELLS_URL, {
			download: true,
			header: true,
			complete: (results) => {
				this.setState({
					diades: this.aggregate(results.data),
					load: true
				});
			}
		});
		Papa.parse(SCORE_URL, {
			download: true,
			header: true,
			complete: (results) => {
				this.setState({
					puntuacions: this.process_puntuacions(results.data),
					load: true
				});
			}
		});
	}
	render() {
		if (!this.state.load) {
			return (<>
				<section className="resum-historic">
					<h2>Millors Diades</h2>

					<p>
						Les puntuacions s'extreuen del Baròmectre Universitari. Podeu consultar la taula de puntuacions <a href="https://barometreuniversitari.cat/#/score" target="_blank" rel="noreferrer">aquí</a>.
					</p>

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
						</tbody>
					</table>

					<div className="loading" style={{marginTop: '2rem'}}></div>
				</section>
			</>);
		}

		const todaySeason = GetTemporada(new Date());

		const getCastellPuntuation = (castell) => {
			const [c, descarregat] = GetCastell(castell);
			let points = 0;
			try {
				points = this.state.puntuacions[c][descarregat ? 0 : 1]
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
			if (components.length < 1)
				return [<></>];
			return components;
		}

		let diades_array = [...Object.values(this.state.diades)];
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

				<p>
					Les puntuacions s'extreuen del Baròmectre Universitari. Podeu consultar la taula de puntuacions <a href="https://barometreuniversitari.cat/#/score" target="_blank" rel="noreferrer">aquí</a>.
				</p>

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
							diades_array.map((d, i) => {
								count += 1;
								return <tr key={i}>
									<td>{GetTemporada(d.info.data) === todaySeason ? <img src="font-awesome/star.svg" alt="star" className="this-season" /> : <></>}</td>
									<td>{count}</td>
									<td>{d.info.data}</td>
									<td>{d.info.motiu}</td>
									<td>{d.info.ciutat}</td>
									<td>{
										array_to_diada(d.castells, d.top_castells)
											.map((c, j) => {
												return <span key={j}>{c}</span>;
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
