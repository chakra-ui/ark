import { mergeProps } from "@zag-js/react";
import { forwardRef } from "react";
import { composeRefs } from "../../utils/compose-refs";
import { useRenderStrategyPropsContext } from "../../utils/render-strategy";
import { type HTMLProps, type PolymorphicProps, ark } from "../factory";
import { usePresence } from "../presence";
import { useTourContext } from "./use-tour-context";

export interface TourBackdropBaseProps extends PolymorphicProps {}
export interface TourBackdropProps
	extends HTMLProps<"div">,
		TourBackdropBaseProps {}

export const TourBackdrop = forwardRef<HTMLDivElement, TourBackdropProps>(
	(props, ref) => {
		const tour = useTourContext();
		const renderStrategyProps = useRenderStrategyPropsContext();
		const presence = usePresence({
			...renderStrategyProps,
			present: tour.open,
		});
		const mergedProps = mergeProps(
			tour.getBackdropProps(),
			presence.getPresenceProps(),
			props,
		);

		if (presence.unmounted) {
			return null;
		}

		return (
			<ark.div
				{...mergedProps}
				ref={composeRefs(presence.ref, ref)}
				hidden={!tour.step?.backdrop}
			/>
		);
	},
);

TourBackdrop.displayName = "TourBackdrop";
