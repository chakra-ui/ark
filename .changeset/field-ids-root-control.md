---
'@ark-ui/react': patch
'@ark-ui/solid': patch
'@ark-ui/vue': patch
---

- **Field**: Fixed `ids.root` being ignored and `ids.control` naming the root element. `ids.root` now sets the
  `Field.Root` id and `ids.control` sets the control's id (and the label's `for`), as in `@ark-ui/svelte`. A target
  item's id (`Field.Item`) now follows `ids.control` on the label too, so a label with `target` still points at its
  item when `ids.control` is set.
