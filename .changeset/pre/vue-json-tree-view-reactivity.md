---
'@ark-ui/vue': patch
---

- **JsonTreeView**: Fix `v-model:expanded-value`, `v-model:selected-value`, `v-model:checked-value` and
  `v-model:focused-value` not updating, and the tree not re-rendering when `data` changes. `useJsonTreeView` now also
  reacts to `data` changes.
