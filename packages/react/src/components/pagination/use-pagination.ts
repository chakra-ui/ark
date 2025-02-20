import * as pagination from "@zag-js/pagination";
import { type PropTypes, normalizeProps, useMachine } from "@zag-js/react";
import { useId } from "react";
import { useEnvironmentContext, useLocaleContext } from "../../providers";
import type { Optional } from "../../types";
import { useEvent } from "../../utils/use-event";

export interface UsePaginationProps
	extends Optional<Omit<pagination.Props, "dir" | "getRootNode">, "id"> {
	/**
	 * The initial page of the pagination when it is first rendered.
	 * Use when you do not need to control the state of the pagination.
	 */
	defaultPage?: pagination.Props["page"];
}

export interface UsePaginationReturn extends pagination.Api<PropTypes> {}

export const usePagination = (
	props: UsePaginationProps,
): UsePaginationReturn => {
	const { getRootNode } = useEnvironmentContext();
	const { dir } = useLocaleContext();

	const initialContext: pagination.Props = {
		id: useId(),
		dir,
		getRootNode,
		page: props.defaultPage,
		...props,
	};

	const context: pagination.Props = {
		...initialContext,
		page: props.page,
		onPageChange: useEvent(props.onPageChange, { sync: true }),
	};

	const service = useMachine(pagination.machine(initialContext), { context });
	return pagination.connect(service, normalizeProps);
};
