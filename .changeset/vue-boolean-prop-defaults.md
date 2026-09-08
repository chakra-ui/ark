---
'@ark-ui/vue': patch
---

Fix optional boolean props on non-root parts being forced to `false`.

Vue casts an absent boolean prop to `false` rather than leaving it `undefined`, so zag never saw the prop as unset and
its own default never applied. Root components already guarded against this with `BooleanDefaults`; the parts did not.

Three visible consequences, now fixed:

- `Accordion.Root disabled` did not reach its items. The item sent `disabled: false`, and zag resolves
  `props.disabled ?? prop("disabled")`, so the explicit `false` won over the root's value.
- `ColorPicker.Swatch` and `ColorPicker.ValueSwatch` rendered hex instead of the picker's format, because
  `respectAlpha` arrived as `false` and zag chose `toString("hex")` over `toString("css")`.
- `NavigationMenu.Link` did not close the menu on click, because `closeOnClick` arrived as `false`.
