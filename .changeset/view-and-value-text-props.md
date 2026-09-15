---
'@ark-ui/react': patch
'@ark-ui/solid': patch
'@ark-ui/vue': patch
---

`DatePicker.View` (react, solid, vue) and `AngleSlider.ValueText` (react) hand-rolled their props instead of calling
zag's getter, so they rendered without a `data-part` attribute — `[data-date-picker-view]` and
`[data-angle-slider-value-text]` selected nothing. `DatePicker.View` was also missing `data-view`.
