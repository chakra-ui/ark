---
'@ark-ui/svelte': patch
---

- **Scroll Area**: Fixed `RootProvider` not merging `getRootProps()` onto the root element.
- **Password Input**: Fixed `RootProvider` spreading the machine `value` onto the root DOM element and rendering children twice.
- **Json Tree View**: Fixed `RootProvider` not stripping `options` from `value` before forwarding to `TreeView.RootProvider`, and rendering children twice.
