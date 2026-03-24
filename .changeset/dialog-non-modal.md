---
'@ark-ui/react': patch
'@ark-ui/solid': patch
'@ark-ui/svelte': patch
'@ark-ui/vue': patch
---

**Dialog**: Improved non-modal mode behavior.

- Set `pointer-events: none` on positioner in non-modal mode so the page stays interactive.
- Added initial focus management for non-modal mode (mirrors popover behavior).
- Fixed `aria-modal` to reflect actual `modal` prop value instead of hardcoded `true`.
