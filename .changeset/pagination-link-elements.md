---
'@ark-ui/react': minor
'@ark-ui/solid': minor
'@ark-ui/svelte': minor
'@ark-ui/vue': minor
---

Render `Pagination.Item`, `Pagination.PrevTrigger`, `Pagination.NextTrigger`, `Pagination.FirstTrigger` and
`Pagination.LastTrigger` as anchors when the machine is `type="link"`. They rendered buttons carrying the `href` the
machine emits, which navigates nowhere. `usePagination` now returns the resolved `type` so the parts can follow it.
