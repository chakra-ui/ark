import { useState } from "react";
import { FocusTrap } from "../focus-trap";

export const Basic = () => {
	const [trapped, setTrapped] = useState(false);
	return (
		<>
			<button onClick={() => setTrapped(true)}>Start Trap</button>
			<FocusTrap returnFocusOnDeactivate={false} disabled={!trapped}>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "1rem",
						paddingBlock: "1rem",
					}}
				>
					<input type="text" placeholder="input" />
					<textarea placeholder="textarea" />
					<button onClick={() => setTrapped(false)}>End Trap</button>
				</div>
			</FocusTrap>
		</>
	);
};
