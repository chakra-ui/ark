---
'@ark-ui/svelte': patch
---

Fix `Select.ValueText` rendering its `placeholder` as a DOM attribute. The component spread every prop onto the
underlying `span`, so the fallback text showed up as `placeholder="…"` in the markup. `Listbox.ValueText` and
`DatePicker.ValueText` already split it out.
