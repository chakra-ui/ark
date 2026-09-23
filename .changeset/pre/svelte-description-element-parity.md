---
'@ark-ui/svelte': patch
---

Fix `Dialog.Description` and `Popover.Description` rendering a `p` element. React, Solid and Vue render a `div`, so a
stylesheet or a nested block element written against one stack broke on the other.
