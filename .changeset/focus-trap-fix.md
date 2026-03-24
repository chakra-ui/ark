---
"@ark-ui/react": patch
"@ark-ui/solid": patch
"@ark-ui/svelte": patch
"@ark-ui/vue": patch
---

**Focus Trap**: Fixed edge cases in focus trapping.

- Fixed focus trapping when the content has a single effective tab stop, such as a native radio group.
- Handle disconnected `initialFocus` nodes more safely.
