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
		let stats_data = this.props.stats.stats.map(s => s.probabilitats[0]);
		stats_data = stats_data.length < 2 ?
			[this.props.initial[0]].concat(stats_data) :
			stats_data

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
			<div className="game-stats-single-graphic">
				<h4>{this.props.castell}</h4>

				<div>
					<Line
						data={data}
						options={options}
					/>
				</div>
			</div>
		);
	}
}

export default CastellStats;
