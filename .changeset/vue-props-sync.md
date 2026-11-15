---
'@ark-ui/vue': patch
---

Sync Vue prop and emit types with zag, adding props and events Vue was missing:

- `SegmentGroup`: `invalid` and `required`
- `DateInput`: `createCalendar` and `isDateUnavailable`
- `Pagination`: `boundaryCount`
- `Tour`: `scrollToTargetFn`
- `Toggle` and `ImageCropper`: `id`
- `Drawer`: `stack`, plus the `escapeKeyDown`, `focusOutside`, `interactOutside`, `pointerDownOutside` and
  `requestDismiss` events
- `NumberInput`: the `valueCommit` event
