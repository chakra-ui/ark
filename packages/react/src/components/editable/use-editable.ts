import * as editable from "@zag-js/editable";
import { normalizeProps, useMachine } from "@zag-js/react";
import type { PropTypes } from "@zag-js/types";
import { useId } from "react";
import { useEnvironmentContext, useLocaleContext } from "../../providers";
import type { Optional } from "../../types";
import { useEvent } from "../../utils/use-event";
import { useFieldContext } from "../field";

export interface UseEditableProps
	extends Optional<
		Omit<editable.Props, "dir" | "getRootNode" | "edit.controlled">,
		"id"
	> {
	/**
	 * The initial edit state of the editable when it is first rendered.
	 * Use when you do not need to control its edit state.
	 */
	defaultEdit?: editable.Props["edit"];
	/**
	 * The initial value of the editable when it is first rendered.
	 * Use when you do not need to control the state of the editable.
	 */
	defaultValue?: editable.Props["value"];
}

export interface UseEditableReturn extends editable.Api<PropTypes> {}

export const useEditable = (
	props: UseEditableProps = {},
): UseEditableReturn => {
	const { getRootNode } = useEnvironmentContext();
	const { dir } = useLocaleContext();
	const field = useFieldContext();

	const initialContext: editable.Props = {
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
		edit: props.defaultEdit,
		value: props.defaultValue,
		"edit.controlled": props.edit !== undefined,
		...props,
	};

	const context: editable.Props = {
		...initialContext,
		value: props.value,
		onValueChange: useEvent(props.onValueChange, { sync: true }),
		onEditChange: useEvent(props.onEditChange),
		onValueCommit: useEvent(props.onValueCommit),
		onValueRevert: useEvent(props.onValueRevert),
	};

	const service = useMachine(editable.machine(initialContext), { context });
	return editable.connect(service, normalizeProps);
};
