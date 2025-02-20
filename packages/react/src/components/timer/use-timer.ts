import { type PropTypes, normalizeProps, useMachine } from "@zag-js/react";
import * as timer from "@zag-js/timer";
import { useId } from "react";
import { useEnvironmentContext } from "../../providers";
import type { Optional } from "../../types";
import { useEvent } from "../../utils/use-event";

export interface UseTimerProps
	extends Optional<Omit<timer.Props, "dir" | "getRootNode">, "id"> {}

export interface UseTimerReturn extends timer.Api<PropTypes> {}

export const useTimer = (props: UseTimerProps = {}): UseTimerReturn => {
	const env = useEnvironmentContext();

	const initialContext: timer.Props = {
		id: useId(),
		getRootNode: env.getRootNode,
		...props,
	};

	const context: timer.Props = {
		...initialContext,
		onComplete: useEvent(props.onComplete),
		onTick: useEvent(props.onTick),
	};

	const service = useMachine(timer.machine(initialContext), { context });

	return timer.connect(service, normalizeProps);
};
