---
'@ark-ui/react': patch
'@ark-ui/solid': patch
'@ark-ui/svelte': patch
'@ark-ui/vue': patch
---

### Added

- **Popover**: Add `finalFocusEl` and `restoreFocus` props to control focus behavior when the popover closes.
  `finalFocusEl` lets you specify an element to receive focus instead of the trigger, and `restoreFocus` (default `true`)
  controls whether focus returns to the trigger at all.

  ```jsx
  <Popover.Root finalFocusEl={() => myInputRef} restoreFocus={false}>
    ...
  </Popover.Root>
  ```

### Fixed

- **Color Picker**: Fix color value to respect the specified `format` when setting values via props or `setValue`.
  Previously, the internal color object could retain a mismatched format (e.g., RGB when `format` is `hsla`), causing
  inconsistent `value` objects in `onValueChange` callbacks.

- **Date Input**: Fix min/max constraints resetting other segments mid-keystroke. Validation now defers until the segment
  is fully typed or on blur.

- **Date Picker**: Fix `onValueChange` not firing when only time segments change in `CalendarDateTime` or
  `ZonedDateTime` values.

- **Navigation Menu**: Remove aggressive and redundant default `aria-label`.
