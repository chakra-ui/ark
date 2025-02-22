import * as signaturePad from "@zag-js/signature-pad";
import { type PropTypes, normalizeProps, useMachine } from "@zag-js/solid";
import { type Accessor, createMemo, createUniqueId } from "solid-js";
import { useEnvironmentContext, useLocaleContext } from "../../providers";
import type { Optional } from "../../types";
import { useFieldContext } from "../field";

export interface UseSignaturePadProps
	extends Optional<Omit<signaturePad.Props, "dir" | "getRootNode">, "id"> {}
export interface UseSignaturePadReturn
	extends Accessor<signaturePad.Api<PropTypes>> {}

export const useSignaturePad = (
	props: UseSignaturePadProps = {},
): UseSignaturePadReturn => {
	const id = createUniqueId();
	const locale = useLocaleContext();
	const environment = useEnvironmentContext();
	const field = useFieldContext();

	const machineProps = createMemo<signaturePad.Props>(() => ({
		id,
		ids: {
			label: field?.().ids.label,
			hiddenInput: field?.().ids.control,
		},
		disabled: field?.().disabled,
		readOnly: field?.().readOnly,
		required: field?.().required,
		dir: locale().dir,
		getRootNode: environment().getRootNode,
		...props,
	}));

	const service = useMachine(signaturePad.machine, machineProps);
	return createMemo(() => signaturePad.connect(service, normalizeProps));
};
