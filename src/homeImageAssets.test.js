const fs = require("fs");
const path = require("path");
const { HOME_HERO_IMAGES } = require("./data/homeHeroImages");

const projectRoot = path.join(__dirname, "..");
const manifest = require("../public/manifest.json");

function getPublicAssetPath(assetPath) {
	return path.join(projectRoot, "public", assetPath.replace(/^\//, ""));
}

describe("homepage image assets", () => {
	test("ships WebP hero variants alongside JPEG fallbacks", () => {
		for (const image of HOME_HERO_IMAGES) {
			const jpegPath = getPublicAssetPath(image.url);
			const webpPath = getPublicAssetPath(image.webpUrl);

			expect(fs.existsSync(jpegPath)).toBe(true);
			expect(fs.existsSync(webpPath)).toBe(true);
			expect(fs.statSync(webpPath).size).toBeLessThan(fs.statSync(jpegPath).size);
		}
	});

	test("uses compressed homepage card and navigation logo assets", () => {
		const cardImagePath = getPublicAssetPath("/images/2d8fm-arreplegats-2016.webp");
		const navIconPath = getPublicAssetPath("/icon-96.png");
		const manifestIconPath = getPublicAssetPath("/icon-192.png");

		expect(fs.existsSync(cardImagePath)).toBe(true);
		expect(fs.statSync(cardImagePath).size).toBeLessThan(400 * 1024);
		expect(fs.existsSync(navIconPath)).toBe(true);
		expect(fs.statSync(navIconPath).size).toBeLessThan(20 * 1024);
		expect(fs.existsSync(manifestIconPath)).toBe(true);
		expect(fs.statSync(manifestIconPath).size).toBeLessThan(40 * 1024);
		expect(manifest.icons[0].src).toBe("icon-192.png");
	});
});
