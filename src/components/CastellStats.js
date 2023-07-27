import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import {
	Chart as ChartJS,
	LineElement,
	CategoryScale,
	LinearScale,
	PointElement
} from 'chart.js';

ChartJS.register(
	LineElement,
	CategoryScale,
	LinearScale,
	PointElement
);

class CastellStats extends Component {
	render() {
		const stats_data = this.props.stats.stats.map(s => s.probabilitats[0]);
		stats_data.push(this.props.stats.probabilitatsActual[0]);

		const data = {
			labels: Array(stats_data.length).join('.').split('.'),
			datasets: [
				{
					label: 'Sample Line Chart',
					data: stats_data,
					borderColor: '#2857aa',
					pointRadius: 0
				}
			]
		};

		const options = {
			scales: {
				x: {
					display: false
				},
				y: {
					beginAtZero: true,
					max: 1,
					ticks: {
						display: false
					},
					grid: {
						color: '#ffffff30',
					}
				}
			}
		};

		return (
			<div className="game-stats-graphic-wrap">
				<Line
					className="game-stats-graph"
					data={data}
					options={options}
					/>
			</div>
		);
	}
}

export default CastellStats;
