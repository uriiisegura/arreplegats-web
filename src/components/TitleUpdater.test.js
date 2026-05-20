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
			title: "Assajos - Arreplegats",
			description: "Vine als assajos dels Arreplegats: dimarts i dijous al migdia a l'ETSEIB i dijous al vespre amb Castellers de Sants.",
		});
	});

	test("updates document title and description meta tags for the active route", () => {
		renderTitleUpdater("/qui-som");

		expect(document.title).toBe("Qui Som - Arreplegats");
		expect(document.head.querySelector('meta[name="title"]')).toHaveAttribute("content", "Qui Som - Arreplegats");
		expect(document.head.querySelector('meta[name="description"]')).toHaveAttribute(
			"content",
			"Coneix els Arreplegats de la Zona Universitària, una colla castellera universitària de Barcelona amb més de 25 anys d'història."
		);
	});

	test("keeps Open Graph and Twitter metadata aligned with route metadata", () => {
		renderTitleUpdater("/contactar");

		expect(document.head.querySelector('meta[property="og:title"]')).toHaveAttribute("content", "Contactar - Arreplegats");
		expect(document.head.querySelector('meta[property="twitter:title"]')).toHaveAttribute("content", "Contactar - Arreplegats");
		expect(document.head.querySelector('meta[property="og:description"]')).toHaveAttribute(
			"content",
			"Contacta amb els Arreplegats de la Zona Universitària per correu electrònic o xarxes socials."
		);
		expect(document.head.querySelector('meta[property="twitter:description"]')).toHaveAttribute(
			"content",
			"Contacta amb els Arreplegats de la Zona Universitària per correu electrònic o xarxes socials."
		);
	});
});
