---
'@ark-ui/codemod': patch
---

- `react/as-child-to-render` no longer over-indents a multi-line child it moves into `render`. The child's lines now
  line up under the part, and multi-line template literals inside it are left as they were.
- `css/data-attributes` now also runs on `.vue`, `.svelte`, `.ts`, `.tsx`, `.js`, `.jsx`, `.mjs` and `.cjs` files, so scope/part selectors
  in `<style>` blocks, style objects, CSS-in-JS template literals and `querySelector` strings are merged too. In those files
  `[data-state="on"]` is only rewritten to `[data-pressed]` when it follows a toggle or toggle-group item selector.
