import * as rating from "@zag-js/rating-group";
import { type PropTypes, normalizeProps, useMachine } from "@zag-js/react";
import { useId } from "react";
import { useEnvironmentContext, useLocaleContext } from "../../providers";
import type { Optional } from "../../types";
import { useFieldContext } from "../field";

export interface UseRatingGroupProps
	extends Optional<Omit<rating.Props, "dir" | "getRootNode">, "id"> {}

export interface UseRatingGroupReturn extends rating.Api<PropTypes> {}

export const useRatingGroup = (
	props: UseRatingGroupProps,
): UseRatingGroupReturn => {
	const id = useId();
	const { getRootNode } = useEnvironmentContext();
	const { dir } = useLocaleContext();
	const field = useFieldContext();

	const userProps: rating.Props = {
		id,
		ids: {
			label: field?.ids.label,
			hiddenInput: field?.ids.control,
		},
		dir,
		disabled: field?.disabled,
		readOnly: field?.readOnly,
		required: field?.required,
		getRootNode,
		...props,
	};

	const service = useMachine(rating.machine, userProps);
	return rating.connect(service, normalizeProps);
};
