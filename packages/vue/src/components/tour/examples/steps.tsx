import type { TourStepDetails } from "@ark-ui/vue/tour";

export const steps: TourStepDetails[] = [
	{
		type: "dialog",
		id: "step-0",
		title: "Centered tour (no target)",
		description: "This is the center of the world. Ready to start the tour?",
		actions: [{ label: "Next", action: "next" }],
	},
	{
		type: "tooltip",
		id: "step-1",
		title: "Step 1. Welcome",
		description: "To the new world",
		target: () => document.querySelector<HTMLElement>("#step-1"),
		actions: [
			{ label: "Prev", action: "prev" },
			{ label: "Next", action: "next" },
		],
		effect({ show, update }) {
			const abort = new AbortController();

			fetch("https://api.github.com/users/octocat", { signal: abort.signal })
				.then((res) => res.json())
				.then((data) => {
					update({ title: data.name });
					show();
				});

			return () => {
				abort.abort();
			};
		},
	},
	{
		type: "tooltip",
		id: "step-2",
		title: "Step 2. Inside a scrollable container",
		description: "Using scrollIntoView(...) rocks!",
		target: () => document.querySelector<HTMLElement>("#step-2"),
		actions: [
			{ label: "Prev", action: "prev" },
			{ label: "Next", action: "next" },
		],
	},
	{
		type: "tooltip",
		id: "step-2a",
		title: "Step 2a. Inside an Iframe container",
		description:
			"It calculates the offset rect correctly. Thanks to floating UI!",
		target: () => {
			const [frameEl] = Array.from(frames);
			return frameEl?.document.querySelector<HTMLElement>("#step-2a");
		},
		actions: [
			{ label: "Prev", action: "prev" },
			{ label: "Next", action: "next" },
		],
	},
	{
		type: "tooltip",
		id: "step-3",
		title: "Step 3. Normal scrolling",
		description: "The new world is a great place",
		target: () => document.querySelector<HTMLElement>("#step-3"),
		actions: [
			{ label: "Prev", action: "prev" },
			{ label: "Next", action: "next" },
		],
	},
	{
		type: "tooltip",
		id: "step-4",
		title: "Step 4. Close to bottom",
		description: "So nice to see the scrolling works!",
		target: () => document.querySelector<HTMLElement>("#step-4"),
		actions: [
			{ label: "Prev", action: "prev" },
			{ label: "Next", action: "next" },
		],
	},
	{
		type: "dialog",
		id: "step-5",
		title: "You're all sorted! (no target)",
		description: "Thanks for trying out the tour. Enjoy the app!",
		actions: [{ label: "Finish", action: "dismiss" }],
	},
];
