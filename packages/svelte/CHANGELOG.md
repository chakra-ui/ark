---
id: changelog
title: Changelog
description: All notable changes will be documented in this file.
---

## [Unreleased]

### Fixed

- **Tree View**: Exported `TreeViewNodeState` and `TreeViewNodeProps` types from `@zag-js/tree-view`

- **Collection**: Export `CollectionOptions`, `TreeCollectionOptions`, `GridCollectionOptions` types.

- **Carousel**

  - Fix issue where focusing on carousel region and navigating with keyboard doesn't work as expected
  - Fix issue when `allowMouseDrag` is set where carousel no longer snaps after mouse interaction

- **Combobox**: Fix issue where `onInputValueChange` doesn't get called when `autoFocus` is set to `true`

- **Slider**: Fix issue where slider could throw a error when rendered in an popover or dialog

- **Tour**: Fix issue where calling `api.start(<id>)` with a step id doesn't work as expected

- **Svelte**: Improve reactivity when events don't trigger a state transition

### Changed

- Replaced custom ID generator with `$props.id()` rune.

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
