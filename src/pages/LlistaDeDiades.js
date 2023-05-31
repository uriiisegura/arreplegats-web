import React, { Component } from "react";
import * as Papa from 'papaparse';
import GetCastellsDiada from "../functions/GetCastellsDiada";
import PopPd from "../functions/PopPd";
import GetClean from "../functions/GetClean";
import GetTemporada from "../functions/GetTemporada";
import FromEuropean from "../functions/FromEuropean";

const CASTELLS_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRzvM_JNeX_MUNi4ZarVZDcj5CdyrDBTPbf3lDUrvUs_HvaX3S0k07yLmJKolAPf0BA6iM1FW4w1u83/pub?gid=0&single=true&output=csv";

class LlistaDeDiades extends Component {
	constructor(props) {
		super(props);
		this.state = {
			diades: {},
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
	}
	render() {
		const [year1, year2] = GetTemporada(new Date()).split('-');

		if (!this.state.load) {
			return (<section>
				<h2>Llista de diades</h2>

				<p>Durant la temporada 2020-2021 no hi va haver castells universitaris a causa de l'aturada de l'activitat provocada per la COVID-19.</p>

				<div className="llista-diades">
					<div className="filters">
						<div className="container">
							<label htmlFor="date_from">Des de:</label>
							<input type="date" id="date_from" defaultValue={year1+"-09-01"}/>
						</div>
						<div className="container">
							<label htmlFor="date_to">Fins a:</label>
							<input type="date" id="date_to" defaultValue={year2+"-08-31"}/>
						</div>
						<div className="container">
							<label htmlFor="poblacio">Població:</label>
							<div className="select-arrow">
								<select type="text" id="poblacio">
									<option value="none">--- TOTES ---</option>
								</select>
								<div className="dblarrow"><b></b><i></i></div>
							</div>
						</div>
						<div className="container">
							<label htmlFor="castell">Castell:</label>
							<div className="select-arrow">
								<select type="text" id="castell">
									<option value="none">--- TOTS ---</option>
								</select>
								<div className="dblarrow"><b></b><i></i></div>
							</div>
						</div>
					</div>
					<div className="loading" style={{marginTop: '2rem'}}></div>
				</div>
			</section>);
		}

		const getPoblacions = (diades) => {
			const poblacions = [];
			const poblacionsHTML = [];
			diades.forEach(diada => {
				const poblacio = diada['info']['ciutat'].trim();
				if (!poblacions.includes(poblacio))
					poblacions.push(poblacio);
			});
			poblacions.sort();
			poblacionsHTML.push(<option value="none">--- TOTES ---</option>);
			poblacions.forEach((city, i) => {
				poblacionsHTML.push(<option value={city} key={i}>{city}</option>);
			});
			return poblacionsHTML;
		}
		
		const getCastells = (diades) => {
			const castells = [];
			const castellsHTML = [];
			diades.forEach(diada => {
				const actuacio = getCastellsClean(diada['castells']);
				actuacio.forEach(cast => {
					if (!castells.includes(cast))
						castells.push(cast);
				});
			});
			castells.sort();
			castellsHTML.push(<option value="none">--- TOTS ---</option>);
			castells.forEach((cast, i) => {
				castellsHTML.push(<option value={cast} key={i}>{cast}</option>);
			});
			return castellsHTML;
		}
		
		const getCastellsClean = (diada) => {
			const castells = [];
			const round = [];
			diada.forEach(castell => round.push(Object.keys(castell)));
			for (let i = Math.min.apply(null, round); i <= Math.max.apply(null, round); i++) {
				let ronda = [];
				diada.forEach(castell => { if (parseInt(Object.keys(castell)) === i) ronda.push(Object.values(castell)[0]); });
				ronda = PopPd(ronda);
				ronda.forEach(cast => {
					castells.push(GetClean(cast));
				});
			}
			return castells;
		};
	
		const loadDiades = () => {
			let results = 0;
	
			const date_from = new Date(document.getElementById('date_from').value);
			const date_to = new Date(document.getElementById('date_to').value);
			const poblacio = document.getElementById('poblacio').value;
			const castell = document.getElementById('castell').value;
	
			const table = document.getElementById('results');
			const help = document.getElementById('help');
			const noResults = document.getElementById('no-results');
			table.classList.remove('hidden');
			help.classList.add('hidden');
			noResults.classList.add('hidden');
			let stripe = false;
			for (var i = 1; i < table.rows.length; i++) {
				const date = FromEuropean(table.rows[i].cells[0].innerHTML);
				if (date_from > date || date > date_to) {
					table.rows[i].classList.add('hidden');
					continue;
				}
				if (poblacio !== 'none') {
					const city = table.rows[i].cells[2].innerHTML;
					if (city !== poblacio) {
						table.rows[i].classList.add('hidden');
						continue;
					}
				}
				if (castell !== 'none') {
					const diada_hash = table.rows[i].cells[0].innerHTML + ' - ' + table.rows[i].cells[1].innerHTML;
					if (!getCastellsClean(this.state.diades[diada_hash]['castells']).includes(castell)) {
						table.rows[i].classList.add('hidden');
						continue;
					}
				}

				if (stripe)
					table.rows[i].classList.add('stripe');
				else
					table.rows[i].classList.remove('stripe');
				table.rows[i].classList.remove('hidden');

				stripe = !stripe;
				results += 1;
			}

			if (results === 0) {
				table.classList.add('hidden');
				noResults.classList.remove('hidden');
			}
		};
	
		const actuacions = [...Object.values(this.state.diades)];
		return (<>
			<section>
				<h2>Llista de diades</h2>

				<p>Durant la temporada 2020-2021 no hi va haver castells universitaris a causa de l'aturada de l'activitat provocada per la COVID-19.</p>

				<div className="llista-diades">
					<div className="filters">
						<div className="container">
							<label htmlFor="date_from">Des de:</label>
							<input type="date" id="date_from" defaultValue={year1+"-09-01"}/>
						</div>
						<div className="container">
							<label htmlFor="date_to">Fins a:</label>
							<input type="date" id="date_to" defaultValue={year2+"-08-31"}/>
						</div>
						<div className="container">
							<label htmlFor="poblacio">Població:</label>
							<div className="select-arrow">
								<select type="text" id="poblacio">
									{getPoblacions(actuacions)}
								</select>
								<div className="dblarrow"><b></b><i></i></div>
							</div>
						</div>
						<div className="container">
							<label htmlFor="castell">Castell:</label>
							<div className="select-arrow">
								<select type="text" id="castell">
									{getCastells(actuacions)}
								</select>
								<div className="dblarrow"><b></b><i></i></div>
							</div>
						</div>
					</div>
					<button className="btn filter-btn" onClick={loadDiades}>Filtrar</button>

					<h6 id="help">Utilitza els filtres de dalt per a buscar diades.</h6>
					<h6 id="no-results" className="error hidden">No s'han trobat resultats per a aquesta búsqueda.</h6>

					<table id="results" className="diades-table hidden">
						<thead>
							<tr>
								<th>Data</th>
								<th>Actuació</th>
								<th>Població</th>
								<th>Castells</th>
							</tr>
						</thead>
						<tbody>
							{
								actuacions.map((diada, i) => {
									const castells = GetCastellsDiada(diada['castells']);
									return (
										<tr className="hidden" key={i}>
											<td>{diada['info']['data']}</td>
											<td>{diada['info']['motiu']}</td>
											<td>{diada['info']['ciutat']}</td>
											<td>{castells.join(', ')}</td>
										</tr>
									);
								})
							}
						</tbody>
					</table>
				</div>
			</section>
			</>);
	}
}

export default LlistaDeDiades;
