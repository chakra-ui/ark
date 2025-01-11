import { mergeProps } from "@zag-js/solid";
import { Show } from "solid-js";
import { useRenderStrategyContext } from "../../utils/render-strategy";
import { type HTMLProps, type PolymorphicProps, ark } from "../factory";
import { usePresence } from "../presence";
import { useTourContext } from "./use-tour-context";

export interface TourBackdropBaseProps extends PolymorphicProps<"div"> {}
export interface TourBackdropProps
	extends HTMLProps<"div">,
		TourBackdropBaseProps {}

export const TourBackdrop = (props: TourBackdropProps) => {
	const tour = useTourContext();
	const renderStrategyProps = useRenderStrategyContext();
	const presence = usePresence(
		mergeProps(renderStrategyProps, () => ({ present: tour().open })),
	);
	const mergedProps = mergeProps(
		() => tour().getBackdropProps(),
		() => presence().presenceProps,
		props,
	);

	return (
		<Show when={!presence().unmounted}>
			<ark.div {...mergedProps} hidden={!tour().step?.backdrop} />
		</Show>
	);
};
