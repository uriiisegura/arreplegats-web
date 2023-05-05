import React, { Component } from "react";
import * as Papa from 'papaparse';

const backgrounds = {
	'ASSAIG': '--primary-600',
	'COMIFEMI': '--purple',
	'ACTUACIÓ': '--red-medium',
	'DINAR / SOPAR': '--orange-dark',
	'': '--grey-200'
};
const months = ["gener","febrer","març","abril","maig","juny","juliol","agost","setembre","octubre","novembre","desembre"];
const CALENDAR_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSkqrUBB_E4K51C2-smUpmqShVH73TjIKtrFGA1DkofnTRPVthiv3USU-kSl3Cm0VgjxQ7ZIOqsQ2od/pub?gid=0&single=true&output=csv";

class Agenda extends Component {
	constructor(props) {
		super(props);
		this.previous = this.previous.bind(this);
		this.next = this.next.bind(this);
		this.jumpToday = this.jumpToday.bind(this);
		this.showEventInfo = this.showEventInfo.bind(this);
		this.state = {
			calendar: [],
			today: new Date(),
			currentMonth: new Date().getMonth(),
			currentYear: new Date().getFullYear()
		};
	}
	showCalendar(month, year) {
		const tbl = document.getElementById("calendar-body");
		const monthAndYear = document.getElementById("monthAndYear")
		if (tbl === null || monthAndYear === null) return;

		this.hideEventInfo();
		let firstDay = (new Date(year, month)).getDay();
		firstDay = firstDay === 0 ? 6 : firstDay - 1;
		const daysInMonth = 32 - new Date(year, month, 32).getDate();
		
		tbl.innerHTML = "";
		monthAndYear.innerHTML = months[month] + " de " + year;

		let date = 1;
		for (let i = 0; i < 6; i++) {
			const row = document.createElement("tr");
			for (let j = 0; j < 7; j++) {
				const cell = document.createElement('td');
				const day_div = document.createElement('div');
				const event_div = document.createElement('div');
				day_div.classList.add("day");
				event_div.classList.add("event");
				if (i === 0 && j < firstDay) {
					day_div.innerHTML = "";
					cell.classList.add("blank");
					row.appendChild(cell);
				} else if (date > daysInMonth) {
					break;
				} else {
					day_div.innerHTML = date;
					event_div.id = "day-" + date;
					if (j === 5 || j === 6)
						cell.classList.add("weekend");
					if (date === this.state.today.getDate() && year === this.state.today.getFullYear() && month === this.state.today.getMonth())
						cell.classList.add("today");
					date++;
				}
				cell.appendChild(day_div);
				cell.appendChild(event_div);
				row.appendChild(cell);
			}
			tbl.appendChild(row);
		}
		this.addEvents(month, year);
	}
	previous() {
		this.setState({
			currentYear: (this.state.currentMonth === 0) ? this.state.currentYear - 1 : this.state.currentYear,
			currentMonth: (this.state.currentMonth === 0) ? 11 : this.state.currentMonth - 1
		}, () => this.showCalendar(this.state.currentMonth, this.state.currentYear));
	}
	next() {
		this.setState({
			currentYear: (this.state.currentMonth === 11) ? this.state.currentYear + 1 : this.state.currentYear,
			currentMonth: (this.state.currentMonth + 1) % 12
		}, () => this.showCalendar(this.state.currentMonth, this.state.currentYear));
	}
	jumpToday() {
		this.setState({
			currentYear: this.state.today.getFullYear(),
			currentMonth: this.state.today.getMonth()
		}, () => this.showCalendar(this.state.currentMonth, this.state.currentYear));
	}
	addEvents(month, year) {
		this.state.calendar.forEach(event => {
			const [d, m, y] = event["DATA"].split('/');
			if (parseInt(m) === month+1 && parseInt(y) === year) {
				const wrap = document.getElementById("day-"+parseInt(d));
				const event_div = document.createElement("div");
				event_div.innerHTML = event["NOM CURT"];
				event_div.id = `event-${event['DATA']}@${event['HORA']}|${event['NOM CURT']}`;
				event_div.addEventListener('click', this.showEventInfo);
				event_div.style.backgroundColor = `var(${backgrounds[event['CATEGORIA']]})`;
				wrap.appendChild(event_div);
			}
		});
	}
	showEventInfo(e) {
		this.hideEventInfo();
		const diada = this.getEventById(e.target.id);

		const title = document.getElementById('event-name');
		const cat = document.getElementById('event-cat');
		const place = document.getElementById('event-lloc');
		const time = document.getElementById('event-hora');
		const desc = document.getElementById('event-desc');
		const link = document.getElementById('event-link');
		const panel = document.getElementById('info-panel');

		title.innerHTML = diada["NOM LLARG"];
		cat.style.backgroundColor = `var(${backgrounds[diada['CATEGORIA']]})`;
		cat.innerHTML = diada["CATEGORIA"];
		const ubi = diada["UBICACIÓ"] || null;
		const city = diada["POBLACIÓ"] || null;
		if (ubi || city) {
			place.innerHTML = "📍 ";
			if (ubi)
				place.innerHTML += ubi;
			if (ubi && city)
				place.innerHTML += ', ' + city;
			if (!ubi && city)
				place.innerHTML += city;
		} else
			place.innerHTML = "";
		if (diada["HORA"])
			time.innerHTML = "🕒 " + diada["DATA"] + " a les " + diada["HORA"];
		else
			time.innerHTML = "🕒 " + diada["DATA"];
		if (diada["DESCRIPCIÓ"]) {
			desc.style.display = "block";
			desc.innerHTML = diada["DESCRIPCIÓ"];
		} else
			desc.style.display = "none";
		if (diada["LINK"]) {
			link.style.display = "block";
			link.innerHTML = "🔗 ENLLAÇ";
			link.href = diada["LINK"];
		} else
			link.style.display = "none";
		panel.style.display = "block";
	}
	hideEventInfo() {
		const panel = document.getElementById('info-panel');
		panel.style.display = "none";
	}
	getEventById(id) {
		let event = null;
		this.state.calendar.forEach(e => (e["ID"] === id) ? event = e : 0);
		return event;
	}
	componentDidMount() {
		Papa.parse(CALENDAR_URL, {
			download: true,
			header: true,
			complete: (results) => {
				results.data.forEach(e => {
					e["ID"] = `event-${e['DATA']}@${e['HORA']}|${e['NOM CURT']}`;
				});
				this.setState({
					calendar: results.data
				}, this.firstLoad);
			}
		});
		
	}
	firstLoad() {
		this.showCalendar(this.state.currentMonth, this.state.currentYear);
	}
	render() {
		return (<>
			<section>
				<h2>Agenda</h2>

				<div id="calendar">
					<div className="table-wrap" style={{position: 'relative'}}>
						<div className="calendar">
							<div className="header">
								<button onClick={this.previous}><span>❮</span></button>
								<span id="monthAndYear"></span>
								<button onClick={this.next}><span>❯</span></button>
							</div>
							<table className="table table-bordered table-responsive-sm" id="calendar">
								<thead>
									<tr>
										<th>DL</th>
										<th>DT</th>
										<th>DC</th>
										<th>DJ</th>
										<th>DV</th>
										<th>DS</th>
										<th>DG</th>
									</tr>
								</thead>
								<tbody id="calendar-body">
								</tbody>
							</table>
							<button className="jump-today btn" onClick={this.jumpToday}>Ves a avui</button>
						</div>
						<div className="event-info" style={{display: "none"}} id="info-panel">
							{/* eslint-disable-next-line */}
							<h2 id="event-name"></h2>
							{/* eslint-disable-next-line */}
							<h4 id="event-cat"></h4>
							<p id="event-lloc"></p>
							<p id="event-hora"></p>
							<p id="event-desc"></p>
							{/* eslint-disable-next-line */}
							<a id="event-link" target="_blank"></a>
							<div className="close" onClick={this.hideEventInfo}></div>
						</div>
					</div>
				</div>
			</section>
		</>);
	}
}

export default Agenda;
