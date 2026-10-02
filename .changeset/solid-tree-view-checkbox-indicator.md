---
'@ark-ui/solid': patch
---

- **TreeView**: Fix `TreeView.NodeCheckboxIndicator` not updating when a node is checked or becomes indeterminate.
- **TreeView**: Fix `useTreeView` losing the node type, so `selectedNodes`, `expandedNodes` and `focusedNode` are typed
  as `T` instead of `TreeNode`.
