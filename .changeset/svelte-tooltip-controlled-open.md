---
'@ark-ui/svelte': patch
---

Fix `Tooltip.Root` ignoring a controlled `open` prop. The root destructured `open` out of its props and never passed it
to the machine, so `<Tooltip.Root open={true}>` (or a `bind:open` the parent drives) rendered a closed tooltip. The
other popper roots (`Dialog`, `Popover`, `HoverCard`) already forward it.
