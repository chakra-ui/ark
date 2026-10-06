---
'@ark-ui/react': patch
'@ark-ui/solid': patch
'@ark-ui/svelte': patch
'@ark-ui/vue': patch
---

- **Popover**: Fix `Popover.Content` missing `aria-labelledby` and `aria-describedby` when `lazyMount` is set. The title
  and description are now detected each time the popover opens, not only on first render.
