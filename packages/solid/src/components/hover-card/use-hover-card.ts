import * as hoverCard from "@zag-js/hover-card";
import { type PropTypes, normalizeProps, useMachine } from "@zag-js/solid";
import { type Accessor, createMemo, createUniqueId } from "solid-js";
import { useEnvironmentContext, useLocaleContext } from "../../providers";
import type { Optional } from "../../types";

export interface UseHoverCardProps
	extends Optional<Omit<hoverCard.Props, "dir" | "getRootNode">, "id"> {}
export interface UseHoverCardReturn
	extends Accessor<hoverCard.Api<PropTypes>> {}

export const useHoverCard = (
	props: UseHoverCardProps = {},
): UseHoverCardReturn => {
	const locale = useLocaleContext();
	const environment = useEnvironmentContext();
	const id = createUniqueId();

	const machineProps = createMemo<hoverCard.Props>(() => ({
		id,
		dir: locale().dir,
		getRootNode: environment().getRootNode,
		...props,
	}));

	const service = useMachine(hoverCard.machine, machineProps);
	return createMemo(() => hoverCard.connect(service, normalizeProps));
};
