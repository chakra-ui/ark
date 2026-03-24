---
'@ark-ui/react': minor
'@ark-ui/solid': minor
'@ark-ui/svelte': minor
'@ark-ui/vue': minor
---

**Date Picker**: Improved range picker mode with new data attributes and state properties.

- Added missing range data attributes (`data-range-start`, `data-range-end`, `data-in-hover-range`,
  `data-hover-range-start`, `data-hover-range-end`) to month and year cell triggers.
- `TableCellState` now includes `firstInRange`, `lastInRange`, `inHoveredRange`, `firstInHoveredRange`,
  `lastInHoveredRange`, and `outsideRange`.
- Range boundary dates now announce "Starting range from {date}" and "Range ending at {date}" for better screen reader
  context.
- Fixed inverted year cell `selectable` state that caused years outside the visible decade or min/max range to appear
  selectable.
- **Breaking:** `DayTableCellState.formattedDate` removed — use `valueText` instead (inherited from `TableCellState`).
