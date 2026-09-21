---
'@ark-ui/react': patch
'@ark-ui/solid': patch
'@ark-ui/svelte': patch
'@ark-ui/vue': patch
---

Align the last six parts that rendered a different element across adapters: `Toggle.Indicator`, `AngleSlider.Marker`,
`AngleSlider.ValueText` and `Listbox.ItemText` render `span`, `Popover.Title` renders `h2`, and Svelte's
`NumberInput.Scrubber` renders `div`.
