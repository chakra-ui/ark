---
'@ark-ui/solid': patch
---

- **Virtualizer**: Fix virtualized lists halting Solid's reactivity when their `count` changes, for example when
  filtering a virtualized `Combobox`. Reading the virtualizer no longer writes to reactive state, and items stay in
  range while the count shrinks.
