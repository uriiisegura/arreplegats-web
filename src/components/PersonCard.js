import React, { Component } from "react";

class PersonCard extends Component {
	render() {
        let years = [];
        for (let i = 0; i < this.props.from.length; i++) {
            if (this.props.from[i] === this.props.to[i] || this.props.to[i] === null)
                years.push(this.props.from[i]);
            else
                years.push(this.props.from[i] + '-' + this.props.to[i]);
        }

		return (
			<div className="person-card">
                <div className="person-img" style={{backgroundImage: `url(${this.props.link})`}}></div>
                <h4>{this.props.name} {this.props.mote === undefined ? <></> : <span>{this.props.mote}</span>}</h4>
                <h6>{years.join(', ')}</h6>
                {
                    this.props.text.map(e => {
                        return <p>{e}</p>;
                    })
                }
			</div>
		);
	}
}

export default PersonCard;
