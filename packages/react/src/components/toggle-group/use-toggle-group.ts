import { type PropTypes, normalizeProps, useMachine } from "@zag-js/react";
import * as toggleGroup from "@zag-js/toggle-group";
import { useId } from "react";
import { useEnvironmentContext, useLocaleContext } from "../../providers";
import type { Optional } from "../../types";

export interface UseToggleGroupProps
	extends Optional<Omit<toggleGroup.Props, "dir" | "getRootNode">, "id"> {}

export interface UseToggleGroupReturn extends toggleGroup.Api<PropTypes> {}

export const useToggleGroup = (
	props: UseToggleGroupProps,
): UseToggleGroupReturn => {
	const id = useId();
	const { getRootNode } = useEnvironmentContext();
	const { dir } = useLocaleContext();

	const userProps: toggleGroup.Props = {
		id,
		dir,
		getRootNode,
		...props,
	};

	const service = useMachine(toggleGroup.machine, userProps);
	return toggleGroup.connect(service, normalizeProps);
};
