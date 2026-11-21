---
'@ark-ui/react': major
'@ark-ui/solid': major
'@ark-ui/svelte': major
'@ark-ui/vue': major
---

Render indicator and control parts that sit inside a `button` or `label` as `span` instead of `div`.

A `div` inside a `button` or `label` is invalid HTML, since both only accept phrasing content. The parts now render
`span`, matching Base UI:

- `Accordion.ItemIndicator`, `Collapsible.Indicator`, `Popover.Indicator`, `Toggle.Indicator`
- `Select.Indicator`, `Select.ItemIndicator`, `Combobox.ItemIndicator`, `Listbox.ItemIndicator`
- `Menu.Indicator`, `Menu.ItemIndicator`, `NavigationMenu.ItemIndicator`
- `Checkbox.Control`, `Checkbox.Indicator`, `RadioGroup.ItemControl`, `SegmentGroup.ItemControl`
- `Clipboard.Indicator`, `Steps.Indicator`, `Splitter.ResizeTriggerIndicator`
- `Avatar.Root`, `Avatar.RootProvider`, `Tabs.Indicator`, `NumberInput.Scrubber`

A `span` is `display: inline` by default, so styles that relied on these parts being block-level need an explicit
`display` (`block`, `flex` or `inline-flex`). In React, refs to these parts are now typed `HTMLSpanElement`.
