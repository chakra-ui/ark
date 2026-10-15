---
'@ark-ui/react': patch
'@ark-ui/solid': patch
'@ark-ui/vue': patch
'@ark-ui/svelte': patch
---

- **Field**: Screen readers now announce a field's helper and error text on the element that receives focus.
  - Select trigger, TagsInput input, ColorPicker trigger and channel inputs, FileUpload trigger and dropzone,
    SignaturePad control
  - RatingGroup control and items
  - PinInput control, which now renders as a group labelled by `Field.Label`
  - Svelte: Switch hidden input, Combobox input, Editable input
