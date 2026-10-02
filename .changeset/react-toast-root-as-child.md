---
'@ark-ui/react': patch
---

Fix `Toast.Root` ignoring `asChild`. The root declared the prop but rendered a plain `div` instead of `ark.div`, so the
child was nested inside an extra root element and `asChild` was spread onto the DOM, which React warns about. It now
renders through the factory, with the machine's ghost elements nested inside the child it renders as — they belong to
the root, and their job is to keep the pointer inside the group between toasts.
