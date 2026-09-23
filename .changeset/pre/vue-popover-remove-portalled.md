---
'@ark-ui/vue': patch
---

Remove the `portalled` prop from `Popover.Root`.

Zag v2 dropped `portalled` — portalling is auto-detected from where the content is rendered — and React,
Solid, and Svelte already removed it. Vue still declared the prop, so it lingered as dead surface that
did nothing. Decide portalling by rendering the content inside `Portal` or not; there is no prop to set.
