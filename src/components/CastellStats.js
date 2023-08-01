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
				<div style={{
					display: 'flex',
					alignItems: 'center',
					gap: '1rem',
				}}>
					<div
						style={{
							color: 'white',
							fontSize: 20,
						}}
					>
						{this.props.castell}
					</div>

					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: '0.5rem',
						}}
					>
						{
							this.props.stats?.descarregat &&
							<div
								style={{
									color: 'white',
									display: 'flex',
									alignItems: 'center',
									backgroundColor: '#2857aa',
									padding: '1px 5px',
									borderRadius: 5,
									fontSize: 12
								}}
							>
								{this.props.stats?.descarregat}p
							</div>
						}

						{
							this.props.stats?.carregat &&
							<div
								style={{
									color: 'white',
									display: 'flex',
									alignItems: 'center',
									backgroundColor: '#af6000',
									padding: '1px 5px',
									borderRadius: 5,
									fontSize: 12
								}}
							>
								{this.props.stats?.carregat}p
							</div>
						}
					</div>
				</div>

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
