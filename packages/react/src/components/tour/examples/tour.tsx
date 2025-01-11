import { Portal } from "@ark-ui/react/portal";
import { Tour, useTour } from "@ark-ui/react/tour";
import { XIcon } from "lucide-react";
import { useEffect } from "react";
import { steps } from "./steps";

export const DemoTour = () => {
	const tour = useTour({ steps });

	// Start the tour when the component mounts
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		tour.start();
	}, []);

	return (
		<Tour.Root tour={tour}>
			<Portal>
				<Tour.Backdrop />
				<Tour.Spotlight />
				<Tour.Positioner>
					<Tour.Content>
						<Tour.Arrow>
							<Tour.ArrowTip />
						</Tour.Arrow>
						<Tour.Title />
						<Tour.Description />
						<Tour.ProgressText />
						<Tour.CloseTrigger>
							<XIcon />
						</Tour.CloseTrigger>
						<Tour.Control>
							<Tour.Actions>
								{(actions) =>
									actions.map((action) => (
										<Tour.ActionTrigger key={action.label} action={action} />
									))
								}
							</Tour.Actions>
						</Tour.Control>
					</Tour.Content>
				</Tour.Positioner>
			</Portal>
		</Tour.Root>
	);
};
