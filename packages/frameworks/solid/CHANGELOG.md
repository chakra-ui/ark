---
id: changelog
name: Changelog
description: All notable changes to this project will be documented in this file.
---

## [Unreleased]

### Fixed

- Resolved an issue where the `Dialog` component would not animate on exit.
- Resolved various issues for `Menu` when lazy mounted.

## [1.0.0] - 2023-11-09

We are happy to announce the release of `@ark-ui/solid@1.0.0`. This release includes a number of breaking changes, new features, and bug fixes. Since our last release over two months ago, we will only highlight some key changes. Please refer to the documentation for each component to learn more.

### Highlights

- Revised the `Presence` component: `lazyMount` and `unmountOnExit` have been added at the root level. For some disclosure components like `Tabs` and `Accordion`, this constitutes a breaking change.
- Breaking changes have been implemented in `Accordion`, `ColorPicker`, `DatePicker`, `Dialog`, `RadioGroup`, `SegmentGroup`, `TagsInput`, `Toast`, and `ToggleGroup` to achieve a consistent and more intuitive API.
- Resolved various bugs and addressed accessibility issues across all components.

### Stability and Support

With the release of version 1.0.0, we are moving towards a more stable version of `@ark-ui/solid`. Future updates will strive to avoid breaking changes, ensuring a smoother experience for our users. If you encounter any issues while upgrading, please do not hesitate to open an issue on our [GitHub repository](https://github.com/chakra-ui/ark/issues). Your feedback is invaluable in helping us improve.

## [0.11.0] - 2023-09-08

### Added

- Added `Presence` component
- To improve performance and reduce initial load times, we've introduced two new properties to the `AccordionContent`, `ComboboxContent`, `DialogBackdrop`, `DialogContent`, `HoverCardContent`, `MenuContent`, `PopoverContent`, `SelectContent`, and `TooltipContent` components. The `lazyMount` property allows for on-demand rendering of content, while the `unmountOnExit` property enables the removal of the component from the DOM once it's no longer required, ensuring better resource management and cleaner code.

### Fixed

- Resolved an issue where the `ark` factory was not exported correctly.

## [0.10.1] - 2023-09-02

### Fixed

- Resolved an issue where the `ColorPicker` was not exported correctly.

## [0.10.0] - 2023-09-02

### Addded

- Added `DatePickerPositioner` component to the `DatePicker` component to help with positioning the calendar.
- Added `ComboboxOptionGroupLabel` to the `Combobox` component. This component can be used to render a label for a group of options in the `ComboboxOptionGroup` component.
- Exposed `ark` factory function.

### Changed

- BREAKING: Renamed `NumberInputField` to `NumberInputInput` to match the naming convention of other input components.
- BREAKING: Renamed `PinInputField` to `PinInputInput` to match the naming convention of other input components.
- BREAKING: Renamed `TagsInputField` to `TagsInputInput` to match the naming convention of other input components.
- BREAKING: Renamed `SegmentIndicator` to `SegmentGroupIndicator` to match the naming convention of other components.

### Removed

- BREAKING: Removed `CheckboxInput`. This component is no longer required.
- BREAKING: Removed `RadioInput`. This component is no longer required.
- BREAKING: Removed `SegmentInput`. This component is no longer required.

### Fixed

- Added missing exports for `ColorPicker`.

## [0.9.0] - 2023-08-06

### Added

- Enhanced `Carousel` component: Introduced `CarouselIndicator` and `CarouselIndicatorGroup` components. These sub-components offer finer control over the carousel navigation, enabling users to directly access desired carousel slides.
- Expose `use<X>Context` for all components that use context.
- Added `ComboboxOptionGroup` and `ComboboxClearTrigger` components to the `Combobox` component.
- Developers can now set default options for all `Toast` components in their application, ensuring a consistent look and feel across the board.

## [0.8.1] - 2023-07-10

### Fixed

- Resolved an issue whre the `Toast` component would not render custom content.
- Fixed an issue where standalone imports were not working as expected.

## [0.8.0] - 2023-07-06

### Added

- Added support for `SSR`

### Fixed

- Resolved an issue where the `SegmentGroup` component would not animate on the first click.

## [0.7.1] - 2023-06-30

### Fixed

- Resolved an issue that types accross various components were not being exported correctly.

## [0.7.0] - 2023-06-27

### Added

- Added `Avatar`
- Added `SegmentGroup`
- Support for standalone component imports: Developers can now import individual components, such as `@ark-ui/solid/tabs` instead of the full `@ark-ui/solid` package. This is a significant feature for those working with bundlers that do not support tree-shaking. By allowing imports of individual components, we ensure a reduced bundle size when the full package import is not necessary.

## [0.6.0] - 2023-06-03

### Added

- Added `DatePicker` component
- Introduced the `onLongPress` property to `Pressable`

### Changed

- Exposed direct access to the `Splitter` component's internal API, enabling more control over the component's state.
- Updated all `@zag-js` dependencies to their latest versions

## [0.5.0] - 2023-05-25

### Removed

- Removed `AccordionIcon`

## [0.4.0] - 2023-05-23

### Added

- Add `Switch`

### Changed

- Update `Checkbox`. Control `indeterminate` state in `checked` prop

## [0.3.0] - 2023-05-11

### Added

- Add support for `asChild`

## [0.2.0] - 2023-04-29

### Added

- Add `ColorPicker`

### Fixed

- Add missing exports for `RangeSlider`, `Splitter` and `Toast`

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

[unreleased]: https://github.com/chakra-ui/ark/compare/@ark-ui/solid@0.11.0...HEAD
[0.1.0]: https://github.com/chakra-ui/ark/releases/tag/@ark-ui/solid@0.1.0
[0.2.0]: https://github.com/chakra-ui/ark/releases/tag/@ark-ui/solid@0.2.0
[0.3.0]: https://github.com/chakra-ui/ark/releases/tag/@ark-ui/solid@0.3.0
[0.4.0]: https://github.com/chakra-ui/ark/releases/tag/@ark-ui/solid@0.4.0
[0.5.0]: https://github.com/chakra-ui/ark/releases/tag/@ark-ui/solid@0.5.0
[0.6.0]: https://github.com/chakra-ui/ark/releases/tag/@ark-ui/solid@0.6.0
[0.7.0]: https://github.com/chakra-ui/ark/releases/tag/@ark-ui/solid@0.7.0
[0.7.1]: https://github.com/chakra-ui/ark/releases/tag/@ark-ui/solid@0.7.1
[0.8.0]: https://github.com/chakra-ui/ark/releases/tag/@ark-ui/solid@0.8.0
[0.8.1]: https://github.com/chakra-ui/ark/releases/tag/@ark-ui/solid@0.8.1
[0.9.0]: https://github.com/chakra-ui/ark/releases/tag/@ark-ui/solid@0.9.0
[0.10.0]: https://github.com/chakra-ui/ark/releases/tag/@ark-ui/solid@0.10.0
[0.10.1]: https://github.com/chakra-ui/ark/releases/tag/@ark-ui/solid@0.10.1
[0.11.0]: https://github.com/chakra-ui/ark/releases/tag/@ark-ui/solid@0.11.0
