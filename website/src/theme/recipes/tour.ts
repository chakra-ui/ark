import { defineSlotRecipe } from "@pandacss/dev";

export const tour = defineSlotRecipe({
	className: "tour",
	slots: [
		"actionTrigger",
		"arrow",
		"arrowTip",
		"backdrop",
		"closeTrigger",
		"content",
		"control",
		"description",
		"positioner",
		"progressText",
		"spotlight",
		"title",
	],
	base: {
		arrow: {
			"--arrow-size": "var(--sizes-3)",
			"--arrow-background": "var(--colors-bg-default)",
		},
		arrowTip: {
			borderTopWidth: "1px",
			borderLeftWidth: "1px",
		},
		backdrop: {
			backdropFilter: "blur(4px)",
			zIndex: "overlay",
			background: {
				_light: "white.a10",
				_dark: "black.a10",
			},
			_open: {
				animation: "backdrop-in",
			},
			_closed: {
				animation: "backdrop-out",
			},
		},
		closeTrigger: {
			position: "absolute",
			top: "3",
			right: "3",
		},
		content: {
			position: "relative",
			background: "bg.default",
			borderRadius: "l3",
			boxShadow: "lg",
			display: "flex",
			flexDirection: "column",
			maxWidth: "sm",
			p: "5",
		},
		control: {
			display: "flex",
			gap: "3",
			justifyContent: "flex-end",
		},
		description: {
			color: "fg.muted",
			textStyle: "sm",
		},
		positioner: {
			alignItems: "center",
			display: "flex",
			justifyContent: "center",
			zIndex: "modal!",
			"&[data-type='dialog']": {
				inset: 0,
				position: "fixed",
			},
			'&[data-type="tooltip"]': {
				position: "absolute",
			},
		},
		progressText: {
			textStyle: "sm",
			color: "fg.muted",
		},
		spotlight: {
			borderWidth: "3px",
			borderStyle: "solid",
			borderColor: "colorPalette.default",
			zIndex: "modal",
		},
		title: {
			fontWeight: "medium",
			textStyle: "lg",
		},
	},
});
