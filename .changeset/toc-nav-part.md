---
'@ark-ui/react': patch
'@ark-ui/solid': patch
'@ark-ui/svelte': patch
'@ark-ui/vue': patch
---

- **Toc**: Add `getNavProps()` to `useToc` and render `Toc.Nav` with it. `Toc.Nav` now has `data-part="nav"` instead of
  `data-part="root"`, so update any styles that target the nav through `[data-part="root"]`.
- **Toc**: Move `aria-labelledby` from `Root` to `Nav`, and render the root props on `RootProvider` in React and on
  `Root` in Svelte so the indicator keeps its position.
- **Toc (Svelte)**: Fix `Root` and `Nav` rendering with the same `id`.
- **Toc (Svelte)**: `Toc.Nav` now reads the Toc from `Toc.Root` like the other frameworks and no longer accepts `useToc`
  props or creates its own Toc. Wrap it in `Toc.Root` if you were rendering it on its own.
