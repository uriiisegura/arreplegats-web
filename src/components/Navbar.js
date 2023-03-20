import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Navbar extends Component {
    showHide(id) {
        const submenu = document.getElementById(id);
        if (submenu !== null)
            submenu.classList.toggle('active');
    }
    expandMobile() {
        const nav = document.getElementById('nav-links');
        nav.classList.toggle('show');
    }
	render() {
		return (<>
			<nav className="navbar">
				<div className="nav-center">
					<div className="nav-header">
						<NavLink to="/" className="nav-logo">
							<img src="icon.png" alt="Arreplegats" />
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
                            <img src="font-awesome/align-justify.svg" alt="" />
                        </button>
                    </div>
					<ul id="nav-links">
						<li onClick={() => this.showHide('azus')} className="nav-link">
                            <span>AZU's<img src="font-awesome/caret-down.svg" alt="" /></span>
                            <div id="azus" className="sub-menus">
                                <div className="sub-menu">
                                    <h4 className="sub-menu-title">La colla</h4>
                                    <ul>
                                        <li><NavLink to="/qui-som">Qui som?</NavLink></li>
                                        <li><NavLink to="/assajos">Assajos</NavLink></li>
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
                                        <li><NavLink to="/comissio-tecnica">Comissió tècnica</NavLink></li>
                                    </ul>
                                </div>
                            </div>
                        </li>
						<li className="nav-link"><NavLink to="/agenda">Agenda</NavLink></li>
						<li className="nav-link"><NavLink to="/noticies">Notícies</NavLink></li>
						<li onClick={() => this.showHide('media')} className="nav-link">
                            <span>Mèdia<img src="font-awesome/caret-down.svg" alt="" /></span>
                            <div id="media" className="sub-menus">
                                <div className="sub-menu">
                                    <h4 className="sub-menu-title">Arxius multimèdia</h4>
                                    <ul>
                                        <li><NavLink to="/fotografies">Fotografies</NavLink></li>
                                        <li><NavLink to="/videos">Vídeos</NavLink></li>
                                        <li><NavLink to="/arreplegator">L'Arreplegator</NavLink></li>
                                    </ul>
                                </div>
                            </div>
                        </li>
						<li className="nav-link"><NavLink to="/contacte">Contacte</NavLink></li>
						<li className="nav-link"><NavLink to="/contractacions">Contractacions</NavLink></li>
                        <li className="nav-link join-btn"><NavLink to="/uneixthi">Uneix-t'hi</NavLink></li>
					</ul>
				</div>
			</nav>
		</>);
	}
}

export default Navbar;
