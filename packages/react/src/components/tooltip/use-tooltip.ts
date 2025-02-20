import { type PropTypes, normalizeProps, useMachine } from "@zag-js/react";
import * as tooltip from "@zag-js/tooltip";
import { useId } from "react";
import { useEnvironmentContext, useLocaleContext } from "../../providers";
import type { Optional } from "../../types";
import { useEvent } from "../../utils/use-event";

export interface UseTooltipProps
	extends Optional<Omit<tooltip.Props, "dir" | "getRootNode">, "id"> {
	/**
	 * The initial open state of the tooltip when it is first rendered.
	 * Use when you do not need to control its open state.
	 */
	defaultOpen?: tooltip.Props["open"];
}

export interface UseTooltipReturn extends tooltip.Api<PropTypes> {}

export const useTooltip = (props: UseTooltipProps = {}): UseTooltipReturn => {
	const { getRootNode } = useEnvironmentContext();
	const { dir } = useLocaleContext();

	const initialContext: tooltip.Props = {
		id: useId(),
		dir,
		getRootNode,

		...props,
	};

	const context: tooltip.Props = {
		...initialContext,
		onOpenChange: useEvent(props.onOpenChange, { sync: true }),
	};

	const service = useMachine(tooltip.machine(initialContext), { context });

	return tooltip.connect(service, normalizeProps);
};
