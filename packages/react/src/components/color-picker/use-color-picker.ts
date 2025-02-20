import * as colorPicker from "@zag-js/color-picker";
import { type PropTypes, normalizeProps, useMachine } from "@zag-js/react";
import { useId } from "react";
import { useEnvironmentContext, useLocaleContext } from "../../providers";
import type { Optional } from "../../types";
import { useEvent } from "../../utils/use-event";
import { useFieldContext } from "../field";

export interface UseColorPickerProps
	extends Optional<
		Omit<colorPicker.Props, "open.controlled" | "dir" | "getRootNode">,
		"id"
	> {
	/**
	 * The initial open state of the color picker when it is first rendered.
	 * Use when you do not need to control its open state.
	 */
	defaultOpen?: colorPicker.Props["open"];
	/**
	 * The initial value of the color picker when it is first rendered.
	 * Use when you do not need to control the state of the color picker.
	 */
	defaultValue?: colorPicker.Props["value"];
}

export interface UseColorPickerReturn extends colorPicker.Api<PropTypes> {}

export const useColorPicker = (
	props: UseColorPickerProps = {},
): UseColorPickerReturn => {
	const { getRootNode } = useEnvironmentContext();
	const { dir } = useLocaleContext();
	const field = useFieldContext();

	const initialContext: colorPicker.Props = {
		id: useId(),
		ids: {
			label: field?.ids.label,
			input: field?.ids.control,
		},
		dir,
		disabled: field?.disabled,
		invalid: field?.invalid,
		readOnly: field?.readOnly,
		required: field?.required,
		getRootNode,

		value: props.defaultValue,
		...props,
	};

	const context: colorPicker.Props = {
		...initialContext,
		value: props.value,
		onValueChange: useEvent(props.onValueChange, { sync: true }),
		onValueChangeEnd: useEvent(props.onValueChangeEnd),
	};

	const service = useMachine(colorPicker.machine(initialContext), { context });
	return colorPicker.connect(service, normalizeProps);
};
