import { Tour, useTour } from "@ark-ui/solid/tour";
import { XIcon } from "lucide-solid";
import { For, onMount } from "solid-js";
import { steps } from "./steps";

export const DemoTour = () => {
	const tour = useTour({ steps });

	// Start the tour when the component mounts
	onMount(() => tour().start());

	return (
		<Tour.Root tour={tour}>
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
							{(actions) => (
								<For each={actions()}>
									{(action) => <Tour.ActionTrigger action={action} />}
								</For>
							)}
						</Tour.Actions>
					</Tour.Control>
				</Tour.Content>
			</Tour.Positioner>
		</Tour.Root>
	);
};
