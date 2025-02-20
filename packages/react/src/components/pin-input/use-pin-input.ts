import * as pinInput from "@zag-js/pin-input";
import { type PropTypes, normalizeProps, useMachine } from "@zag-js/react";
import { useId } from "react";
import { useEnvironmentContext, useLocaleContext } from "../../providers";
import type { Optional } from "../../types";
import { useEvent } from "../../utils/use-event";
import { useFieldContext } from "../field";

export interface UsePinInputProps
	extends Optional<Omit<pinInput.Props, "dir" | "getRootNode">, "id"> {
	/**
	 * The initial value of the pin input when it is first rendered.
	 * Use when you do not need to control the state of the pin input
	 */
	defaultValue?: pinInput.Props["value"];
}

export interface UsePinInputReturn extends pinInput.Api<PropTypes> {}

export const usePinInput = (
	props: UsePinInputProps = {},
): UsePinInputReturn => {
	const { getRootNode } = useEnvironmentContext();
	const { dir } = useLocaleContext();
	const field = useFieldContext();

	const initialContext: pinInput.Props = {
		id: useId(),
		ids: {
			label: field?.ids.label,
			hiddenInput: field?.ids.control,
		},
		disabled: field?.disabled,
		readOnly: field?.readOnly,
		required: field?.required,
		invalid: field?.invalid,
		dir,
		getRootNode,
		value: props.defaultValue,
		...props,
	};

	const context: pinInput.Props = {
		...initialContext,
		value: props.value,
		onValueChange: useEvent(props.onValueChange, { sync: true }),
		onValueComplete: useEvent(props.onValueComplete),
		onValueInvalid: useEvent(props.onValueInvalid),
	};

	const service = useMachine(pinInput.machine(initialContext), { context });
	return pinInput.connect(service, normalizeProps);
};
