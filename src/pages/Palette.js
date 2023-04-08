import { Component } from "react";

class Palette extends Component {
	render() {
		return (<>
			<section>
				<h2>Color palette</h2>

				<div className="palette">
					<div>
						<div style={{backgroundColor: 'var(--primary-100)'}}></div>
						<div style={{backgroundColor: 'var(--primary-200)'}}></div>
						<div style={{backgroundColor: 'var(--primary-300)'}}></div>
						<div style={{backgroundColor: 'var(--primary-400)'}}></div>
						<div style={{backgroundColor: 'var(--primary-500)'}}></div>
						<div style={{backgroundColor: 'var(--primary-600)'}}></div>
						<div style={{backgroundColor: 'var(--primary-700)'}}></div>
						<div style={{backgroundColor: 'var(--primary-800)'}}></div>
						<div style={{backgroundColor: 'var(--primary-900)'}}></div>
					</div>
					<div>
						<div style={{backgroundColor: 'var(--secondary-100)'}}></div>
						<div style={{backgroundColor: 'var(--secondary-200)'}}></div>
						<div style={{backgroundColor: 'var(--secondary-300)'}}></div>
						<div style={{backgroundColor: 'var(--secondary-400)'}}></div>
						<div style={{backgroundColor: 'var(--secondary-500)'}}></div>
						<div style={{backgroundColor: 'var(--secondary-600)'}}></div>
						<div style={{backgroundColor: 'var(--secondary-700)'}}></div>
						<div style={{backgroundColor: 'var(--secondary-800)'}}></div>
						<div style={{backgroundColor: 'var(--secondary-900)'}}></div>
					</div>
				</div>
			</section>
		</>);
	}
}

export default Palette;
