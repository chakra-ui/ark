import { type PropTypes, normalizeProps, useMachine } from "@zag-js/solid";
import * as timer from "@zag-js/timer";
import { type Accessor, createMemo, createUniqueId } from "solid-js";
import { useEnvironmentContext } from "../../providers";
import type { Optional } from "../../types";

export interface UseTimerProps
	extends Optional<Omit<timer.Props, "dir" | "getRootNode">, "id"> {}
export interface UseTimerReturn extends Accessor<timer.Api<PropTypes>> {}

export const useTimer = (props: UseTimerProps = {}): UseTimerReturn => {
	const id = createUniqueId();
	const environment = useEnvironmentContext();

	const machineProps = createMemo<timer.Props>(() => ({
		id,
		getRootNode: environment().getRootNode,
		...props,
	}));

	const service = useMachine(timer.machine, machineProps);
	return createMemo(() => timer.connect(service, normalizeProps));
};
