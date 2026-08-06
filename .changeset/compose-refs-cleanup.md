---
"@ark-ui/react": patch
---

Fix `composeRefs`/`useComposedRefs` not resetting plain callback refs and object refs to `null` on detach when composed alongside a React 19 ref that returns a cleanup function.
