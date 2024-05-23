---
id: changelog
title: Changelog
description: All notable changes will be documented in this file.
---

## [Unreleased]

### Highlights

We are excited to announce the first major release of Ark UI Vue! Ark UI Vue is now feature-complete
and ready for production use.

To maintain consistency across our suite, we have aligned the versioning of all Ark UI packages.
Therefore, the next release of Ark UI Vue will be v3.

This update introduces several new components, enhancements, and bug fixes. Here are some of the
highlights:

### Added

- **Context Components:** Introduced the `Context` component for easier access to internal machine
  APIs, improving component composition. See the example below:

```vue
<template>
  <Popover.Root>
    <Popover.Trigger>Open</Popover.Trigger>
    <Popover.Positioner>
      <Popover.Context v-slot="popover">
        <Popover.Content>
          <Popover.Title @click="popover.setOpen(false)">Title</Popover.Title>
          <Popover.Description>Description</Popover.Description>
        </Popover.Content>
      </Popover.Context>
    </Popover.Positioner>
  </Popover.Root>
</template>
```

- **Format:** Added a `Format` component for formatting bytes and numbers.

```vue
<Format.Byte :value="120904" unit="byte" unit-display="short" />
<Format.Number :value="1204" unit="centimeter" />
```

- **Tooltip:** Added `defaultOpen` prop for cases where you do not need to control its open state.
- **Types:** Exported `Assign` and `Optional` types to enhance type handling.
- **Toast:** Added support for overlapping and stacked toast.

### Changed

- **[BREAKING]:** Exposed hidden inputs in `Checkbox`, `ColorPicker`, `FileUpload`, `PinInput`,
  `RatingGroup`, `Select`, `Switch`, and `TagsInput` for better form library compatibility. Please
  ensure to include the hidden input in your component as shown below:

```jsx
<Checkbox.Root>
  <Checkbox.Label>Checkbox</Checkbox.Label>
  <Checkbox.Control>
    <Checkbox.Indicator>
      <CheckIcon />
    </Checkbox.Indicator>
  </Checkbox.Control>
  <Checkbox.HiddenInput /> <!-- [!code highlight] -->
</Checkbox.Root>
```

- **[BREAKING] Combobox, Select:** Made `id` optional and removed `htmlFor` from `ItemGroupLabel`
  for cleaner markup.

```diff
- <Combobox.ItemGroup id="framework">
-   <Combobox.ItemGroupLabel htmlFor="framework">Frameworks</Combobox.ItemGroupLabel>
+ <Combobox.ItemGroup>
+   <Combobox.ItemGroupLabel>Frameworks</Combobox.ItemGroupLabel>
```

- **[BREAKING] Popover, Tooltip:** Renamed `closeOnEsc` to `closeOnEscape` to be consistent with
  dialog machine.
- **[BREAKING] Environment:** Renamed `Environment` to `EnvironmentProvider` to align with other
  providers.

### Fixed

- **DatePicker:** Resolved issues with `min` and `max` props not supporting date strings.
- **Accordion:** Fixed initial flicker of content.
- **TagsInput:** Replaced `HTMLInputElement` with `HTMLDivElement` in `TagsInput.Root`.

### Removed

- **[BREAKING]:** Dropped direct internal API access from Root components. Use the new `Context`
  component for more flexible and cleaner API integration.
- **[BREAKING]:** Simplified component APIs by removing `dir` and `getRootNode` attributes. Use
  [LocaleProvider](https://ark-ui.com/docs/vue/providers/environment) and
  [EnvironmentProvider](https://ark-ui.com/docs/vue/providers/locale) for these settings.

## [1.0.0-7] - 2024-05-23

### Added

- Added `HTMLAttributes` to all component props to allow for better integration with TypeScript.

## [1.0.0-6] - 2024-05-22

### Added

- Exported `Assign` and `Optional` types.

### Changed

- Renamed `Environment` to `EnvironmentProvider` for consistency with other providers.

## [1.0.0-5] - 2024-05-15

### Fixed

- Fixed initial flicker of `Accordion` content

### Changed

- Integrated latest `@zag-js`

## [1.0.0-4] - 2024-05-02

### Fixed

- Added missing `dom-query` dependency

## [1.0.0-3] - 2024-05-02

### Changed

- Exposed hidden inputs for various components like `Checkbox`, `RadioGroup`, `PinInput`,
  `TagsInput`, and `NumberInput` to allow for better integration with form libraries.

## [1.0.0-2] - 2024-04-29

### Added

- Integrated latest zag-js version

### Fixed

- Resolved type issues

## [1.0.0-1] - 2024-04-29

### Removed

- BREAKING: Removed `dir` and `getRootNode` from all components. Use `Locale` and `Environment` to
  set the direction and root node.

### Added

- Integrate `Collapsible` component with `Accordion` component

### Changed

- Made the `id` attribute optional for `<Combobox.ItemGroup>` and removed `htmlFor` from
  `<Combobox.ItemGroupLabel>`.

```diff
- <Combobox.ItemGroup id="framework">
-   <Combobox.ItemGroupLabel htmlFor="framework">Frameworks</Combobox.ItemGroupLabel>
+ <Combobox.ItemGroup>
+   <Combobox.ItemGroupLabel>Frameworks</Combobox.ItemGroupLabel>
```

- Made the `id` attribute optional for `<Select.ItemGroup>` and removed `htmlFor` from
  `<Select.ItemGroupLabel>`.

```diff
- <Select.ItemGroup id="framework">
-   <Select.ItemGroupLabel htmlFor="framework">Frameworks</Select.ItemGroupLabel>
+ <Select.ItemGroup>
+   <Select.ItemGroupLabel>Frameworks</Select.ItemGroupLabel>
```

## [1.0.0-0] - 2024-04-19

### Added

- Added a `Context` component to allow access to the internal machine API. Previously, it was only
  possible to access the internal API at the root level, which is manageable for small components
  but could lead to cumbersome composition in larger components. Additionally, this pattern clashed
  with the `asChild` composition pattern we use.

```vue
<template>
  <Popover.Root>
    <Popover.Trigger>Open</Popover.Trigger>
    <Popover.Positioner>
      <Popover.Context v-slot="popover">
        <Popover.Content>
          <Popover.Title @click="() => popover.close()">Title</Popover.Title>
          <Popover.Description>Description</Popover.Description>
        </Popover.Content>
      </Popover.Context>
    </Popover.Positioner>
  </Popover.Root>
</template>
```

- Added `Format` and `Collapsible` component
- Add an optional `index` prop to the `DatePicker.Input` to support multiple inputs.
- Add the `DatePicker.PresetTrigger` component
- Improve a controlled state in `ColorPicker`, `DatePicker`, `Dialog`, `HoverCard`, `Menu`,
  `Popover`, `Select`, and `Tooltip` components
- Added `defaultOpen` to `Tooltip`

### Changed

- Changed `TreeView.BranchTrigger` from `button` to `div` for the accessibility reasons.

### Fixed

- Prevent calling interaction outside when scrollbar is clicked.
- Fix issue where positioned components don't respond to window resizing.
- Fix issue where restoring scroll causes a smooth scroll transition back to the initial scroll
  point.
- Fix issue in `Combobox`, `Menu`, and `Select` where scrolling into view could result in scrolling
  the body element.
- Fix issue where `DatePicker` does not show correct number of weeks when `startOfWeek` is set
- Fix issue in the `Editable` where cannot delete text when `maxLength` reached
- Fix issue in the `Select` where item group's label `id` pointed to the wrong element
- Fix issue where `Select` uses the incorrect `id` for `aria-activedecesendant` field
- Resolved an issue in `DatePicker` where the `min` and `max` props did not support date string
  values
- Fix issue where close animation doesn't work for components that use the `presence` component.

### Removed

- Removed the unused `parse` prop from the `DatePicker` component.

## [0.11.0] - 2024-02-08

### Added

- Added `TreeView` component
- Updated `@zag-js` dependencies to their latest versions, enhancing performance for all components.
- Exported `SelectionDetails` type for `Menu` component

### Changed

- **Breaking Change**: Renamed the root types for all components to `<ComponentName>RootProps`. Like
  shown for the `Avatar` component below:

```diff
- import type { AvatarProps } from "@ark-ui/vue"
+ import type { AvatarRootProps } from "@ark-ui/vue"
```

- **Breaking Change**: Removed the `.Root` suffix for provider component like `Presence` and
  `Environment`.

```diff
- <Presence.Root>...</Presence.Root>
+ <Presence>...</Presence>
```

- **Breaking Change**: Renamed the `indicator` part to `view` in the `Progress` component to more
  accurately reflect its functionality.

- Added the `ItemPreview` component to the `TagsInput` component. See the example below:

```diff
<TagsInput.Item key={index} index={index} value={value}>
+  <TagsInput.ItemPreview>
    <TagsInput.ItemText>{value}</TagsInput.ItemText>
    <TagsInput.ItemDeleteTrigger>Delete</TagsInput.ItemDeleteTrigger>
+ </TagsInput.ItemPreview>
  <TagsInput.ItemInput />
</TagsInput.Item>
```

- Changed `Dialog.Description` and `Popover.Description` from `p` to `div` to allow for multiple
  paragraphs.

### Fixed

- Added the missing `minStepsBetweenThumbs` prop to `Slider` component.
- Fixed an issue where emitted event caused "not declared" warning
- Fixed an issue on touch devices where selecting an item within `Combobox`, `Menu`, or `Select`
  triggered a click event on the element behind the portalled content.
- Fixed an issue in `PinInput` where pasting a value filled all inputs instead of populating them
  one per input.
- Fix issue where `Select` component submits its first option when used in a form, even if there is
  no value selected.

## [0.10.0] - 2024-01-17

### Added

- Added `DatePicker` component
- Added `Progress` component
- Added `v-model:checked` for `Checkbox` component
- Added `v-model:open` for `Dialog` component
- Added `v-model:open` for `HoverCard` component
- Added `v-model:open` for `Popover` component
- Added `valueAsString` to `onValueChange` in `DatePicker` callback details
- Exported change details typings, for example `AccordionValueChangeDetails` or
  `DialogOpenChangeDetails`

### Changed

- Changed `ColorPicker.Swatch` tag from `button` to `div`
- Changed `Combobox.ItemText` type from `button` to `span`
- Changed `Combobox.Positioner` tag from `ul` to `div`
- Changed `Popover.Description` tag from `div` to `p`
- Rewritten all components `defineComponent` to Function Signature
- Rewritten all components underlying Presence logic
- Revised `Dialog` component stories and tests
- Revised `HoverCard` component stories and tests
- Revised `Menu` component
- Revised `Popover` component stories and tests
- Revised `Select` component stories and types
- Revised `Splitter` component
- Revised `Tooltip` component
- Revised `Tabs` component types
- Revised `TagsInput` component
- Revised `Toast` component
- Revised `ToggleGroup` component
- Replaced the styling props for indicator with CSS variables in `RadioGroup`, `SegmentGroup`, and
  `Tabs`.

### Fixed

- Added a missing slot with machine api in `Splitter` component
- Added a missing slot with machine api in `Tabs` component
- Added a missing slot with machine api in `Tooltip` component
- Added missing emits in `Dialog` component
- Added missing emits in `Presence` component
- Added missing emits in `Slider` component
- Fixed `Dialog.Trigger` aria-controls bug
- Fixed `Menu.Trigger` aria-controls bug
- Fixed `Popover.Trigger` aria-controls bug
- Fixed `Toast` component render bugs
- Fixed lazy mounting in `Accordion` component
- Fixed lazy mounting in `ColorPicker` component
- Fixed lazy mounting in `Combobox` component
- Fixed lazy mounting in `HoverCard` component
- Fixed lazy mounting in `Menu` component
- Fixed lazy mounting in `Popover` component
- Fixed lazy mounting in `Tabs` component
- Fixed multiple rerenders on `Select` component using search params
- Fixed the issue where setting `disabled` on `Combobox` does not reflect in combobox item
- Fix an issue that breaks the `Combobox` when clicking on the input while the menu is open
- Fixed the issue where `DatePicker` initial value isn't set when using controlled context
- Resolved an issue where `Tooltip` component would not handle open control state
- Resolved an issue that `Menu` option item could not be activated by keyboard

## [0.9.0] - 2023-12-14

### Added

- Added `FileUpload` component
- Added `SegmentGroup` component
- Added `ToggleGroup` component
- Added `ValueText` to the `ColorPicker` component
- Added support to lazy mount the `ColorPicker` component using the `Presence` component
- Added entrypoint for the `ark` factory at `@ark-ui/react/factory`

### Changed

- Revised `Accordion` component
- Revised `Avatar` component
- Revised `Carousel` component
- Revised `Checkbox` component
- Revised `ColorPicker` component
- Revised `Combobox` component
- Revised `Editable` component
- Revised `NumberInput` component
- Revised `Pagination` component
- Revised `PinInput` component
- Revised `RadioGroup` component
- Revised `RatingGroup` component
- Revised `Select` component
- Revised `Switch` component

### Fixed

- Resolved an issue where the `Accordion` component would not render its content.
- Resolved an accessibility issue with `Select`

### Removed

- Removed anatomy exports. These exports are now available in `@ark-ui/anatomy`.

```tsx
// before
import { accordionAnatomy } from '@ark-ui/vue'
// after
import { accordionAnatomy } from '@ark-ui/anatomy' // or
import { anatomy } from '@ark-ui/anatomy/accordion'
```

- Removed `Pressable` component

## [0.8.0] - 2023-09-08

### Added

- Added `Avatar` component
- Added `Switch` component
- Added `Presence` component
- To improve performance and reduce initial load times, we've introduced two new properties to the
  `AccordionContent`, `ComboboxContent`, `DialogBackdrop`, `DialogContent`, `HoverCardContent`,
  `MenuContent`, `PopoverContent`, `SelectContent`, and `TooltipContent` components. The `lazyMount`
  property allows for on-demand rendering of content, while the `unmountOnExit` property enables the
  removal of the component from the DOM once it's no longer required, ensuring better resource
  management and cleaner code.

### Changed

- Revised `Accordion` component
- Revised `Carousel` component
- Revised `ColorPicker` component
- Revised `NumberInput` component
- Revised `HoverCard` component
- Revised `Pagination` component
- Revised `RangeSlider` component
- Revised `Slider` component
- Revised `Splitter` component
- Revised `Tabs` component
- Revised `Tooltip` component

## [0.7.0] - 2023-09-01

### Added

- Added `ComboboxOptionGroupLabel` to the `Combobox` component. This component can be used to render
  a label for a group of options in the `ComboboxOptionGroup` component.

### Changed

- BREAKING: Renamed `NumberInputField` to `NumberInputInput` to match the naming convention of other
  input components.
- BREAKING: Renamed `PinInputField` to `PinInputInput` to match the naming convention of other input
  components.
- BREAKING: Renamed `TagsInputField` to `TagsInputInput` to match the naming convention of other
  input components.

### Removed

- BREAKING: Removed `CheckboxInput`. This component is no longer required.
- BREAKING: Removed `RadioInput`. This component is no longer required.

### Fixed

- Fixed a bug in the `CarouselControl` component where it was returning a function instead of the
  expected component.

## [0.6.0] - 2023-08-06

### Added

- Enhanced `Carousel` component: Introduced `CarouselIndicator` and `CarouselIndicatorGroup`
  components. These sub-components offer finer control over the carousel navigation, enabling users
  to directly access desired carousel slides.
- Expose `use<X>Context` for all components that use context.
- Developers can now set default options for all `Toast` components in their application, ensuring a
  consistent look and feel across the board.
- Added `ComboboxOptionGroup` and `ComboboxClearTrigger` components to the `Combobox` component.

## [0.5.3] - 2023-07-10

### Fixed

- Resolved an issue whre the `Toast` component would not render custom content.
- Fixed an issue where standalone imports were not working as expected.
- Resolved an issue where the `SegmentGroup` component would not animate on the first click.

## [0.5.2] - 2023-06-27

### Added

- Support for standalone component imports: Developers can now import individual components, such as
  `@ark-ui/vue/tabs` instead of the full `@ark-ui/vue` package. This is a significant feature for
  those working with bundlers that do not support tree-shaking. By allowing imports of individual
  components, we ensure a reduced bundle size when the full package import is not necessary.

### Fixed

- Added missing `onOpen` events for `Dialog`

## [0.5.1] - 2023-06-20

### Fixed

- Fixed an issue where `TagsInput` was not exported
- Fixed an issue where `CarouselNextSliderTrigger` and `CarouselPrevSlideTrigger` weren't rendered
  correctly

## [0.5.0] - 2023-06-03

### Added

- Introduced the `onLongPress` property to `Pressable`

### Changed

- Updated all `@zag-js` dependencies to their latest versions

## [0.4.0] - 2023-05-25

### Removed

- Removed `AccordionIcon`

### Fixed

- Fixed a bug where `Toast` and `Environment` weren't exported

## [0.3.0] - 2023-05-23

### Added

- Add `Carousel`
- Add `Environment`
- Add `Toast`
- Add support for `asChild`

### Changed

- Update `Checkbox`. Control `indeterminate` state in `checked` prop

## [0.2.1] - 2023-05-11

### Fixed

- Fix `Dialog` component: apply two-way binding to `open` prop

## [0.2.0] - 2023-04-29

### Added

- Add `ColorPicker`
- Add `TagsInput`

## [0.1.0] - 2023-04-17

### Added

- Add `Accordion`
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
- Add `Tooltip`
