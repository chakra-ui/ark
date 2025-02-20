import { type PropTypes, normalizeProps, useMachine } from "@zag-js/react";
import * as tagsInput from "@zag-js/tags-input";
import { useId } from "react";
import { useEnvironmentContext, useLocaleContext } from "../../providers";
import type { Optional } from "../../types";
import { useEvent } from "../../utils/use-event";
import { useFieldContext } from "../field";

export interface UseTagsInputProps
	extends Optional<Omit<tagsInput.Props, "dir" | "getRootNode">, "id"> {
	/**
	 * The initial value of the tags input when it is first rendered.
	 * Use when you do not need to control the state of the tags input.
	 */
	defaultValue?: tagsInput.Props["value"];
}

export interface UseTagsInputReturn extends tagsInput.Api<PropTypes> {}

export const useTagsInput = (
	props: UseTagsInputProps = {},
): UseTagsInputReturn => {
	const { getRootNode } = useEnvironmentContext();
	const { dir } = useLocaleContext();
	const field = useFieldContext();

	const initialContext: tagsInput.Props = {
		id: useId(),
		ids: {
			label: field?.ids.label,
			hiddenInput: field?.ids.control,
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

	const context: tagsInput.Props = {
		...initialContext,
		value: props.value,
		onValueChange: useEvent(props.onValueChange, { sync: true }),
		onValueInvalid: useEvent(props.onValueInvalid),
		onHighlightChange: useEvent(props.onHighlightChange),
	};

	const service = useMachine(tagsInput.machine(initialContext), { context });

	return tagsInput.connect(service, normalizeProps);
};
