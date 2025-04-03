---
id: changelog
title: Changelog
description: All notable changes will be documented in this file.
---

## [Unreleased]

## [5.4.0] - 2025-03-28

### Added

- **Slider**

  - Add support for `origin: end` to align the thumb to the end of the track.
  - Expose `thumbSize` as CSS variables in the root element. Can be useful for styling the slider.

- **Menu**

  - Added `onSelect` event to the `Menu.Item` component.

### Fixed

- Ensured each component's state machine starts before processing events.
- **HoverCard, ColorPicker**: Added missing `tabIndex` for better dialog support.
- **Menu**: Assigned unique IDs to menu items to improve accessibility and HTML validation.
- **DatePicker**: Improved reactivity of the `columns` prop in `DatePicker.Table`.
- **Field**: Improved reactivity of the `value` prop in `Field.Textarea`.
- **Toggle**: Improved reactivity of the `children` and `fallback` props in `Toggle.Indicator`.

## [5.3.1] - 2025-03-24

### Fixed

- Fixed an issue where a function was imported from a package that wasn't declared as a dependency.

## [5.3.0] - 2025-03-24

### Added

- **Collapsible**: Added an `Indicator` part to display whether the collapsible was open or closed.
- **ColorPicker**: Added support for formatting the `ValueText` component.

```tsx
<ColorPicker.ValueText format="hex" /> // #ff0000
```

### Fixed

- **Combobox**: Fixed an issue where `onOpenChange` was called with the same `open` value.
- **Splitter**: Fixed an issue where `onResizeStart` and `onResizeEnd` callbacks weren't triggered during keyboard
  interactions.

## [5.2.0] - 2025-03-22

### Added

- **[NEW] DownloadTrigger**: Added Component for downloading a blob or file, whether retrieved synchronously or
  asynchronously.

```tsx
import { DownloadTrigger } from '@ark-ui/solid/download-trigger'

export const DownloadImage = () => {
  async function fetchImage() {
    const response = await fetch('https://picsum.photos/200/300')
    return response.blob()
  }

  return (
    <DownloadTrigger data={fetchImage} fileName="avatar.jpeg" mimeType="image/jpeg">
      Download Image
    </DownloadTrigger>
  )
}
```

### Changed

- **NumberInput**: Set the default step to `0.01` when `formatOptions.style` was set to `percent`.
- **[Breaking] Splitter**: Redesigned splitter machine to support more use cases and improve DX. Check out the
  [Splitter](https://ark-ui.com/solid/docs/components/splitter) documentation for more details.

### Fixed

- **Presence**: Fixed issue where `onExitComplete` was not being called.
- **Select**: Fixed issue where select `valueAsString` lost reactivity.
- **Toast**:
  - Fixed issue where setting `offsets` to `undefined` caused the machine to throw.
  - Fixed issue where `onExitComplete` was not being called.

## [5.1.1] - 2025-03-17

### Fixed

- **Field**: Exported the missing `useField` hook.
- **NumberInput**: `onValueChange` correctly received `valueAsNumber`.
- **Slider**: Thumbs initialized correctly when `min` was set to a non-zero value.

## [5.1.0] - 2025-03-11

### Added

- Implemented support for reactive props in `use-*.ts` functions.

  ```tsx
  const accordionProps = createMemo<UseAccordionProps>(() => ({
    multiple: true,
    value: value(),
    onValueChange: (e) => setValue(e.value),
  }))

  const accordion = useAccordion(accordionProps)
  ```

### Fixed

- **Checkbox**: `data-invalid` is no longer set when `invalid` is `false`.
- **Combobox**: Fixed unexpected cursor movement when editing input.
- **PinInput**: OTP SMS autofill now works as expected.
- **RatingGroup**: Fixed incorrect focus placement on the label.
- **TagsInput**: Improved caret detection to prevent unintended tag removal.
- **Timer**
  - Fixed slowdown when switching tabs/windows.
  - Changed default `interval` from `250` to `1000`.

## [5.0.0] - 2025-03-06

Ark UI just got a major performance boost! 🚀

### What’s new in v5?

- **Blazing-fast performance** – Every component runs smoother and renders faster.
- **Smaller bundle size** – Leaner components and adapters for a more efficient build.

We made this happen by using Solid's native reactive primitives instead of external stores.

In our stress tests with **10,000 components**, Ark v5 delivered **1.5x–4x** better performance across the board.

### A quick note on tests

Most component updates are non-breaking, but due to this change, some tests may need adjustments. For example:

```jsx
// Before
it('should open by default', () => {
  render(() => <ComponentUnderTest defaultOpen />)
  expect(screen.getByRole('dialog')).toBeInTheDocument()
})

// After
it('should open by default', async () => {
  render(() => <ComponentUnderTest defaultOpen />)
  expect(await screen.findByRole('dialog')).toBeInTheDocument()
})
```

#### Added

- **Carousel**: ⚠️ Breaking change: Added required prop `slideCount` to `Carousel.Root` component.
- **Clipboard**: Added `onValueChange` and `defaultValue` props.
- **ColorPicker**: Added `defaultFormat` prop.
- **Combobox**: Added `defaultHighlightedValue` and `defaultInputValue` props.
- **DatePicker**: Added `defaultFocusedValue` prop, `getViewProps`, and `visibleRangeText`.
- **HoverCard**: Expanded interaction handlers.
- **Menu**: Added `defaultHighlightedValue` prop.
- **Pagination**: Added `defaultPageSize` prop.
- **PinInput**: Added `count` prop for better SSR aria-label.
- **Progress**: Added `locale` and `formatOptions` props.
- **QrCode**: Added `pixelSize` prop.
- **Select**: Added `defaultHighlightedValue` prop.
- **TagsInput**: Added `defaultInputValue` prop.
- **Toggle**: Reintroduced toggle machine.

#### Fixed

- **Accordion**: Fixed issue in Safari where clicking triggers didn't show content.
- **Avatar**: Fixed `api.setSrc` not working.
- **Carousel**: Fixed pagination sync and initial page issues.
- **File Upload**: Fixed drag-and-drop when `directory: true`.
- **Menu**: Fixed context menu positioning not updating on right-click.
- **Number Input**: Fixed `value` prop not being consumed.
- **Pin Input**: Fixed focus warnings and editing issues.
- **Progress**: Allowed more precise (decimal) values.
- **Radio Group, Switch**: Improved focus behavior in Safari.
- **Select**: Fixed regression where `multiple: true` didn't work.
- **Steps**: Ensured ARIA attributes use valid values and wrapped `<li>` elements correctly within `<ul>` or `<ol>`.
- **Textarea**: Fixed `ResizeObserver` warning.
- **Timer**: Fixed stopping issue when switching tabs; resolved issue where `action` prop was passed to `ActionTrigger`.
- **Toast**: Fixed keyboard navigation skipping close button.
- **Toggle Group**: Fixed `data-focus` not being removed on blur.
