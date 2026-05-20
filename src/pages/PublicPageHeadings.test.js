import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Assajos from "./Assajos";
import Contactar from "./Contactar";
import HistoriaDeLaColla from "./HistoriaDeLaColla";
import MillorsCastells from "./MillorsCastells";
import QuiSom from "./QuiSom";

function renderPage(Page) {
	render(
		<MemoryRouter>
			<Page />
		</MemoryRouter>
	);
}

describe("public page headings", () => {
	test.each([
		[Assajos, "Assajos"],
		[Contactar, "Contacta'ns"],
		[HistoriaDeLaColla, "Història de la colla"],
		[MillorsCastells, "Millors Castells"],
		[QuiSom, "Qui som?"],
	])("%s renders its visible page title as an h1", (Page, title) => {
		renderPage(Page);

		expect(screen.getByRole("heading", { level: 1, name: title })).toHaveClass("page-title");
	});
});
