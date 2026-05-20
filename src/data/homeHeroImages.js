export const HOME_HERO_IMAGES = [
	{
		width: 576,
		height: 384,
		url: "images/resized/2d8fm-arreplegats-2016-576_x_384.jpeg",
		webpUrl: "images/resized/2d8fm-arreplegats-2016-576_x_384.webp",
	},
	{
		width: 768,
		height: 512,
		url: "images/resized/2d8fm-arreplegats-2016-768_x_512.jpeg",
		webpUrl: "images/resized/2d8fm-arreplegats-2016-768_x_512.webp",
	},
	{
		width: 992,
		height: 661,
		url: "images/resized/2d8fm-arreplegats-2016-992_x_661.jpeg",
		webpUrl: "images/resized/2d8fm-arreplegats-2016-992_x_661.webp",
	},
	{
		width: 1200,
		height: 800,
		url: "images/resized/2d8fm-arreplegats-2016-1200_x_800.jpeg",
		webpUrl: "images/resized/2d8fm-arreplegats-2016-1200_x_800.webp",
	},
	{
		width: 1920,
		height: 1280,
		url: "images/resized/2d8fm-arreplegats-2016-1920_x_1280.jpeg",
		webpUrl: "images/resized/2d8fm-arreplegats-2016-1920_x_1280.webp",
	},
];

export function buildHeroSrcSet(images) {
	return images.map((img) => `${img.url} ${img.width}w`).join(", ");
}

export function buildHeroWebpSrcSet(images) {
	return images.map((img) => `${img.webpUrl} ${img.width}w`).join(", ");
}

export function getHeroFallbackImage(images = HOME_HERO_IMAGES) {
	return images.find((img) => img.width === 1200) || images[0];
}
