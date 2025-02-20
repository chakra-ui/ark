import { type PropTypes, normalizeProps, useMachine } from "@zag-js/react";
import * as slider from "@zag-js/slider";
import { useId } from "react";
import { useEnvironmentContext, useLocaleContext } from "../../providers";
import type { Optional } from "../../types";
import { useEvent } from "../../utils/use-event";

export interface UseSliderProps
	extends Optional<Omit<slider.Props, "dir" | "getRootNode">, "id"> {
	/**
	 * The initial value of the slider when it is first rendered.
	 * Use when you do not need to control the state of the slider picker.
	 */
	defaultValue?: slider.Props["value"];
}

export interface UseSliderReturn extends slider.Api<PropTypes> {}

export const useSlider = (props: UseSliderProps = {}): UseSliderReturn => {
	const { getRootNode } = useEnvironmentContext();
	const { dir } = useLocaleContext();

	const initialContext: slider.Props = {
		id: useId(),
		dir,
		getRootNode,
		value: props.defaultValue,
		...props,
	};

	const context: slider.Props = {
		...initialContext,
		value: props.value,
		onValueChange: useEvent(props.onValueChange, { sync: true }),
		onValueChangeEnd: useEvent(props.onValueChangeEnd),
		onFocusChange: useEvent(props.onFocusChange),
	};

	const service = useMachine(slider.machine(initialContext), {
		context,
	});

	return slider.connect(service, normalizeProps);
};
