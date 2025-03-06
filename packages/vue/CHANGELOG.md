---
id: changelog
title: Changelog
description: All notable changes will be documented in this file.
---

## [Unreleased]

## [4.9.2] - 2025-02-21

### Fixed

- **Field**: Resolved an issue where the `data-disabled` attribute wasn't set on the field helper text when the field is
  disabled.

## [4.9.1] - 2025-01-23

### Fixed

- **FileUpload**: Resolved an issue where multiple files were added during a single upload operation.

## [4.9.0] - 2025-01-22

### Added

- **DatePicker**:
  - Added `minView` and `maxView` options for better control over the displayed views, allowing to create Month and Year
    pickers.
  - Introduced a new `parse` method to convert input values into valid dates, complementing the `format` option for
    enhanced UX
  - Added `locale` and `timeZone` options to the `format` method
  - Introduced `placeholder` context property to customize the input's placeholder text

### Fixed

- **ColorPicker, HoverCard, Tooltip**:
  - Fixed intermittent placement shifts caused by updates to the `data-placement` attribute
- **FileUpload**:
  - Resolved an issue where the change event wasn’t triggered when files were dropped into the dropzone
  - Fixed an issue where `context.setClipboardFiles(...)` was called despite file upload being disabled
  - Addressed an issue where the machine transitioned to the `dragging` state even when disabled
  - Fixed an issue preventing rejected files from being deleted via the item delete trigger
  - Exposed the disabled state via `context.disabled`
- **Tour**:
  - Fixed an issue where the dialog tour step did not synchronize its z-index with the content
- **Date Picker**:
  - Fixed a crash that occurred when entering very large invalid dates in the input field
  - Fixed an issue in the year view where selecting a year was not possible when the `min` and `max` dates were less
    than one year apart and overlapped two distinct years

## [4.8.0] - 2025-01-14

### Added

- **[NEW] Tour**: Introduced the `Tour` component to guide users through the interface. For more details, check the
  [Tour documentation](https://ark-ui.com/docs/vue/components/tour).
- **[NEW] FocusTrap**: Implemented the `FocusTrap` component to confine focus within a specified container.

### Fixed

- Resolved an issue where form-related components reset despite the reset event being cancelled.
- **HoverCard, Tooltip**: Resolved an issue where the controlled open state could become inconsistent during the
  `opening` or `closing` phases.
- **FileUpload**:
  - Fixed a brief warning display when a new image file is added to the preview.
  - Enhanced click detection for the dropzone and added support for the `disableClick` prop.

## [4.7.0] - 2025-01-08

### Added

- **Clipboard**: Introduced `Clipboard.ValueText` to display clipboard content.
- **FileUpload**:
  - Added `preventDropOnDocument` to block file drops on the document when the file upload component is active.
  - Added `setClipboardFiles` to the API for setting files from clipboard data.
- **Progress**: Added support for `defaultValue`, `onValueChange` and `v-model`.
- **Tabs, Menu, Combobox**: Added `navigate` property for custom router navigation when selections render as links.
- **QrCode**:
  - Added support for `defaultValue`, `onValueChange` and `v-model`.
  - Added `QrCode.DownloadTrigger` to enable QR code image downloads.

### Fixed

- **Collapsible**: Fixed a bug where the opening animation replayed when an open collapsible was re-rendered.
- **Dialog, Popover**: Resolved an issue causing dialogs or popovers to close if the focused element was removed from
  the DOM.
- **FileUpload**: Fixed a bug causing the hidden input to desync from accepted files.
- **Menu, Popover**: Fixed inconsistent interaction detection outside the component when the trigger was inside a
  scrollable container.
- **Pagination**: Corrected an issue where the page range returned an incorrect `end` value when `pageSize` exceeded
  `count`.
- **QRCode**: Fixed `getDataUrl` to generate a properly sized QR code.

## [4.6.0] - 2024-12-29

### Added

- **Carousel [Breaking]:** Redesigned the carousel for better touch handling and performance. See the
  [Carousel docs](https://ark-ui.com/docs/solid/components/carousel) for more info.

### Fixed

- **FileUpload:** Resolved an issue where the `accept` attribute wasn’t applied to the hidden input.
- **NumberInput:** Fixed a bug where the input event wasn’t triggered on the first click of the increment/decrement
  controls.
- **Field**: Fixed issue where `invalid` and `disabled` prop was not reactive.

## [4.5.0] - 2024-12-12

### Added

- **ColorPicker**: Introduced `invalid` and `openAutoFocus` props.
- **TreeView**: Exported the `TreeCollection` type.
- **FileUpload**: Added `acceptedFiles` and `rejectedFiles` outputs to the `validate` method.

### Changed

- **Environment**: Deprecated `EnvironmentContext` in favor of `UseEnvironmentContext`.

### Fixed

- **Presence, Collapsible**: Fixed a potential memory leak after component unmount.
- **Environment**: Correctly exported `EnvironmentContext`.
- **SignaturePad**: Resolved an issue where `getDataUrl(...)` rendered improperly scaled images in Firefox.
- **NumberInput**: Fixed an issue where the locale provided by `LocaleProvider` was not applied correctly.

### Removed

- **DatePicker**: Dropped the unimplemented `modal` prop.

## [4.4.2] - 2024-11-18

### Fixed

- **TreeView**: Exported missing `TreeViewContext`.

## [4.4.1] - 2024-11-14

### Fixed

- **Utility**: Incorrect entrypoint in `package.json` for `/anatomy`.

## [4.4.0] - 2024-11-11

### Added

- **Utility**: Exported `createAnatomy` for defining custom component anatomy, now accessible via
  `import { createAnatomy } from '@ark-ui/vue/anatomy'`.

### Fixed

- **ColorPicker**
  - Added `--color` CSS variable to swatch and swatch trigger parts.
  - Enabled clicking on swatch when in the open state.
- **Combobox**: Fixed a timing issue with the `onValueChange` callback.
- **Clipboard**: Corrected missing `type="button"` attribute on clipboard trigger.
- **Field**
  - Fixed cleanup issue with `resizeObserver` on `Field.Textarea`.
  - Triggered resize when `rows` attribute or fonts change.
- **TagsInput**: Resolved inconsistent delete behavior across states.
- **TimePicker**: Exported missing `timePickerAnatomy`.

## [4.3.0] - 2024-11-08

### Added

- **Field**: Added `autoresize` prop to `Field.Textarea` for auto-resizing the textarea based on content.

### Changed

- **TreeView**: Redesigned using the new tree collection for improved rendering and logic management. See the
  [TreeView documentation](https://ark-ui.com/docs/vue/components/tree-view) for details.
- **QrCode, SignaturePad, Timer**: Promoted from preview to stable release.

### Fixed

- **Dialog**: Fixed an issue where body styles weren't properly restored when `preventScroll` was enabled.
- **Toast**: Corrected type definitions in the `createToaster` function.

## [4.2.0] - 2024-10-26

### Added

- **Slider**: Introduced `Slider.DraggingIndicator` for displaying an indicator when dragging a thumb.
- **Field**: Added `Field.RequiredIndicator` to show a required indicator (e.g., an asterisk) when the `required` prop
  is set.

```tsx
<Field.Root required>
  <Field.Label>
    Username
    <Field.RequiredIndicator />
  </Field.Label>
  <Field.Input placeholder="Enter your username" />
</Field.Root>
```

### Fixed

- **TagsInput**: Resolved an issue where `api.addTag(...)` was not functioning correctly.
- **RatingGroup**: Fixed a bug where both the rating group and rating item received focus when `readOnly` was set to
  `true`.
- **Combobox**: Corrected behavior where `getSelectionValue` was called multiple times; it now triggers only when a
  selection is made.
- **HoverCard**: Removed `preventDefault` calls on the `touchstart` event to avoid browser error logs.
- **Popover**: Fixed a race condition in iOS Safari where switching between popovers caused them to close unexpectedly.
- **Presence**: Addressed an issue where elements using the presence machine did not exit the unmounting state if closed
  with a delay while switching tabs.

### Changed

- **Editable**:
  - Added `data-autoresize` attribute to both editable and preview elements when `autoResize` is enabled.
  - Removed the default `all: unset` style from the input when `autoResize` is enabled, allowing for user-defined CSS.

## [4.1.1] - 2024-10-09

### Changed

- **Time Picker [Preview]**: Updated `value` and `defaultValue` types from `string` to `Time`. Use the exported
  `parseTime` function to convert between strings and time objects.

### Fixed

- **TagsInput**: Resolved an issue where tag navigation was unresponsive after removing tags with the delete key.
- **DatePicker**: Fixed a bug where selecting a preset and then blurring the input incorrectly reset the value.

## [4.1.0] - 2024-09-30

### Added

- **Toggle**: Introduced the `Toggle` component.
- **useForwardExpose**: Added utility to facilitate forwarding of underlying component nodes.
- **Dialog**: Added support for detecting outside clicks from parent windows when rendered within an iframe.

### Fixed

- Resolved an issue where the underlying DOM node of most components was inaccessible via `$el`.
- **Combobox**: Fixed an issue where pressing Enter without selecting an option left text in the input.
- **Dialog**: Fixed an issue where the dialog closed when the positioner was scrollable, and the scrollbar was clicked.
- **File Upload**:
  - Fixed an issue where `acceptedFiles` were removed after an invalid file upload.
  - Fixed an issue in the preview image where `createObjectURL` was not cleaned up.

## [4.0.2] - 2024-09-27

### Fixed

- Resolved an issue that `ref` is not exported from `@zag-js/store`.

## [4.0.1] - 2024-09-26

### Fixed

- Corrected an issue where Vue 3.5.x was not properly declared as a peer dependency.

## [4.0.0] - 2024-09-25

In this major release, we shifted from primitive data types like strings to more structured types such as Collection,
Color, and DateValue. This enhanced flexibility and control by offering advanced methods and properties.

The new APIs introduced helper functions like `parseColor`, `parseDate`, and `createListCollection` to simplify working
with the new types and make code more concise.

### Changed

- Ark UI Vue now required Vue 3.5.x or later, as it leveraged the useId() helper introduced in this version.
- **ColorPicker [Breaking]**: Updated `value` and `defaultValue` types from `string` to `Color`. Use the exported
  `parseColor` function to convert between strings and color objects.

  **Before**

  ```tsx
  import { ColorPicker } from '@ark-ui/react/color-picker'

  const Demo = () => {
    return <ColorPicker.Root defaultValue="#000" />
  }
  ```

  **After**

  ```tsx
  import { ColorPicker, parseColor } from '@ark-ui/react/color-picker'

  const Demo = () => {
    return <ColorPicker.Root defaultValue={parseColor('#000')} />
  }
  ```

  > This change allows direct access to color object methods and properties.

- **Select, Combobox [Breaking]**: Removed the `items`, `itemToString`, and `itemToValue` props. Introduced a
  `collection` prop instead. Use the `createListCollection` helper to generate a collection from items.

  **Before**

  ```tsx
  import { Select } from '@ark-ui/react/select'

  const Demo = () => {
    return <Select.Root items={['Option 1', 'Option 2', 'Option 3']} />
  }
  ```

  **After**

  ```tsx
  import { Select, createListCollection } from '@ark-ui/react/select'

  const collection = createListCollection({
    items: ['Option 1', 'Option 2', 'Option 3'],
  })

  const Demo = () => {
    return <Select.Root collection={collection} />
  }
  ```

- **DatePicker [Breaking]**: Changed `value` and `defaultValue` types from `string` to `Date`. To convert between
  strings and dates, use the `parseDate` function.

  **Before**

  ```tsx
  import { DatePicker } from '@ark-ui/react/date-picker'

  const Demo = () => {
    return <DatePicker.Root defaultValue="2024-01-01" />
  }
  ```

  **After**

  ```tsx
  import { DatePicker, parseDate } from '@ark-ui/react/date-picker'

  const Demo = () => {
    return <DatePicker.Root defaultValue={parseDate('2024-01-01')} />
  }
  ```
