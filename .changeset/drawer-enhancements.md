---
"@ark-ui/react": minor
"@ark-ui/solid": minor
"@ark-ui/svelte": minor
"@ark-ui/vue": minor
---

**Drawer**: Added new anatomy parts and improved swipe gestures.

- Added `description` anatomy part with `aria-describedby` support on the content element.
- Added `SwipeArea` part for swipe-to-open gestures from screen edges.
- Require intentional swipe movement before showing the drawer (no flash on pointer down).
- Smooth settle animation from release point to fully open position.
- Added cross-axis scroll preservation to prevent drawer drag when scrolling horizontally.
- Added initial focus management for non-modal mode.
- Set `pointer-events: none` on positioner in non-modal mode so the page stays interactive.
- Fixed swipe-to-dismiss in controlled mode (`open: true` without `onOpenChange` now blocks dismiss).
