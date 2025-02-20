import * as accordion from "@zag-js/accordion";
import { type PropTypes, normalizeProps, useMachine } from "@zag-js/react";
import { useId } from "react";
import { useEnvironmentContext, useLocaleContext } from "../../providers";
import type { Optional } from "../../types";

export interface UseAccordionProps
	extends Optional<Omit<accordion.Props, "dir" | "getRootNode">, "id"> {}

export interface UseAccordionReturn extends accordion.Api<PropTypes> {}

export const useAccordion = (
	props: UseAccordionProps = {},
): UseAccordionReturn => {
	const { getRootNode } = useEnvironmentContext();
	const { dir } = useLocaleContext();

	const machineProps: accordion.Props = {
		id: useId(),
		dir,
		getRootNode,
		...props,
	};

	const service = useMachine(accordion.machine, machineProps);
	return accordion.connect(service, normalizeProps);
};
