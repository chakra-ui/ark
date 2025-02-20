import * as radio from "@zag-js/radio-group";
import { type PropTypes, normalizeProps, useMachine } from "@zag-js/react";
import { useId } from "react";
import { useEnvironmentContext, useLocaleContext } from "../../providers";
import type { Optional } from "../../types";
import { useEvent } from "../../utils/use-event";

export interface UseRadioGroupProps
	extends Optional<Omit<radio.Props, "dir" | "getRootNode">, "id"> {
	/**
	 * The initial value of the radio group when it is first rendered.
	 * Use when you do not need to control the state of the radio group.
	 */
	defaultValue?: radio.Props["value"];
}

export interface UseRadioGroupReturn extends radio.Api<PropTypes> {}

export const useRadioGroup = (
	props: UseRadioGroupProps = {},
): UseRadioGroupReturn => {
	const { getRootNode } = useEnvironmentContext();
	const { dir } = useLocaleContext();

	const initialContext: radio.Props = {
		id: useId(),
		dir,
		getRootNode,
		value: props.defaultValue,
		...props,
	};

	const context: radio.Props = {
		...initialContext,
		value: props.value,
		onValueChange: useEvent(props.onValueChange, { sync: true }),
	};

	const service = useMachine(radio.machine(initialContext), {
		context,
	});

	return radio.connect(service, normalizeProps);
};
