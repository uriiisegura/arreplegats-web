import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Navbar extends Component {
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
					<div className="nav-links">
						<NavLink to="/a" className="nav-link">AZU's</NavLink>
						<NavLink to="/b" className="nav-link">Agenda</NavLink>
						<NavLink to="/c" className="nav-link">Notícies</NavLink>
						<NavLink to="/d" className="nav-link">Mèdia</NavLink>
						<NavLink to="/e" className="nav-link">Contacte</NavLink>
						<NavLink to="/f" className="nav-link">Contractacions</NavLink>
					</div>
				</div>
			</nav>
		</>);
	}
}

export default Navbar;
