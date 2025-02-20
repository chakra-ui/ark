import * as collapsible from "@zag-js/collapsible";
import { type PropTypes, normalizeProps, useMachine } from "@zag-js/react";
import { useId, useRef } from "react";
import { useEnvironmentContext, useLocaleContext } from "../../providers";
import type { Optional } from "../../types";
import type { RenderStrategyProps } from "../../utils/render-strategy";

export interface UseCollapsibleProps
	extends Optional<Omit<collapsible.Props, "dir" | "getRootNode">, "id">,
		RenderStrategyProps {}

export interface UseCollapsibleReturn extends collapsible.Api<PropTypes> {
	/**
	 * Whether the content is unmounted
	 */
	isUnmounted?: boolean;
}

export const useCollapsible = (
	props: UseCollapsibleProps = {},
): UseCollapsibleReturn => {
	const { lazyMount, unmountOnExit, ...collapsibleProps } = props;
	const wasVisible = useRef(false);
	const { dir } = useLocaleContext();
	const { getRootNode } = useEnvironmentContext();

	const userProps: collapsible.Props = {
		id: useId(),
		dir,
		getRootNode,
		...collapsibleProps,
	};

	const service = useMachine(collapsible.machine, userProps);
	const api = collapsible.connect(service, normalizeProps);

	if (api.visible) {
		wasVisible.current = true;
	}

	const isUnmounted =
		(!api.visible && !wasVisible.current && lazyMount) ||
		(unmountOnExit && !api.visible && wasVisible.current);

	return { ...api, isUnmounted };
};
