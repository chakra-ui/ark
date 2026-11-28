---
'@ark-ui/react': patch
'@ark-ui/solid': patch
'@ark-ui/svelte': patch
'@ark-ui/vue': patch
---

`asChild` is no longer marked deprecated. It stays supported alongside `render`, matching the web package's `as-child`
attribute. Use `render` when you need the part's state.
