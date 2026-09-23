---
'@ark-ui/solid': patch
---

**Listbox**: Fix `ItemContext.selected` staying `false` after selection. The option already set `data-selected` and
`aria-selected`; the render-prop kept the first-render value. `ItemContext` is now an accessor, matching Select and
Combobox. Read `item().selected` instead of `item.selected`.

- **Field**: Fix `Field.Context` inside `Field.Item` missing later `invalid` and `disabled` changes on `Field.Root`.
- **ColorPicker**: Fix `SwatchIndicator` inside `ValueSwatch` keeping the first-rendered color.
