---
'@ark-ui/react': patch
'@ark-ui/solid': patch
'@ark-ui/svelte': patch
'@ark-ui/vue': patch
---

- **Select**: Fixed `Select.Trigger` not being described by the enclosing `Field`'s helper and error text. Only
  `Select.HiddenSelect` received the field's `aria-describedby`, so screen readers announced neither text on the
  focusable trigger. On Svelte, `Select.HiddenSelect` now receives it too.
