---
'@ark-ui/svelte': patch
---

- **JsonTreeView**: Fix `bind:expandedValue`, `bind:selectedValue`, `bind:checkedValue` and `bind:focusedValue` not
  syncing, and the tree not re-rendering when `data` changes. `useJsonTreeView` now also reacts to `data` changes.
