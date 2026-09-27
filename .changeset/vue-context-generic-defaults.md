---
'@ark-ui/vue': patch
---

- **Select, Listbox, TreeView**: Fix `Context` slot items typed as `unknown` when the item type can't be inferred, such
  as inside a generic wrapper component. Items now fall back to `CollectionItem` or `TreeNode`.
- **AngleSlider, ColorPicker, FileUpload, Listbox, Progress, Select, Slider, Tour**: Fix
  `Cannot find name '__VLS_Slots'` errors in the published type declarations of value text and similar parts when
  `skipLibCheck` is off.
