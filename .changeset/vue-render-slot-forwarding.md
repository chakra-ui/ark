---
'@ark-ui/vue': patch
---

Fix the `render` slot being ignored on component parts.

Parts forwarded only their default slot, so a consumer's `#render` slot never reached the factory and its content was
dropped. The part's props still landed, because they come from the machine's prop getters rather than from the slot,
which made the part look correct while silently discarding what was passed to it.

`Popover.Trigger` also forwards its state now, so `#render="{ props, state }"` can read `state.open`.
