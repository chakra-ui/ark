---
'@ark-ui/vue': patch
---

Forward Zag `get*State` results into the `render` slot on Vue parts.

Parts that expose a state getter now pass that object as `state`, so `#render="{ props, state }"` receives the machine's
part state instead of a hand-built `{ open }` object.
