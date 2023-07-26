import React, { Component } from "react";

class CastellSelector extends Component {
	constructor(props) {
		super(props);
		this.state = {
			structures: {
				1: {
					component: 'Pd',
					name: 'Pilar'
				},
				2: {
					component: 'Td',
					name: 'Torre'
				},
				3: {
					component: '3d',
					name: 'Tres'
				},
				4: {
					component: '4d',
					name: 'Quatre'
				},
				5: {
					component: '5d',
					name: 'Cinc'
				},
				7: {
					component: '7d',
					name: 'Set'
				},
				9: {
					component: '9d',
					name: 'Nou'
				},
				10: {
					component: '10d',
					name: 'Deu'
				}
			},
			from_group: null
		};
	}
	setGroup(group) {
		this.setState({from_group: this.props.castells.filter(c => c.castell.includes(group))});
	}
	unsetGroup() {
		this.setState({from_group: null});
	}
	selectCastell(castell) {
		this.props.onSelectCastell(castell);
	}
	render() {
		return (
			<div className="game-castell-selector">
				<h4>Escull un castell</h4>
				<div className="box-wrap">
					{
						this.state.from_group ? <>
							{
								this.state.from_group.map((c, i) => {
									const blocked = c.gent > this.props.castellers;
									return <div className={`${blocked ? 'disabled' : ''}`} onClick={() => this.selectCastell(c.castell)} key={i}>
										<span className="castell">
											{c.castell}
											{
												blocked && <><br /><span className="gent">{c.gent} persones</span></>
											}
										</span>
									</div>;
								})
							}
						</> : <>
							{
								Object.values(this.state.structures).map((v, i) => {
									return <div onClick={() => this.setGroup(v.component)} key={i}>
										<span className="castell">{v.name}</span>
									</div>;
								})
							}
						</>
					}
				</div>
				{
					this.state.from_group && <button className="back-btn" onClick={this.unsetGroup.bind(this)}>ENRERE</button>
				}
			</div>
		);
	}
}

export default CastellSelector;
