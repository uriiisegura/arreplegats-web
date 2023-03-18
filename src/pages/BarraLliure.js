import React, { Component } from "react";

class BarraLliure extends Component {
	getCookie(name) {
		const cookies = document.cookie.split(';');
		for (let cookie of cookies) {
			const [k, v] = cookie.split('=');
			if (k.trim() === name) return v;
		}
		return null;
	}
	deleteAllCookies() {
		const cookies = document.cookie.split(";");
	
		for (let i = 0; i < cookies.length; i++) {
			const cookie = cookies[i];
			const eqPos = cookie.indexOf("=");
			const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
			document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
		}
	}
	componentDidMount() {
	}
	render() {
		let codeOne = this.getCookie('codeOne');
		let codeTwo = this.getCookie('codeTwo');
		let codeThree = this.getCookie('codeThree');
		if (codeOne === null || codeTwo === null || codeThree === null) {
			codeOne = Math.floor(Math.random() * 10000000000000);
			codeTwo = Math.floor(Math.random() * 10000000000000);
			codeThree = Math.floor(Math.random() * 10000000000000);
			document.cookie = 'codeOne='+codeOne;
			document.cookie = 'codeTwo='+codeTwo;
			document.cookie = 'codeThree='+codeThree;
		}

		return (<>
			<section>
				<div className="barcode-wrap">
					<div className="barcode">
						{
							String(codeOne).split('').map(d => {
								return <div className="bar" style={{width: `${parseInt(d)+1}px`}}></div>;
							})
						}
						{
							String(codeTwo).split('').map(d => {
								return <div className="bar" style={{width: `${parseInt(d)+1}px`}}></div>;
							})
						}
						{
							String(codeThree).split('').map(d => {
								return <div className="bar" style={{width: `${parseInt(d)+1}px`}}></div>;
							})
						}
					</div>
					<p>{codeOne}</p>
				</div>
			</section>
		</>);
	}
}

export default BarraLliure;
