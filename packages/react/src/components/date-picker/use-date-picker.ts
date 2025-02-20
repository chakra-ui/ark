import * as datePicker from "@zag-js/date-picker";
import { type PropTypes, normalizeProps, useMachine } from "@zag-js/react";
import { useId } from "react";
import { useEnvironmentContext, useLocaleContext } from "../../providers";
import type { Optional } from "../../types";
import { useEvent } from "../../utils/use-event";

export interface UseDatePickerProps
	extends Optional<Omit<datePicker.Props, "dir" | "getRootNode">, "id"> {
	/**
	 * The initial open state of the date picker when it is first rendered.
	 */
	defaultOpen?: datePicker.Props["open"];
	/**
	 * The initial value of the date picker when it is first rendered.
	 */
	defaultValue?: datePicker.Props["value"];
	/**
	 * The initial view of the date picker when it is first rendered.
	 */
	defaultView?: datePicker.Props["view"];
}

export interface UseDatePickerReturn extends datePicker.Api<PropTypes> {}

export const useDatePicker = (
	props: UseDatePickerProps = {},
): UseDatePickerReturn => {
	const { getRootNode } = useEnvironmentContext();
	const { dir } = useLocaleContext();

	const initialContext: datePicker.Props = {
		id: useId(),
		dir,
		getRootNode,

		value: props.defaultValue,
		view: props.defaultView,
		...props,
	};

	const context: datePicker.Props = {
		...initialContext,
		value: props.value,
		view: props.view,
		onValueChange: useEvent(props.onValueChange, { sync: true }),
		onFocusChange: useEvent(props.onFocusChange),
		onViewChange: useEvent(props.onViewChange),
		onOpenChange: useEvent(props.onOpenChange),
	};

	const service = useMachine(datePicker.machine(initialContext), {
		context,
	});
	return datePicker.connect(service, normalizeProps);
};
