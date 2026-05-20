const fs = require("fs");
const path = require("path");

const indexHtmlPath = path.join(__dirname, "..", "public", "index.html");

function getIndexHtml() {
	return fs.readFileSync(indexHtmlPath, "utf8");
}

describe("noscript fallback", () => {
	test("uses useful Catalan content instead of the default app-shell message", () => {
		const indexHtml = getIndexHtml();

		expect(indexHtml).not.toContain("You need to enable JavaScript to run this app.");
		expect(indexHtml).toContain("La web interactiva dels Arreplegats funciona millor amb JavaScript activat.");
		expect(indexHtml).toContain('<a href="/assajos/">assajos</a>');
		expect(indexHtml).toContain('<a href="/contactar/">contactar</a>');
	});

	test("uses canonical trailing slash URLs for fallback internal links", () => {
		const indexHtml = getIndexHtml();
		const internalLinks = [...indexHtml.matchAll(/<a\s+href="(\/[^"]*)"/g)]
			.map((match) => match[1])
			.filter((href) => href !== "/" && !href.startsWith("/uploads/"));

		for (const href of internalLinks) {
			expect(href).toMatch(/\/$/);
		}
	});

	test("does not ship a duplicate SEO fallback outside the React root", () => {
		const indexHtml = getIndexHtml();

		expect(indexHtml).not.toContain("azu-seo-fallback");
		expect(indexHtml).not.toContain("Contingut principal dels Arreplegats");
	});
});
