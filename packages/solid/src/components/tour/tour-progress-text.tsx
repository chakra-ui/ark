import { mergeProps } from "@zag-js/solid";
import { type HTMLProps, type PolymorphicProps, ark } from "../factory";
import { useTourContext } from "./use-tour-context";

export interface TourProgressTextBaseProps extends PolymorphicProps<"div"> {}
export interface TourProgressTextProps
	extends HTMLProps<"div">,
		TourProgressTextBaseProps {}

export const TourProgressText = (props: TourProgressTextProps) => {
	const tour = useTourContext();
	const mergedProps = mergeProps(() => tour().getProgressTextProps(), props);

	return <ark.div {...mergedProps} />;
};
