---
'@ark-ui/vue': patch
---

- **TreeView**: Fix `TreeView.RootEmits<T>` and `useTreeView` losing the node type, so `selectedNodes`, `expandedNodes`
  and `focusedNode` are typed as `T` instead of `TreeNode`.
- **TreeView**: Remove the `fallback` and `indeterminate` props from `TreeView.NodeCheckboxIndicator`. They were never
  rendered; use the `#fallback` and `#indeterminate` slots instead.
