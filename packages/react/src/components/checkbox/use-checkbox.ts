import * as checkbox from "@zag-js/checkbox";
import {
	type PropTypes,
	mergeProps,
	normalizeProps,
	useMachine,
} from "@zag-js/react";
import { useId, useMemo } from "react";
import { useEnvironmentContext, useLocaleContext } from "../../providers";
import type { Optional } from "../../types";
import { useEvent } from "../../utils/use-event";
import { useFieldContext } from "../field";
import { useCheckboxGroupContext } from "./use-checkbox-group-context";

export interface UseCheckboxProps
	extends Optional<Omit<checkbox.Props, "dir" | "getRootNode">, "id"> {
	/**
	 * The checked state of the checkbox when it is first rendered.
	 * Use this when you do not need to control the state of the checkbox.
	 */
	defaultChecked?: checkbox.Props["checked"];
}

export interface UseCheckboxReturn extends checkbox.Api<PropTypes> {}

export const useCheckbox = (
	ownProps: UseCheckboxProps = {},
): UseCheckboxReturn => {
	const checkboxGroup = useCheckboxGroupContext();
	const field = useFieldContext();

	const props = useMemo(() => {
		return mergeProps(
			ownProps,
			checkboxGroup?.getItemProps({ value: ownProps.value }) ?? {},
		);
	}, [ownProps, checkboxGroup]);

	const { getRootNode } = useEnvironmentContext();
	const { dir } = useLocaleContext();

	const initialContext: checkbox.Props = {
		id: useId(),
		ids: {
			label: field?.ids.label,
			hiddenInput: field?.ids.control,
		},
		dir,
		disabled: field?.disabled,
		readOnly: field?.readOnly,
		invalid: field?.invalid,
		required: field?.required,
		getRootNode,
		checked: props.defaultChecked,
		...props,
	};

	const context: checkbox.Props = {
		...initialContext,
		checked: props.checked,
		onCheckedChange: useEvent(props.onCheckedChange, { sync: true }),
	};

	const service = useMachine(checkbox.machine(initialContext), { context });

	return checkbox.connect(service, normalizeProps);
};
