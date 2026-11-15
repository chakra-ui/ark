---
'@ark-ui/react': patch
'@ark-ui/solid': patch
'@ark-ui/svelte': patch
'@ark-ui/vue': patch
---

- **Toc**: Add `getNavProps()` to `useToc` and render `Toc.Nav` with it. `Toc.Nav` rendered the root props, so it
  carried `data-toc-root` and no `id`. It now carries `data-toc-nav` and its own `id`, so update any styles that target
  the nav through `[data-toc-root]`.
- **Toc**: Move `aria-labelledby` from `Root` to `Nav`, and render the root props on `RootProvider` in React and on
  `Root` in Svelte so the indicator keeps its position.
- **Toc (Svelte)**: `Toc.Nav` now reads the Toc from `Toc.Root` like the other frameworks and no longer accepts `useToc`
  props or creates its own Toc. Wrap it in `Toc.Root` if you were rendering it on its own.
