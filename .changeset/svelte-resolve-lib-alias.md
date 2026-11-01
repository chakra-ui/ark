---
'@ark-ui/svelte': patch
---

- Fixed `dist` shipping unresolved `$lib/` imports, which broke every consumer build in 5.25.0.
