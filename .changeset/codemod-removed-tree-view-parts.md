---
'@ark-ui/codemod': patch
---

Fix `css/data-attributes` rewriting removed tree-view parts like `node-checkbox-indicator` to selectors that match
nothing. It now leaves them and reports them.
