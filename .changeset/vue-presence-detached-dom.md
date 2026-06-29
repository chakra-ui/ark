---
"@ark-ui/vue": patch
---

Fixed Presence-based components (Dialog, Popover, Menu, Tooltip, etc.) leaking detached DOM
nodes after each open/close cycle when `lazyMount`/`unmountOnExit` is used. The machine's
`node` and `styles` refs are now cleared when the element unmounts.
