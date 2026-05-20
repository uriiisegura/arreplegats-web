import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const DEFAULT_META = {
	title: "Arreplegats",
	description: "Web oficial dels Arreplegats de la Zona Universitària, colla castellera universitària de Barcelona.",
};

const ROUTE_META = {
	"": {
		title: "Inici - Arreplegats",
		description: "Web oficial dels Arreplegats de la Zona Universitària: castells universitaris, assajos, agenda i vida de la colla.",
	},
	"qui-som": {
		title: "Qui Som - Arreplegats",
		description: "Coneix els Arreplegats de la Zona Universitària, una colla castellera universitària de Barcelona amb més de 25 anys d'història.",
	},
	agenda: {
		title: "Agenda - Arreplegats",
		description: "Consulta l'agenda d'assajos, activitats i actuacions dels Arreplegats de la Zona Universitària.",
	},
	assajos: {
		title: "Assajos - Arreplegats",
		description: "Vine als assajos dels Arreplegats: dimarts i dijous al migdia a l'ETSEIB i dijous al vespre amb Castellers de Sants.",
	},
	"gralles-i-tabals": {
		title: "Gralles i Tabals - Arreplegats",
		description: "Descobreix el grup de gralles i tabals dels Arreplegats i la música que acompanya els castells universitaris.",
	},
	"vida-universitaria": {
		title: "Vida Universitària - Arreplegats",
		description: "Activitats, convivència i vida universitària al voltant de la colla castellera Arreplegats de la Zona Universitària.",
	},
	"historia-de-la-colla": {
		title: "Història de la Colla - Arreplegats",
		description: "Repàs de la història dels Arreplegats, des de la fundació el 1995 fins als grans castells universitaris.",
	},
	"llista-de-caps-de-colla": {
		title: "Llista de Caps de Colla - Arreplegats",
		description: "Llista històrica de caps de colla dels Arreplegats de la Zona Universitària.",
	},
	"llista-de-presidents": {
		title: "Llista de Presidents - Arreplegats",
		description: "Llista històrica de presidents i presidentes dels Arreplegats de la Zona Universitària.",
	},
	"els-castells-universitaris": {
		title: "Els Castells Universitaris - Arreplegats",
		description: "Història i evolució dels castells universitaris, amb els principals fets i colles del món casteller universitari.",
	},
	"millors-castells": {
		title: "Millors Castells - Arreplegats",
		description: "Consulta els millors castells descarregats i carregats pels Arreplegats de la Zona Universitària.",
	},
	castells: {
		title: "Castell - Arreplegats",
		description: "Fitxa d'un castell dels Arreplegats amb imatges, informació i context històric de la construcció.",
	},
	"millors-diades": {
		title: "Millors Diades - Arreplegats",
		description: "Rànquing de les millors diades dels Arreplegats segons les puntuacions del Baròmetre Universitari.",
	},
	"resum-historic": {
		title: "Resum Històric - Arreplegats",
		description: "Resum històric de temporades, castells i actuacions dels Arreplegats de la Zona Universitària.",
	},
	"llista-de-diades": {
		title: "Llista de Diades - Arreplegats",
		description: "Consulta la llista de diades i actuacions dels Arreplegats amb els castells de cada jornada.",
	},
	"junta-directiva": {
		title: "Junta Directiva - Arreplegats",
		description: "Equip de junta directiva dels Arreplegats de la Zona Universitària.",
	},
	"junta-tecnica": {
		title: "Junta Tècnica - Arreplegats",
		description: "Equip de junta tècnica dels Arreplegats de la Zona Universitària.",
	},
	"comissio-genere-grup-treball": {
		title: "Comissió de Gènere - Arreplegats",
		description: "Comissió de gènere i grup de treball dels Arreplegats de la Zona Universitària.",
	},
	patrocinadors: {
		title: "Patrocinadors - Arreplegats",
		description: "Patrocinadors, col·laboradors i entitats que donen suport als Arreplegats de la Zona Universitària.",
	},
	fotografies: {
		title: "Fotografies - Arreplegats",
		description: "Galeria fotogràfica dels Arreplegats de la Zona Universitària.",
	},
	videos: {
		title: "Vídeos - Arreplegats",
		description: "Vídeos de castells, actuacions i continguts dels Arreplegats de la Zona Universitària.",
	},
	musica: {
		title: "Música - Arreplegats",
		description: "Cançons, partitures i música dels Arreplegats de la Zona Universitària.",
	},
	estatuts: {
		title: "Estatuts - Arreplegats",
		description: "Estatuts vigents i documents històrics dels Arreplegats de la Zona Universitària.",
	},
	"reglament-regim-intern": {
		title: "Reglament Règim Intern - Arreplegats",
		description: "Reglament de règim intern dels Arreplegats de la Zona Universitària.",
	},
	"protocol-agressions": {
		title: "Protocol Agressions - Arreplegats",
		description: "Protocol d'agressions i documents de prevenció dels Arreplegats de la Zona Universitària.",
	},
	jocs: {
		title: "Jocs - Arreplegats",
		description: "Jocs i activitats interactives dels Arreplegats sobre castells i cultura de la colla.",
	},
	"sopa-de-lletres": {
		title: "Sopa de Lletres - Arreplegats",
		description: "Sopa de lletres dels Arreplegats amb vocabulari de castells i de la colla.",
	},
	"mots-encreuats": {
		title: "Mots Encreuats - Arreplegats",
		description: "Mots encreuats dels Arreplegats amb pistes sobre castells, música i vida universitària.",
	},
	memory: {
		title: "Memory - Arreplegats",
		description: "Joc de memory dels Arreplegats amb elements del món casteller universitari.",
	},
	penjat: {
		title: "Penjat - Arreplegats",
		description: "Joc del penjat dels Arreplegats amb paraules relacionades amb castells i la colla.",
	},
	contactar: {
		title: "Contactar - Arreplegats",
		description: "Contacta amb els Arreplegats de la Zona Universitària per correu electrònic o xarxes socials.",
	},
	"barra-lliure": {
		title: "Barra Lliure - Arreplegats",
		description: "Pàgina de barra lliure dels Arreplegats de la Zona Universitària.",
	},
	"parts-castell": {
		title: "Parts Castell - Arreplegats",
		description: "Aprèn les parts principals d'un castell amb els Arreplegats de la Zona Universitària.",
	},
	"nit-fresca-per-ser-maig": {
		title: "Una Nit de Maig - Arreplegats",
		description: "Informació de l'esdeveniment Una Nit de Maig dels Arreplegats de la Zona Universitària.",
	},
	palette: {
		title: "Palette - Arreplegats",
		description: "Paleta de colors dels Arreplegats de la Zona Universitària.",
	},
	"joc-castells": {
		title: "Joc Castells - Arreplegats",
		description: "Joc de gestió castellera dels Arreplegats de la Zona Universitària.",
	},
};

function setMetaContent(selector, content) {
	const element = document.head.querySelector(selector);

	if (element) {
		element.setAttribute("content", content);
	}
}

export function getRouteMeta(pathname) {
	const firstWord = pathname.split("/")?.[1] || "";

	return ROUTE_META[firstWord] || DEFAULT_META;
}

const TitleUpdater = () => {
	const location = useLocation();

	useEffect(() => {
		const meta = getRouteMeta(location.pathname);

		document.title = meta.title;
		setMetaContent('meta[name="title"]', meta.title);
		setMetaContent('meta[name="description"]', meta.description);
		setMetaContent('meta[property="og:title"]', meta.title);
		setMetaContent('meta[property="og:description"]', meta.description);
		setMetaContent('meta[property="twitter:title"]', meta.title);
		setMetaContent('meta[property="twitter:description"]', meta.description);
	}, [location]);

	return null;
};

export default TitleUpdater;
