---
"@ark-ui/react": patch
"@ark-ui/solid": patch
"@ark-ui/svelte": patch
"@ark-ui/vue": patch
---

**Interact Outside**: Fixed Safari-specific interaction issue.

- Fixed issue where nested popovers and select within popovers didn't toggle correctly in Safari due to `focusin` events
  racing with pointer interactions.
