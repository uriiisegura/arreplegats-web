import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TitleUpdater, { getRouteMeta } from "./TitleUpdater";

function addMetaTag(attributes) {
	const element = document.createElement("meta");

	for (const [name, value] of Object.entries(attributes)) {
		element.setAttribute(name, value);
	}

	document.head.appendChild(element);
}

function renderTitleUpdater(pathname) {
	render(
		<MemoryRouter initialEntries={[pathname]}>
			<TitleUpdater />
		</MemoryRouter>
	);
}

describe("TitleUpdater", () => {
	beforeEach(() => {
		document.head.innerHTML = "";
		document.title = "";
		addMetaTag({ name: "title", content: "" });
		addMetaTag({ name: "description", content: "" });
		addMetaTag({ property: "og:title", content: "" });
		addMetaTag({ property: "og:description", content: "" });
		addMetaTag({ property: "twitter:title", content: "" });
		addMetaTag({ property: "twitter:description", content: "" });
	});

	test("returns route-specific metadata for important pages", () => {
		expect(getRouteMeta("/assajos")).toEqual({
			title: "Assajos castellers universitaris a Barcelona | Arreplegats",
			description: "Horaris i espais d'assaig dels Arreplegats de la Zona Universitària, amb assajos a l'ETSEIB i sessions conjuntes amb Castellers de Sants.",
		});
	});

	test("updates document title and description meta tags for the active route", () => {
		renderTitleUpdater("/qui-som");

		expect(document.title).toBe("Qui són els Arreplegats de la Zona Universitària");
		expect(document.head.querySelector('meta[name="title"]')).toHaveAttribute("content", "Qui són els Arreplegats de la Zona Universitària");
		expect(document.head.querySelector('meta[name="description"]')).toHaveAttribute(
			"content",
			"Coneix la colla castellera universitària de Barcelona: qui forma els Arreplegats, què fem i com vivim els castells a la Zona Universitària."
		);
	});

	test("keeps the home route from downgrading the static social title", () => {
		expect(getRouteMeta("/")).toEqual({
			title: "Arreplegats de la Zona Universitària | Colla Castellera",
			description: "Web oficial dels Arreplegats de la Zona Universitària: castells universitaris, assajos, agenda i vida de la colla.",
		});
	});

	test("returns castell-specific metadata for castell detail pages", () => {
		expect(getRouteMeta("/castells/Td8fm/")).toEqual({
			title: "Torre de 8 amb folre i manilles (Td8fm) | Arreplegats",
			description: "Fitxa de la Torre de 8 amb folre i manilles (Td8fm) dels Arreplegats, amb imatges, història i context dins dels castells universitaris.",
		});
	});

	test("keeps Open Graph and Twitter metadata aligned with route metadata", () => {
		renderTitleUpdater("/contactar");

		expect(document.head.querySelector('meta[property="og:title"]')).toHaveAttribute("content", "Contacta amb els Arreplegats de la Zona Universitària");
		expect(document.head.querySelector('meta[property="twitter:title"]')).toHaveAttribute("content", "Contacta amb els Arreplegats de la Zona Universitària");
		expect(document.head.querySelector('meta[property="og:description"]')).toHaveAttribute(
			"content",
			"Canals per contactar amb la colla castellera Arreplegats de la Zona Universitària: correu electrònic, xarxes socials i informació de contacte."
		);
		expect(document.head.querySelector('meta[property="twitter:description"]')).toHaveAttribute(
			"content",
			"Canals per contactar amb la colla castellera Arreplegats de la Zona Universitària: correu electrònic, xarxes socials i informació de contacte."
		);
	});
});
