import React, { Component } from "react";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";
import castells_map from "../data/castells-top.json";

function withParams(Component) {
	return props => <Component {...props} params={useParams()} />;
}

class Castell extends Component {
	constructor(props) {
		super(props);
		this.state = {
			slide: 1
		};
	}
	plusSlides(n) {
		let slides = document.getElementsByClassName('slide');
		let new_n = this.state.slide + n;
		if (new_n > slides.length) new_n = 1;
		if (new_n < 1) new_n = slides.length;
		this.setState({
			slide: new_n
		}, this.showSlide);
	}
	currentSlide(n) {
		this.setState({
			slide: n
		}, this.showSlide);
	}
	showSlide() {
		let slides = document.getElementsByClassName('slide');
		let dots = document.getElementsByClassName('dot');

		for (let i = 0; i < slides.length; i++)
			slides[i].style.display = 'none';
		for (let i = 0; i < dots.length; i++)
			dots[i].className = dots[i].className.replace(' active', '');

		slides[this.state.slide-1].style.display = 'block';
		dots[this.state.slide-1].className += ' active';
	}
	render() {
		const { castell } = this.props.params;
		const data = castells_map[castell];

		if (data === undefined)
			return <NotFound />;

		return (<>
			<section>
				<h2>{data.name}</h2>
				{data.gallery ? <>
				<div id="slideshow" className="slideshow-container">
					<div className="slideshow">
						{
							data.gallery.map((e, i) => {
								return (<div key={`image-${i}`} className="slide" style={{display: i === 0 ? 'block' : 'none'}}>
									<div className="counter">{i+1} / {data.gallery.length}</div>
									<img className="slide-img" src={e.link} alt={data.name} />
									<div className="caption">{e.caption}</div>
								</div>);
							})
						}
						<span className="prev" onClick={() => this.plusSlides(-1)}>❮</span>
						<span className="next" onClick={() => this.plusSlides(1)}>❯</span>
					</div>
					<div className="slid-dot-container">
						{
							data.gallery.map((_, i) => {
								return <span key={`dot-${i}`} className={`dot ${i === 0 ? ' active' : ''}`} onClick={() => this.currentSlide(i+1)}>{i+1}</span>;
							})
						}
					</div>
				</div></>
				: <img className="top-img" src={data.link} alt={data.name} />}
				{
					data.text.map((e, i) => {
						return <p key={`par-${i}`}>{e}</p>;
					})
				}
			</section>
		</>);
	}
}

export default withParams(Castell);
