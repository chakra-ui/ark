---
'@ark-ui/react': patch
'@ark-ui/solid': patch
'@ark-ui/svelte': patch
'@ark-ui/vue': patch
---

Fix `Toaster` dropping the group props it accepts. `dir` and `getRootNode` were typed on the component but never
reached the group machine — the locale and environment contexts always won, and both props were spread onto the region
element instead. The toast region's `aria-label` is now settable through a `label` prop, which is forwarded to
`getGroupProps`.
