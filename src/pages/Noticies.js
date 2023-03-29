import React, { Component } from "react";

class Noticies extends Component {
	render() {
		const { noticies } = this.props;

		if (noticies.length === undefined)
			return <></>;

		return (<>
			<section>
				<h2>Notícies</h2>

				<div className="news-wrap">
					{
						noticies.map((e, i) => {
							return <div className="news" key={i}>
								<div className="info">
									<h3>{e.TITOL}</h3>
									<h6>{e.DIA} {e.HORA}</h6>
								</div>
								<h4>{e.SUBTITOL}</h4>
								<p>{e.NOTICIA}</p>
							</div>;
						})
					}
				</div>
			</section>
		</>);
	}
}

export default Noticies;
