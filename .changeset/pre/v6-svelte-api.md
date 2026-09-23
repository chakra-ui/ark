---
'@ark-ui/svelte': major
---

Bring the Svelte package up to the v6 API.

Svelte had not had the pass Solid and Vue were given, so it carried the v1 zag surface throughout. The library, its
examples and its tests now match the other three frameworks.

`TreeView` is restructured onto the node parts: `TreeView.Branch`, `TreeView.BranchContent` and their siblings are
replaced by `TreeView.Node`, `TreeView.NodeGroup` and `TreeView.NodeGroupContent`, matching zag v2 and the other
frameworks.
