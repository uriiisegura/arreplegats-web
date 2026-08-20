const fs = require("fs");
const path = require("path");

const indexHtmlPath = path.join(__dirname, "..", "public", "index.html");

function getIndexHtml() {
	return fs.readFileSync(indexHtmlPath, "utf8");
}

describe("Microsoft Clarity tracking", () => {
	test("loads the configured project asynchronously on every page", () => {
		const indexHtml = getIndexHtml();

		expect(indexHtml).toContain(
			'(window, document, "clarity", "script", "y5d8sk4470")'
		);
		expect(indexHtml).toContain(
			't.src="https://www.clarity.ms/tag/"+i'
		);
		expect(indexHtml).toContain("t.async=1");
		expect(indexHtml.match(/y5d8sk4470/g)).toHaveLength(1);
	});
});
