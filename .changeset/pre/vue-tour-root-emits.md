---
'@ark-ui/vue': patch
---

- **Tour**: Fix `Tour.RootEmits` declaring `statusChange`, `stepChange` and other machine events that `Tour.Root` never
  emits. It now only declares `enterComplete` and `exitComplete`. Pass `onStatusChange`, `onStepChange` and the other
  callbacks to `useTour` instead.
- **Presence**: Fix the `enterComplete` and `exitComplete` event descriptions being swapped.
