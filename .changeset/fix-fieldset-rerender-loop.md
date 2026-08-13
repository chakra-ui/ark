---
'@ark-ui/react': patch
---

Fix `Fieldset.Root` re-rendering whenever its subtree mutated, even if helper and error text were unchanged. A nested
`Field.Textarea` with `defaultValue` could turn that into a loop that froze the tab.
