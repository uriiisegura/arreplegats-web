import React, { Component } from "react";

class Contactar extends Component {
	render() {
		return (<>
			<section>
				<h2>Contacta'ns</h2>

				<form className="contact-form" action="mailto:junta.arreplegats@gmail.com">
					<label className="required">Subjecte</label>
					<input type="text" name="subject" required />
					<label className="required">Missatge</label>
					<textarea name="body" required />

					<button className="btn" type="submit">Envia</button>
				</form>
			</section>
		</>);
	}
}

export default Contactar;
