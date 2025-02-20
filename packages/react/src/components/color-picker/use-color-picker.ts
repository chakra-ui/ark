import * as colorPicker from "@zag-js/color-picker";
import { type PropTypes, normalizeProps, useMachine } from "@zag-js/react";
import { useId } from "react";
import { useEnvironmentContext, useLocaleContext } from "../../providers";
import type { Optional } from "../../types";
import { useFieldContext } from "../field";

export interface UseColorPickerProps
	extends Optional<Omit<colorPicker.Props, "dir" | "getRootNode">, "id"> {}

export interface UseColorPickerReturn extends colorPicker.Api<PropTypes> {}

export const useColorPicker = (
	props: UseColorPickerProps,
): UseColorPickerReturn => {
	const id = useId();
	const { getRootNode } = useEnvironmentContext();
	const { dir } = useLocaleContext();
	const field = useFieldContext();

	const userProps: colorPicker.Props = {
		id,
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
		...props,
	};

	const service = useMachine(colorPicker.machine, userProps);
	return colorPicker.connect(service, normalizeProps);
};
