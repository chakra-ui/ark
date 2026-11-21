---
'@ark-ui/vue': patch
---

- **ColorPicker, Combobox, DatePicker, Dialog, Drawer, FloatingPanel, HoverCard, Menu, Popover, Select, Tooltip**: Fix
  `Root` not declaring `enterComplete`. `usePresence` already emits it, so Vue warned that the event was undeclared.
