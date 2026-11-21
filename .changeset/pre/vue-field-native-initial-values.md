---
'@ark-ui/vue': patch
---

- **Field**: Fix `Field.Input`, `Field.Textarea`, and `Field.Select` clearing native initial values (`defaultValue`,
  `<option selected>`) when used without `v-model`.
