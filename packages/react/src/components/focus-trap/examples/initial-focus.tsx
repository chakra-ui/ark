import { FocusTrap } from "@ark-ui/react/focus-trap";
import { useRef, useState } from "react";

export const InitialFocus = () => {
	const [trapped, setTrapped] = useState(false);
	const toggle = () => setTrapped((c) => !c);

	const inputRef = useRef<HTMLInputElement>(null);

	return (
		<div>
			<button onClick={toggle}>{trapped ? "End Trap" : "Start Trap"}</button>
			<FocusTrap disabled={!trapped} initialFocus={() => inputRef.current}>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "1rem",
						paddingBlock: "1rem",
					}}
				>
					<input type="text" placeholder="First input" />
					<input
						ref={inputRef}
						type="text"
						placeholder="Second input (initial focus)"
					/>
					<textarea placeholder="textarea" />
					<button onClick={() => setTrapped(false)}>End Trap</button>
				</div>
			</FocusTrap>
		</div>
	);
};
