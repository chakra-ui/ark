---
id: changelog
title: Changelog
description: All notable changes will be documented in this file.
---

## [Unreleased]

### Added

- **Checkbox**: Add `CheckboxGroupProvider` component for external checkbox group state management

### Fixed

- **Collection**: Export `UseListCollectionReturn` type
- **File Upload**: Export `FileError`, `FileMimeType`, and `FileRejection` types

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
