import { mergeProps } from "@zag-js/solid";
import { type HTMLProps, type PolymorphicProps, ark } from "../factory";
import { tourAnatomy } from "./tour.anatomy";

export interface TourControlBaseProps extends PolymorphicProps<"div"> {}
export interface TourControlProps
	extends HTMLProps<"div">,
		TourControlBaseProps {}

export const TourControl = (props: TourControlProps) => {
	const mergedProps = mergeProps(
		() => tourAnatomy.build().control.attrs,
		props,
	);

	return <ark.div {...mergedProps} />;
};
