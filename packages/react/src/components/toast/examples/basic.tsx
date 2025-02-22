import { Toast, Toaster, createToaster } from "@ark-ui/react/toast";
import { XIcon } from "lucide-react";

const toaster = createToaster({
	placement: "bottom-end",
	overlap: true,
});

export const Basic = () => {
	return (
		<div>
			<button
				type="button"
				onClick={() =>
					toaster.create({
						title: "Toast Title",
						description: "Toast Description",
						type: "info",
					})
				}
			>
				Add Toast
			</button>
			<Toaster toaster={toaster} gap={24}>
				{(toast) => (
					<Toast.Root key={toast.id}>
						<Toast.Title>{toast.title}</Toast.Title>
						<Toast.Description>{toast.description}</Toast.Description>
						<Toast.CloseTrigger>
							<XIcon />
						</Toast.CloseTrigger>
					</Toast.Root>
				)}
			</Toaster>
		</div>
	);
};
