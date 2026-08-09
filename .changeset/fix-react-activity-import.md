---
'@ark-ui/react': patch
---

Fix Next.js 15 production builds failing because React's optional `Activity` export was imported statically. Ark now
resolves `Activity` at runtime and falls back to `display-none` when the active React build does not expose it.
