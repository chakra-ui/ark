import * as dialog from "@zag-js/dialog";
import { type PropTypes, normalizeProps, useMachine } from "@zag-js/react";
import { useId } from "react";
import { useEnvironmentContext, useLocaleContext } from "../../providers";
import type { Optional } from "../../types";

export interface UseDialogProps
	extends Optional<Omit<dialog.Props, "getRootNode" | "dir">, "id"> {}

export interface UseDialogReturn extends dialog.Api<PropTypes> {}

export const useDialog = (props: UseDialogProps = {}): UseDialogReturn => {
	const id = useId();
	const { getRootNode } = useEnvironmentContext();
	const { dir } = useLocaleContext();

	const userProps: dialog.Props = {
		id,
		getRootNode,
		dir,
		...props,
	};

	const service = useMachine(dialog.machine, userProps);
	return dialog.connect(service, normalizeProps);
};
