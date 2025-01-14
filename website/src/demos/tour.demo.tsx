"use client";
import { Portal } from "@ark-ui/react/portal";
import { XIcon } from "lucide-react";
import { Stack } from "styled-system/jsx";
import { Button } from "~/components/ui/button";
import { IconButton } from "~/components/ui/icon-button";
import { Tour, useTour } from "~/components/ui/tour";

export const Demo = () => {
	const tour = useTour({ steps });

	return (
		<>
			<Button onClick={() => tour.start()}>Start Tour</Button>
			<Tour.Root tour={tour}>
				<Portal>
					<Tour.Backdrop />
					<Tour.Spotlight />
					<Tour.Positioner>
						<Tour.Content>
							<Tour.Arrow>
								<Tour.ArrowTip />
							</Tour.Arrow>
							<Stack gap="6">
								<Stack gap="1">
									<Tour.ProgressText />
									<Tour.Title />
									<Tour.Description />
								</Stack>
								<Tour.Control>
									<Tour.Actions>
										{(actions) =>
											actions.map((action) => (
												<Tour.ActionTrigger
													key={action.label}
													action={action}
													asChild
												>
													<Button
														size="sm"
														variant={
															action.action === "prev" ? "outline" : "solid"
														}
													>
														{action.label}
													</Button>
												</Tour.ActionTrigger>
											))
										}
									</Tour.Actions>
								</Tour.Control>
							</Stack>
							<Tour.CloseTrigger asChild>
								<IconButton size="sm" variant="link">
									<XIcon />
								</IconButton>
							</Tour.CloseTrigger>
						</Tour.Content>
					</Tour.Positioner>
				</Portal>
			</Tour.Root>
		</>
	);
};

const steps: Tour.StepDetails[] = [
	{
		id: "step-1",
		type: "dialog",
		title: "Welcome to the Tour",
		description: 'This is a simple tour example. Click "Start Tour" to begin.',
		actions: [{ label: "Start Tour", action: "next" }],
	},
	{
		id: "step-2",
		type: "tooltip",
		title: "Select a Framework",
		description:
			"Ark UI supports various JavaScript frameworks. Select one from the dropdown to view its documentation.",
		target: () => document.querySelector<HTMLElement>("#framework-select"),
		actions: [
			{ label: "Prev", action: "prev" },
			{ label: "Next", action: "next" },
		],
	},
	{
		id: "step-3",
		type: "tooltip",
		title: "Select a Version",
		description:
			"The latest documentation is selected by default. To view a different version, select it from the dropdown.",
		target: () => document.querySelector<HTMLElement>("#version-select"),
		actions: [
			{ label: "Prev", action: "prev" },
			{ label: "Next", action: "next" },
		],
	},
	{
		id: "step-4",
		type: "dialog",
		title: "Tour Completed",
		description:
			"You have completed the tour. Now, learn how to build a tour for your design system.",
		actions: [
			{ label: "Prev", action: "prev" },
			{ label: "Finish Tour", action: "dismiss" },
		],
	},
];
