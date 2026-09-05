---
'@ark-ui/react': major
'@ark-ui/solid': major
'@ark-ui/svelte': major
'@ark-ui/vue': major
---

Move every component onto zag v2.

Machines now take their props through a single `props` object and expose state with `getXState()` alongside the
existing `getXProps()` getters. Components that changed shape in zag are reflected here: `FloatingPanel.ResizeTrigger`
takes a `placement` instead of an `axis`, `ImageCropper` takes `placement` instead of `position`, `PinInput` requires
`count`, and `Carousel` no longer takes `slideCount` or `padding`.
