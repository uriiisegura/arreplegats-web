import React, { Component } from "react";
import * as Papa from 'papaparse';
import ResumCard from "../components/ResumCard";
import GetCastell from "../functions/GetCastell";
import GetTemporada from "../functions/GetTemporada";
import FromEuropean from "../functions/FromEuropean";
import IsFromTemporada from "../functions/IsFromTemporada";
import castells_map from "../data/castells-top.json";
import categories from "../data/categories-castells.json";

const CASTELLS_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRzvM_JNeX_MUNi4ZarVZDcj5CdyrDBTPbf3lDUrvUs_HvaX3S0k07yLmJKolAPf0BA6iM1FW4w1u83/pub?gid=0&single=true&output=csv";
const SCORE_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQeAif6pgFuLUAXHif4IsrSXzG8itYhirTHGdmNzA5RmrEPcJe7lcfwfNVLBEcgnn3mZbThqaZdouiP/pub?gid=439551992&single=true&output=csv";

class ResumHistoric extends Component {
	constructor(props) {
		super(props);
		this.state = {
			diades: {},
			puntuacions: {},
			hasDiades: false,
			hasPuntuacions: false,
			hasCastells: false,
			temporada: null,
			castells: []
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
					hasDiades: true
				});
			}
		});
		Papa.parse(SCORE_URL, {
			download: true,
			header: true,
			complete: (results) => {
				this.setState({
					puntuacions: this.process_puntuacions(results.data),
					hasPuntuacions: true
				});
			}
		});
	}
	getTemporades() {
		const temporadesHTML = [];
		const lastTemporada = GetTemporada(new Date());
		temporadesHTML.push(<option value="null">--- TOTES ---</option>);
		for (let y = 1994; y < new Date().getFullYear(); y++)
			temporadesHTML.push(<option value={`${y}-${y+1}`}>Temporada {y}-{y+1}</option>);
		if (temporadesHTML[temporadesHTML.length - 1].props.value !== lastTemporada)
			temporadesHTML.push(<option value={lastTemporada}>Temporada {lastTemporada}</option>);
		return temporadesHTML;
	}
	filterTemporada() {
		const isSpecialSim = dict => {
			const keys = Object.keys(dict);
			const values = Object.values(dict);
	
			const notProcessed = () => {
				console.log("NOT PROCESSED! ");
				console.log(keys);
				console.log(values);
			}
	
			switch (keys.length) {
				case 1:
					if (keys[0] === "Pd4")
						return [false, ""];
					if (keys[0] === "Pd5")
						return [false, ""];
					else {
						notProcessed();
						return [false, "NOT_PROCESSED"];
					}
				case 2:
					if (keys.includes("Pd4") && keys.includes("Pd4C"))
						return [false, ""];
					else if (keys.includes("Pd5") && keys.includes("Pd5C"))
						return [false, ""];
					else if (keys.includes("Pd5") && keys.includes("Pd4") && dict["Pd5"] === 1 && dict["Pd4"] === 2)
						return [true, "Vd5"];
					else if (keys.includes("Pd5C") && keys.includes("Pd4") && dict["Pd5C"] === 1 && dict["Pd4"] === 2)
						return [true, "Vd5C"];
					else if (keys.includes("Pd6f") && keys.includes("Pd5") && dict["Pd6f"] === 1 && dict["Pd5"] === 2)
						return [true, "Vd6f"];
					else if (keys.includes("3d7") && keys.includes("4d7") && dict["3d7"] === 1 && dict["4d7"] === 1)
						return [true, "3d7+4d7"];
					else if (keys.includes("Pd5") && keys.includes("Pd4") && dict["Pd5"] === 1 && dict["Pd4"] === 1)
						return [false, ""];
					else if (keys.includes("Pd6f") && keys.includes("Pd4") && dict["Pd6f"] === 1 && dict["Pd4"] === 1)
						return [false, ""];
					else if (keys.includes("4d6") && keys.includes("Pd4s"))
						return [true, "4d6+Pd4s"]; // WEIRD
					else if (keys.includes("4d5") && keys.includes("Td5"))
						return [true, "4d5+Td5"]; // WEIRD
					else {
						notProcessed();
						return [false, "NOT_PROCESSED"];
					}
				default:
					notProcessed();
					return [false, "NOT_PROCESSED"];
			}
		}
	
		const not_scored_castells = {};
		const castells_dict = {};
		let last_diada = 0;
		let last_order = 0;
		let same_round = {};
		let have_same_round = false;
		[...Object.values(this.state.diades)].forEach((diada, i) => {
			let add_diada = true;
			if (this.state.temporada) {
				const diada_date = FromEuropean(diada['info']['data']);
				add_diada = IsFromTemporada(diada_date, this.state.temporada);
			}
			if (add_diada) {
				diada["castells"].forEach((dict) => {
					const castell = Object.values(dict)[0];
					if (castell[0] === "i" || (castell[0] === "p" && castell[1] === "d")) return;
					const [cas, des] = GetCastell(castell, false);
					const is_same_round = last_diada === i && last_order === Object.keys(dict)[0] && last_order !== "" ? true : false;
		
					last_diada = i;
					last_order = Object.keys(dict)[0];
		
					if (is_same_round) {
						have_same_round = true;
						if (!(castell in same_round))
							same_round[castell] = 0;
						same_round[castell] += 1;
						return;
					} else if (!is_same_round && have_same_round) {
						const [isSpecial, specialName] = isSpecialSim(same_round);
						if (isSpecial) {
							const [thisCas, thisDes] = GetCastell(specialName, false);
		
							if (!(thisCas.replace('T','2') in this.state.puntuacions)) {
								if (!(thisCas in not_scored_castells))
									not_scored_castells[thisCas] = [0, 0];
								
								if (thisDes) not_scored_castells[thisCas][0] += 1;
								else		 not_scored_castells[thisCas][1] += 1;
							} else {
								if (!(thisCas in castells_dict))
								castells_dict[thisCas] = [0, 0];
				
								if (thisDes) castells_dict[thisCas][0] += 1;
								else		 castells_dict[thisCas][1] += 1;
							}
						} else {
							Object.keys(same_round).forEach((thisCastell, i) => {
								const [thisCas, thisDes] = GetCastell(thisCastell, false);
		
								if (!(thisCas.replace('T','2') in this.state.puntuacions)) {
									if (!(thisCas in not_scored_castells))
										not_scored_castells[thisCas] = [0, 0];
									
									if (thisDes) not_scored_castells[thisCas][0] += Object.values(same_round)[i];
									else		 not_scored_castells[thisCas][1] += Object.values(same_round)[i];
								} else {
									if (!(thisCas in castells_dict))
										castells_dict[thisCas] = [0, 0];
						
									if (thisDes) castells_dict[thisCas][0] += Object.values(same_round)[i];
									else		 castells_dict[thisCas][1] += Object.values(same_round)[i];
								}
							});
						}
						have_same_round = false;
						same_round = {};
						same_round[castell] = 1;
					} else {
						same_round = {};
						same_round[castell] = 1;
					}
		
					if (!(cas.replace('T','2') in this.state.puntuacions)) {
						if (!(cas in not_scored_castells))
							not_scored_castells[cas] = [0, 0];
						
						if (des)	not_scored_castells[cas][0] += 1;
						else		not_scored_castells[cas][1] += 1;
					} else {
						if (!(cas in castells_dict))
						castells_dict[cas] = [0, 0];
		
						if (des)	castells_dict[cas][0] += 1;
						else		castells_dict[cas][1] += 1;
					}
				});
			}
		});
		if (have_same_round) {
			const [isSpecial, specialName] = isSpecialSim(same_round);
			if (isSpecial) {
				const [thisCas, thisDes] = GetCastell(specialName, false);

				if (!(thisCas.replace('T','2') in this.state.puntuacions)) {
					if (!(thisCas in not_scored_castells))
						not_scored_castells[thisCas] = [0, 0];
					
					if (thisDes) not_scored_castells[thisCas][0] += 1;
					else		 not_scored_castells[thisCas][1] += 1;
				} else {
					if (!(thisCas in castells_dict))
					castells_dict[thisCas] = [0, 0];
	
					if (thisDes) castells_dict[thisCas][0] += 1;
					else		 castells_dict[thisCas][1] += 1;
				}
			} else {
				Object.keys(same_round).forEach((thisCastell, i) => {
					const [thisCas, thisDes] = GetCastell(thisCastell, false);

					if (!(thisCas.replace('T','2') in this.state.puntuacions)) {
						if (!(thisCas in not_scored_castells))
							not_scored_castells[thisCas] = [0, 0];
						
						if (thisDes) not_scored_castells[thisCas][0] += Object.values(same_round)[i];
						else		 not_scored_castells[thisCas][1] += Object.values(same_round)[i];
					} else {
						if (!(thisCas in castells_dict))
							castells_dict[thisCas] = [0, 0];
			
						if (thisDes) castells_dict[thisCas][0] += Object.values(same_round)[i];
						else		 castells_dict[thisCas][1] += Object.values(same_round)[i];
					}
				});
			}
		}
	
		let castells = Object.keys(castells_dict).map((key) => {
			return [key, castells_dict[key]];
		});
		castells.sort((a, b) => {
			let scoreA = this.state.puntuacions[a[0].replace('T','2')][0];
			let scoreB = this.state.puntuacions[b[0].replace('T','2')][0];
	
			if (scoreA === undefined) {
				const structure = parseInt(a[0].split('d')[0].replace('T','2').replace('P','1'));
				const floors = parseInt(a[0].split('d')[1]);
				scoreA = 10 * structure + floors;
			}
			if (scoreB === undefined) {
				const structure = parseInt(b[0].split('d')[0].replace('T','2').replace('P','1'));
				const floors = parseInt(b[0].split('d')[1]);
				scoreB = 10 * structure + floors;
			}
	
			return scoreB - scoreA;
		});
	
		let castells_no_puntuats = Object.keys(not_scored_castells).map((key) => {
			return [key, not_scored_castells[key]];
		});
		castells_no_puntuats.sort(function(a, b) {
			const structureA = parseInt(a[0].split('d')[0].replace('T','2').replace('P','1'));
			const floorsA = parseInt(a[0].split('d')[1]);
			const scoreA = 10 * structureA + floorsA;
	
			const structureB = parseInt(b[0].split('d')[0].replace('T','2').replace('P','1'));
			const floorsB = parseInt(b[0].split('d')[1]);
			const scoreB = 10 * structureB + floorsB;
	
			return scoreB - scoreA;
		});

		this.setState({castells: castells.concat(castells_no_puntuats)});
	}
	updateTemporada(e) {
		this.setState({temporada: e.target.value === 'null' ? null : e.target.value}, () => {
			this.filterTemporada();
		});
	}
	render() {
		if (!(this.state.hasDiades && this.state.hasPuntuacions)) {
			return (<>
				<section className="resum-historic">
					<h2>Resum Històric</h2>
					<div className="loading"></div>
				</section>
			</>);
		}

		if (!this.state.hasCastells) {
			this.setState({
				hasCastells: true
			}, () => {
				this.filterTemporada();
			});
		}

		return (<>
			<section className="resum-historic">
				<h2>Resum Històric</h2>

				<div className="historic-filter-container">
					<label htmlFor="date_from">Filtra per temporades:</label>
					<div className="select-arrow">
						<select type="text" id="castell" onChange={this.updateTemporada.bind(this)}>
							{this.getTemporades()}
						</select>
						<div className="dblarrow"><b></b><i></i></div>
					</div>
				</div>

				{
					this.state.temporada === '2020-2021' && <p>Durant la temporada 2020-2021 no hi va haver castells universitaris a causa de l'aturada de l'activitat provocada per la COVID-19.</p>
				}

				{
					categories.map((e, i) => {
						const castells_category = this.state.castells.filter(c => {
							return e.castells.includes(c[0]);
						});
						castells_category.forEach(c => this.state.castells.splice(this.state.castells.findIndex(k => k[0] === c[0]), 1));
						if (castells_category.length === 0) return <div key={`void-${i}`}></div>;
						return <div className="resum-wrap-wrap" key={`resum-wrap-${i}`}>
							<h4>{e.name}</h4>
							<div className="resum-wrap">
								{
									castells_category.map((e, j) => {
										return <ResumCard
											key={`resum-${i}-card-${j}`}
											castell={e[0]}
											descarregats={e[1][0]}
											carregats={e[1][1]}
											link={e[0] in castells_map}
										/>
									})
								}
							</div>
						</div>
					})
				}
				{this.state.castells.length > 0 && <h4>Castells no puntuats</h4>}
				<div className="resum-wrap">
					{
						this.state.castells.map((e, i) => {
							return <ResumCard
								key={`no-puntuat-${i}}`}
								castell={e[0]}
								descarregats={e[1][0]}
								carregats={e[1][1]}
								link={e[0] in castells_map}
							/>
						})
					}
				</div>
			</section>
		</>);
	}
}

export default ResumHistoric;
