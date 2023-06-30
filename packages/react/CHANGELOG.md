---
id: changelog
name: Changelog
description: All notable changes to this project will be documented in this file. The format is based on Keep a Changelog and this project adheres to and this project adheres to Semantic Versioning.
---

## [Unreleased]

## [0.7.2] - 2023-06-30

## Fixed

- Resolved an issue that types accross various components were not being exported correctly.

## [0.7.1] - 2023-06-27

### Added

- Support for standalone component imports: Developers can now import individual components, such as `@ark-ui/react/tabs` instead of the full `@ark-ui/react` package. This is a significant feature for those working with bundlers that do not support tree-shaking. By allowing imports of individual components, we ensure a reduced bundle size when the full package import is not necessary.

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

[unreleased]: https://github.com/chakra-ui/ark/compare/@ark-ui/react@0.7.2...HEAD
[0.1.0]: https://github.com/chakra-ui/ark/releases/tag/@ark-ui/react@0.1.0
[0.2.0]: https://github.com/chakra-ui/ark/releases/tag/@ark-ui/react@0.2.0
[0.3.0]: https://github.com/chakra-ui/ark/releases/tag/@ark-ui/react@0.3.0
[0.4.0]: https://github.com/chakra-ui/ark/releases/tag/@ark-ui/react@0.4.0
[0.5.0]: https://github.com/chakra-ui/ark/releases/tag/@ark-ui/react@0.5.0
[0.6.0]: https://github.com/chakra-ui/ark/releases/tag/@ark-ui/react@0.6.0
[0.7.0]: https://github.com/chakra-ui/ark/releases/tag/@ark-ui/react@0.7.0
[0.7.1]: https://github.com/chakra-ui/ark/releases/tag/@ark-ui/react@0.7.1

[0.7.2]: https://github.com/chakra-ui/ark/releases/tag/@ark-ui/react@0.7.2
