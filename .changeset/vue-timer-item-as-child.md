---
'@ark-ui/vue': patch
---

- **Timer**: Fix `Timer.Item` dropping the element passed through its default slot when using `asChild`. The element is
  now rendered and receives the item attributes, and the formatted value is used only as fallback content.
