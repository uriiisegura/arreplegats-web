import React, { Component } from 'react';

class Legal extends Component {
	renderSection(s) {
		return (<>
			<h3>{s.titol}</h3>
			{
				s.text && this.renderText(s.text)
			}
			{
				s.articles && s.articles.map(a => {
					return (<>
						<h4>{a.titol}</h4>
						{
							a.text && this.renderText(a.text)
						}
						{
							a.components && a.components.map(c => {
								return this.renderComponent(c);
							})
						}
					</>);
				})
			}
		</>);
	}
	renderText(text) {
		return Array.isArray(text) ? text.map((p, i) => <p key={`legal-${this.props.title}-${this.props.doc.edicio}-p-${i}`}>{p}</p>) : <p>{text}</p>;
	}
	renderComponent(c) {
		let component;
		const props = c.props || {};

		if (c.text)
			component = React.createElement(c.type, props, c.text);
		else {
			const children = this.renderChildren(c);
			component = React.createElement(c.type, props, children);
		}
		return component;
	}
	renderChildren(parent) {
		if (parent.items)
			return parent.items.map(c => {
				return React.createElement("li", c.props || {}, c);
			});
		if (parent.components)
			return parent.components.map(c => {
				return this.renderComponent(c);
			});
		return [];
	}
	render() {
		return (<>
			<h2 className='legal-title'>{this.props.title}</h2>
			<h4>
				{
					new Date(this.props.doc.aprovats.data).toLocaleDateString('ca-ES', {
						year: 'numeric',
						month: 'long',
						day: 'numeric'
					})
				}, {this.props.doc.aprovats.lloc}
			</h4>
			{/* TODO: download button */}

			<div className='legal-doc'>
				{
					this.props.doc.seccions.map((s, i) => {
						return (<div key={`legal-${this.props.title}-${this.props.doc.edicio}-section-${i}`}>
							{this.renderSection(s)}
						</div>);
					})
				}
			</div>
		</>);
	}
}

export default Legal;
