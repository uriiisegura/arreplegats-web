import React, { Component } from "react";

class BarraLliure extends Component {
	getCookie(name) {
		const cookies = document.cookie.split(';');
		for (let cookie of cookies) {
			const [k, v] = cookie.split('=');
			if (k.trim() === name)
				return v.split(',')[0];
		}
		return null;
	}
	render() {
		let code = this.getCookie('code');
		let secret_p1 = this.getCookie('secret_p1');
		let secret_p2 = this.getCookie('secret_p2');
		if (code === null || secret_p1 === null || secret_p2 === null) {
			code = Math.floor(Math.random() * 10000000000000);
			secret_p1 = Math.floor(Math.random() * 10000000000000);
			secret_p2 = Math.floor(Math.random() * 10000000000000);
			document.cookie = `code=${code},secure`;
			document.cookie = `secret_p1=${secret_p1}`;
			document.cookie = `secret_p2=${secret_p2},secure`;
		}

		return (<>
			<section>
				<div className="confirmation">
					<img src="/confirmation.png" alt="Confirmation" />
					<h3>S'ha generat un codi únic per a que puguis accedir a la barra lliure durant l'animació de la <span>XXVIII Diada dels Arreplegats de la Zona Universitària</span>, gaudeix de la festa!</h3>
				</div>
				<div className="barcode-wrap">
					<div className="barcode">
						{
							String(code).split('').map((d, i) => {
								return <div key={i} className="bar" style={{width: `${parseInt(d)+1}px`}}></div>;
							})
						}
						{
							String(secret_p1).split('').map((d, i) => {
								return <div key={i} className="bar" style={{width: `${parseInt(d)+1}px`}}></div>;
							})
						}
						{
							String(secret_p2).split('').map((d, i) => {
								return <div key={i} className="bar" style={{width: `${parseInt(d)+1}px`}}></div>;
							})
						}
					</div>
					<p>{code}</p>
				</div>
			</section>
		</>);
	}
}

export default BarraLliure;
