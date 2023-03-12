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
            <section className="image-divider" style={{backgroundImage: `url('images/3d8f-sant-albert.jpg')`}}></section>
            <section className="historia">
                <h5>Els únics que ho poden fer</h5>
                <p>
                    La temporada 2008-2009 va estar marcada pel domini absolut de la gamma de castells de set i de set i mig, duts a diverses places. Aquest alt nivell va permetre la colla assolir a finals de temporada l'èxit més sonat, descarregant en la mateixa actuació dos castells universitaris inèdits: el <NavLink to="/castells/3d7s">3 de 7 per sota</NavLink> i el <NavLink to="/castells/4d8sf">4 de 8</NavLink>. Aquest últim es va convertir en el primer castell de vuit pisos fet mai per una colla castellera universitària.
                </p>
                <p>
                    La gran revolució va venir el 2010, quan ens atrevíem a portar a plaça les primeres manilles universitàries de la mà del <NavLink to="/castells/Pd7fm">pilar de 7 amb folre i manilles</NavLink>. El vam haver de deixar en carregat, però no ens vam rendir, i el maig del 2013 el descarregàvem finalment.
                </p>
                <p>
                    No gaire més tard, l'hivern del 2014, vam portar a la Diada dels Ganàpies de la UAB el primer <NavLink to="/castells/3d8f">3 de 8 amb folre</NavLink> del món universitari, que veia com es feia història un altre cop en descarregar aquest castell fins aleshores inèdit. Aquell mateix desembre, pel nostre 19è Aniversari, sorpreníem el món sencer obrint plaça amb el <NavLink to="/castells/Vd6f">vano de 6</NavLink>.
                </p>
            </section>
            <section className="image-divider" style={{backgroundImage: `url('images/pd7fm-construccio-2022.jpg')`}}></section>
            <section className="historia">
                <h5>L'època d'or</h5>
                <p>
                    La següent temporada els Arreplegats vam seguir escribint la història dels castells. El maig de 2015, en la nostra 20a Diada, vam descarregar el primer <NavLink to="/castells/9d7">9 de 7</NavLink> universitari que mai ningú ha tornat a intentar.
                </p>
                <p>
                    Aquests anys vam dominar tots els grans castells. Podiem fer, amb relativa facilitat, els castells més complicats del món casteller universitari, castells que ningú ha pogut igualar encara. Vam passejar per tot arreu els ja esmentats <NavLink to="/castells/3d8f">3 de 8 amb folre</NavLink>, <NavLink to="/castells/3d7s">3 de 7 per sota</NavLink>, <NavLink to="/castells/5d7">5 de 7</NavLink>, i <NavLink to="/castells/4d8sf">4 de 8</NavLink> demostrant per totes les places on passàvem en nostre domini.
                </p>
                <p>
                    Aquesta època gloriosa va assolir el seu punt més àlgid el 5 de maig del 2016, on vam juntar el <NavLink to="/castells/3d8f">3 de 8 amb folre</NavLink>, el <NavLink to="/castells/4d8sf">4 de 8</NavLink>, i vam carregar la inèdita <NavLink to="/castells/Td8fm">torre de 8 amb folre i manilles</NavLink> en una diada històrica.
                </p>
            </section>
            <section className="image-divider" style={{backgroundImage: `url('images/3d8f-sentiment-2022.jpg')`}}></section>
            <section className="historia">
                <h5>Represa després de la COVID-19</h5>
                <p>
                    En reprendre l'activitat castellera després del confinament, hi havia folta feina a fer. Renovació, formació, recaptació de nous castellers, etc. Va ser un procès llarg però no per això el vam encarar amb menys il·lusió.
                </p>
                <p>
                    La diada més important des d'aleshores ha estat el nostre 27è Aniversari, el 22 de desembre de 2022. Després d'una gran temporada amb molta formació, vam poder conrear els fruits de tota la feina feta, i vam fer en la mateixa diada el primer <NavLink to="/castells/5d7">5 de 7</NavLink> universitari post-COVID, el primer <NavLink to="/castells/3d8f">3 de 8 amb folre</NavLink> universitari post-COVID, la nostra quarta torre de 7 amb folre de la temporada, i vam carregar el <NavLink to="/castells/Pd7fm">pilar de 7 amb folre i manilles</NavLink>. Aquest pilar no només eren les primeres manilles universitàries post-COVID, sinó que també ens va convertir en la sisena colla global en fer unes manilles després de la pandèmia.
                </p>
            </section>
		</>);
	}
}

export default HistoriaDeLaColla;
