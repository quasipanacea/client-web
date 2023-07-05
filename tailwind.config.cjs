/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['**/*.css'],
	darkMode: 'class',
	theme: {
		sans: ['"Work Sans"'],
		serif: ['"IBM Plex Sans"'],
		mono: ['"Space Mono"'],
		extend: {},
	},
	plugins: [require('@tailwindcss/typography')],
}
