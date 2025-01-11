import { mergeProps } from "@zag-js/solid";
import { Show } from "solid-js";
import { useRenderStrategyContext } from "../../utils/render-strategy";
import { type HTMLProps, type PolymorphicProps, ark } from "../factory";
import { usePresence } from "../presence";
import { useTourContext } from "./use-tour-context";

export interface TourSpotlightBaseProps extends PolymorphicProps<"div"> {}
export interface TourSpotlightProps
	extends HTMLProps<"div">,
		TourSpotlightBaseProps {}

export const TourSpotlight = (props: TourSpotlightProps) => {
	const tour = useTourContext();
	const renderStrategyProps = useRenderStrategyContext();
	const presenceApi = usePresence(
		mergeProps(renderStrategyProps, () => ({ present: tour().open })),
	);
	const mergedProps = mergeProps(
		() => tour().getSpotlightProps(),
		() => presenceApi().presenceProps,
		props,
	);

	return (
		<Show when={!presenceApi().unmounted}>
			<ark.div
				{...mergedProps}
				hidden={!tour().open || !tour().step?.target?.()}
			/>
		</Show>
	);
};
