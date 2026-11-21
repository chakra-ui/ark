---
'@ark-ui/vue': patch
---

Fix Dialog, Drawer, Menu and Popover triggers pointing `aria-controls` at content that isn't mounted yet when
`lazyMount` is set.
