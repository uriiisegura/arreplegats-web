import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Navbar extends Component {
	state = {
		height: document.documentElement.clientHeight,
		width: document.documentElement.clientWidth
	}
	showHide(id) {
		const submenu = document.getElementById(id);
		if (submenu !== null)
			submenu.classList.toggle('active');
	}
	expandMobile() {
		document.getElementById('nav-links').classList.toggle('show');
	}
	hideAll() {
		if (document.documentElement.clientHeight === this.state.height &&
			document.documentElement.clientWidth === this.state.width)
			return;
		this.setState({
			height: document.documentElement.clientHeight,
			width: document.documentElement.clientWidth
		});

		try {
			document.getElementById('nav-links').classList.remove('show');
		} catch {}
		const subs = document.getElementsByClassName('sub-menus');
		for (let e of subs)
			e.classList.remove('active');
	}
	render() {
		window.addEventListener('resize', this.hideAll.bind(this));

		return (<>
			<nav className="navbar">
				<div className="nav-center">
					<div className="nav-header">
						<NavLink to="/" className="nav-logo">
							<img src="/icon.png" alt="Arreplegats" />
						</NavLink>
						<NavLink to="/">
							<h3 className="header-name">
								<span>Arreplegats</span> de la<br />
								Zona Universitària
							</h3>
						</NavLink>
					</div>
					<div className="nav-btn">
						<button onClick={this.expandMobile}>
							<img src="/font-awesome/align-justify.svg" alt="align-justify.svg" />
						</button>
					</div>
					<ul id="nav-links">
						<li onClick={() => this.showHide('azus')} className="nav-link">
							<span><span>Castellers<img src="/font-awesome/caret-down.svg" alt="caret-down.svg" /></span></span>
							<div id="azus" className="sub-menus">
								<div className="sub-menu">
									<h4 className="sub-menu-title">La colla</h4>
									<ul>
										<li><NavLink to="/qui-som">Qui som?</NavLink></li>
										{/* <li><NavLink to="/agenda">Agenda</NavLink></li> */}
										{/* <li><NavLink to="/assajos">Assajos</NavLink></li> */}
										<li><NavLink to="/gralles-i-tabals">Gralles i tabals</NavLink></li>
										<li><NavLink to="/vida-universitaria">Vida universitària</NavLink></li>
									</ul>
								</div>
								<div className="sub-menu">
									<h4 className="sub-menu-title">Història</h4>
									<ul>
										<li><NavLink to="/historia-de-la-colla">Història de la colla</NavLink></li>
										<li><NavLink to="/llista-de-caps-de-colla">Llista de caps de colla</NavLink></li>
										<li><NavLink to="/llista-de-presidents">Llista de presidents</NavLink></li>
										<li><NavLink to="/els-castells-universitaris">Els castells universitaris</NavLink></li>
									</ul>
								</div>
								<div className="sub-menu">
									<h4 className="sub-menu-title">Castells</h4>
									<ul>
										<li><NavLink to="/millors-castells">Millors castells</NavLink></li>
										<li><NavLink to="/millors-diades">Millors diades</NavLink></li>
										<li><NavLink to="/resum-historic">Resum històric</NavLink></li>
										<li><NavLink to="/llista-de-diades">Llista de diades</NavLink></li>
									</ul>
								</div>
								<div className="sub-menu">
									<h4 className="sub-menu-title">Organització</h4>
									<ul>
										<li><NavLink to="/junta-directiva">Junta directiva</NavLink></li>
										<li><NavLink to="/junta-tecnica">Junta tècnica</NavLink></li>
									</ul>
								</div>
								<div className="sub-menu">
									<h4 className="sub-menu-title">Uneix-t'hi</h4>
									<ul>
										<li><NavLink to="/assajos">Vine a fer castells!</NavLink></li>
										<li><NavLink to="/patrocinadors">Patrocinadors</NavLink></li>
									</ul>
								</div>
							</div>
						</li>
						<li onClick={() => this.showHide('media')} className="nav-link">
							<span><span>Mèdia<img src="/font-awesome/caret-down.svg" alt="caret-down.svg" /></span></span>
							<div id="media" className="sub-menus">
								<div className="sub-menu">
									<ul>
										<li><NavLink to="/fotografies">Fotografies</NavLink></li>
										<li><NavLink to="/videos">Vídeos</NavLink></li>
										<li><NavLink to="/musica">Música</NavLink></li>
									</ul>
								</div>
							</div>
						</li>
						<li onClick={() => this.showHide('legal')} className="nav-link">
							<span><span>Legal<img src="/font-awesome/caret-down.svg" alt="caret-down.svg" /></span></span>
							<div id="legal" className="sub-menus">
								<div className="sub-menu">
									<ul>
										<li><NavLink to="/estatuts">Estatuts (2024)</NavLink></li>
										<li><NavLink to="/reglament-regim-intern">Reglament de Règim Intern (2023)</NavLink></li>
										<li><NavLink to="/protocol-agressions">Protocol d'agressions (2022)</NavLink></li>
									</ul>
								</div>
							</div>
						</li>
						<li className="nav-link"><NavLink to="/jocs"><span>Jocs</span></NavLink></li>
						<li className="nav-link"><NavLink to="/contactar"><span>Contacta'ns</span></NavLink></li>
						{/* <li className="nav-link"><a href="https://contractacions.arreplegats.cat" target="_blank" rel="noreferrer"><span>Contractacions</span></a></li> */}
						<li className="nav-link join-btn"><NavLink to="/assajos"><span>Uneix-t'hi</span></NavLink></li>
					</ul>
				</div>
			</nav>
		</>);
	}
}

export default Navbar;
