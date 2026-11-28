---
'@ark-ui/codemod': patch
---

- `css/data-attributes` now also rewrites the attributes zag v2 renamed:
  - tree-view parts (`branch*` and `item*`, except `item-indicator`) become their `node*`, `indent-guide` and `node-expand-trigger` names;
  - JsonTreeView selectors move onto the tree view's attributes;
  - the image cropper handle's `data-position` and the floating panel resize trigger's `data-axis` become `data-placement`.
