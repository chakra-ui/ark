---
'@ark-ui/codemod': minor
---

Add prop-rename and data-attribute transforms alongside `as-child-to-render`.

Prop renames ship for every framework — `react/*`, `solid/*`, `svelte/*`, and `vue/*` — driven by the zag v2 changes: `carousel-props`
(`slideCount` → `count`, `autoplay` → `autoPlay`, `padding` → `itemSpacing`), `floating-panel-placement`,
`image-cropper-placement`, `tabs-virtual-focus` (inverts the value), `popover-portalled`,
`tags-input-editable` (preserves the old default), and `pin-input-count` (renames `length`, or flags a
missing `count`).

`css/data-attributes` rewrites stylesheets for the merged `data-{scope}-{part}` attribute, toggle
`[data-state="on"]` → `[data-pressed]`, and the removed `data-focus` on toggle-group and toolbar.

```sh
npx @ark-ui/codemod react/carousel-props "src/**/*.tsx" --dry
npx @ark-ui/codemod css/data-attributes "src/**/*.css" --dry
```

Changes that reshape markup — the popover `Portal` wrapper and the `Combobox`/`Listbox`/`Select`
`content` → `list` split — are left to do by hand and called out in the upgrade guide.
