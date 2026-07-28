---
'@ark-ui/vue': patch
---

Fixed missing `v-model` emit wiring for `Drawer` (`open`, `snapPoint`), `Listbox` (`highlightedValue`), `Marquee`
(`paused`), `DateInput` (`placeholderValue`), and `triggerValue` on Dialog, Drawer, HoverCard, Menu, Popover, and
Tooltip.
