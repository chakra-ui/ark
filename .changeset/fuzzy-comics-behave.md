---
'@ark-ui/vue': patch
---

Fix `useDialog` to correctly unwrap `MaybeRef` props before `cleanProps` so computed/ref props like `id` are preserved.
