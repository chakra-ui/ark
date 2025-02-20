import * as rating from "@zag-js/rating-group";
import { type PropTypes, normalizeProps, useMachine } from "@zag-js/react";
import { useId } from "react";
import { useEnvironmentContext, useLocaleContext } from "../../providers";
import type { Optional } from "../../types";
import { useEvent } from "../../utils/use-event";
import { useFieldContext } from "../field";

export interface UseRatingGroupProps
	extends Optional<Omit<rating.Props, "dir" | "getRootNode">, "id"> {
	/**
	 * The initial value of the rating group when it is first rendered.
	 * Use when you do not need to control the state of the rating group.
	 */
	defaultValue?: rating.Props["value"];
}

export interface UseRatingGroupReturn extends rating.Api<PropTypes> {}

export const useRatingGroup = (
	props: UseRatingGroupProps = {},
): UseRatingGroupReturn => {
	const { getRootNode } = useEnvironmentContext();
	const { dir } = useLocaleContext();
	const field = useFieldContext();

	const initialContext: rating.Props = {
		id: useId(),
		ids: {
			label: field?.ids.label,
			hiddenInput: field?.ids.control,
		},
		dir,
		disabled: field?.disabled,
		readOnly: field?.readOnly,
		required: field?.required,
		getRootNode,
		value: props.defaultValue,
		...props,
	};

	const context: rating.Props = {
		...initialContext,
		value: props.value,
		onValueChange: useEvent(props.onValueChange, { sync: true }),
		onHoverChange: useEvent(props.onHoverChange),
	};

	const service = useMachine(rating.machine(initialContext), {
		context,
	});

	return rating.connect(service, normalizeProps);
};
