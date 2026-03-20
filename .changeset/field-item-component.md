---
'@ark-ui/react': minor
'@ark-ui/solid': minor
'@ark-ui/svelte': minor
'@ark-ui/vue': minor
---

**Field**: Added `Field.Item` component and `target` prop on `Field.Root` for multi-control fields (e.g., currency
select + amount input). Use `Field.Item` with a `value` to scope controls, and `target` to specify which item the label
should focus when clicked.
