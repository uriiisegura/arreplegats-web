import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import routeMetadata from "../data/routeMetadata";

function setMetaContent(selector, content) {
	const element = document.head.querySelector(selector);

	if (element) {
		element.setAttribute("content", content);
	}
}

export function getRouteMeta(pathname) {
	return routeMetadata.getRouteMeta(pathname);
}

const TitleUpdater = () => {
	const location = useLocation();

	useEffect(() => {
		const meta = getRouteMeta(location.pathname);

		document.title = meta.title;
		setMetaContent('meta[name="title"]', meta.title);
		setMetaContent('meta[name="description"]', meta.description);
		setMetaContent('meta[property="og:title"]', meta.title);
		setMetaContent('meta[property="og:description"]', meta.description);
		setMetaContent('meta[property="twitter:title"]', meta.title);
		setMetaContent('meta[property="twitter:description"]', meta.description);
	}, [location]);

	return null;
};

export default TitleUpdater;
