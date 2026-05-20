const {
  dynamicRouteSegments,
  getCanonicalUrl,
  getRouteMeta,
  getStaticRoutes,
  publicRoutes,
  setRouteUrlMeta,
} = require("../scripts/generate-route-entrypoints");
const castellsTop = require("./data/castells-top.json");
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
      title: "Assajos castellers universitaris a Barcelona | Arreplegats",
      description: "Horaris i espais d'assaig dels Arreplegats de la Zona Universitària, amb assajos a l'ETSEIB i sessions conjuntes amb Castellers de Sants.",
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

  test("generates unique metadata for castell detail entrypoints", () => {
    expect(getRouteMeta("/castells/Td8fm")).toEqual({
      title: "Torre de 8 amb folre i manilles (Td8fm) | Arreplegats",
      description: "Fitxa de la Torre de 8 amb folre i manilles (Td8fm) dels Arreplegats, amb imatges, història i context dins dels castells universitaris.",
    });

    expect(getRouteMeta("/castells/Pd7fm").title).toBe(
      "Pilar de 7 amb folre i manilles (Pd7fm) | Arreplegats"
    );
  });

  test("keeps public route titles descriptive without becoming too long", () => {
    for (const meta of Object.values(routeMeta.routes)) {
      expect(meta.title.length).toBeGreaterThanOrEqual(30);
      expect(meta.title.length).toBeLessThanOrEqual(60);
      expect(meta.description.length).toBeGreaterThanOrEqual(80);
      expect(meta.description.length).toBeLessThanOrEqual(165);
    }
  });

  test("keeps every castell route title unique and descriptive", () => {
    const castellTitles = Object.keys(castellsTop).map((slug) => getRouteMeta(`/castells/${slug}`).title);

    expect(new Set(castellTitles).size).toBe(castellTitles.length);
    expect(castellTitles).not.toContain("Castell - Arreplegats");

    for (const title of castellTitles) {
      expect(title.length).toBeGreaterThanOrEqual(30);
      expect(title.length).toBeLessThanOrEqual(60);
    }
  });

  test("replaces home URL metadata on generated route entrypoints", () => {
    const routeHtml = setRouteUrlMeta(baseHtml, "/assajos");

    expect(routeHtml).toContain('<link rel="canonical" href="https://arreplegats.cat/assajos/" />');
    expect(routeHtml).toContain('<meta property="og:url" content="https://arreplegats.cat/assajos/">');
    expect(routeHtml).toContain('<meta property="twitter:url" content="https://arreplegats.cat/assajos/">');
  });

  test("replaces static title and description metadata on generated route entrypoints", () => {
    const routeHtml = setRouteUrlMeta(baseHtml, "/qui-som");

    expect(routeHtml).toContain("<title>Qui són els Arreplegats de la Zona Universitària</title>");
    expect(routeHtml).toContain('<meta name="title" content="Qui són els Arreplegats de la Zona Universitària">');
    expect(routeHtml).toContain(
      '<meta name="description" content="Coneix la colla castellera universitària de Barcelona: qui forma els Arreplegats, què fem i com vivim els castells a la Zona Universitària." />'
    );
    expect(routeHtml).toContain('<meta property="og:title" content="Qui són els Arreplegats de la Zona Universitària">');
    expect(routeHtml).toContain(
      '<meta property="og:description" content="Coneix la colla castellera universitària de Barcelona: qui forma els Arreplegats, què fem i com vivim els castells a la Zona Universitària.">'
    );
    expect(routeHtml).toContain('<meta property="twitter:title" content="Qui són els Arreplegats de la Zona Universitària">');
    expect(routeHtml).toContain(
      '<meta property="twitter:description" content="Coneix la colla castellera universitària de Barcelona: qui forma els Arreplegats, què fem i com vivim els castells a la Zona Universitària.">'
    );
  });

  test("replaces canonical URLs in minified build HTML", () => {
    const routeHtml = setRouteUrlMeta(minifiedHtml, "/contactar");

    expect(routeHtml).toContain('<link rel="canonical" href="https://arreplegats.cat/contactar/" />');
    expect(routeHtml).toContain("<title>Contacta amb els Arreplegats de la Zona Universitària</title>");
    expect(routeHtml).toContain('<meta property="og:title" content="Contacta amb els Arreplegats de la Zona Universitària">');
  });

  test("replaces metadata on castell route entrypoints", () => {
    const routeHtml = setRouteUrlMeta(baseHtml, "/castells/Td8fm");

    expect(routeHtml).toContain("<title>Torre de 8 amb folre i manilles (Td8fm) | Arreplegats</title>");
    expect(routeHtml).toContain(
      '<meta name="description" content="Fitxa de la Torre de 8 amb folre i manilles (Td8fm) dels Arreplegats, amb imatges, història i context dins dels castells universitaris." />'
    );
  });
});
