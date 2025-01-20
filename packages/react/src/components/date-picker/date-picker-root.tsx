import { mergeProps } from "@zag-js/react";
import { forwardRef } from "react";
import type { Assign } from "../../types";
import { createSplitProps } from "../../utils/create-split-props";
import { type HTMLProps, type PolymorphicProps, ark } from "../factory";
import {
	PresenceProvider,
	type UsePresenceProps,
	splitPresenceProps,
	usePresence,
} from "../presence";
import { type UseDatePickerProps, useDatePicker } from "./use-date-picker";
import { DatePickerProvider } from "./use-date-picker-context";

export interface DatePickerRootBaseProps
	extends UseDatePickerProps,
		UsePresenceProps,
		PolymorphicProps {}
export interface DatePickerRootProps
	extends Assign<HTMLProps<"div">, DatePickerRootBaseProps> {}

export const DatePickerRoot = forwardRef<HTMLDivElement, DatePickerRootProps>(
	(props, ref) => {
		const [presenceProps, datePickerProps] = splitPresenceProps(props);
		const [useDatePickerProps, localProps] =
			createSplitProps<UseDatePickerProps>()(datePickerProps, [
				"closeOnSelect",
				"defaultOpen",
				"defaultValue",
				"defaultView",
				"disabled",
				"fixedWeeks",
				"focusedValue",
				"format",
				"id",
				"ids",
				"isDateUnavailable",
				"isDateUnavailable",
				"locale",
				"max",
				"maxView",
				"min",
				"minView",
				"name",
				"numOfMonths",
				"onFocusChange",
				"onOpenChange",
				"onValueChange",
				"onViewChange",
				"open",
				"parse",
				"placeholder",
				"positioning",
				"readOnly",
				"selectionMode",
				"startOfWeek",
				"timeZone",
				"translations",
				"value",
				"view",
			]);
		const datePicker = useDatePicker(useDatePickerProps);
		const presence = usePresence(
			mergeProps({ present: datePicker.open }, presenceProps),
		);
		const mergedProps = mergeProps(datePicker.getRootProps(), localProps);

		return (
			<DatePickerProvider value={datePicker}>
				<PresenceProvider value={presence}>
					<ark.div {...mergedProps} ref={ref} />
				</PresenceProvider>
			</DatePickerProvider>
		);
	},
);

DatePickerRoot.displayName = "DatePickerRoot";
