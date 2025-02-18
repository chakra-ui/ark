import { mergeProps } from "@zag-js/react";
import { forwardRef } from "react";
import { composeRefs } from "../../utils/compose-refs";
import { type HTMLProps, type PolymorphicProps, ark } from "../factory";
import { usePresenceContext } from "../presence";
import { useMenuContext } from "./use-menu-context";

export interface MenuContentBaseProps extends PolymorphicProps {}
export interface MenuContentProps
	extends HTMLProps<"div">,
		MenuContentBaseProps {}

export const MenuContent = forwardRef<HTMLDivElement, MenuContentProps>(
	(props, ref) => {
		const menu = useMenuContext();
		const presence = usePresenceContext();
		const mergedProps = mergeProps(
			menu.getContentProps(),
			presence.getPresenceProps(),
			props,
		);

		// Extract the original onKeyDown if present
		const { onKeyDown, ...rest } = mergedProps;

		const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
			if (event.key === "Tab") {
				// Instead of menu?.close?.(), use setOpen(false)
				menu?.setOpen?.(false);
			}
			// Call any original onKeyDown prop
			onKeyDown?.(event);
		};

		if (presence.unmounted) {
			return null;
		}

		return (
			<ark.div
				{...rest}
				onKeyDown={handleKeyDown}
				ref={composeRefs(presence.ref, ref)}
			/>
		);
	},
);

MenuContent.displayName = "MenuContent";
