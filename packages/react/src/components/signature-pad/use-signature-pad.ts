import { type PropTypes, normalizeProps, useMachine } from "@zag-js/react";
import * as signaturePad from "@zag-js/signature-pad";
import { useId } from "react";
import { useEnvironmentContext, useLocaleContext } from "../../providers";
import type { Optional } from "../../types";
import { useFieldContext } from "../field";

export interface UseSignaturePadProps
	extends Optional<Omit<signaturePad.Props, "dir" | "getRootNode">, "id"> {}

export interface UseSignaturePadReturn extends signaturePad.Api<PropTypes> {}

export const useSignaturePad = (
	props: UseSignaturePadProps = {},
): UseSignaturePadReturn => {
	const id = useId();
	const { getRootNode } = useEnvironmentContext();
	const { dir } = useLocaleContext();
	const field = useFieldContext();

	const userProps: signaturePad.Props = {
		id,
		ids: {
			label: field?.ids.label,
			hiddenInput: field?.ids.control,
		},
		dir,
		disabled: field?.disabled,
		readOnly: field?.readOnly,
		required: field?.required,
		getRootNode,
		...props,
	};

	const service = useMachine(signaturePad.machine, userProps);
	return signaturePad.connect(service, normalizeProps);
};
