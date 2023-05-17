import React, { Component } from "react";

class Quote extends Component {
	render() {
		return (
			<div className="quote">
				<p>{this.props.quote}</p>
				<h4>{this.props.author}</h4>
			</div>
		);
	}
}

export default Quote;
