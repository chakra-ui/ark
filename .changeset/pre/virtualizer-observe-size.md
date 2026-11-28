---
'@ark-ui/react': patch
'@ark-ui/solid': patch
'@ark-ui/svelte': patch
'@ark-ui/vue': patch
---

**Virtualizer**: `useListVirtualizer` and `useGridVirtualizer` now re-measure when the scroll container resizes
(`observeScrollElementSize` defaults to `true`), matching `@ark-ui/web`. Lists mounted inside a hidden tab, dialog or
collapsed panel no longer render empty. Pass `observeScrollElementSize: false` to opt out.
