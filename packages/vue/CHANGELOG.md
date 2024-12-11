---
id: changelog
title: Changelog
description: All notable changes will be documented in this file.
---

## [Unreleased]

### Added

- **ColorPicker**: Introduced `invalid` and `openAutoFocus` props.
- **TreeView**: Exported the `TreeCollection` type.
- **FileUpload**: Added `acceptedFiles` and `rejectedFiles` outputs to the `validate` method.

### Changed

- **Environment**: Deprecated `EnvironmentContext` in favor of `UseEnvironmentContext`.

### Fixed

- **Presence, Collapsible**: Fixed a potential memory leak after component unmount.
- **Environment**: Correctly exported `EnvironmentContext`.
- **SignaturePad**: Resolved an issue where `getDataUrl(...)` rendered improperly scaled images in
  Firefox.
- **NumberInput**: Fixed an issue where the locale provided by `LocaleProvider` was not applied
  correctly.

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

- **Field**: Added `autoresize` prop to `Field.Textarea` for auto-resizing the textarea based on
  content.

### Changed

- **TreeView**: Redesigned using the new tree collection for improved rendering and logic
  management. See the [TreeView documentation](https://ark-ui.com/docs/vue/components/tree-view) for
  details.
- **QrCode, SignaturePad, Timer**: Promoted from preview to stable release.

### Fixed

- **Dialog**: Fixed an issue where body styles weren't properly restored when `preventScroll` was
  enabled.
- **Toast**: Corrected type definitions in the `createToaster` function.

## [4.2.0] - 2024-10-26

### Added

- **Slider**: Introduced `Slider.DraggingIndicator` for displaying an indicator when dragging a
  thumb.
- **Field**: Added `Field.RequiredIndicator` to show a required indicator (e.g., an asterisk) when
  the `required` prop is set.

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
- **RatingGroup**: Fixed a bug where both the rating group and rating item received focus when
  `readOnly` was set to `true`.
- **Combobox**: Corrected behavior where `getSelectionValue` was called multiple times; it now
  triggers only when a selection is made.
- **HoverCard**: Removed `preventDefault` calls on the `touchstart` event to avoid browser error
  logs.
- **Popover**: Fixed a race condition in iOS Safari where switching between popovers caused them to
  close unexpectedly.
- **Presence**: Addressed an issue where elements using the presence machine did not exit the
  unmounting state if closed with a delay while switching tabs.

### Changed

- **Editable**:
  - Added `data-autoresize` attribute to both editable and preview elements when `autoResize` is
    enabled.
  - Removed the default `all: unset` style from the input when `autoResize` is enabled, allowing for
    user-defined CSS.

## [4.1.1] - 2024-10-09

### Changed

- **Time Picker [Preview]**: Updated `value` and `defaultValue` types from `string` to `Time`. Use
  the exported `parseTime` function to convert between strings and time objects.

### Fixed

- **TagsInput**: Resolved an issue where tag navigation was unresponsive after removing tags with
  the delete key.
- **DatePicker**: Fixed a bug where selecting a preset and then blurring the input incorrectly reset
  the value.

## [4.1.0] - 2024-09-30

### Added

- **Toggle**: Introduced the `Toggle` component.
- **useForwardExpose**: Added utility to facilitate forwarding of underlying component nodes.
- **Dialog**: Added support for detecting outside clicks from parent windows when rendered within an
  iframe.

### Fixed

- Resolved an issue where the underlying DOM node of most components was inaccessible via `$el`.
- **Combobox**: Fixed an issue where pressing Enter without selecting an option left text in the
  input.
- **Dialog**: Fixed an issue where the dialog closed when the positioner was scrollable, and the
  scrollbar was clicked.
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

In this major release, we shifted from primitive data types like strings to more structured types
such as Collection, Color, and DateValue. This enhanced flexibility and control by offering advanced
methods and properties.

The new APIs introduced helper functions like `parseColor`, `parseDate`, and `createListCollection`
to simplify working with the new types and make code more concise.

### Changed

- Ark UI Vue now required Vue 3.5.x or later, as it leveraged the useId() helper introduced in this
  version.
- **ColorPicker [Breaking]**: Updated `value` and `defaultValue` types from `string` to `Color`. Use
  the exported `parseColor` function to convert between strings and color objects.

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

- **Select, Combobox [Breaking]**: Removed the `items`, `itemToString`, and `itemToValue` props.
  Introduced a `collection` prop instead. Use the `createListCollection` helper to generate a
  collection from items.

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

- **DatePicker [Breaking]**: Changed `value` and `defaultValue` types from `string` to `Date`. To
  convert between strings and dates, use the `parseDate` function.

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

## [3.14.0] - 2024-09-24

### Added

- **FileUpload**: Introduced a `ClearTrigger` for clearing file uploads.
- **Switch, Checkbox, Radio Group**: Added the `data-focus-visible` attribute for elements
  interacted with via keyboard.

### Fixed

- **FileUpload**: Resolved an issue where `directory: true` was non-functional.

### Changed

- **Tooltip**: Now only opens on keyboard focus, improving accessibility.

## [3.13.1] - 2024-09-19

### Fixed

- **Field**: Fix issue where using `v-model` in `Field.Input`, `Field.Select`, and `Field.Textarea`
  doesn't work.

- **Frame**: Fixed issue where package requires `vue@3.5.x` due to usage of `onWatcherCleanup`.

- **DatePicker**

  - Fixed issue where the year select dropdown doesn't respect `min` and `max` props.
  - Fixed issue where date picker throws when `min` or `max` is changed.
  - Fixed issue where typing in date picker input doesn't work.

## [3.13.0] - 2024-09-13

### Added

- **Frame (Preview)**: Introduced the `Frame` component for rendering content within an iframe.
- **Timer (Preview)**: Added `Area` and `Control` parts to improve structure and anatomy.

### Fixed

- **Combobox**: Resolved an issue where the highlighted item remained persistent when the list of
  items was empty.

## [3.12.1] - 2024-09-11

### Fixed

- **Highlight**: Fixed issue where `ignoreCase` and `matchAll` props were not working.

## [3.12.0] - 2024-09-10

### Fixed

- **Floating Components**: Fixed issue where clicking outside of a dialog on mobile passed click
  events through.

- **Popover**: Fixed issue where popover did not restore focus when open state was changed
  programmatically

- **Avatar**: Fixed issue where avatar could throw when the fallback inner text changed

- **Steps**: Improved accessibility of tablist semantics by using `aria-owns`

### Added

- **FileUpload**: Add support for more file types in file upload `accept` intellisense

- **Toast**: Add support for `action` property when creating toasts, giving you the ability to add a
  `action.label` and `action.onClick`. The `onClick` function will be called when the user clicks
  the action trigger.

```ts
toaster.create({
  title: 'Uploaded successfully',
  type: 'success',
  action: {
    label: 'Undo',
    onClick: () => {
      console.log('undo')
    },
  },
})
```

- **File Upload**: Added support for `invalid` prop in file upload to explicitly mark upload
  operation as invalid. This could be paired with the `rejectedFiles` to show an error message.

### Changed

- **Floating Components**: Refactored `boundary` to only support function that returns an element.

- **Select**

  - Refactored opening and selection to be based on click events rather than pointerdown/up cycles.
  - Improved usability and accessibility of the select component.
  - Fixed issue where controlled multiple selects open state behaved unexpectedly.

## [3.11.0] - 2024-09-02

### Fixed

- **All Components**: Fixed issue where exit animations weren't working correctly.

- **Steps**: Fixed issue where steps context was not exported.

### Added

- **Checkbox**: Added `invalid` prop to `Checkbox.Group`

## [3.10.0] - 2024-08-22

### Added

- **Editable**

  - Add support for controlled the editable's state (edit/preview) using `edit` and `onEditChange`

- **Pagination**

  - Expose `api.count` property

### Changed

- **Editable**

  - Removed `onEdit` in favor of `onEditChange`
  - Removed `startsWithEditView` in favor of `edit` prop

### Fixed

- **Dialog**

  - Fix issue where closing a nested dialog focuses the first focusable element in the parent dialog
    instead of the previously focused element.

- **Steps**: Fixed issue where the steps component was not exported in the index file.

- **Select**: Fixed issue where Nuxt was not able to resolve the `@zag-js/utils` package.

## [3.9.0] - 2024-08-19

### Added

- **Steps (Preview)**: Added `Steps` component.

```jsx
<Steps.Root count={1}>
  <Steps.List>
    <Steps.Item index={0}>
      <Steps.Trigger>
        <Steps.Indicator>1</Steps.Indicator>
        First
      </Steps.Trigger>
      <Steps.Separator />
    </Steps.Item>
  </Steps.List>

  <Steps.Content index={0}>Content</Steps.Content>
  <Steps.CompletedContent>Completed</Steps.CompletedContent>

  <Steps.PrevTrigger>Back</Steps.PrevTrigger>
  <Steps.NextTrigger>Next</Steps.NextTrigger>
</Steps.Root>
```

- **Timer (Preview)**: Added `Timer` component.

```jsx
<Timer.Root>
  <Timer.Item type="days" />
  <Timer.Separator>:</Timer.Separator>
  <Timer.Item type="hours" />
  <Timer.Separator>:</Timer.Separator>
  <Timer.Item type="minutes" />
  <Timer.Separator>:</Timer.Separator>
  <Timer.Item type="seconds" />
</Timer.Root>
```

## [3.8.0] - 2024-08-14

### Changed

- **Progress**: Update `Progress.ValueText` to render percentage as string.

### Fixed

- **Field**:

  - Fixed issue where id of field parts could not be customized, breaking Zag.js composition.
  - Added `data-*` attributes to control part to allow for better styling.

- **Select**: Fixed reactivity issues when `items` and `value` are updated.

## [3.7.2] - 2024-07-28

### Changed

- **DatePicker**: Added support for `index` in `getLabelProps`.

### Fixed

- **DatePicker**:
  - Fixed issue where the selected date doesn't reflect in the input when clicking the trigger and
    then focusing the input.
  - Fixed SSR issue when using `getPresetTrigger`.
- **Slider**: Fixed issue where `onValueChangeEnd` was called with an incorrect value.
- Fixed an import issue with `@internationalized/date`.

## [3.7.1] - 2024-07-26

### Changed

- **Highlight**:
  - Enabled import from `@ark-ui/vue/highlight`.
  - Exported `HighlightChunk` type to enhance type inference in userland code.

### Fixed

- **Select**: Fixed `HiddenSelect` to correctly emit values when a simple string array is used as
  the `value` for the `Select` component.
- **ColorPicker**: Fixed an issue where an invalid color value was emitted if no default value was
  provided.

## [3.7.0] - 2024-07-25

### Added

- **Fieldset Component**: Introduced to help group form fields.

```jsx
<Fieldset.Root>
  <Fieldset.Legend>Legend</Fieldset.Legend>
  <Fieldset.HelperText>Helper text</Fieldset.HelperText>
  <Fieldset.ErrorText>Error text</Fieldset.ErrorText>
</Fieldset.Root>
```

Learn more in the [documentation](https://ark-ui.com/docs/vue/components/fieldset).

- **Highlight Component**: Added to highlight text based on a query.

```jsx
import { Highlight } from '@ark-ui/vue'

export const App = () => (
  <Highlight
    query={['Ark UI', 'exclusive examples']}
    text="Unlock exclusive examples and support the development by getting Ark Plus."
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
  - Ensured values are always unique by discarding duplicates

## [3.6.0] - 2024-06-30

- **All Components**: Exported each component's anatomy. For example:

  ```jsx
  import { avatarAnatomy } from '@ark-ui/solid'
  ```

- **NumberInput**: Introduced the `ValueText` part to render the internal state value.
- **Checkbox**: Added the `name` prop to `Checkbox.Group` for setting names within the group.

### Fixed

- **All Components**: Corrected multiple incorrect base export aliases across various components.
- **TreeView**: Resolved an issue preventing input usage within the tree.
- **Progress**: Fixed a warning in `Circle` due to an incorrect `viewBox` attribute on the `<svg>`
  element.
- **Carousel**: Corrected looping behavior for next and previous buttons when both `slidesPerView`
  and `loop` are set.
- **Menu**: Fixed loss of position data in the context menu upon closing.

## [3.5.0] - 2024-06-25

### Added

- **All Components**: Exposed base props to simplify prop merging for library consumers, especially
  in CSS-in-JS environments.
  ```jsx
  export interface AccordionItemBaseProps extends ItemProps, PolymorphicProps {}
  export interface AccordionItemProps
    extends AccordionItemBaseProps,
      /**
       * @vue-ignore
       */
      HTMLAttributes {}
  ```
- **Field**: Introduced the `Field` component for flexible form input, label, and helper text
  container.
- **Signature Pad**: Added `HiddenInput` to the `SignaturePad` component for better form library
  compatibility.
- **ColorPicker**: Added `SliderValueText`, `SliderLabel`, and `ValueSwatch` parts for enhanced
  customization.
- **Tooltip**: Introduced the `closeOnScroll` option to control whether the tooltip should close
  when the trigger's overflow parent scrolls.

### Fixed

- **Menu**:
  - Resolved an issue causing sibling menus or popovers to malfunction on iOS devices.
  - Fixed a problem where the context menu trigger showed the magnifier and iOS context menu on long
    press.
- **Editable**: Fixed a bug where setting `activationMode` to `dblclick` unexpectedly cleared the
  input value.
- **Checkbox**: Added the missing `group` role for the Checkbox group component.
- **Signature Pad**: Added missing exports for the `signature-pad` component.
- **Input**: Resolved an issue where the `Input` components could not be used with the `asChild`
  prop.

## [3.4.0] - 2024-06-12

### Added

- **Signature Pad**: Introduced the `SignaturePad` component for capturing signatures.
- **QR Code**: Added the `QRCode` component for generating QR codes.
- **CheckboxGroup**: Added the `CheckboxGroup` component for managing multiple checkboxes.
- **Presence**: Added support for `immediate` to synchronize presence changes immediately instead of
  deferring to the next tick.

### Fixed

- **TreeView**: Resolved an issue where the tree view state could be updated after setting
  `defaultSelectedValue` or `defaultExpandedValue`.
- **Tabs**: Resolved an issue where rapidly changing the selected tab could briefly show previous
  tab content.
- **FileUpload**: Fixed an issue where the `onFileAccept` event was triggered when deleting an item
  via the delete trigger.
- **Select**: Exported the missing `SelectList` component.
- **Carousel**: Fixed an issue where the carousel would not update the current index when used with
  `v-model`.

## [3.3.1] - 2024-06-07

### Fixed

- **Combobox**: Exported missing `ComboboxList` component.

## [3.3.0] - 2024-06-06

### Added

- **All Components**: Introduced the `Provider` component for easier access to internal machine
  APIs, improving component composition. See the example below:

```vue
<script setup lang="ts">
import { Avatar, useAvatar } from '@ark-ui/vue'

const avatar = useAvatar({
  onStatusChange: (e) => console.log('status changed', e),
})
</script>

<template>
  <Avatar.RootProvider :value="avatar">
    <Avatar.Fallback>PA</Avatar.Fallback>
    <Avatar.Image src="https://i.pravatar.cc/3000" alt="avatar" />
  </Avatar.RootProvider>
</template>
```

## [3.2.0] - 2024-06-04

### Added

- **Select, Combobox**: Added support for generics.

You can now use generics with Select and Combobox components to ensure type safety and improved
development experience.

```vue
<script setup lang="ts">
import { Combobox } from '@ark-ui/vue'
import { ref } from 'vue'

interface Pokemon {
  id: string
  name: string
  url: string
}

const items = ref<Pokemon[]>([])
</script>

<template>
  <Combobox.Root
    :items="items"
    :item-to-value="(item) => item.id"
    @highlight-change="(e) => console.log(e.highlightedItem?.name)"
  />
</template>
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

## [3.0.3] - 2024-05-29

### Fixed

- Resolved an issue where auto-generated ids were not correctly passed to the machines.

## [3.0.2] - 2024-05-29

### Changed

- **Avatar**: Improved image load check by using `naturalWidth` and `naturalHeight` instead of
  `currentSrc`.

## [3.0.1] - 2024-05-27

### Fixed

- Added missing export for `HiddenInput` in `Slider`.
- Added missing export for `ItemHiddenInput` in `RadioGroup` and `SegmentGroup`.

## [3.0.0] - 2024-05-24

### Highlights

We are excited to announce the first major release of Ark UI Vue! Ark UI Vue is now feature-complete
and ready for production use.

To maintain consistency across our suite, we have aligned the versioning of all Ark UI packages.
Therefore, the next release of Ark UI Vue will be v3.

This update introduces several new components, enhancements, and bug fixes. Here are some of the
highlights:

### Added

- **Context Components**: Introduced the `Context` component for easier access to internal machine
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

- **Format**: Added a `Format` component for formatting bytes and numbers.

```vue
<Format.Byte :value="120904" unit="byte" unit-display="short" />
<Format.Number :value="1204" unit="centimeter" />
```

- **Tooltip**: Added `defaultOpen` prop for cases where you do not need to control its open state.
- **Types**: Exported `Assign` and `Optional` types to enhance type handling.
- **Toast**: Added support for overlapping and stacked toast.

### Changed

- **[BREAKING]**: Exposed hidden inputs in `Checkbox`, `ColorPicker`, `FileUpload`, `PinInput`,
  `RadioGroup`, `RatingGroup`, `SegmentGroup`, `Select`, `Slider`, `Switch`, and `TagsInput` for
  better form library compatibility. Please ensure to include the hidden input in your component as
  shown below:

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
- **[BREAKING] Combobox, Menu, Select, Tabs, ToggleGroup**: Renamed `loop` to `focusLopp` to be more
  descriptive.
- **[BREAKING] Environment**: Renamed `Environment` to `EnvironmentProvider` to align with other
  providers.

### Fixed

- **DatePicker**: Resolved issues with `min` and `max` props not supporting date strings.
- **Accordion**: Fixed initial flicker of content.
- **TagsInput**: Replaced `HTMLInputElement` with `HTMLDivElement` in `TagsInput.Root`.

### Removed

- **[BREAKING]**: Dropped direct internal API access from Root components. Use the new `Context`
  component for more flexible and cleaner API integration.
- **[BREAKING]**: Simplified component APIs by removing `dir` and `getRootNode` attributes. Use
  [LocaleProvider](https://ark-ui.com/vue/docs/providers/environment) and
  [EnvironmentProvider](https://ark-ui.com/vue/docs/providers/locale) for these settings.

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
- Added entrypoint for the `ark` factory at `@ark-ui/vue/factory`

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
