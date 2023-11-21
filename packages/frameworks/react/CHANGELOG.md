---
id: changelog
name: Changelog
description: All notable changes to this project will be documented in this file.
---

## [Unreleased]

### Added

- Added render function to the `NumberInput` component
- Added `FileUpload` component

### Changed

- Revised the `ColorPicker` component. Check out the [documentation](https://ark-ui.com/docs/components/color-picker) for more information.

### Fixed

- Resolved an issue where the `Toast` component would throw a warning when multiple toasts were rendered at the same time.

## [1.0.1] - 2023-11-10

### Fixed

- Resolved an issue where the `Dialog` component would not animate on exit.
- Resolved various issues for `Menu` when lazy mounted.
- Resolved an issue where `MenuTrigger` could still work even when disabled.
- Resolved an issue where components like `Dialog`, `Popover` etc would not invoke `onExitComplete`
- Fixed an issue where placement of the `Combobox` could be incorrect when lazy mounted.

## [1.0.0] - 2023-11-09

We are happy to announce the release of `@ark-ui/react@1.0.0`. This release includes a number of breaking changes, new features, and bug fixes. Since our last release over two months ago, we will only highlight some key changes. Please refer to the documentation for each component to learn more.

### Highlights

- Revised the `Presence` component: `lazyMount` and `unmountOnExit` have been added at the root level. For some disclosure components like `Tabs` and `Accordion`, this constitutes a breaking change.
- Breaking changes have been implemented in `Accordion`, `ColorPicker`, `DatePicker`, `Dialog`, `RadioGroup`, `SegmentGroup`, `TagsInput`, `Toast`, and `ToggleGroup` to achieve a consistent and more intuitive API.
- Resolved various bugs and addressed accessibility issues across all components.

### Stability and Support

With the release of version 1.0.0, we are moving towards a more stable version of `@ark-ui/react`. Future updates will strive to avoid breaking changes, ensuring a smoother experience for our users. If you encounter any issues while upgrading, please do not hesitate to open an issue on our [GitHub repository](https://github.com/chakra-ui/ark/issues). Your feedback is invaluable in helping us improve.

## [0.15.0] - 2023-09-14

### Added

- Added `ToggleGroup` component
- Added `type HTMLArkProps` that can be used together with the `ark` factory fn to create a type that can be used with `asChild` prop.

### Changed

- Revised `Comoobox` component to support multiple selection
- Revised `Select` component to support multiple selection

### Fixed

- Fix issue where event callbacks that use `flushSync` did not have a stable reference, resulting in a noticable blocking re-renders.
  > Affected components: `Slider`, `RangeSlider`, `NumberInput`, `ColorPicker`

## [0.14.0] - 2023-08-29

### Changed

- Changed `MenuItem` from a `button` to a `div` element.
- `Accordion`: Remove support for passing value as `string`. The value property must be an array of strings.
- `Combobox`: Remove `selectInputOnFocus` option in favor of userland control
- `TagsInput`: Rename `onHighlight` to `onFocusChange`

### Removed

- Removed `'use client'` annotation from `compose-refs` function.
- Removed `Switchinput`. This component is no longer required.
- `TagsInput`: Removed`onTagUpdate` use `onChange` instead.
- `Switch`: Removed `defaultChecked` in favor of `defaultIsChecked`

## [0.13.1] - 2023-08-13

### Changed

- Removed `'use client'` annotation from `factory` function.

## [0.13.0] - 2023-08-13

### Changed

- BREAKING: Renamed `SegmentIndicator` to `SegmentGroupIndicator` to match the naming convention of other components.

## [0.12.0] - 2023-08-13

### Added

- Added supoort for `defaultChecked` to `Checkbox` component.
- Added supoort for `defaultChecked` to `Switch` component.
- Exposed `ark` factory function.

### Fixed

- Fixed the display name for `EditableCancelTrigger` component.

### Removed

- BREAKING: Removed `RadioInput`. This component is no longer required.
- BREAKING: Removed `SegmentInput`. This component is no longer required.

## [0.11.0] - 2023-08-08

### Added

- Added `ComboboxOptionGroup` and `ComboboxClearTrigger` components to the `Combobox` component.
- Added `DatePickerPositioner` component to the `DatePicker` component to help with positioning the calendar.
- Added `ComboboxOptionGroupLabel` to the `Combobox` component. This component can be used to render a label for a group of options in the `ComboboxOptionGroup` component.

### Changed

- BREAKING: Renamed `TagsInputField` to `TagsInputInput` to match the naming convention of other input components.
- BREAKING: Renamed `NumberInputField` to `NumberInputInput` to match the naming convention of other input components.
- BREAKING: Renamed `PinInputField` to `PinInputInput` to match the naming convention of other input components.

### Removed

- BREAKING: Removed `CheckboxInput`. This component is no longer required.

## [0.10.0] - 2023-08-02

### Added

- Developers can now set default options for all `Toast` components in their application, ensuring a consistent look and feel across the board.
- Updated number input `onChange` handler to allow synchronous updates to the value when using the scrubber.

### Changed

- Improved TypeScript typings in our factory functions. The changes allow for more accurate type inference for the `ref` property when dealing with both intrinsic HTML elements and custom React components.

## [0.9.0] - 2023-07-21

### Added

- To improve performance and reduce initial load times, we've introduced two new properties to the `AccordionContent`, `ComboboxContent`, `DialogBackdrop`, `DialogContent`, `HoverCardContent`, `PopoverContent`, `SelectContent`, and `TooltipContent` components. The `lazyMount` property allows for on-demand rendering of content, while the `unmountOnExit` property enables the removal of the component from the DOM once it's no longer required, ensuring better resource management and cleaner code.

## [0.8.1] - 2023-07-19

### Fixed

- Resolved an issue that NextJS would throw a false error because of `use client` annotation.

### Removed

- Removed `isOpen` from `Popover`. Please use `open` instead.

## [0.8.0] - 2023-07-19

### Added

- Enhanced `Carousel` component: Introduced `CarouselIndicator` and `CarouselIndicatorGroup` components. These sub-components offer finer control over the carousel navigation, enabling users to directly access desired carousel slides.
- Introduced `Presence` component, a new utility designed to delay the unmount of child components to assist with animation processes.
- Added support to animate the `Dialog`, `Tooltip` and `Popover` elements using the `Presence` component. Check out the documentation for these components to learn more.
- Expose `use<X>Context` for all components that use context.

## [0.7.3] - 2023-07-10

### Fixed

- Resolved an issue where the `SegmentGroup` component would not animate on the first click.
- Fixed an issue where standalone imports were not working as expected.
- Resolved an issue whre the `Toast` component would not render custom content.

## [0.7.2] - 2023-06-30

### Fixed

- Resolved an issue that types accross various components were not being exported correctly.

## [0.7.1] - 2023-06-27

### Added

- Support for standalone component imports: Developers can now import individual components, such as `@ark-ui/react/src/srctabs` instead of the full `@ark-ui/react` package. This is a significant feature for those working with bundlers that do not support tree-shaking. By allowing imports of individual components, we ensure a reduced bundle size when the full package import is not necessary.

## [0.7.0] - 2023-06-23

### Added

- Added `SegmentGroup` component

## [0.6.0] - 2023-06-03

### Added

- Added `Avatar` component
- Introduced an optional `defaulPage` property to `Pagination`
- Introduced an optional `defaultSize` property to `Splitter`
- Introduced the `onLongPress` property to `Pressable`

### Changed

- Exposed direct access to the `Splitter` component's internal API, enabling more control over the component's state
- Updated all `@zag-js` dependencies to their latest versions

## [0.5.0] - 2023-05-25

### Removed

- Removed `AccordionIcon`

## [0.4.0] - 2023-05-23

### Added

- Add `DatePicker`

### Changed

- Update `Checkbox`. Control `indeterminate` state in `checked` prop

### Fixed

- Fix a typo in the `SwitchProps` type

## [0.3.0] - 2023-05-11

### Added

- Add `Switch`
- Add support for `asChild`

## [0.2.0] - 2023-04-29

### Added

- Add `ColorPicker`

## [0.1.0] - 2023-04-17

### Added

- Add `Accordion`
- Add `Carousel`
- Add `Checkbox`
- Add `Combobox`
- Add `DatePicker`
- Add `Dialog`
- Add `Editable`
- Add `HoverCard`
- Add `Menu`
- Add `NumberInput`
- Add `Pagination`
- Add `PinInput`
- Add `Popover`
- Add `Pressable`
- Add `RadioGroup`
- Add `RangeSlider`
- Add `RatingGroup`
- Add `Select`
- Add `Slider`
- Add `Splitter`
- Add `Tabs`
- Add `TagsInput`
- Add `Toast`
- Add `Tooltip`

[unreleased]: https://github.com/chakra-ui/ark/compare/@ark-ui/react@0.15.0...HEAD
[0.1.0]: https://github.com/chakra-ui/ark/releases/tag/@ark-ui/react@0.1.0
[0.2.0]: https://github.com/chakra-ui/ark/releases/tag/@ark-ui/react@0.2.0
[0.3.0]: https://github.com/chakra-ui/ark/releases/tag/@ark-ui/react@0.3.0
[0.4.0]: https://github.com/chakra-ui/ark/releases/tag/@ark-ui/react@0.4.0
[0.5.0]: https://github.com/chakra-ui/ark/releases/tag/@ark-ui/react@0.5.0
[0.6.0]: https://github.com/chakra-ui/ark/releases/tag/@ark-ui/react@0.6.0
[0.7.0]: https://github.com/chakra-ui/ark/releases/tag/@ark-ui/react@0.7.0
[0.7.1]: https://github.com/chakra-ui/ark/releases/tag/@ark-ui/react@0.7.1
[0.7.2]: https://github.com/chakra-ui/ark/releases/tag/@ark-ui/react@0.7.2
[0.7.3]: https://github.com/chakra-ui/ark/releases/tag/@ark-ui/react@0.7.3
[0.8.0]: https://github.com/chakra-ui/ark/releases/tag/@ark-ui/react@0.8.0
[0.8.1]: https://github.com/chakra-ui/ark/releases/tag/@ark-ui/react@0.8.1
[0.9.0]: https://github.com/chakra-ui/ark/releases/tag/@ark-ui/react@0.9.0
[0.10.0]: https://github.com/chakra-ui/ark/releases/tag/@ark-ui/react@0.10.0
[0.11.0-beta.0]: https://github.com/chakra-ui/ark/releases/tag/@ark-ui/react@0.11.0-beta.0
[0.11.0-beta.1]: https://github.com/chakra-ui/ark/releases/tag/@ark-ui/react@0.11.0-beta.1
[0.11.0-beta.2]: https://github.com/chakra-ui/ark/releases/tag/@ark-ui/react@0.11.0-beta.2
[0.11.0]: https://github.com/chakra-ui/ark/releases/tag/@ark-ui/react@0.11.0

```

```

[0.12.0]: https://github.com/chakra-ui/ark/releases/tag/@ark-ui/react@0.12.0
[0.13.0]: https://github.com/chakra-ui/ark/releases/tag/@ark-ui/react@0.13.0
[0.13.1]: https://github.com/chakra-ui/ark/releases/tag/@ark-ui/react@0.13.1
[0.14.0]: https://github.com/chakra-ui/ark/releases/tag/@ark-ui/react@0.14.0
[0.15.0-beta.0]: https://github.com/chakra-ui/ark/releases/tag/@ark-ui/react@0.15.0-beta.0
[0.15.0]: https://github.com/chakra-ui/ark/releases/tag/@ark-ui/react@0.15.0

```

```
