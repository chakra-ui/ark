import type { StepAction } from "@zag-js/tour";
import type { Accessor, JSX } from "solid-js";

import { useTourContext } from "./use-tour-context";

export interface TourActionsProps {
	children: (actions: Accessor<StepAction[]>) => JSX.Element;
}

export const TourActions = (props: TourActionsProps) => {
	const tour = useTourContext();
	return props.children(() => tour().step?.actions ?? []);
};
