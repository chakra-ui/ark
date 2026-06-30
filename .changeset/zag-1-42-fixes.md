---
'@ark-ui/react': patch
'@ark-ui/solid': patch
'@ark-ui/svelte': patch
'@ark-ui/vue': patch
---

- **Date Input**
  - Type dates using your locale's native numerals (Arabic-Indic `٠-٩`, Devanagari `०-९`), not just ASCII digits.
  - Fix timezone-naive values (`CalendarDate`/`CalendarDateTime`) shifting by your local UTC offset when you pass a
    custom `formatter` without a `timeZone`. A wall-clock value now round-trips unchanged.

- **Date Picker**
  - Type dates using your locale's native numerals, not just ASCII digits.
  - Reorder dates on blur in range selection, matching the other selection paths.
  - Fix the day view briefly flashing when you close the picker from the month or year view.
  - Fix `visibleRangeText` returning a stale value when multiple pickers share a visible range. This was also causing
    SSR hydration mismatches.

- **Menu**: Fix the context menu flashing at the top-left before positioning. Long-press (touch) context menus no longer
  open stuck at `(0,0)`.

- **Number Input**
  - Fix `api.setValue` throwing when you pass a number and `formatOptions` is set.
  - Fix `Cmd`/`Ctrl` + arrow keys producing values off the `step` grid.

- **Slider**: Fix `Cmd`/`Ctrl` + arrow keys producing values off the `step` grid.

- **Tags Input**: Fix native form submit so `FormData` reflects the current tags. The hidden input used to keep its
  initial value after you added, removed, or cleared tags.

- **Toast**: Fix a height flicker when expanding the stack in overlap mode. Heights are now measured without the `scale`
  transform.
