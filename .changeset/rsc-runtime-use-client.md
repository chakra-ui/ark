---
'@ark-ui/react': patch
---

Fix React Server Components build failure caused by a stray `"use client"` directive on the shared
`_virtual/_rolldown/runtime.js` helper emitted by vite 8's rolldown backend.
