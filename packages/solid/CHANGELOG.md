---
id: changelog
title: Changelog
description: All notable changes will be documented in this file.
---

## [Unreleased]

### Added

- **[NEW] DownloadTrigger**: Component for downloading any a blob or file.

### Fixed

- **Presence**: Fixed issue where `onExitComplete` was not being called.
- **Toaster**: Fixed issue where `--index` was not applied correctly.

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
