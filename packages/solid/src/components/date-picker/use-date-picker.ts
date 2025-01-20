import * as datePicker from "@zag-js/date-picker";
import { type PropTypes, normalizeProps, useMachine } from "@zag-js/solid";
import { type Accessor, createMemo, createUniqueId } from "solid-js";
import { useEnvironmentContext, useLocaleContext } from "../../providers";
import type { Optional } from "../../types";

export interface UseDatePickerProps
	extends Optional<
		Omit<datePicker.Context, "dir" | "getRootNode" | "open.controlled">,
		"id"
	> {
	/**
	 * The initial open state of the date picker when it is first rendered.
	 */
	defaultOpen?: datePicker.Context["open"];
	/**
	 * The initial value of the date picker when it is first rendered.
	 */
	defaultValue?: datePicker.Context["value"];
	/**
	 * The initial view of the date picker when it is first rendered.
	 */
	defaultView?: datePicker.Context["view"];
}
export interface UseDatePickerReturn
	extends Accessor<datePicker.Api<PropTypes>> {}

export const useDatePicker = (
	props: UseDatePickerProps = {},
): UseDatePickerReturn => {
	const locale = useLocaleContext();
	const environment = useEnvironmentContext();
	const id = createUniqueId();

	const context = createMemo(() => ({
		id,
		dir: locale().dir,
		getRootNode: environment().getRootNode,
		open: props.defaultOpen,
		"open.controlled": props.open !== undefined,
		value: props.defaultValue,
		view: props.defaultView,
		...props,
	}));

	const [state, send] = useMachine(datePicker.machine(context()), { context });

	return createMemo(() => datePicker.connect(state, send, normalizeProps));
};
