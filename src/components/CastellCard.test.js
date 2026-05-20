import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CastellCard from "./CastellCard";

describe("CastellCard", () => {
	test("uses the compressed WebP background for the large Td8fm card image", () => {
		render(
			<MemoryRouter>
				<CastellCard
					name="Torre de 8 amb folre i manilles"
					notation="Td8fm"
					link="/images/2d8fm-arreplegats-2016.png"
				/>
			</MemoryRouter>
		);

		expect(screen.getByText("Torre de 8 amb folre i manilles").closest(".castell-card")).toHaveStyle({
			backgroundImage: "url(/images/2d8fm-arreplegats-2016.webp)",
		});
	});
});
