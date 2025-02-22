import * as pinInput from "@zag-js/pin-input";
import { type PropTypes, normalizeProps, useMachine } from "@zag-js/solid";
import { type Accessor, createMemo, createUniqueId } from "solid-js";
import { useEnvironmentContext, useLocaleContext } from "../../providers";
import type { Optional } from "../../types";
import { useFieldContext } from "../field";

export interface UsePinInputProps
	extends Optional<Omit<pinInput.Props, "dir" | "getRootNode">, "id"> {}
export interface UsePinInputReturn extends Accessor<pinInput.Api<PropTypes>> {}

export const usePinInput = (
	props: UsePinInputProps = {},
): UsePinInputReturn => {
	const id = createUniqueId();
	const locale = useLocaleContext();
	const environment = useEnvironmentContext();
	const field = useFieldContext();

	const machineProps = createMemo<pinInput.Props>(() => ({
		id,
		ids: {
			label: field?.().ids.label,
			hiddenInput: field?.().ids.control,
		},
		disabled: field?.().disabled,
		readOnly: field?.().readOnly,
		required: field?.().required,
		invalid: field?.().invalid,
		dir: locale().dir,
		getRootNode: environment().getRootNode,
		...props,
	}));

	const service = useMachine(pinInput.machine, machineProps);
	return createMemo(() => pinInput.connect(service, normalizeProps));
};
