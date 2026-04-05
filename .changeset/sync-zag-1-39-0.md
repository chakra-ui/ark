---
'@ark-ui/react': minor
'@ark-ui/solid': minor
'@ark-ui/svelte': minor
'@ark-ui/vue': minor
---

### Added

- **Dialog, Drawer, Hover Card, Menu, Popover, Tooltip**: Add support for multiple triggers. A single component instance
  can now be shared across multiple trigger elements. Each trigger is identified by a `value` passed to
  `getTriggerProps`. When the component is open and a different trigger is activated, it switches and repositions without
  closing.

- **Splitter**: Add multi-drag support for nested splitter layouts. When a horizontal and vertical splitter meet at the
  same point (e.g. a grid layout), users can drag the intersection to resize both directions at once. Create a shared
  registry via `createSplitterRegistry()` and pass it to each splitter instance.

- **Tags Input**: Add `sanitizeValue` prop to normalize tag values before they are added. This runs on every new tag, so
  you can enforce consistent formatting in one place — strip whitespace, lowercase, remove special characters, etc.
  Defaults to `(v) => v.trim()`.

- **Toast**: Add priority-based queue system. When the max number of visible toasts is reached, incoming toasts are
  queued and sorted by priority so the most important ones display first. You can override the automatic priority by
  passing a custom `priority` value.

- **Floating Panel**: Add `initialFocusEl`, `finalFocusEl`, and `restoreFocus` props for focus management when the panel
  opens or closes.

### Fixed

- **Date Input**: Fix crash in non-React frameworks (Vue, Solid, Svelte) where `event.nativeEvent.isComposing` is
  `undefined`. The composing check now uses a framework-agnostic utility that works across all adapters.

- **Dialog / Drawer**: Avoid setting inline `pointer-events` when modal, letting the dismissable layer manage it
  instead.

- **File Upload**: Automatically reject duplicate files with `FILE_EXISTS` error. Previously, uploading the same file
  twice was silently accepted and deleting one duplicate removed all of them.

- **Splitter**: Fix `onResizeStart` and `onResizeEnd` callbacks to fire for programmatic resizes.

- **Tags Input**: Set `enterKeyHint` to `"done"` on the input element so mobile virtual keyboards show a "Done" button
  that triggers tag addition.

- **Toast**: Restore `role="region"` on the toast group element. The role was previously removed to reduce screen reader
  landmark noise, but this caused an axe `aria-prohibited-attr` violation since `aria-label` is not permitted on a `div`
  without a valid role.

- **Tour**: Fix step navigation events (`next`, `prev`, `setStep`) firing when the tour is inactive, bypassing the
  `start` flow. Fix popper styles not being cleaned up when transitioning from a tooltip step to a dialog step.

- **Tree View**: Add `data-checked` and `data-indeterminate` attributes to item and branch control elements for styling
  based on checked state.

- **Accordion**: Fix missing `data-focus` attribute on `getItemTriggerProps`.

- **Combobox**: Fix VoiceOver not announcing combobox options when navigating with arrow keys. Safari/VoiceOver ignores
  `aria-activedescendant` changes on combobox inputs, so a live region is now used to announce the highlighted item on
  Apple devices.

- **Menu**: Fix issue where quick diagonal pointer movement toward an open submenu could flash the highlight across
  sibling items you skim past.

- **Popper**: Fix incorrect positioning when the anchor or floating element changes while the popover is still open
  (e.g. switching between multiple triggers without closing first).

- **Vue**: Fix keyboard navigation for nested menus. ArrowRight now correctly opens submenus when using nested component
  patterns.
