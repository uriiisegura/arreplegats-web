import React, { Component } from "react";

class Contactar extends Component {
	render() {
		return (<>
			<section>
				<h2>Contactar</h2>

				<form className="contact-form" action="mailto:junta.arreplegats@gmail.com">
					<label className="required">{this.props.subject}</label>
					<input type="text" name="subject" required />
					<label className="required">{this.props.text}</label>
					<textarea name="body" required />

					<button style={{textTransform: 'none'}} className="btn" type="submit">Parla amb nosaltres</button>
				</form>
			</section>
		</>);
	}
}

export default Contactar;
