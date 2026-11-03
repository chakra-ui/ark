---
'@ark-ui/react': patch
'@ark-ui/solid': patch
'@ark-ui/svelte': patch
'@ark-ui/vue': patch
---

Fix part types that named a different element than the one the part renders.

- React: the refs of `Clipboard.ValueText`, `ColorPicker.ValueText`, `Combobox.ItemText`, `Select.ItemText` and
  `Slider.ValueText` are now `HTMLSpanElement`, `FloatingPanel.Title` is `HTMLHeadingElement`, and
  `FileUpload.ItemPreview` is `HTMLDivElement`.
- Solid: `ColorPicker.ChannelSliderValueText` takes `span` props.
- Svelte: `TreeView.Tree` takes `div` props and `AngleSlider.ValueText` takes `span` props.
- Vue: `Drawer.Trigger`, `Drawer.CloseTrigger` and `PasswordInput.VisibilityTrigger` accept button attributes,
  `PasswordInput.Input` accepts input attributes, and `PasswordInput.Label`, `SignaturePad.Label` and
  `ColorPicker.ChannelSliderLabel` accept label attributes.
