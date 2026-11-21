---
'@ark-ui/react': patch
---

Fix `Toast.Root` with `asChild` applying the root props to the internal ghost element instead of the child. The ghost
elements now render inside the child, since they belong to the root and keep the pointer inside the group between
toasts.
