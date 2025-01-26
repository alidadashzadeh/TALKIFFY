/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	important: "#root",
	theme: {
		extend: {
			colors: {
				background__primary: "rgba(var(--background__primary))",
				background__secondary: "rgba(var(--background__secondary))",
				border: "rgba(var(--border))",
				brand: "rgba(var(--brand))",
				hover: "rgba(var(--hover))",
				select: "rgba(var(--select))",
				text__primary: "rgba(var(--text__primary))",
				text__secondary: "rgba(var(--text__secondary))",
				text__accent: "rgba(var(--text__accent))",
			},
		},
	},
	plugins: [],
};
