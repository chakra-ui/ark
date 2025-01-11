import { mergeProps } from "@zag-js/react";
import type { ReactNode } from "react";
import {
	RenderStrategyPropsProvider,
	splitRenderStrategyProps,
} from "../../utils/render-strategy";
import {
	PresenceProvider,
	type UsePresenceProps,
	splitPresenceProps,
	usePresence,
} from "../presence";
import type { UseTourReturn } from "./use-tour";
import { TourProvider } from "./use-tour-context";

export interface TourRootBaseProps extends UsePresenceProps {
	tour: UseTourReturn;
}
export interface TourRootProps extends TourRootBaseProps {
	children?: ReactNode;
}

export const TourRoot = (props: TourRootProps) => {
	const [presenceProps, { children, tour }] = splitPresenceProps(props);
	const [renderStrategyProps] = splitRenderStrategyProps(presenceProps);
	const presence = usePresence(
		mergeProps({ present: tour.open }, presenceProps),
	);

	return (
		<TourProvider value={tour}>
			<RenderStrategyPropsProvider value={renderStrategyProps}>
				<PresenceProvider value={presence}>{children}</PresenceProvider>
			</RenderStrategyPropsProvider>
		</TourProvider>
	);
};
