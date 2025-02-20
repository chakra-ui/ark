import * as progress from "@zag-js/progress";
import { type PropTypes, normalizeProps, useMachine } from "@zag-js/react";
import { useId } from "react";
import { useEnvironmentContext, useLocaleContext } from "../../providers";
import type { Optional } from "../../types";
import { useEvent } from "../../utils/use-event";

export interface UseProgressProps
	extends Optional<Omit<progress.Props, "dir" | "getRootNode">, "id"> {
	/**
	 * The initial value of the progress when it is first rendered.
	 * Use when you do not need to control the state of the progress.
	 */
	defaultValue?: progress.Props["value"];
}

export interface UseProgressReturn extends progress.Api<PropTypes> {}

export const useProgress = (
	props: UseProgressProps = {},
): UseProgressReturn => {
	const { getRootNode } = useEnvironmentContext();
	const { dir } = useLocaleContext();

	const initialContext: progress.Props = {
		id: useId(),
		dir,
		getRootNode,
		value: props.defaultValue,
		...props,
	};

	const context: progress.Props = {
		...initialContext,
		value: props.value,
		onValueChange: useEvent(props.onValueChange, { sync: true }),
	};

	const service = useMachine(progress.machine(initialContext), { context });
	return progress.connect(service, normalizeProps);
};
