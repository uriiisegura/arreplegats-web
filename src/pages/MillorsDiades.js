import React, { Component } from "react";

class MillorsDiades extends Component {
	render() {
		const { diades, puntuacions } = this.props;

		const getTemporada = (data) => {
			const year = data.getFullYear();
			if (isFromTemporada(data, year+'-'+(year+1)))
				return year+'-'+(year+1);
			return (year-1)+'-'+year;
		};
	
		const isFromTemporada = (date, temporada) => {
			const start_temporada = new Date(`09/01/${temporada.split('-')[0]}`);
			const end_temporada = new Date(`08/31/${temporada.split('-')[1]}`);
			return start_temporada <= date && date <= end_temporada;
		};

		const fromEuropean = (dateString, regex = '/') => {
			const [day, month, year] = dateString.split(regex);
			return new Date(`${month}/${day}/${year}`);
		};

		const todaySeason = getTemporada(new Date());
		console.log(todaySeason);

		const getCastell = castell => {
			castell = castell.replace('Td', '2d');
			if (castell.includes("C"))
				return [castell.slice(0, -1), false];
			return [castell, true];
		};

		const getCastellPuntuation = (castell) => {
			const [c, descarregat] = getCastell(castell);
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

		const array_to_diada = (array) => {
			let text = [];
			array.forEach(c => {
				text.push(c.castell);
			});
			return text.join(', ');
		}

		let diades_array = [...Object.values(diades)];
		diades_array.forEach(d => {
			d.top_castells = getTopThreeWithPilar(d.castells);
			d.top_castells.sort((a,b) => {
				if (a.castell.includes('Pd'))
					return +1;
				return b.score - a.score;
			});
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
									<td>{getTemporada(fromEuropean(d.info.data)) === todaySeason ? <img src="font-awesome/star.svg" alt="star" className="this-season" /> : <></>}</td>
									<td>{count}</td>
									<td>{d.info.data}</td>
									<td>{d.info.motiu}</td>
									<td>{d.info.ciutat}</td>
									<td>{array_to_diada(d.top_castells)}</td>
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
