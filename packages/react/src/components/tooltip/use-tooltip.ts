import { type PropTypes, normalizeProps, useMachine } from "@zag-js/react";
import * as tooltip from "@zag-js/tooltip";
import { useId } from "react";
import { useEnvironmentContext, useLocaleContext } from "../../providers";
import type { Optional } from "../../types";

export interface UseTooltipProps
	extends Optional<Omit<tooltip.Props, "dir" | "getRootNode">, "id"> {}

export interface UseTooltipReturn extends tooltip.Api<PropTypes> {}

export const useTooltip = (props: UseTooltipProps): UseTooltipReturn => {
	const id = useId();
	const { getRootNode } = useEnvironmentContext();
	const { dir } = useLocaleContext();

	const userProps: tooltip.Props = {
		id,
		dir,
		getRootNode,
		...props,
	};

	const service = useMachine(tooltip.machine, userProps);
	return tooltip.connect(service, normalizeProps);
};
