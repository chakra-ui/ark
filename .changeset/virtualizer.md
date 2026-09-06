---
'@ark-ui/react': minor
'@ark-ui/solid': minor
'@ark-ui/svelte': minor
'@ark-ui/vue': minor
---

Add the `Virtualizer` utility, built on `@zag-js/virtualizer`, for rendering large lists, grids, and window-scrolled
content efficiently.

- `useListVirtualizer`, `useGridVirtualizer`, and `useWindowVirtualizer` hooks that return the virtualizer instance with
  a `ref` to attach to the scroll element.
- `ListVirtualizer`, `GridVirtualizer`, and `WindowVirtualizer` compound components (`Root`, `Content`, `Item` / `Row` +
  `Cell`, and `Context`) that wire the scroll container, spacer, and positioned items for you.
- A `measure` prop on `ListVirtualizer.Item`, `WindowVirtualizer.Item`, and `GridVirtualizer.Row` that opts into
  measuring the rendered size instead of relying on the estimate.
