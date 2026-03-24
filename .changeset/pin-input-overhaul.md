---
"@ark-ui/react": minor
"@ark-ui/solid": minor
"@ark-ui/svelte": minor
"@ark-ui/vue": minor
---

**Pin Input**: Overhauled deletion, focus management, and added new props.

- Delete and Backspace now splice values left instead of leaving empty gaps. Deleting "2" from `[1, 2, 3]` yields
  `[1, 3, ""]` — not `[1, "", 3]`.
- Smarter focus management: Backspace always moves back, click and ArrowRight are clamped to the insertion point,
  same-key skip advances focus, and roving tabIndex treats the entire pin input as a single tab stop.
- Added Home/End to jump to first slot or last filled slot.
- Added `enterKeyHint` showing "next" on intermediate slots and "done" on the last.
- Added `autoSubmit` prop to automatically submit the owning form when all inputs are filled.
- Added `sanitizeValue` prop to sanitize pasted values before validation (e.g. strip dashes from "1-2-3").
