import "@testing-library/jest-dom";
import { removeSeoFallback } from "./RemoveSeoFallback";

describe("RemoveSeoFallback", () => {
	afterEach(() => {
		document.body.innerHTML = "";
	});

	test("removes the static SEO fallback after React has mounted", () => {
		document.body.innerHTML = `
			<div id="root"></div>
			<section class="azu-seo-fallback">
				<h1>Arreplegats de la Zona Universitaria</h1>
			</section>
		`;

		removeSeoFallback();

		expect(document.querySelector(".azu-seo-fallback")).not.toBeInTheDocument();
	});
});
