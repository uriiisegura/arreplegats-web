import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Castell from "./Castell";

function renderCastell(pathname = "/castells/Td8fm") {
	render(
		<MemoryRouter initialEntries={[pathname]}>
			<Routes>
				<Route path="/castells/:castell" element={<Castell />} />
			</Routes>
		</MemoryRouter>
	);
}

describe("Castell", () => {
	test("renders the castell name as the visible page h1", () => {
		renderCastell();

		expect(
			screen.getByRole("heading", {
				level: 1,
				name: "Torre de 8 amb folre i manilles",
			})
		).toHaveClass("page-title");
	});
});
