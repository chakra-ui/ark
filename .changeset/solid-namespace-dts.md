---
'@ark-ui/solid': patch
---

- **General**: Fix namespaced types like `PinInput.ValueChangeDetails` being declared as values, which broke
  type-checking without `skipLibCheck` and made them unusable as types.
