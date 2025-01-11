import { mergeProps } from "@zag-js/react";
import { forwardRef } from "react";
import { type HTMLProps, type PolymorphicProps, ark } from "../factory";
import { useTourContext } from "./use-tour-context";

export interface TourTitleBaseProps extends PolymorphicProps {}
export interface TourTitleProps extends HTMLProps<"h2">, TourTitleBaseProps {}

export const TourTitle = forwardRef<HTMLHeadingElement, TourTitleProps>(
	(props, ref) => {
		const tour = useTourContext();
		const mergedProps = mergeProps(tour.getTitleProps(), props);

		return (
			<ark.h2 {...mergedProps} ref={ref}>
				{mergedProps.children || tour.step?.title}
			</ark.h2>
		);
	},
);

TourTitle.displayName = "TourTitle";
