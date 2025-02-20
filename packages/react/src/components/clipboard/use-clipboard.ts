import * as clipboard from "@zag-js/clipboard";
import { type PropTypes, normalizeProps, useMachine } from "@zag-js/react";
import { useId } from "react";
import { useEnvironmentContext } from "../../providers/environment";
import type { Optional } from "../../types";

export interface UseClipboardProps
	extends Optional<Omit<clipboard.Props, "getRootNode">, "id"> {}
export interface UseClipboardReturn extends clipboard.Api<PropTypes> {}

export const useClipboard = (
	props: UseClipboardProps = {},
): UseClipboardReturn => {
	const id = useId();
	const { getRootNode } = useEnvironmentContext();

	const userProps: clipboard.Props = {
		id,
		getRootNode,
		...props,
	};

	const service = useMachine(clipboard.machine, userProps);
	return clipboard.connect(service, normalizeProps);
};
