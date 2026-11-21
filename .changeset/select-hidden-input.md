---
'@ark-ui/react': minor
'@ark-ui/solid': minor
'@ark-ui/svelte': minor
'@ark-ui/vue': minor
---

**Select**: Add `Select.HiddenInput`, which submits the value through hidden inputs instead of a hidden `<select>`. Use
it for large or virtualized collections, where `Select.HiddenSelect` would render an `<option>` per item.
