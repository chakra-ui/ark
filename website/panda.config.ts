import { defineConfig } from "@pandacss/dev";
import { createPreset } from "@park-ui/panda-preset";
import sand from "@park-ui/panda-preset/colors/sand";
import typographyPreset from "pandacss-preset-typography";
import { coral } from "~/coral";
import { field } from "~/theme/recipes/field";
import { tour } from "~/theme/recipes/tour";

export default defineConfig({
	preflight: true,
	validation: "none",
	presets: [
		createPreset({ grayColor: sand, accentColor: coral, radius: "sm" }),
		typographyPreset({
			recipe: {
				sizes: ["base"],
				notProse: true,
			},
		}),
	],
	include: ["./src/**/*.{js,jsx,ts,tsx}"],
	jsxFramework: "react",
	outdir: "styled-system",
	patterns: {
		extend: {
			container: {
				transform(props: Record<string, unknown>) {
					return {
						position: "relative",
						width: "100%",
						maxW: "8xl",
						mx: "auto",
						px: { base: "4", md: "8" },
						...props,
					};
				},
			},
		},
	},
	staticCss: {
		recipes: {
			code: [{ size: ["*"] }],
			drawer: ["*"],
		},
	},
	globalCss: {
		extend: {
			html: {
				scrollPaddingTop: "6rem",
				scrollBehavior: "smooth",
				minHeight: "100%",
			},
			"html, body": {
				display: "flex",
				flexDirection: "column",
			},
			body: {
				display: "flex",
				flexDirection: "column",
				flexGrow: "1",
				fontFamily: "body",
			},
			"*::selection": {
				bg: "gray.3",
			},
			pre: {
				background: "transparent!",
				overflowX: "auto",
				fontSize: "13px !important",
			},
			blockquote: {
				fontStyle: "normal!",
				fontWeight: "normal!",
			},
			strong: {
				color: "fg.default!",
			},
			code: {
				fontFamily: "code",
				"::selection": {
					bg: "gray.dark.a4",
				},
			},
			article: {
				"--colors-prose-body": "colors.fg.muted",
				"--colors-prose-heading": "colors.fg.default",
				"--colors-prose-bold": "colors.fg.default",
				"--colors-prose-link": "colors.fg.default",
				"--colors-prose-code": "colors.fg.muted",
				"--colors-prose-hr-border": "colors.border.subtle",
				"--colors-prose-quote-border": "colors.accent.default",
			},
		},
	},
	theme: {
		extend: {
			tokens: {
				fonts: {
					body: { value: "var(--font-outfit), sans-serif" },
					code: { value: "var(--font-roboto-mono), monospace" },
				},
			},
			slotRecipes: {
				field,
				tour,
				layout: {
					className: "layout",
					slots: ["aside", "main"],
					base: {
						aside: {
							bg: {
								base: "gray.2",
								_dark: "#0e0e0e",
							},
							borderRightWidth: "1px",
							position: "fixed",
							top: "0",
							bottom: "0",
							display: { base: "none", md: "block" },
							ps: "max(32px, calc((100vw - (1440px - 64px)) / 2))",
							pe: "8",
							pb: "10",
							minWidth: "272px",
							overflow: "auto",
							overscrollBehavior: "contain",
							width: {
								base: "272px",
								lg: "calc((100vw - (1440px - 64px)) / 2 + 272px - 32px)",
							},
							zIndex: "2",
						},
						main: {
							minWidth: "0",
							flex: "1",
							ps: {
								base: "0",
								md: "max(calc((100vw - 1440px) / 2 + 272px), 272px)",
							},
							pe: "calc((100vw - 1440px) / 2)",
						},
					},
				},
			},
		},
	},
});
