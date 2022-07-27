module.exports = {
	globDirectory: './',
	globPatterns: [
		'**/*.{json,ico,html,png,txt,css,js,svg,md,jpeg,jsx,lock}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};