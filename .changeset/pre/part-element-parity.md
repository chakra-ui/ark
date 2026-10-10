---
'@ark-ui/react': major
'@ark-ui/solid': major
'@ark-ui/svelte': major
'@ark-ui/vue': major
---

Render the same element for every part across frameworks.

- `AngleSlider.Marker` renders `span` instead of `div` in React, Solid and Vue, matching `Slider.Marker`.
- `AngleSlider.ValueText` renders `span` instead of `div` in React and Solid, matching every other `ValueText`.
- `Listbox.ItemText` renders `span` instead of `div` in React, Solid and Vue, matching `Select.ItemText` and
  `Combobox.ItemText`.
- `Popover.Title` renders `h2` instead of `div` in React, Solid and Vue, matching Svelte and `Dialog.Title`, so
  screen reader users can reach it with heading navigation. Without a CSS reset it picks up the browser's default
  heading margins and font size. Use `render` for a different heading level.

Styles that relied on the `span` parts being block-level need an explicit `display`.
