import { FocusTrap } from "@ark-ui/react/focus-trap";
import { useRef, useState } from "react";

export const Autofocus = () => {
	const [trapped, setTrapped] = useState(false);
	const toggle = () => setTrapped((c) => !c);

	const buttonRef = useRef<HTMLButtonElement | null>(null);
	const getButtonNode = () => {
		const node = buttonRef.current;
		if (!node) throw new Error("Button not found");
		return node;
	};

	return (
		<div>
			<button ref={buttonRef} onClick={toggle}>
				{trapped ? "End Trap" : "Start Trap"}
			</button>
			{trapped && (
				<FocusTrap disabled={!trapped} setReturnFocus={getButtonNode}>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							gap: "1rem",
							paddingBlock: "1rem",
						}}
					>
						<input type="text" placeholder="Regular input" />
						{/* biome-ignore lint/a11y/noAutofocus: <explanation> */}
						<input type="text" placeholder="Autofocused input" autoFocus />
						<button onClick={() => setTrapped(false)}>End Trap</button>
					</div>
				</FocusTrap>
			)}
		</div>
	);
};
