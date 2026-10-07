---
'@ark-ui/vue': patch
---

- **JsonTreeView**: Fix `JsonTreeView.Tree` with `indent-guide` rendering no built-in indent guides when no
  `indentGuide` slot is provided, and an empty `BranchIndicator` when no `arrow` slot is provided.
