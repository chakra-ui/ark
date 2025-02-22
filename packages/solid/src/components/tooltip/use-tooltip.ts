import { type PropTypes, normalizeProps, useMachine } from "@zag-js/solid";
import * as tooltip from "@zag-js/tooltip";
import { type Accessor, createMemo, createUniqueId } from "solid-js";
import { useEnvironmentContext, useLocaleContext } from "../../providers";
import type { Optional } from "../../types";

export interface UseTooltipProps
	extends Optional<Omit<tooltip.Props, "dir" | "getRootNode">, "id"> {}
export interface UseTooltipReturn extends Accessor<tooltip.Api<PropTypes>> {}

export const useTooltip = (props: UseTooltipProps = {}): UseTooltipReturn => {
	const id = createUniqueId();
	const locale = useLocaleContext();
	const environment = useEnvironmentContext();

	const machineProps = createMemo<tooltip.Props>(() => ({
		id,
		dir: locale().dir,
		getRootNode: environment().getRootNode,
		...props,
	}));

	const service = useMachine(tooltip.machine, machineProps);
	return createMemo(() => tooltip.connect(service, normalizeProps));
};
