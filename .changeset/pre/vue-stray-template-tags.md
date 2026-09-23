---
'@ark-ui/vue': patch
---

Fix `Select.HiddenSelect` rendering a stray `>` as text in every option, so each one read `Label >`.
