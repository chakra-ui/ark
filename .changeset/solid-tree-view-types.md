---
'@ark-ui/solid': patch
---

- **TreeView**: Fix `useTreeView` losing the node type, so `selectedNodes`, `expandedNodes` and `focusedNode` are typed
  as `T` instead of `TreeNode`.
