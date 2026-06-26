---
'@ark-ui/svelte': patch
---

Fixed PasswordInput, PinInput, and FileUpload to consume Field context, propagating
`invalid`, `disabled`, `readOnly`, `required`, and `ids` when wrapped in `Field.Root`.
