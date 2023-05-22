import React, { Component } from "react";
import ValidateEmail from "../functions/ValidateEmail";

class APPsistenciaLogIn extends Component {
	state = {
		warning: null,
		error: null,
		ok: false
	}
	resetAll() {
		this.setState({warning: null});
	}
	sendRequest() {
		this.resetAll();
		const email = document.getElementById('email').value;
		const bday = document.getElementById('bday').value;
		if (!ValidateEmail(email)) {
			this.setState({warning: 'El correu electrònic no és valid.'});
			return;
		}
		if (isNaN(new Date(bday))) {
			this.setState({warning: 'La data introduida no és vàlida.'});
			return;
		}
		fetch('https://arreplegats.appsistencia.cat/app.php', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: `accio=sendCodeAddCastellerToDevice&regid=&playerid=&colla=arreplegats&version=4&id_dispositiu=&data[]=${email}&data[]=${bday}`
		})
		.then(r => {
			return r.text();
		})
		.then(r => {
			if (r.includes('ok')) {
				this.setState({ok: true});
			} else {
				this.setState({error: r.replace('ERROR: ', '')});
			}
		});
	}
	checkCode() {
		this.resetAll();
		const email = document.getElementById('email').value;
		const bday = document.getElementById('bday').value;
		const code = document.getElementById('code').value;
		if (isNaN(code)) {
			this.setState({error: 'El format del codi no és correcte.'});
			return;
		}
		fetch('https://arreplegats.appsistencia.cat/app.php', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: `accio=registerDevice&regid=&playerid=&colla=arreplegats&version=4&id_dispositiu=&data[]=&data[]=${email}&data[]=${bday}&data[]=${code}`
		})
		.then(r => {
			return r.text();
		})
		.then(r => {
			if (r.includes('ok')) {
				document.cookie = 'isLogged=true,secure';
				window.location.reload(false);
			} else {
				this.setState({error: r.replace('ERROR: ', '')});
			}
		});
	}
	render() {
		return (<>
			<section className="appsistencia-login">
				<h1>Inicia sessió</h1>
				<p>
					Per iniciar sessió has d'utilitzar les dades de l'APPsistència.
				</p>
				{
					this.state.warning ? <div className="message warning">
						<span>{this.state.warning}</span>
					</div> : <></>
				}
				{
					this.state.error ? <div className="message error">
						<span>{this.state.error}</span>
					</div> : <></>
				}
				<form style={{display: this.state.ok ? 'none' : 'block'}}>
					<input id="email" type="email" placeholder="Correu electrònic" />
					<input id="bday" type="text" placeholder="Data de naixement" onFocus={(e) => { e.target.type = 'date'; }} onBlur={(e) => { if (e.target.value.length === 0) e.target.type = 'text'; }} />
					<button id="btn" className="btn" type="submit" onClick={this.sendRequest.bind(this)}>Envia</button> 
				</form>
				{
					this.state.ok ? <><div className="message info">
						<span>S'ha enviat un codi de verificació per correu electrònic.</span>
					</div>
					<form>
						<input id="code" type="number" placeholder="Codi" />
						<button className="btn" type="submit" onClick={this.checkCode.bind(this)}>Envia</button> 
					</form></> : <></>
				}
			</section>
		</>);
	}
}

export default APPsistenciaLogIn;
