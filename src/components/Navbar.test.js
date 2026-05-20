import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar";

describe("Navbar", () => {
	test("uses canonical trailing slashes for internal page links", () => {
		render(
			<MemoryRouter>
				<Navbar />
			</MemoryRouter>
		);

		const internalLinks = screen
			.getAllByRole("link")
			.map((link) => link.getAttribute("href"))
			.filter((href) => href && href.startsWith("/") && href !== "/");

		expect(internalLinks).toContain("/qui-som/");
		expect(internalLinks).toContain("/assajos/");
		expect(internalLinks).toContain("/contactar/");
		for (const href of internalLinks) {
			expect(href).toMatch(/\/$/);
		}
	});
});
