---
'@ark-ui/vue': patch
---

- **Progress, QrCode**: Fix `Root` not emitting `valueChange` and `update:modelValue`, so `v-model` stayed stale after
  `setValue()` from context.
- **QrCode**: Fix `QrCode.Context` being undefined because it was exported under the wrong name.
