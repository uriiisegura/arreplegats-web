const {
  dynamicRouteSegments,
  getCanonicalUrl,
  getRouteMeta,
  getStaticRoutes,
  publicRoutes,
  setRouteUrlMeta,
} = require("../scripts/generate-route-entrypoints");
const routeMeta = require("./data/routeMeta.json");

const baseHtml = `
  <title>Arreplegats de la Zona Universitària | Colla Castellera</title>
  <meta name="title" content="Arreplegats de la Zona Universitària | Colla Castellera">
  <meta name="description" content="Pàgina web oficial de la colla de castellers dels Arreplegats de la Zona Universitària. Dades, contractar, i més!" />
  <meta property="og:title" content="Arreplegats de la Zona Universitària | Colla Castellera">
  <meta property="og:description" content="Pàgina web oficial de la colla de castellers dels Arreplegats de la Zona Universitària. Dades, contractar, i més!">
  <link rel="canonical" href="https://arreplegats.cat/" />
  <meta property="og:url" content="https://arreplegats.cat/">
  <meta property="twitter:url" content="https://arreplegats.cat/">
  <meta property="twitter:title" content="Arreplegats de la Zona Universitària | Colla Castellera">
  <meta property="twitter:description" content="Pàgina web oficial de la colla de castellers dels Arreplegats de la Zona Universitària. Dades, contractar, i més!">
`;

const minifiedHtml = '<title>Arreplegats de la Zona Universitària | Colla Castellera</title><meta name="title" content="Arreplegats de la Zona Universitària | Colla Castellera"><meta name="description" content="Pàgina web oficial de la colla de castellers dels Arreplegats de la Zona Universitària. Dades, contractar, i més!"/><meta property="og:title" content="Arreplegats de la Zona Universitària | Colla Castellera"><meta property="og:description" content="Pàgina web oficial de la colla de castellers dels Arreplegats de la Zona Universitària. Dades, contractar, i més!"><link rel="canonical" href="https://arreplegats.cat/"/><meta property="og:url" content="https://arreplegats.cat/"><meta property="twitter:url" content="https://arreplegats.cat/"><meta property="twitter:title" content="Arreplegats de la Zona Universitària | Colla Castellera"><meta property="twitter:description" content="Pàgina web oficial de la colla de castellers dels Arreplegats de la Zona Universitària. Dades, contractar, i més!">';

describe("route entrypoint metadata", () => {
  test("builds the canonical URL served by GitHub Pages for route entrypoints", () => {
    expect(getCanonicalUrl("/qui-som")).toBe("https://arreplegats.cat/qui-som/");
    expect(getCanonicalUrl("/castells/Td8fm")).toBe("https://arreplegats.cat/castells/Td8fm/");
  });

  test("shares route metadata with the client title updater", () => {
    expect(getRouteMeta("/assajos")).toEqual({
      title: "Assajos - Arreplegats",
      description: "Vine als assajos dels Arreplegats: dimarts i dijous al migdia a l'ETSEIB i dijous al vespre amb Castellers de Sants.",
    });
  });

  test("keeps route metadata scoped to static entrypoints and dynamic namespaces", () => {
    const staticRouteSegments = publicRoutes.map((route) => route.split("/")[1]);
    const allowedRouteMetaSegments = new Set([
      "",
      ...staticRouteSegments,
      ...dynamicRouteSegments,
    ]);

    const staleRouteMeta = Object.keys(routeMeta.routes).filter(
      (routeSegment) => !allowedRouteMetaSegments.has(routeSegment)
    );

    expect(staleRouteMeta).toEqual([]);
  });

  test("generates static routes for every public route and top castell page", () => {
    const staticRoutes = getStaticRoutes();

    for (const route of publicRoutes) {
      expect(staticRoutes).toContain(route);
    }

    expect(new Set(staticRoutes).size).toBe(staticRoutes.length);
    expect(staticRoutes).toContain("/castells/Td8fm");
    expect(staticRoutes.filter((route) => route.startsWith("/castells/")).length).toBeGreaterThan(0);
  });

  test("replaces home URL metadata on generated route entrypoints", () => {
    const routeHtml = setRouteUrlMeta(baseHtml, "/assajos");

    expect(routeHtml).toContain('<link rel="canonical" href="https://arreplegats.cat/assajos/" />');
    expect(routeHtml).toContain('<meta property="og:url" content="https://arreplegats.cat/assajos/">');
    expect(routeHtml).toContain('<meta property="twitter:url" content="https://arreplegats.cat/assajos/">');
  });

  test("replaces static title and description metadata on generated route entrypoints", () => {
    const routeHtml = setRouteUrlMeta(baseHtml, "/qui-som");

    expect(routeHtml).toContain("<title>Qui Som - Arreplegats</title>");
    expect(routeHtml).toContain('<meta name="title" content="Qui Som - Arreplegats">');
    expect(routeHtml).toContain(
      '<meta name="description" content="Coneix els Arreplegats de la Zona Universitària, una colla castellera universitària de Barcelona amb més de 25 anys d\'història." />'
    );
    expect(routeHtml).toContain('<meta property="og:title" content="Qui Som - Arreplegats">');
    expect(routeHtml).toContain(
      '<meta property="og:description" content="Coneix els Arreplegats de la Zona Universitària, una colla castellera universitària de Barcelona amb més de 25 anys d\'història.">'
    );
    expect(routeHtml).toContain('<meta property="twitter:title" content="Qui Som - Arreplegats">');
    expect(routeHtml).toContain(
      '<meta property="twitter:description" content="Coneix els Arreplegats de la Zona Universitària, una colla castellera universitària de Barcelona amb més de 25 anys d\'història.">'
    );
  });

  test("replaces canonical URLs in minified build HTML", () => {
    const routeHtml = setRouteUrlMeta(minifiedHtml, "/contactar");

    expect(routeHtml).toContain('<link rel="canonical" href="https://arreplegats.cat/contactar/" />');
    expect(routeHtml).toContain("<title>Contactar - Arreplegats</title>");
    expect(routeHtml).toContain('<meta property="og:title" content="Contactar - Arreplegats">');
  });
});
