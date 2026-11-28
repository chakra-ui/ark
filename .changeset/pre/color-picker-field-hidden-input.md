---
'@ark-ui/react': patch
'@ark-ui/solid': patch
'@ark-ui/vue': patch
---

- **ColorPicker**: Inside a `Field`, the hidden input now takes the field's control id, so the field label and native
  validation target it. Svelte already did this.
