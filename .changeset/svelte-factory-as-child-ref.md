---
'@ark-ui/svelte': patch
---

Fix `bind:ref` staying `null` when a component renders through `asChild`. The factory bound `ref` only on the element it
renders itself, so in `asChild` mode the caller's element was never assigned. The props function now carries an
attachment that sets `ref` to the child element, matching React, where the ref reaches the `asChild` child.
