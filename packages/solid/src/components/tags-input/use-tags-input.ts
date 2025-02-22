import { type PropTypes, normalizeProps, useMachine } from "@zag-js/solid";
import * as tagsInput from "@zag-js/tags-input";
import { type Accessor, createMemo, createUniqueId } from "solid-js";
import { useEnvironmentContext, useLocaleContext } from "../../providers";
import type { Optional } from "../../types";
import { useFieldContext } from "../field";

export interface UseTagsInputProps
	extends Optional<Omit<tagsInput.Props, "dir" | "getRootNode">, "id"> {}
export interface UseTagsInputReturn
	extends Accessor<tagsInput.Api<PropTypes>> {}

export const useTagsInput = (
	props: UseTagsInputProps = {},
): UseTagsInputReturn => {
	const id = createUniqueId();
	const locale = useLocaleContext();
	const environment = useEnvironmentContext();
	const field = useFieldContext();

	const machineProps = createMemo<tagsInput.Props>(() => ({
		id,
		ids: {
			label: field?.().ids.label,
			hiddenInput: field?.().ids.control,
		},
		dir: locale().dir,
		disabled: field?.().disabled,
		invalid: field?.().invalid,
		readOnly: field?.().readOnly,
		required: field?.().required,
		getRootNode: environment().getRootNode,
		...props,
	}));

	const service = useMachine(tagsInput.machine, machineProps);
	return createMemo(() => tagsInput.connect(service, normalizeProps));
};
