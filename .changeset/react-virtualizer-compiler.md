---
'@ark-ui/react': patch
---

Fix `useListVirtualizer`, `useGridVirtualizer` and `useWindowVirtualizer` rendering no items under the React Compiler. The hooks returned the same object on every render, so compiled components kept their first, empty output. They now return a new reference whenever the virtualizer updates.
