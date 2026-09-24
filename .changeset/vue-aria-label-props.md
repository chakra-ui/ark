---
'@ark-ui/vue': patch
---

Fix `aria-label` and `aria-labelledby` being ignored on `AngleSlider.Root`, `Slider.Root`, `Dialog.Root`, `Menu.Root`,
and `Tooltip.Root`. For example, `<AngleSlider.Root aria-label="Rotation">` now names the thumb.
