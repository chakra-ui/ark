---
'@ark-ui/solid': patch
---

Fixed FloatingPanel `Content` and `Positioner` not reacting to presence changes. The panel never appeared when
`lazyMount` was used, and was never removed from the DOM when `unmountOnExit` was used. `Content` now also forwards the
presence ref so exit animations are tracked before unmounting.
