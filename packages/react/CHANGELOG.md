---
id: changelog
title: Changelog
description: All notable changes will be documented in this file.
---

## [Unreleased]

### Changed

- **Progress**: Updated `Progress.ValueText` to render percentage as string.

### Fixed

- **Field**:

  - Fixed SSR warning related to `useLayoutEffect` usage.
  - Fixed issue where id of field parts could not be customized, breaking Zag.js composition.
  - Added `data-*` attributes to control part to allow for better styling.

- **Select**: Fixed reactivity issues when `items` and `value` are updated.

## [3.6.2] - 2024-07-28

### Changed

- **DatePicker**: Added support for `index` in `getLabelProps`.

### Fixed

- **DatePicker**:
  - Fixed issue where the selected date doesn't reflect in the input when clicking the trigger and
    then focusing the input.
  - Fixed SSR issue when using `getPresetTrigger`.
- **Slider**: Fixed issue where `onValueChangeEnd` was called with an incorrect value.
- Fixed an import issue with `@internationalized/date`.

## [3.6.1] - 2024-07-26

### Changed

- **Highlight**:
  - Enabled import from `@ark-ui/react/highlight`.
  - Exported `HighlightChunk` type to enhance type inference in userland code.

### Fixed

- **Select**: Fixed `HiddenSelect` to correctly emit values when a simple string array is used as
  the `value` for the `Select` component.

## [3.6.0] - 2024-07-25

### Added

- **Fieldset Component**: Introduced to help group form fields.

```jsx
<Fieldset.Root>
  <Fieldset.Legend>Legend</Fieldset.Legend>
  <Fieldset.HelperText>Helper text</Fieldset.HelperText>
  <Fieldset.ErrorText>Error text</Fieldset.ErrorText>
</Fieldset.Root>
```

Learn more in the [documentation](https://ark-ui.com/docs/react/components/fieldset).

- **Highlight Component**: Added to highlight text based on a query.

```jsx
import { Highlight } from '@ark-ui/react'

export const App = () => (
  <Highlight
    query={['Ark UI', 'exclusive examples']}
    text="Unlock exclusive examples and support the development by getting Ark UI Plus."
  />
)
```

- **Tooltip**: Added `closeOnClick` to control tooltip closure on trigger click.

### Changed

- **Toast**: Exported `CreateToasterReturn` type to improve type inference.
- **Combobox**: Enhanced accessibility by removing unnecessary `aria-selected` and `aria-disabled`
  attributes.

### Fixed

- **Toast**: Added missing `aria-labelledby` and `aria-describedby` attributes on the root element.
- **Combobox**: Fixed issue where the input didn't update on selection with a pointer.
- **RadioGroup**: Corrected misspelt `data-readonly` attribute.
- **Select**: Enabled customization of `closeOnSelect` when `multiple` is true.
- **Tags Input**:
  - Fixed issues with repeat pasting and undo.
  - Addressed problem where deleting a pasted value disabled further pasting.
  - Ensured values are always unique by discarding duplicates.

## [3.5.0] - 2024-06-30

### Added

- **All Components**: Exported each component's anatomy. For example:

  ```jsx
  import { avatarAnatomy } from '@ark-ui/react'
  ```

- **NumberInput**: Introduced the `ValueText` part to render the internal state value.
- **Checkbox**: Added the `name` prop to `Checkbox.Group` for setting names within the group.

### Fixed

- **TreeView**: Resolved an issue preventing input usage within the tree.
- **Progress**: Fixed a warning in `Circle` due to an incorrect `viewBox` attribute on the `<svg>`
  element.
- **Carousel**: Corrected looping behavior for next and previous buttons when both `slidesPerView`
  and `loop` are set.
- **Menu**: Fixed loss of position data in the context menu upon closing.

## [3.4.0] - 2024-06-25

### Added

- **Field**: Introduced the `Field` component for flexible form input, label, and helper text
  container.
- **All Components**: Exposed base props to simplify prop merging for library consumers, especially
  in CSS-in-JS environments.
  ```jsx
  export interface AccordionItemBaseProps extends ItemProps, PolymorphicProps {}
  export interface AccordionItemProps extends HTMLProps<'div'>, AccordionItemBaseProps {}
  ```
- **ColorPicker**: Added `SliderValueText`, `SliderLabel`, and `ValueSwatch` parts for enhanced
  customization.
- **Tooltip**: Introduced the `closeOnScroll` option to control whether the tooltip should close
  when the trigger's overflow parent scrolls.
- **Portal**: Added support for `Shadow DOM`.
- **Signature Pad**: Introduced `HiddenInput` to the `SignaturePad` component for better form
  library compatibility.

### Fixed

- **Menu**:
  - Resolved an issue causing sibling menus or popovers to malfunction on iOS devices.
  - Fixed a problem where the context menu trigger showed the magnifier and iOS context menu on long
    press.
  - Fixed an issue where `RadioOptionItem` did not provide the `checked` state in context.
- **Editable**: Fixed a bug where setting `activationMode` to `dblclick` unexpectedly cleared the
  input value.
- **Checkbox**: Added the missing `group` role for the Checkbox group component.
- **Progress**: Converted `Circle`, `CircleTrack`, and `CircleRange` components to use React's
  `forwardRef` for improved ref handling.
- **RootProvider**: Added the missing `RootProvider` for the `ColorPicker`, `NumberInput`,
  `RatingGroup`, `SegmentGroup`, and `ToggleGroup` components.

## [3.3.0] - 2024-06-12

### Added

- **Signature Pad**: Introduced the `SignaturePad` component for capturing signatures.
- **QR Code**: Added the `QRCode` component for generating QR codes.
- **CheckboxGroup**: Added the `CheckboxGroup` component for managing multiple checkboxes.
- **Presence**: Added support for `immediate` to synchronize presence changes immediately instead of
  deferring to the next tick.

### Fixed

- **TreeView**: Resolved an issue where the tree view state could be updated after setting
  `defaultSelectedValue` or `defaultExpandedValue`.
- **Popover, HoverCard**: Fixed an issue where `defaultOpen` did not work.
- **Tabs**: Resolved an issue where rapidly changing the selected tab could briefly show previous
  tab content.
- **FileUpload**: Fixed an issue where the `onFileAccept` event was triggered when deleting an item
  via the delete trigger.
- **Select**: Exported missing `SelectList` component.

## [3.2.1] - 2024-06-07

### Fixed

- **Combobox**: Exported missing `ComboboxList` component.

## [3.2.0] - 2024-06-06

### Added

- **All Components**: Introduced the `Provider` component for easier access to internal machine
  APIs, improving component composition. See the example below:

```tsx
import { Avatar, useAvatar } from '@ark-ui/react'

export const Provider = () => {
  const avatar = useAvatar({
    onStatusChange: (e) => console.log('status changed', e),
  })

  return (
    <Avatar.RootProvider value={avatar}>
      <Avatar.Fallback>PA</Avatar.Fallback>
      <Avatar.Image src="https://i.pravatar.cc/300" alt="avatar" />
    </Avatar.RootProvider>
  )
}
```

## [3.1.0] - 2024-06-04

### Added

- **Editable**: Supported `textarea` as the input element in edit mode.

### Fixed

- **Select**: Fixed an issue where changing the label of a collection item did not trigger a change
  event.
- **Popover**:
  - Implemented `autoFocus` to determine whether the popover should autofocus on open:
    - When `true`, the first focusable element or the content is focused.
    - When `false`, the content is focused.
  - Fixed an issue where the page scroll resets on opening the popover.

## [3.0.2] - 2024-05-29

### Fixed

- Added the missing `'use client'` annotation to the `Portal` component.
- Fixed an issue where the `keydown` event might not fire in React due to
  `nativeEvent.currentTarget` not being set consistently.

- **Avatar**: Improved image load check by using `naturalWidth` and `naturalHeight` instead of
  `currentSrc`.

## [3.0.2] - 2024-05-29

### Fixed

- Added the missing `'use client'` annotation to the `Portal` component.
- Fixed an issue where the `keydown` event might not fire in React due to
  `nativeEvent.currentTarget` not being set consistently.

- **Avatar**: Improved image load check by using `naturalWidth` and `naturalHeight` instead of
  `currentSrc`.

## [3.0.1] - 2024-05-27

### Fixed

- Added missing export for `HiddenInput` in `Slider`.
- Added missing export for `ItemHiddenInput` in `RadioGroup` and `SegmentGroup`.

## [3.0.0] - 2024-05-24

### Highlights

The 3.0 release brings significant enhancements and some breaking changes for a more streamlined and
flexible API. Key updates include new components and types, improved form integration, and forward
compatibility with React 19. Here are some of the highlights:

### Added

- **Context Components**: Introduced the `Context` component for easier access to internal machine
  APIs, improving component composition. See the example below:

```tsx
export const Basic = () => (
  <Popover.Root>
    <Popover.Trigger>Open</Popover.Trigger>
    <Popover.Positioner>
      <Popover.Context>
        {(popover) => (
          <Popover.Content>
            <Popover.Title onClick={() => popover.setOpen(false)}>Title</Popover.Title>
            <Popover.Description>Description</Popover.Description>
          </Popover.Content>
        )}
      </Popover.Context>
    </Popover.Positioner>
  </Popover.Root>
)
```

- **Format**: Added a `Format` component for formatting bytes and numbers.

```tsx
<Format.Byte value={120904} unit="byte" unitDisplay="short" />
<Format.Number value={1204} unit="centimeter" />
```

- **Tooltip**: Added `defaultOpen` prop for cases where you do not need to control its open state.
- **Types**: Exported `Assign` and `Optional` types to enhance type handling.
- **Toast**: Added support for overlapping and stacked toast.

- **[BREAKING]**: Exposed hidden inputs in `Checkbox`, `ColorPicker`, `FileUpload`, `PinInput`,
  `RadioGroup`, `RatingGroup`, `SegmentGroup`, `Select`, `Slider`, `Switch`, and `TagsInput` for
  better form library compatibility. Please ensure to include the hidden input in your component
  like shown below:

```tsx
<Checkbox.Root>
  <Checkbox.Label>Checkbox</Checkbox.Label>
  <Checkbox.Control>
    <Checkbox.Indicator>
      <CheckIcon />
    </Checkbox.Indicator>
  </Checkbox.Control>
  <Checkbox.HiddenInput /> // [!code highlight]
</Checkbox.Root>
```

- **[BREAKING] Combobox, Select**: Made `id` optional and removed `htmlFor` from `ItemGroupLabel`
  for cleaner markup.

```diff
- <Combobox.ItemGroup id="framework">
-   <Combobox.ItemGroupLabel htmlFor="framework">Frameworks</Combobox.ItemGroupLabel>
+ <Combobox.ItemGroup>
+   <Combobox.ItemGroupLabel>Frameworks</Combobox.ItemGroupLabel>
```

- **[BREAKING] Popover, Tooltip**: Renamed `closeOnEsc` to `closeOnEscape` to be consistent with
  dialog machine.
- **[BREAKING] Combobox, Menu, Select, Tabs, ToggleGroup**: Renamed `loop` to `loopFocus` to be more
  descriptive.
- **[BREAKING] Environment**: Renamed `Environment` to `EnvironmentProvider` to align with other
  providers.
- **React 19**: Improved the `ark` factory's forward compatibility with React 19 by supporting `ref`
  as a normal prop.

### Fixed

- **DatePicker**: Resolved issues with `min` and `max` props not supporting date strings.
- **Accordion**: Fixed initial flicker of content.
- **TagsInput**: Replaced `HTMLInputElement` with `HTMLDivElement` in `TagsInput.Root`.

### Removed

- **[BREAKING]**: Dropped direct internal API access from Root components. Use the new `Context`
  component for more flexible and cleaner API integration.
- **[BREAKING]**: Simplified component APIs by removing `dir` and `getRootNode` attributes. Use
  [LocaleProvider](https://ark-ui.com/react/docs/providers/environment) and
  [EnvironmentProvider](https://ark-ui.com/react/docs/providers/locale) for these settings.

## [2.2.3] - 2024-03-05

### Fixed

- Resolved an issue with using `Locale` in Next.js projects.
- Resolved an issue with `Toast` not updating its toasts and count properties when creating one or
  more toasts.

## [2.2.2] - 2024-02-27

### Fixed

- Resolved an issue that a disabled `Accordion.Item` could still be opened.

## [2.2.1] - 2024-02-27

- Updated to latest `@ark-ui/anatomy` version.

## [2.2.0] - 2024-02-27

### Added

- Added `Collapsible` component.
- Added support for `defaultExpandedIds` in the `TreeView` component.

- Enhanced the performance of the Ark `factory` by utilizing `memo` to avoid unnecessary re-renders.
- Integrated `Collapsible` into `Accordion`, allowing the `Accordion` component to utilize
  `Collapsible` for animating the opening and closing of content.d

```css
@keyframes slideDown {
  from {
    height: 0;
  }
  to {
    height: var(--height);
  }
}

@keyframes slideUp {
  from {
    height: var(--height);
  }
  to {
    height: 0;
  }
}

[data-scope='accordion'][data-part='item-content'][data-state='open'] {
  animation: slideDown 250ms;
}

[data-scope='accordion'][data-part='item-content'][data-state='closed'] {
  animation: slideUp 200ms;
}
```

### Fixed

- Updated the return type of `createToaster` for comprehensive IntelliSense support when styling the
  `Toaster` component.
- Revised `TreeView` to utilize `defaultSelectedIds` instead of `defaultFocusedId`.
- Resolved an issue with using `factory` in Next.js projects.
- Fixed a bug where the disabled `Tooltip` would flash upon hovering and clicking the trigger.

## [2.1.1] - 2024-02-14

### Fixed

- Resolved an issue where the `Clipboard` component was missing a specifier in the `@ark-ui/react`
  package.

## [2.1.0] - 2024-02-14

### Added

- Introduced `Clipboard` component. Refer to the
  [documentation](https://ark-ui.com/docs/components/clipboard) for details.
- Implemented programmable control over the open state for `ColorPicker`, `DatePicker`, `Dialog`,
  `HoverCard`, `Menu`, `Popover`, `Select`, and `Tooltip`.
- Added a `PresetTrigger` part to the `DatePicker` component, enabling custom triggers for common
  date presets (e.g., Last 7 days, Last 30 days).
- Enhanced the `DatePicker.Control` component to support multiple inputs by introducing an optional
  `index` attribute to `DatePicker.Input`. Example usage:

```jsx
<DatePicker.Control>
  <DatePicker.Input index={0} />
  <DatePicker.Input index={1} />
</DatePicker.Control>
```

- Refined the `TreeView` component API for streamlined component usage. See the
  [documentation](https://ark-ui.com/docs/components/tree-view) for details.

### Fixed

- Resolved unintentional interactions when clicking the scrollbar.
- Addressed an issue where positioned components failed to adjust to window resizing.
- Corrected a behavior where restoring scroll position triggered a smooth scroll effect back to the
  starting point.
- Rectified a problem in `Combobox`, `Menu`, and `Select` where scrolling into view inadvertently
  scrolled the body element.
- Fixed a discrepancy in `DatePicker` regarding the incorrect display of weeks when setting
  `startOfWeek`.
- Solved an issue in the `Editable` preventing text deletion upon reaching `maxLength`.
- Corrected an issue in the `Select` where an item group's label `id` was misdirected.
- Adjusted `Select` to use the correct `id` for the `aria-activedescendant` attribute.

## [2.0.2] - 2024-02-10

### Added

- Exported `SelectionDetails` type for the `Menu` component.

- Updated `Dialog.Description` and `Popover.Description` elements from `p` to `div` for better
  paragraph handling.
- Altered `TreeView.BranchTrigger` element from `button` to `div` for accessibility enhancements.

### Fixed

- Fix issue where `@types/react@18.2.8` broke current typings in `Portal`
- Fix issue where `Select` component submits its first option when used in a form, even if there is
  no value selected.

## [2.0.1] - 2024-01-30

### Fixed

- Resolved an issue that for some components the types were not being generated correctly.

## [2.0.0] - 2024-01-30

### Added

- Added `TreeView` component
- Updated `@zag-js` dependencies to their latest versions, enhancing performance for all components.

- **Breaking Change**: Renamed the root types for all components to `<ComponentName>RootProps`. Like
  shown for the `Avatar` component below:

```diff
- import type { AvatarProps } from "@ark-ui/react"
+ import type { AvatarRootProps } from "@ark-ui/react"
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

- Refactored the `Progress` component to use `div` elements instead of `nav` for semantic
  correctness.

### Fixed

- Fixed an issue on touch devices where selecting an item within `Combobox`, `Menu`, or `Select`
  triggered a click event on the element behind the portalled content.
- Fixed an issue in `PinInput` where pasting a value filled all inputs instead of populating them
  one per input.

## [1.3.0] - 2024-01-17

### Added

- Added the `Progress` component.
- Added `valueAsString` to `onValueChange` in `DatePicker` callback details
- Exported change details typings, for example `AccordionValueChangeDetails` or
  `DialogOpenChangeDetails`
- Redesign `Portal` component to support `getRootNode` and `disabled` props

- Replaced the styling props for indicator with CSS variables in `RadioGroup`, `SegmentGroup`, and
  `Tabs`.

### Fixed

- Added missing `placeholder` prop to `SelectValueTextProps` type.
- Fixed the issue where setting `disabled` on `Combobox` does not reflect in combobox item
- Fix an issue that breaks the `Combobox` when clicking on the input while the menu is open
- Fixed the issue where `DatePicker` initial value isn't set when using controlled context
- Resolved an issue that `Menu` option item could not be activated by keyboard

## [1.2.1] - 2023-12-13

### Fixed

- Resolved an issue where the `ark` factory type was not being exported correctly.

## [1.2.0] - 2023-12-13

### Added

- Added the `ToastGroup` component.
- Added entrypoint for the `ark` factory at `@ark-ui/react/factory`

- Revised the `FileUpload` component. Check out the
  [documentation](https://ark-ui.com/docs/components/file-upload) for more information.

### Fixed

- Added an explicit return type for the `Portal` component to resolve an issue with online code
  editors.
- Resolved an issue where the `present` prop in the disclosure-type component was not being
  respected.
- Resolved an issue where the `ark` function would log a warning when the `asChild` prop was set to
  `false`.
- Fixed an issue where keyboard interactions within a submenu would bubble up to the parent `Menu`.
- Fixed an issue with hydration mismatch in the `Portal` component.

## [1.1.0] - 2023-11-21

### Added

- Added render function to the `NumberInput` component
- Added `FileUpload` component

- Revised the `ColorPicker` component. Check out the
  [documentation](https://ark-ui.com/docs/components/color-picker) for more information.

### Fixed

- Resolved an issue where the `Toast` component would throw a warning when multiple toasts were
  rendered at the same time.

## [1.0.1] - 2023-11-10

### Fixed

- Resolved an issue where the `Dialog` component would not animate on exit.
- Resolved various issues for `Menu` when lazy mounted.
- Resolved an issue where `MenuTrigger` could still work even when disabled.
- Resolved an issue where components like `Dialog`, `Popover` etc would not invoke `onExitComplete`
- Fixed an issue where placement of the `Combobox` could be incorrect when lazy mounted.

## [1.0.0] - 2023-11-09

We are happy to announce the release of `@ark-ui/react@1.0.0`. This release includes a number of
breaking changes, new features, and bug fixes. Since our last release over two months ago, we will
only highlight some key changes. Please refer to the documentation for each component to learn more.

### Highlights

- Revised the `Presence` component: `lazyMount` and `unmountOnExit` have been added at the root
  level. For some disclosure components like `Tabs` and `Accordion`, this constitutes a breaking
  change.
- Breaking changes have been implemented in `Accordion`, `ColorPicker`, `DatePicker`, `Dialog`,
  `RadioGroup`, `SegmentGroup`, `TagsInput`, `Toast`, and `ToggleGroup` to achieve a consistent and
  more intuitive API.
- Resolved various bugs and addressed accessibility issues across all components.

### Stability and Support

With the release of version 1.0.0, we are moving towards a more stable version of `@ark-ui/react`.
Future updates will strive to avoid breaking changes, ensuring a smoother experience for our users.
If you encounter any issues while upgrading, please do not hesitate to open an issue on our
[GitHub repository](https://github.com/chakra-ui/ark/issues). Your feedback is invaluable in helping
us improve.

## [0.15.0] - 2023-09-14

### Added

- Added `ToggleGroup` component
- Added `type HTMLArkProps` that can be used together with the `ark` factory fn to create a type
  that can be used with `asChild` prop.

- Revised `Comoobox` component to support multiple selection
- Revised `Select` component to support multiple selection

### Fixed

- Fix issue where event callbacks that use `flushSync` did not have a stable reference, resulting in
  a noticable blocking re-renders.
  > Affected components: `Slider`, `RangeSlider`, `NumberInput`, `ColorPicker`

## [0.14.0] - 2023-08-29

strings.

- `Combobox`: Remove `selectInputOnFocus` option in favor of userland control
- `TagsInput`: Rename `onHighlight` to `onFocusChange`

### Removed

- Removed `'use client'` annotation from `compose-refs` function.
- Removed `Switchinput`. This component is no longer required.
- `TagsInput`: Removed`onTagUpdate` use `onChange` instead.
- `Switch`: Removed `defaultChecked` in favor of `defaultIsChecked`

## [0.13.1] - 2023-08-13

- Removed `'use client'` annotation from `factory` function.

## [0.13.0] - 2023-08-13

- BREAKING: Renamed `SegmentIndicator` to `SegmentGroupIndicator` to match the naming convention of
  other components.

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
- Added `DatePickerPositioner` component to the `DatePicker` component to help with positioning the
  calendar.
- Added `ComboboxOptionGroupLabel` to the `Combobox` component. This component can be used to render
  a label for a group of options in the `ComboboxOptionGroup` component.

- BREAKING: Renamed `TagsInputField` to `TagsInputInput` to match the naming convention of other
  input components.
- BREAKING: Renamed `NumberInputField` to `NumberInputInput` to match the naming convention of other
  input components.
- BREAKING: Renamed `PinInputField` to `PinInputInput` to match the naming convention of other input
  components.

### Removed

- BREAKING: Removed `CheckboxInput`. This component is no longer required.

## [0.10.0] - 2023-08-02

### Added

- Developers can now set default options for all `Toast` components in their application, ensuring a
  consistent look and feel across the board.
- Updated number input `onChange` handler to allow synchronous updates to the value when using the
  scrubber.

- Improved TypeScript typings in our factory functions. The changes allow for more accurate type
  inference for the `ref` property when dealing with both intrinsic HTML elements and custom React
  components.

## [0.9.0] - 2023-07-21

### Added

- To improve performance and reduce initial load times, we've introduced two new properties to the
  `AccordionContent`, `ComboboxContent`, `DialogBackdrop`, `DialogContent`, `HoverCardContent`,
  `PopoverContent`, `SelectContent`, and `TooltipContent` components. The `lazyMount` property
  allows for on-demand rendering of content, while the `unmountOnExit` property enables the removal
  of the component from the DOM once it's no longer required, ensuring better resource management
  and cleaner code.

## [0.8.1] - 2023-07-19

### Fixed

- Resolved an issue that NextJS would throw a false error because of `use client` annotation.

### Removed

- Removed `isOpen` from `Popover`. Please use `open` instead.

## [0.8.0] - 2023-07-19

### Added

- Enhanced `Carousel` component: Introduced `CarouselIndicator` and `CarouselIndicatorGroup`
  components. These sub-components offer finer control over the carousel navigation, enabling users
  to directly access desired carousel slides.
- Introduced `Presence` component, a new utility designed to delay the unmount of child components
  to assist with animation processes.
- Added support to animate the `Dialog`, `Tooltip` and `Popover` elements using the `Presence`
  component. Check out the documentation for these components to learn more.
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

- Support for standalone component imports: Developers can now import individual components, such as
  `@ark-ui/react/src/srctabs` instead of the full `@ark-ui/react` package. This is a significant
  feature for those working with bundlers that do not support tree-shaking. By allowing imports of
  individual components, we ensure a reduced bundle size when the full package import is not
  necessary.

## [0.7.0] - 2023-06-23

### Added

- Added `SegmentGroup` component

## [0.6.0] - 2023-06-03

### Added

- Added `Avatar` component
- Introduced an optional `defaulPage` property to `Pagination`
- Introduced an optional `defaultSize` property to `Splitter`
- Introduced the `onLongPress` property to `Pressable`

- Exposed direct access to the `Splitter` component's internal API, enabling more control over the
  component's state
- Updated all `@zag-js` dependencies to their latest versions

## [0.5.0] - 2023-05-25

### Removed

- Removed `AccordionIcon`

## [0.4.0] - 2023-05-23

### Added

- Add `DatePicker`

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
