---
"@ark-ui/react": patch
"@ark-ui/solid": patch
"@ark-ui/svelte": patch
"@ark-ui/vue": patch
---

**Floating Panel**: Fixed `open` taking precedence over `defaultOpen` during initialization. Fixed `setPosition` and
`setSize` to work independently of drag/resize state. Fixed maximize/minimize restore reverting to `(0, 0)` in
controlled mode. Fixed `Maximum update depth exceeded` when content uses `ResizeObserver` (React). Fixed Escape during
drag/resize to cancel and revert to original position/size.
