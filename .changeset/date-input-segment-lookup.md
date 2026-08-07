---
"@ark-ui/solid": patch
"@ark-ui/vue": patch
---

Fixed `DateInput.Segment` resolving segments by `type`, so segments sharing a type all rendered the first match's text.
Literal separators like `:` and `,` rendered as `/`.
