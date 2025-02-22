import * as segmentGroup from "@zag-js/radio-group";
import { type PropTypes, normalizeProps, useMachine } from "@zag-js/solid";
import { type Accessor, createMemo, createUniqueId } from "solid-js";
import { useEnvironmentContext, useLocaleContext } from "../../providers";
import type { Optional } from "../../types";

export interface UseSegmentGroupProps
	extends Optional<Omit<segmentGroup.Props, "dir" | "getRootNode">, "id"> {}
export interface UseSegmentGroupReturn
	extends Accessor<segmentGroup.Api<PropTypes>> {}

export const useSegmentGroup = (
	props: UseSegmentGroupProps = {},
): UseSegmentGroupReturn => {
	const id = createUniqueId();
	const locale = useLocaleContext();
	const environment = useEnvironmentContext();

	const machineProps = createMemo<segmentGroup.Props>(() => ({
		id,
		dir: locale().dir,
		getRootNode: environment().getRootNode,
		...props,
	}));

	const service = useMachine(segmentGroup.machine, machineProps);
	return createMemo(() => segmentGroup.connect(service, normalizeProps));
};
