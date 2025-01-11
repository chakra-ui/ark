import { FocusTrap } from "@ark-ui/solid/focus-trap";
import { Show, createSignal } from "solid-js";

export const Autofocus = () => {
	const [trapped, setTrapped] = createSignal(false);
	let buttonRef!: HTMLButtonElement;

	return (
		<div>
			<button ref={buttonRef} onClick={() => setTrapped((v) => !v)}>
				{trapped() ? "End Trap" : "Start Trap"}
			</button>
			<Show when={trapped()}>
				<FocusTrap disabled={!trapped()} setReturnFocus={buttonRef}>
					<div
						style={{
							display: "flex",
							"flex-direction": "column",
							gap: "1rem",
							"padding-block": "1rem",
						}}
					>
						<input type="text" placeholder="Regular input" />
						<input type="text" placeholder="Autofocused input" autofocus />
						<button onClick={() => setTrapped(false)}>End Trap</button>
					</div>
				</FocusTrap>
			</Show>
		</div>
	);
};
