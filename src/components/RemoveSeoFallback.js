import { useEffect } from "react";

const SEO_FALLBACK_SELECTOR = ".azu-seo-fallback";

export function removeSeoFallback() {
	document.querySelector(SEO_FALLBACK_SELECTOR)?.remove();
}

function RemoveSeoFallback() {
	useEffect(() => {
		removeSeoFallback();
	}, []);

	return null;
}

export default RemoveSeoFallback;
