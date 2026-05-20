#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const buildDir = path.join(rootDir, "build");
const indexHtmlPath = path.join(buildDir, "index.html");
const castellsTopPath = path.join(rootDir, "src", "data", "castells-top.json");
const routeMetaPath = path.join(rootDir, "src", "data", "routeMeta.json");
const siteUrl = "https://arreplegats.cat";
const routeMeta = JSON.parse(fs.readFileSync(routeMetaPath, "utf8"));

// Keep this list to public, stable routes that should deep-link on static hosts.
// Utility, private, event-specific, and generated game-level routes stay on the
// existing 404.html fallback until they are intentionally promoted.
const publicRoutes = [
  "/qui-som",
  "/agenda",
  "/assajos",
  "/gralles-i-tabals",
  "/vida-universitaria",
  "/historia-de-la-colla",
  "/llista-de-caps-de-colla",
  "/llista-de-presidents",
  "/els-castells-universitaris",
  "/millors-castells",
  "/millors-diades",
  "/resum-historic",
  "/llista-de-diades",
  "/junta-directiva",
  "/junta-tecnica",
  "/comissio-genere-grup-treball",
  "/patrocinadors",
  "/fotografies",
  "/videos",
  "/musica",
  "/estatuts",
  "/reglament-regim-intern",
  "/protocol-agressions",
  "/jocs",
  "/joc-castells",
  "/sopa-de-lletres",
  "/mots-encreuats",
  "/memory",
  "/penjat",
  "/contactar",
  "/parts-castell",
];

function getCastellRoutes() {
  const castellsTop = JSON.parse(fs.readFileSync(castellsTopPath, "utf8"));

  return Object.keys(castellsTop).map((slug) => `/castells/${slug}`);
}

function assertSafeRoute(route) {
  if (!route.startsWith("/") || route.includes("..") || route.includes("?") || route.includes("#")) {
    throw new Error(`Unsafe route entrypoint: ${route}`);
  }

  if (route === "/") {
    throw new Error("Root route already uses build/index.html");
  }
}

function getOutputPath(route) {
  assertSafeRoute(route);

  const routePath = route.replace(/^\/+|\/+$/g, "");
  const outputDir = path.resolve(buildDir, routePath);

  if (!outputDir.startsWith(`${buildDir}${path.sep}`)) {
    throw new Error(`Route escapes build directory: ${route}`);
  }

  return path.join(outputDir, "index.html");
}

function getCanonicalUrl(route) {
  assertSafeRoute(route);

  return `${siteUrl}${route.replace(/\/?$/, "/")}`;
}

function getRouteMeta(route) {
  const firstWord = route.split("/")?.[1] || "";

  return routeMeta.routes[firstWord] || routeMeta.default;
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replace(/"/g, "&quot;");
}

function setRouteUrlMeta(indexHtml, route) {
  const canonicalUrl = getCanonicalUrl(route);
  const meta = getRouteMeta(route);
  const title = escapeHtml(meta.title);
  const description = escapeAttribute(meta.description);
  const attributeTitle = escapeAttribute(meta.title);

  return indexHtml
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(/<meta name="title" content="[^"]*">/, `<meta name="title" content="${attributeTitle}">`)
    .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/>/, `<meta name="description" content="${description}" />`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${canonicalUrl}" />`)
    .replace(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${canonicalUrl}">`)
    .replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${attributeTitle}">`)
    .replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${description}">`)
    .replace(/<meta property="twitter:url" content="[^"]*">/, `<meta property="twitter:url" content="${canonicalUrl}">`)
    .replace(/<meta property="twitter:title" content="[^"]*">/, `<meta property="twitter:title" content="${attributeTitle}">`)
    .replace(/<meta property="twitter:description" content="[^"]*">/, `<meta property="twitter:description" content="${description}">`);
}

function main() {
  if (!fs.existsSync(indexHtmlPath)) {
    throw new Error("Cannot generate route entrypoints before build/index.html exists.");
  }

  const indexHtml = fs.readFileSync(indexHtmlPath, "utf8");
  const routes = [...new Set([...publicRoutes, ...getCastellRoutes()])];

  for (const route of routes) {
    const outputPath = getOutputPath(route);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, setRouteUrlMeta(indexHtml, route));
  }

  console.log(`Generated ${routes.length} static route entrypoints.`);
}

if (require.main === module) {
  main();
}

module.exports = {
  getCanonicalUrl,
  getRouteMeta,
  setRouteUrlMeta,
};
