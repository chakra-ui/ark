---
'@ark-ui/svelte': patch
---

Fix `Avatar.Root`, `Marquee.Root`, `QrCode.Root`, `Timer.Root` and `Tooltip.Root` ignoring a caller-supplied `id`. The
generated id always won, so the part ids could not be set. The `id` prop now takes precedence, as it does on every other
root.
