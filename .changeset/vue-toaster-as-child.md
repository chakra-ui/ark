---
'@ark-ui/vue': patch
---

- **Toast**: Fix `Toaster` ignoring `asChild` and wrapping the slotted element in an extra `div`. The slotted element is
  now used as the toast group and receives the group attributes.
