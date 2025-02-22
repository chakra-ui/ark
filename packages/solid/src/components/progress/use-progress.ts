import * as progress from "@zag-js/progress";
import { type PropTypes, normalizeProps, useMachine } from "@zag-js/solid";
import { type Accessor, createMemo, createUniqueId } from "solid-js";
import { useEnvironmentContext, useLocaleContext } from "../../providers";
import type { Optional } from "../../types";

export interface UseProgressProps
	extends Optional<Omit<progress.Props, "dir" | "getRootNode">, "id"> {}
export interface UseProgressReturn extends Accessor<progress.Api<PropTypes>> {}

export const useProgress = (
	props: UseProgressProps = {},
): UseProgressReturn => {
	const id = createUniqueId();
	const locale = useLocaleContext();
	const environment = useEnvironmentContext();

	const machineProps = createMemo<progress.Props>(() => ({
		id,
		dir: locale().dir,
		getRootNode: environment().getRootNode,
		...props,
	}));

	const service = useMachine(progress.machine, machineProps);
	return createMemo(() => progress.connect(service, normalizeProps));
};
