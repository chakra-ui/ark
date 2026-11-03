---
'@ark-ui/svelte': patch
---

Fix controlled props that accepted `bind:` but never wrote the new value back to the caller's variable. The following
props are now bindable:

- **Select**: `open`, `highlightedValue`
- **Combobox**: `highlightedValue`
- **Menu**: `highlightedValue`, `triggerValue`
- **Dialog**, **Popover**, **Tooltip**, **HoverCard**: `triggerValue`
- **Drawer**: `triggerValue`, `snapPoint`
- **Editable**: `edit`
- **ColorPicker**: `format`
- **DateInput**: `placeholderValue`
- **Marquee**: `paused`
- **Toc**: `activeIds`
