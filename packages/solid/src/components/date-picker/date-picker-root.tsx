import { mergeProps } from "@zag-js/solid";
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
		PolymorphicProps<"div"> {}
export interface DatePickerRootProps
	extends HTMLProps<"div">,
		DatePickerRootBaseProps {}

export const DatePickerRoot = (props: DatePickerRootProps) => {
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
	const api = useDatePicker(useDatePickerProps);
	const apiPresence = usePresence(
		mergeProps(presenceProps, () => ({ present: api().open })),
	);
	const mergedProps = mergeProps(() => api().getRootProps(), localProps);

	return (
		<DatePickerProvider value={api}>
			<PresenceProvider value={apiPresence}>
				<ark.div {...mergedProps} />
			</PresenceProvider>
		</DatePickerProvider>
	);
};
