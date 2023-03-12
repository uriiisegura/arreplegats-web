import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class HistoriaDeLaColla extends Component {
	render() {
		return (<>
			<section className="historia">
                <h2>Història de la colla</h2>

                <h5>Els inicis</h5>
                <p>
                    Fundats a la primavera de 1995, els Arreplegats de la Zona Universitària vam ser la segona colla castellera universitària en aparèixer. Ja des del primer moment vam apostar per només castells complets, sempre amb acotxador i enxaneta. El mateix maig del 1995 es va carregar el primer pilar de quatre, i a inicis de l'any següent van arribar els primers castells de sis: 4 de 6 descarregat i 3 de 6 carregat.
                </p>
                <p>
                    Durant la temporada 1997-1998, vam completar pràcticament tota la resta de castells de 6: torre de 6 i 3 de 6 aixecat per sota; i van carregar el primer castell de set, un 4 de 7 el maig de 1998, que es descarregà durant la temporada següent. El 3 de 7 es va fer esperar més, sent el primer descarregat al final de la temporada 2000-2001. El següent any, es va carregar el primer 4 de 7 amb l'agulla, descarregat un any després. La temporada 2003-2004 va acabar amb dos nous castells: el <NavLink to="/castells/5d7">5 de 7</NavLink> i la torre de 7 amb folre, ambdós descarregats. El següent castell amb folre va arribar durant la temporada 2006-2007, quan vam carregar el primer pilar de 6 amb folre de la història castellera universitària. Aquest castell finalment es va descarregar a les acaballes de la temporada 2007-2008, en la Diada de Primavera dels Ganàpies de l'Autònoma.
                </p>
            </section>
            <section className="image-divider" style={{backgroundImage: `url('images/pd7fm-construccio-2022.jpg')`}}></section>
            <section className="historia">
                <h5>L'època d'or</h5>
                <p>
                    La temporada 2008-2009 va estar marcada pel domini absolut de la gamma de castells de set i de set i mig, duts a diverses places. Aquest alt nivell va permetre la colla assolir a finals de temporada l'èxit més sonat, descarregant en la mateixa actuació dos castells universitaris inèdits: el <NavLink to="/castells/3d7s">3 de 7 per sota</NavLink> i el <NavLink to="/castells/4d8">4 de 8</NavLink>. Aquest últim es va convertir en el primer castell de vuit pisos fet mai per una colla castellera universitària.
                </p>
            </section>
            <section className="image-divider" style={{backgroundImage: `url('images/3d8f-sentiment-2022.jpg')`}}></section>
            <section className="historia">
                <h5>Represa després de la COVID-19</h5>
                <p>
                    ...
                </p>
            </section>
		</>);
	}
}

export default HistoriaDeLaColla;
