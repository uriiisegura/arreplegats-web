const fs = require("fs");
const path = require("path");

const sitemapPath = path.join(__dirname, "..", "public", "sitemap.xml");

function getSitemapUrls() {
	const sitemap = fs.readFileSync(sitemapPath, "utf8");

	return [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
}

describe("sitemap URLs", () => {
	test("uses canonical trailing-slash URLs served by GitHub Pages", () => {
		const urls = getSitemapUrls();

		expect(urls).toContain("https://arreplegats.cat/");
		expect(urls).toContain("https://arreplegats.cat/qui-som/");
		expect(urls).toContain("https://arreplegats.cat/castells/Td8fm/");

		for (const url of urls) {
			const pathname = new URL(url).pathname;

			expect(pathname.endsWith("/")).toBe(true);
		}
	});
});
