---
id: changelog
title: Changelog
description: All notable changes will be documented in this file.
---

## [Unreleased]

### Fixed

- **Carousel**:
  - Fix an issue where the carousel would not update when `slideCount` or `autoplay` props change.
  - Fix an issue where `loop: false` was ignored when using autoplay. Now, the carousel will stop when it gets to the
    last slide.

- **Date Picker**: Expose `data-inline` attribute on Content part to enable distinct styling for inline date pickers
  versus popover date pickers.

- **Menu**: Fix issue where `onCheckedChange` could be called twice on checkbox or radio item

- **Radio Group**: Fixed issue where arrow key navigation doesn't apply `data-focus-visible` on the newly focused item.

- **TagsInput**: Export `InputValueChangeDetails` type

## [5.3.3] - 2025-08-01

### Fixed

- **Carousel**: Fix issue where controlled carousel ignores last slide

## [5.3.2] - 2025-07-26

### Fixed

- **Dialog**
  - Sync content `--layer-index` with positioner and backdrop
  - Decouple `trapFocus` from `modal` so it's possible to set `modal=false` and `trapFocus=true`

## [5.3.1] - 2025-07-23

### Fixed

- **Date Picker**: Fixed issue where hovered range was connect to selected values, when it shouldn't

- **Tree View**: Fixed issue where tree view doesn't scroll into view when content overflows.

- **Portal**: Fix issue in SvelteKit where `Portal` component doesn't work as expected.

## [5.3.0] - 2025-07-22

### Added

- **Collection**: Add `useListSelection` function for managing collection item selection with support for
  single/multiple selection modes

  ```js
  const collection = createListCollection({ items: ['React', 'Vue', 'Angular'] })
  const selection = useListSelection({ collection })

  // Check if item is selected
  const isSelected = selection.isSelected('Svelte')

  // Select/deselect items
  selection.select('Svelte')
  selection.toggle('Angular')
  ```

- **File Upload**: Add support for `bind:acceptedFiles` and `defaultAcceptedFiles` to programmatically control the
  accepted files

- **Signature Pad**: Add support for `bind:paths` and `defaultPaths` to programmatically control the paths

- **Date Picker**: Added hover range preview support for date picker range selection. Added `inHoveredRange`,
  `firstInHoveredRange`, and `lastInHoveredRange` properties to `DayTableCellState` with corresponding data attributes
  `data-in-hover-range`, `data-hover-range-start`, and `data-hover-range-end`.

  Hover range states are only active when not overlapping with actual selected range, enabling distinct styling for
  hover preview vs actual selection in range mode.

### Fixed

- **Date Picker**: Fix date comparison issues when time components are involved. This resolves critical issues with date
  comparison operations when different date types (`CalendarDate`, `CalendarDateTime`, `ZonedDateTime`) are mixed,
  particularly in scenarios involving time components.

## [5.2.0] - 2025-07-18

### Added

- **Checkbox**: Add `CheckboxGroupProvider` component for external checkbox group state management

### Fixed

- **Carousel**: Fix issue where full page carousel could trap scrolling

- **ListCollection**: Export `UseListCollectionReturn` type

- **TreeCollection**: Fix issue where the `filter` method completely deletes the children key from the node when there
  are no matching children

- **Number Input**: Fix issue where default pattern does not allow negative numbers with decimal point

- **File Upload**
  - Export `FileError`, `FileMimeType`, and `FileRejection` types
  - Fix issue where calling `api.setFiles` invokes validation with incorrect `acceptedFiles`
  - Fix issue where the browser might not be able to infer the mime type of a file due to limitations, drag source or
    security restrictions. As a fallback in the file validation logic, we now infer the mime type from the file
    extension.

- **Portal**: Fix issue where `lifecycle_double_unmount` warning could be triggered.

## [5.1.1] - 2025-07-05

### Fixed

- **Combobox**
  - Expose `reason` to `onOpenChange` and `onInputValueChange` callbacks
  - Expose `api.clearHighlightedValue` function to clear highlighted value

- **Date Picker**
  - Fix issue where datepicker errors when setting `selectionMode=range` and `minView=year`
  - Fix issue where `focusedValue` could not be fully controlled

- **Listbox**: Select highlighted item only if it exists in the collection

- **Progress**: Improve `valueAsString` formatting

- **Select**
  - Select highlighted item only if it exists in the collection
  - Expose `api.clearHighlightedValue` function to clear highlighted value

- **Tour**: Fix an issue where the `goto` function in `StepActionMap` doesn't work when passing step IDs (string)

- **Tree View**: Expose `id` in the tree node state

## [5.1.0] - 2025-07-01

### Added

- **Angle Slider [New]**: Add support for angle slider component for angle selection.
- **Color Picker**: Add support for `inline` prop to render color picker inline
- **Date Picker**: Add support for `inline` prop to render the date calendar inline

### Fixed

- **Color Picker**: Auto-prefix Hex values with `#` if missing when using the `hex` channel input
- **Menu**: Fix interaction outside detection for focusable context trigger
- **Tree View**: Improve support for rendering tree items as links

## [5.0.5] - 2025-06-28

### Fixed

- Fix issue where `bind:ref` doesn't work with components, making it impossible to access the underlying DOM element.
  Now, you can pass `bind:ref` to all components.

  ```svelte
  <script lang="ts">
    let rootNode = $state<HTMLDivElement | null>(null)

    $inspect(rootNode)
  </script>

  <Accordion.Root bind:ref={rootNode}>
    <Accordion.Item value="item-1">
      <Accordion.Trigger>Item 1</Accordion.Trigger>
      <Accordion.Content>Content 1</Accordion.Content>
    </Accordion.Item>
  </Accordion.Root>
  ```

- Improve prop reactivity across all components.

## [5.0.4] - 2025-06-27

### Fixed

- **Combobox, Select, Listbox**: Fix issue where rehydrating `defaultValue` or `value` after fetching items doesn't
  update the `valueAsString`

## [5.0.3] - 2025-06-27

### Fixed

- **Tree View**: Fix tree traversal for querying last node

## [5.0.2] - 2025-06-26

### Fixed

- **Date Picker**: Fix issue with keyboard selection where setting unavailable date causes month view to behave
  differently from clicking with mouse

- **Toast**: Fix issue where app crashes when `toaster.promise` is called without loading option. The `loading` option
  is now required. A warning will be logged if it is not provided

- **Tree View**
  - Fix issue where clicking a branch with indeterminate state doesn't check its child nodes
  - Remove `aria-busy` attribute from branch trigger when not loading children
  - Expose node details in `onExpandChange`, `onSelectionChange` and `onFocusChange`

- **Angle Slider**: Fix issue where scrubbing doesn't feel smooth on touch devices

- **Timer**
  - Fix issue where timer could continue beyond `targetMs` when window is not visible
  - Add validation to ensure `startMs` and `targetMs` are configured correctly
  - Fix `progressPercent` calculation for countdown timers

## [5.0.1] - 2025-06-23

### Fixed

- **Accordion**: Fix issue where `Accordion.ItemContext` doesn't work
- **Listbox**: Fix issue where `Listbox.ItemContext` was not exported

## [5.0.0] - 2025-06-23

### Added

- **Tree View**
  - Add support for checkbox state for checkbox trees via `defaultCheckedValue`, `checkedValue`, `onCheckedChange` props
  - Add callback for when `loadChildren` fails via `onLoadChildrenError` prop

### Fixed

- **Progress**
  - Fix issue where setting orientation to `vertical` don't work
  - Fix issue where setting `defaultValue` to `null` doesn't show indeterminate state

## [5.0.0-0] - 2025-06-19

### Added

- Added all components to match React and Vue packages.

## [0.3.0] - 2025-01-08

- Added `Format` component.
- Added `Progress` component.

## [0.2.0] - 2024-12-12

## Added

- Added `Ark` factory component for `asChild` prop.
- Added `Environment` component.
- Added `Collection` helpers.
- Added `Timer` component.
- Added `Highlight` component.
- Added `QrCode` component.

## [0.1.0] - 2024-11-27

### Added

- Added `Avatar` component.

## [0.0.0] - 2024-11-27
