import { type PropTypes, normalizeProps, useMachine } from "@zag-js/react";
import * as timePicker from "@zag-js/time-picker";
import { useId } from "react";
import { useEnvironmentContext, useLocaleContext } from "../../providers";
import type { Optional } from "../../types";

export interface UseTimePickerProps
	extends Optional<Omit<timePicker.Props, "dir" | "getRootNode">, "id"> {}

export interface UseTimePickerReturn extends timePicker.Api<PropTypes> {}

export const useTimePicker = (
	props: UseTimePickerProps,
): UseTimePickerReturn => {
	const id = useId();
	const { getRootNode } = useEnvironmentContext();
	const { dir } = useLocaleContext();

	const userProps: timePicker.Props = {
		id,
		dir,
		getRootNode,
		...props,
	};

	const service = useMachine(timePicker.machine, userProps);
	return timePicker.connect(service, normalizeProps);
};
