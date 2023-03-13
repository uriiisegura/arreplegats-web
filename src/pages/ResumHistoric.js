import React, { Component } from "react";
import ResumCard from "../components/ResumCard";
import GetCastell from "./../functions/GetCastell";
import castells_map from "./../data/castells-top.json";
import categories from "./../data/categories-castells.json";

class ResumHistoric extends Component {
	render() {
		const { diades, puntuacions } = this.props;

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
		[...Object.values(diades)].forEach((diada, i) => {
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
	
						if (!(thisCas.replace('T','2') in puntuacions)) {
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
	
							if (!(thisCas.replace('T','2') in puntuacions)) {
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
	
				if (!(cas.replace('T','2') in puntuacions)) {
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
		});
	
		let castells = Object.keys(castells_dict).map(function(key) {
			return [key, castells_dict[key]];
		});
		castells.sort(function(a, b) {
			let scoreA = puntuacions[a[0].replace('T','2')][0];
			let scoreB = puntuacions[b[0].replace('T','2')][0];
	
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
	
		let castells_no_puntuats = Object.keys(not_scored_castells).map(function(key) {
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

		castells = castells.concat(castells_no_puntuats);

		return (<>
			<section className="resum-historic">
				<h2>Resum Històric</h2>

				{
					categories.map(e => {
						const castells_category = castells.filter(c => {
							return e.castells.includes(c[0]);
						});
						castells_category.forEach(c => castells.splice(castells.findIndex(k => k[0] === c[0]), 1));
						return <>
							<h4>{e.name}</h4>
							<div className="resum-wrap">
								{
									castells_category.map(e => {
										return <ResumCard
											castell={e[0]}
											descarregats={e[1][0]}
											carregats={e[1][1]}
											link={e[0] in castells_map}
										/>
									})
								}
							</div>
						</>
					})
				}
				<h4>Castells no puntuats</h4>
				<div className="resum-wrap">
					{
						castells.map(e => {
							return <ResumCard
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
