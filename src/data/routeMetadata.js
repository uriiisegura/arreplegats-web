const routeMeta = require("./routeMeta.json");
const castellsTop = require("./castells-top.json");

function getCastellArticle(name) {
	if (name.startsWith("Torre")) {
		return "de la";
	}

	if (name.startsWith("Pilar")) {
		return "del";
	}

	if (/^[AEIOUÀÈÉÍÒÓÚ]/i.test(name)) {
		return "de l'";
	}

	return "del";
}

function getCastellMeta(slug) {
	const castell = castellsTop[slug];

	if (!castell) {
		return routeMeta.routes.castells || routeMeta.default;
	}

	const notation = castell.notation || slug;
	const article = getCastellArticle(castell.name);
	const separator = article.endsWith("'") ? "" : " ";
	const title = `${castell.name} (${notation}) | Arreplegats`;

	return {
		title: title.length >= 30 ? title : `${castell.name} (${notation}) dels Arreplegats | Fitxa`,
		description: `Fitxa ${article}${separator}${castell.name} (${notation}) dels Arreplegats, amb imatges, història i context dins dels castells universitaris.`,
	};
}

function getRouteMeta(pathname) {
	const [, firstWord = "", secondWord = ""] = pathname.split("/");

	if (firstWord === "castells" && secondWord) {
		return getCastellMeta(decodeURIComponent(secondWord));
	}

	return routeMeta.routes[firstWord] || routeMeta.default;
}

module.exports = {
	getCastellMeta,
	getRouteMeta,
	routeMeta,
};
