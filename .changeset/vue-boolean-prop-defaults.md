---
'@ark-ui/vue': patch
---

- **ImageCropper**: Fix `ImageCropper.Root` ignoring all of its props, such as `fixedCropArea`, `aspectRatio`, and
  `initialCrop`.
- **Accordion**: Fix `Accordion.Item` not inheriting `disabled` from `Accordion.Root`.
- **ColorPicker**: Fix `ColorPicker.Swatch` and `ColorPicker.ValueSwatch` dropping the alpha channel by default.
- **DatePicker**: Fix `DatePicker.Input` not committing the typed date on blur by default.
- **NavigationMenu**: Fix `NavigationMenu.Link` not closing the menu when clicked.
- **Toc**: Fix `Toc.Root` not auto-scrolling to the active item by default.
