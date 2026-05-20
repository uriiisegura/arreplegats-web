const {
  getCanonicalUrl,
  setRouteUrlMeta,
} = require("../scripts/generate-route-entrypoints");

const baseHtml = `
  <link rel="canonical" href="https://arreplegats.cat/" />
  <meta property="og:url" content="https://arreplegats.cat/">
  <meta property="twitter:url" content="https://arreplegats.cat/">
`;

const minifiedHtml = '<link rel="canonical" href="https://arreplegats.cat/"/><meta property="og:url" content="https://arreplegats.cat/"><meta property="twitter:url" content="https://arreplegats.cat/">';

describe("route entrypoint metadata", () => {
  test("builds the canonical URL served by GitHub Pages for route entrypoints", () => {
    expect(getCanonicalUrl("/qui-som")).toBe("https://arreplegats.cat/qui-som/");
    expect(getCanonicalUrl("/castells/Td8fm")).toBe("https://arreplegats.cat/castells/Td8fm/");
  });

  test("replaces home URL metadata on generated route entrypoints", () => {
    const routeHtml = setRouteUrlMeta(baseHtml, "/assajos");

    expect(routeHtml).toContain('<link rel="canonical" href="https://arreplegats.cat/assajos/" />');
    expect(routeHtml).toContain('<meta property="og:url" content="https://arreplegats.cat/assajos/">');
    expect(routeHtml).toContain('<meta property="twitter:url" content="https://arreplegats.cat/assajos/">');
  });

  test("replaces canonical URLs in minified build HTML", () => {
    const routeHtml = setRouteUrlMeta(minifiedHtml, "/contactar");

    expect(routeHtml).toContain('<link rel="canonical" href="https://arreplegats.cat/contactar/" />');
  });
});
