import { type PropTypes, normalizeProps, useMachine } from "@zag-js/react";
import * as tour from "@zag-js/tour";
import { useId } from "react";
import { useEnvironmentContext, useLocaleContext } from "../../providers";
import type { Optional } from "../../types";
import { useEvent } from "../../utils/use-event";

export interface UseTourProps
	extends Optional<Omit<tour.Props, "dir" | "getRootNode">, "id"> {}
export interface UseTourReturn extends tour.Api<PropTypes> {}

export const useTour = (props: UseTourProps = {}): UseTourReturn => {
	const { getRootNode } = useEnvironmentContext();
	const { dir } = useLocaleContext();

	const initialContext: tour.Props = {
		id: useId(),
		dir,
		getRootNode,
		...props,
	};

	const context: tour.Props = {
		...initialContext,
		onStatusChange: useEvent(props.onStatusChange),
	};

	const service = useMachine(tour.machine(initialContext), { context });
	return tour.connect(service, normalizeProps);
};
