import { mergeProps } from "@zag-js/solid";
import type { StepActionTriggerProps } from "@zag-js/tour";
import { createSplitProps } from "../../utils/create-split-props";
import { type HTMLProps, type PolymorphicProps, ark } from "../factory";
import { useTourContext } from "./use-tour-context";

export interface TourActionTriggerBaseProps
	extends PolymorphicProps<"button">,
		StepActionTriggerProps {}
export interface TourActionTriggerProps
	extends HTMLProps<"button">,
		TourActionTriggerBaseProps {}

export const TourActionTrigger = (props: TourActionTriggerProps) => {
	const [actionTriggerProps, localProps] =
		createSplitProps<StepActionTriggerProps>()(props, ["action"]);
	const tour = useTourContext();
	const mergedProps = mergeProps(
		() => tour().getActionTriggerProps(actionTriggerProps),
		localProps,
	);

	return (
		<ark.button {...mergedProps}>
			{mergedProps.children || actionTriggerProps.action.label}
		</ark.button>
	);
};
