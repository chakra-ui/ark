import * as combobox from "@zag-js/combobox";
import { type PropTypes, normalizeProps, useMachine } from "@zag-js/react";
import { useId } from "react";
import { useEnvironmentContext, useLocaleContext } from "../../providers";
import type { Optional } from "../../types";
import type { CollectionItem, ListCollection } from "../collection";
import { useFieldContext } from "../field";

export interface UseComboboxProps<T extends CollectionItem>
	extends Optional<
		Omit<combobox.Props<T>, "dir" | "getRootNode" | "collection">,
		"id"
	> {
	/**
	 * The collection of items
	 */
	collection: ListCollection<T>;
}

export interface UseComboboxReturn<T extends CollectionItem>
	extends combobox.Api<PropTypes, T> {}

export const useCombobox = <T extends CollectionItem>(
	props: UseComboboxProps<T>,
): UseComboboxReturn<T> => {
	const id = useId();
	const { dir } = useLocaleContext();
	const { getRootNode } = useEnvironmentContext();
	const field = useFieldContext();

	const userProps: combobox.Props<T> = {
		id,
		ids: {
			label: field?.ids.label,
			input: field?.ids.control,
		},
		disabled: field?.disabled,
		readOnly: field?.readOnly,
		required: field?.required,
		invalid: field?.invalid,
		dir,
		getRootNode,

		...props,
	};

	const service = useMachine(combobox.machine, userProps);
	return combobox.connect(service, normalizeProps);
};
