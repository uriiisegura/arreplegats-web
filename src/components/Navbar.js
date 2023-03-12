import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Navbar extends Component {
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
							<img src="logo.png" alt="Arreplegats" />
						</NavLink>
						<h3 className="header-name">
							<span>Arreplegats</span> de la<br />
							Zona Universitària
						</h3>
					</div>
                    <div className="nav-btn">
                        <button onClick={this.expandMobile}>
                            <img src="font-awesome/align-justify.svg" alt="" />
                        </button>
                    </div>
					<ul id="nav-links">
						<li className="nav-link">
                            <span>AZU's<img src="font-awesome/caret-down.svg" alt="" /></span>
                            <div className="sub-menus">
                                <div className="sub-menu">
                                    <h4 className="sub-menu-title">La colla</h4>
                                    <ul>
                                        <li><NavLink to="/qui-som">Qui som?</NavLink></li>
                                        <li><NavLink to="/assajos">Assajos</NavLink></li>
                                        <li><NavLink to="/ab">Gralles i tabals</NavLink></li>
                                        <li><NavLink to="/ac">Vida universitària</NavLink></li>
                                    </ul>
                                </div>
                                <div className="sub-menu">
                                    <h4 className="sub-menu-title">Història</h4>
                                    <ul>
                                        <li><NavLink to="/historia-de-la-colla">Història de la colla</NavLink></li>
                                        <li><NavLink to="/ae">Llista de caps de colla</NavLink></li>
                                        <li><NavLink to="/af">Llista de presidents</NavLink></li>
                                        <li><NavLink to="/ag">Els castells universitaris</NavLink></li>
                                    </ul>
                                </div>
                                <div className="sub-menu">
                                    <h4 className="sub-menu-title">Castells</h4>
                                    <ul>
                                        <li><NavLink to="/millors-castells">Millors castells</NavLink></li>
                                        <li><NavLink to="/ai">Millors diades</NavLink></li>
                                        <li><NavLink to="/aj">Resum històric</NavLink></li>
                                        <li><NavLink to="/ak">Llista de diades</NavLink></li>
                                    </ul>
                                </div>
                                <div className="sub-menu">
                                    <h4 className="sub-menu-title">Organització</h4>
                                    <ul>
                                        <li><NavLink to="/al">Junta tècnica</NavLink></li>
                                        <li><NavLink to="/am">Junta directiva</NavLink></li>
                                    </ul>
                                </div>
                            </div>
                        </li>
						<li className="nav-link"><NavLink to="/b">Agenda</NavLink></li>
						<li className="nav-link"><NavLink to="/c">Notícies</NavLink></li>
						<li className="nav-link">
                            <span>Mèdia<img src="font-awesome/caret-down.svg" alt="" /></span>
                            <div className="sub-menus">
                                <div className="sub-menu">
                                    <h4 className="sub-menu-title">Arxius multimèdia</h4>
                                    <ul>
                                        <li><NavLink to="/ba">Fotografies</NavLink></li>
                                        <li><NavLink to="/bb">Vídeos</NavLink></li>
                                        <li><NavLink to="/bc">L'Arreplegator</NavLink></li>
                                    </ul>
                                </div>
                            </div>
                        </li>
						<li className="nav-link"><NavLink to="/e">Contacte</NavLink></li>
						<li className="nav-link"><NavLink to="/f">Contractacions</NavLink></li>
					</ul>
				</div>
			</nav>
		</>);
	}
}

export default Navbar;
