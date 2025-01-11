import { mergeProps } from "@zag-js/solid";
import { Show } from "solid-js";
import { type HTMLProps, type PolymorphicProps, ark } from "../factory";
import { useTourContext } from "./use-tour-context";

export interface TourArrowBaseProps extends PolymorphicProps<"div"> {}
export interface TourArrowProps extends HTMLProps<"div">, TourArrowBaseProps {}

export const TourArrow = (props: TourArrowProps) => {
	const tour = useTourContext();
	const mergedProps = mergeProps(() => tour().getArrowProps(), props);

	return (
		<Show when={tour().step?.arrow}>
			<ark.div {...mergedProps} />
		</Show>
	);
};
