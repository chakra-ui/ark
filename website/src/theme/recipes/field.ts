import { defineSlotRecipe } from "@pandacss/dev";

export const field = defineSlotRecipe({
	className: "field",
	slots: ["helperText", "label", "root"],
	base: {
		root: {
			display: "flex",
			flexDirection: "column",
			gap: "1.5",
		},
		label: {
			color: "fg.default",
			fontWeight: "medium",
			textStyle: "sm",
		},
		helperText: {
			color: "fg.muted",
			textStyle: "sm",
		},
	},
});
