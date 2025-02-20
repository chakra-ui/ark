import * as hoverCard from "@zag-js/hover-card";
import { type PropTypes, normalizeProps, useMachine } from "@zag-js/react";
import { useId } from "react";
import { useEnvironmentContext, useLocaleContext } from "../../providers";
import type { Optional } from "../../types";
import { useEvent } from "../../utils/use-event";

export interface UseHoverCardProps
	extends Optional<Omit<hoverCard.Props, "dir" | "getRootNode">, "id"> {
	/**
	 * The initial open state of the hover card when it is first rendered.
	 * Use when you do not need to control its open state.
	 */
	defaultOpen?: hoverCard.Props["open"];
}

export interface UseHoverCardReturn extends hoverCard.Api<PropTypes> {}

export const useHoverCard = (
	props: UseHoverCardProps = {},
): UseHoverCardReturn => {
	const { getRootNode } = useEnvironmentContext();
	const { dir } = useLocaleContext();

	const initialContext: hoverCard.Props = {
		id: useId(),
		dir,
		getRootNode,

		...props,
	};

	const context: hoverCard.Props = {
		...initialContext,
		open: props.open,
		onOpenChange: useEvent(props.onOpenChange, { sync: true }),
	};

	const service = useMachine(hoverCard.machine(initialContext), { context });

	return hoverCard.connect(service, normalizeProps);
};
