import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	const nav = document.getElementById('nav-links');
	if (nav !== null)
		nav.classList.remove('show');
	
	const subs = document.getElementsByClassName('sub-menus');
	for (let e of subs)
		e.classList.remove('active');

	return;
}

export default ScrollToTop;
