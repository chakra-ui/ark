import { type PropTypes, normalizeProps, useMachine } from "@zag-js/react";
import * as tour from "@zag-js/tour";
import { useId } from "react";
import { useEnvironmentContext, useLocaleContext } from "../../providers";
import type { Optional } from "../../types";
import { useEvent } from "../../utils/use-event";

export interface UseTourProps
	extends Optional<Omit<tour.Context, "dir" | "getRootNode">, "id"> {}
export interface UseTourReturn extends tour.Api<PropTypes> {}

export const useTour = (props: UseTourProps = {}): UseTourReturn => {
	const { getRootNode } = useEnvironmentContext();
	const { dir } = useLocaleContext();

	const initialContext: tour.Context = {
		id: useId(),
		dir,
		getRootNode,
		...props,
	};

	const context: tour.Context = {
		...initialContext,
		onStatusChange: useEvent(props.onStatusChange),
	};

	const [state, send] = useMachine(tour.machine(initialContext), { context });
	return tour.connect(state, send, normalizeProps);
};
