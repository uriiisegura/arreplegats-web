import React from "react";
import { NavLink } from "react-router-dom";
import { buildHeroSrcSet, buildHeroWebpSrcSet, getHeroFallbackImage, HOME_HERO_IMAGES } from "../data/homeHeroImages";

const HERO_LINKS = [
	{ to: "/assajos/", label: "UNEIX-T'HI" },
	{ to: "/agenda/", label: "AGENDA" },
	{ to: "/contactar/", label: "CONTACTA'NS!" },
];

function HomeHero({ images = HOME_HERO_IMAGES }) {
	const fallbackImage = getHeroFallbackImage(images);
	const srcSet = buildHeroSrcSet(images);
	const webpSrcSet = buildHeroWebpSrcSet(images);

	return (
		<section className="home-hero" aria-labelledby="home-hero-title">
			<picture className="home-hero__picture">
				<source srcSet={webpSrcSet} sizes="100vw" type="image/webp" />
				<source srcSet={srcSet} sizes="100vw" />
				<img
					className="home-hero__image"
					src={fallbackImage.url}
					srcSet={srcSet}
					sizes="100vw"
					width={fallbackImage.width}
					height={fallbackImage.height}
					alt="Arreplegats aixecant un castell"
					fetchpriority="high"
					loading="eager"
					decoding="async"
				/>
			</picture>
			<div className="home-hero__overlay"></div>
			<div className="home-hero__content">
				<h1 id="home-hero-title" className="home-hero__title">
					ARREPLEGATS
				</h1>
				<h3 className="home-hero__tagline">ELS ÚNICS QUE HO PODEN FER</h3>
				<div className="home-hero__buttons">
					{HERO_LINKS.map((link) => (
						<NavLink key={link.to} to={link.to} className="home-hero__button">
							{link.label}
						</NavLink>
					))}
				</div>
			</div>
		</section>
	);
}

export default HomeHero;
