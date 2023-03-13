import React, { Component } from "react";
import GetCastellsDiada from "./../functions/GetCastellsDiada";
import PopPd from "./../functions/PopPd";
import GetClean from "./../functions/GetClean";
import GetTemporada from "./../functions/GetTemporada";
import FromEuropean from "./../functions/FromEuropean";

class LlistaDeDiades extends Component {
	render() {
		const { diades } = this.props;

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
			poblacions.forEach(city => {
				poblacionsHTML.push(<option value={city}>{city}</option>);
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
			castells.forEach(cast => {
				castellsHTML.push(<option value={cast}>{cast}</option>);
			});
			return castellsHTML;
		}
		
		const getCastellsClean = (diada) => {
			const castells = [];
			const round = [];
			diada.map(castell => round.push(Object.keys(castell)));
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
	
			const date_from = FromEuropean(document.getElementById('date_from').value, '-');
			const date_to = FromEuropean(document.getElementById('date_to').value, '-');
			const poblacio = document.getElementById('poblacio').value;
			const castell = document.getElementById('castell').value;
	
			const table = document.getElementById('results');
			const help = document.getElementById('help');
			const noResults = document.getElementById('no-results');
			const error = document.getElementById('error');
			table.classList.remove('hidden');
			help.classList.add('hidden');
			noResults.classList.add('hidden');
			error.classList.add('hidden');
			if (isNaN(date_from) || isNaN(date_to)) {
				table.classList.add('hidden');
				error.classList.remove('hidden');
				return;
			}
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
					if (!getCastellsClean(diades[diada_hash]['castells']).includes(castell)) {
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
	
		const [year1, year2] = GetTemporada(new Date()).split('-');
		const actuacions = [...Object.values(diades)];
		return (<>
			<section>
				<h2>Llista de diades</h2>

				<p>Durant la temporada 2020-2021 no hi va haver castells universitaris a causa de l'aturada de l'activitat provocada per la COVID-19.</p>

				<div className="llista-diades">
					<div className="filters">
						<div className="container">
							<label htmlFor="date_from">Des de:</label>
							<input type="text" id="date_from" defaultValue={"01-09-"+year1}/>
						</div>
						<div className="container">
							<label htmlFor="date_to">Fins a:</label>
							<input type="text" id="date_to" defaultValue={"31-08-"+year2}/>
						</div>
						<div className="container">
							<label htmlFor="poblacio">Població:</label>
							<div className="select-arrow">
								<select type="text" id="poblacio">
									{getPoblacions(actuacions)}
								</select>
								<div class="dblarrow"><b></b><i></i></div>
							</div>
						</div>
						<div className="container">
							<label htmlFor="castell">Castell:</label>
							<div className="select-arrow">
								<select type="text" id="castell">
									{getCastells(actuacions)}
								</select>
								<div class="dblarrow"><b></b><i></i></div>
							</div>
						</div>
					</div>
					<button className="filter-btn" onClick={loadDiades}>Filtrar</button>

					<h6 id="help">Utilitza els filtres de dalt per a buscar diades.</h6>
					<h6 id="no-results" className="error hidden">No s'han trobat resultats per a aquesta búsqueda.</h6>
					<h6 id="error" className="error hidden">El format de data introduïda no és correcte (dd-mm-aaaa).</h6>

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
								actuacions.map(diada => {
									const castells = GetCastellsDiada(diada['castells']);
									return (
										<tr className="hidden">
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
