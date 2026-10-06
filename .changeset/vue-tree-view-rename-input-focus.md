---
'@ark-ui/vue': patch
---

- **TreeView**: Fix `NodeRenameInput` not receiving focus when renaming starts with `F2`. The input is now focused, its
  value set to the node label and the text selected once it is rendered.
