## [Unreleased]

## [5.28.0] - 2025-11-14

### Added

- **General**: Exported `InteractOutsideEvent`, `FocusOutsideEvent`, and `PointerDownOutsideEvent` types for better type
  safety
- **Carousel**:
  - Added `Carousel.AutoplayIndicator` component for conditionally rendering content based on autoplay state
  - Added `Carousel.ProgressText` component for displaying current page progress (e.g., "1 / 5")
- **Toast**: Exported `ToastOptions` and `ToastStoreProps` types for better type safety

### Changed

- **useListCollection**: Updated `initialItems` to accept `readonly` arrays for better compatibility with immutable data
  patterns.
- **CollectionItem**: Use the collection type from `@zag-js/collection` just like the other frameworks.

### Fixed

- **Combobox**:
  - Fixed focus stealing in controlled open mode
  - Removed problematic `aria-hidden` behavior to allow interaction with other page elements

## [5.27.1] - 2025-11-02

### Fixed

- **Dialog, Popover**: Improved shadow DOM support for interact outside and focus trap detection
- **Marquee**: Fixed Firefox flicker and added GPU acceleration
- **Dialog**: Fixed layout shift issue when using `scrollbar-gutter: stable` in CSS
- **Slider**: Fixed `onValueChangeEnd` callback not triggering for programmatic value changes

## [5.27.0] - 2025-11-01

### Added

- **Marquee** [New]: Initial release of marquee component for continuously scrolling content

### Fixed

- **Angle Slider**: Resolved an issue where dragging the thumb from non-center positions caused unexpected value jumps.
  The thumb now maintains consistent positioning relative to the initial click point.

- **Slider**: Fixed a problem where the thumb offset shifted dynamically during dragging, resulting in value jumps. The
  offset now remains constant from the pointer throughout the drag operation.

- **Date Picker**: Resolved a crash in the range date picker occurring when users typed the end date first by
  implementing `null`/`undefined` checks for date property access.

- **Radio Group**: Reverted to `offsetLeft`/`offsetTop` calculations to restore correct indicator positioning within
  scrollable container contexts.

- **Tabs**: Reverted to `offsetLeft`/`offsetTop` calculations to fix indicator positioning issues in scrollable
  containers.

- **Tour**:
  - Corrected improper effect cleanup procedures
  - Fixed wait step functionality
  - Added step validation on mount to verify configuration validity

## [5.26.2] - 2025-10-18

### Fixed

- **Angle Slider**: Fix accessibility violation where the slider thumb element lacked an accessible name. The thumb now
  supports `aria-label` and `aria-labelledby` props, and automatically falls back to the label element's ID for proper
  ARIA labeling.

- **Select**: Fix accessibility violation where the required state was not set correctly to on the trigger.

- **Tags Input**: Fix issue where entering a custom tag with combobox integration required pressing `Enter` twice. The
  tags-input now correctly handles custom values when the combobox has no highlighted item (`aria-activedescendant` is
  empty), allowing the tag to be added on the first `Enter` press.

## [5.26.1] - 2025-10-15

### Fixed

- **Checkbox**
  - Fix issue where setting initial checked state to `indeterminate` doesn't work
  - Ensure `api.checkedState` returns the correct checked state (`boolean | "indeterminate"`)

- **Collapsible**: Fix issue where `dir` prop value was hardcoded to `ltr` instead of using the provided value

- **Combobox**: Fix issue where controlled single-select combobox does not propagate its initial value to `inputValue`

- **Listbox**: Fix issue where pressing Enter key when no highlighted item still calls `event.preventDefault()`

- **Radio Group**: Refactor to use `getBoundingClientRect()` for precise indicator positioning

- **Slider**
  - Fix issue where slider could stop abruptly when scrubbing thumb
  - Fix issue where range slider thumbs become stuck when dragged to the same position without `minStepsBetweenThumbs`

- **Tabs**: Refactor to use `getBoundingClientRect()` for precise indicator positioning

- **Tags Input**: Fix issue where `maxLength` doesn't apply to the edit input as well

## [5.26.0] - 2025-10-08

### Added

- **Collapsible**: Add support for `collapsedHeight` and `collapsedWidth` props to control the dimensions of the
  collapsible content when in its collapsed state.

- **Focus Trap**: Allow elements referenced by `aria-controls` to be included in the trap scope. This makes it possible
  for menus, popovers, etc. to be portalled and work correctly.

- **Pagination**: Add `getPageUrl` prop for generating `href` attributes when using pagination as links.

```ts
const service = useMachine(pagination.machine, {
  type: 'link',
  getPageUrl: ({ page, pageSize }) => `/products?page=${page}&size=${pageSize}`,
})
```

- **Select**: Add `SelectRootComponentProps` type export for better component type composition.

- **Listbox**: Add `ListboxRootComponentProps` type export for better component type composition.

- **Combobox**: Add `ComboboxRootComponentProps` type export for better component type composition.

- **TreeView**:
  - Add `TreeViewRootComponentProps` type export for better component type composition.
  - (Experimental) Add support for node renaming functionality:
    - Add `TreeViewNodeRenameInput` component for inline node label editing
    - Add `canRename` prop to control which nodes can be renamed
    - Add `onRenameStart`, `onBeforeRename`, and `onRenameComplete` callbacks for rename lifecycle
    - Add `CheckedChangeDetails`, `LoadChildrenErrorDetails`, `RenameStartDetails`, and `RenameCompleteDetails` type
      exports

### Fixed

- **Listbox**: Fixed type signature of `useListbox` to accept `MaybeAccessor<UseListboxProps>` instead of just
  `UseListboxProps`. This allows reactive props to be passed correctly.

- **Scroll Area**: Fix RTL horizontal scrollbar positioning on Safari

- **Slider**: Fix issue where slider continues dragging when disabled during drag operation.

- **Switch**: Fix issue where `data-active` is inconsistently applied when `disabled` state changes at runtime

## [5.25.1] - 2025-09-27

### Fixed

- **Date Picker**
  - Fix issue where year range picker doesn't show the hovered range
  - Fix issue where quarter presets returns incorrect date

- **FormatByte**: Add support for `unitSystem` property to allow changing between decimal (1000 bytes) and binary (1024
  bytes) systems.

- **Number Input**: When `formatOptions` is used (like `style: "currency"`), the cursor would jump to the end of the
  input when typing in the middle. The cursor now maintains its relative position during formatting changes.

- **Pin Input**: Fix issue where using the keyboard shortcuts `Cmd+Backspace` and `Cmd+Delete` to delete text in pin
  inputs would insert "undefined" instead of clearing the field.

- **Scroll Area**: Fix issue where resize tracking was not observing the root element, which caused the scrollbar to not
  update when the root element's size changed.

## [5.25.0] - 2025-09-16

### Added

- Added `mergeProps` utility for combining multiple props objects with proper event handler and className merging.
- Added `createContext` utility for creating typed React contexts with improved DX.

```tsx
import { createContext } from '@ark-ui/solid/utils'
```

### Fixed

- **AngleSlider**: Export `angleSliderAnatomy` from the anatomy exports

## [5.24.1] - 2025-09-14

### Fixed

- **General**: Fix issue where `mergeProps` throws when `props` is `undefined` or `null`

## [5.24.0] - 2025-09-14

### Removed

- **TimePicker**: The TimePicker component has been removed from this release. This component was never part of the
  public API and was considered experimental. It had significant bugs and usability issues across all frameworks and
  locales, making it unsuitable for production use.

  **Migration**: We recommend building a custom time picker using the Select component for simple use cases, or
  implementing a time grid pattern for more complex scenarios.

### Added

- **Combobox**: Add `alwaysSubmitOnEnter` prop to allow bypassing the default two-step behavior (Enter to close
  combobox, then Enter to submit form) and instead submit the form immediately on Enter press. This is useful for
  single-field autocomplete forms where Enter should submit the form directly.

- **Dismissable**: Add support for layer types in dismissable layer stack. Layers can now be categorized as `dialog`,
  `popover`, `menu`, or `listbox`. This enables:
  - `data-nested` attribute on nested layers of the same type
  - `data-has-nested` attribute on parent layers with nested children of the same type
  - `--nested-layer-count` CSS variable indicating the number of nested layers of the same type

### Changed

- **Hover Card**: Change default delay values for hover card to improve accessibility.
  - `openDelay`: from `700ms` to `600ms`

- **Tooltip**: Change default delay values for tooltip to improve accessibility.
  [Learn more](https://www.nngroup.com/articles/timing-exposing-content)
  - `openDelay`: from `1000ms` to `400ms`
  - `closeDelay`: from `500ms` to `150ms`

### Fixed

- **Editable**: Allow text selection in editable preview when `autoResize` is enabled

  Previously, when `autoResize` was set to `true`, the preview element had `userSelect: "none"` applied, preventing
  users from selecting text. This has been fixed by removing the `userSelect` style property.

- **File Upload**: Fix regression where clicking the trigger doesn't open the file picker when used within the dropzone

- **Menu**:
  - Fix issue where keyboard activation of menu items with `target="_blank"` would open two tabs
  - Fix issue where hovering a partially visible item with pointer causes it to scroll into view

- **Tabs**: Fix issue where `ids` for `item` and `content` could not be customized

- **Toast**: Allow creating a toast store without any arguments

## [5.23.0] - 2025-09-08

### Added

- **Field**: Add `data-required` attribute to `Field.Label`
- **Select, Combobox, Listbox, TreeView**: Export `RootComponent` and `RootProviderComponent` types which are useful
  when building compositions that wrap the `Root` and `RootProvider` components and you still want type-safety for the
  collection.

  ```tsx
  import { Select } from '@ark-ui/solid/select'
  import { styled } from 'styling-lib'

  const Root = styled(Select.Root) as Select.RootComponent<{}>
  ```

### Fixed

- **Menu**: Fix `Menu.ItemText` not working inside `Menu.TriggerItem`

## [5.22.0] - 2025-08-28

### Added

- **Combobox**: Add `ComboboxEmpty` component to display content when the combobox has no items

- **Listbox**: Add `ListboxEmpty` component to display content when the listbox has no items

- **Hover Card**: Add support for `disabled` prop

### Fixed

- **Collection**: Fix issue where disabled items could be reached via typeahead

- **Color Picker**: Fix issue where color picker was not working correctly in RTL mode

- **Date Picker**: Fix issue where datepicker doesn't revert to a valid value when the input value exceeds the min/max
  and blurred

- **Dismissable**: Expose `onRequestDismiss` custom event handler for event a parent layer requests the child layer to
  dismiss. If prevented via `event.preventDefault()`, the child layer will not dismiss when the parent layer is
  dismissed.

- **Number Input**
  - Omit the input `pattern` when `formatOptions` is provided. This prevents native pattern validation from conflicting
    with formatted values (e.g., currency or percent).
  - Handle empty values consistently across all format options.
  - Add `data-scrubbing` attribute to the number input parts.

- **Tags Input**: Fix issue where highlighted item doesn't clear when tabbing out of the input to an external button
  within the `control` part.

- **Tooltip**
  - Set `closeOnPointerdown` to `false` when `closeOnClick` is set to `false`
  - Reduce bundle size by replacing `@zag-js/store` dependency with a lightweight store implementation.

## [5.21.0] - 2025-08-24

### Added

- **Hooks**: Add `useAsyncList` and `useCollator` hooks for managing asynchronous list operations and locale-aware
  string comparison
- **Toast**: Export type definitions `ToastActionOptions`, `ToastPlacement`, `ToastPromiseOptions`, `ToastStatus`,
  `ToastStatusChangeDetails`, and `ToastType`

### Changed

- **Fieldset**:
  - Update Legend component to render as `div` instead of `legend` element for improved styling flexibility
  - Add `aria-labelledby` attribute to fieldset root for better accessibility by linking to legend

### Fixed

- **Date Picker**
  - Clear hovered range state after completing range selection instead of waiting for pointer to leave the calendar
    area.
  - Fix issue where month and year select labels don't update correctly when using `min`/`max` constraints.
  - Expose `disabled` on `api.getMonths()` and `api.getYears()` results to indicate options out of range for current
    constraints.

- **Listbox**
  - Fix issue where first enabled item should be highlighted by default when listbox receives focus and no item is
    currently highlighted.
  - Add `getElement` to `scrollToIndexFn` details
  - Track collection changes and clear `highlightedValue` if the item is no longer in the collection.

- **ScrollArea**
  - Avoid detecting hover state from portalled descendants.
  - Add `data-dragging` attribute to scroll area parts.

- **Select**: Add `getElement` to `scrollToIndexFn` details

- **Combobox**: Add `getElement` to `scrollToIndexFn` details

## [5.20.0] - 2025-08-20

### Added

- **Highlight Word**: Add `exactMatch` option that enables whole-word matching using regex word boundaries.

### Fixed

- **Menu**: Fix context menu repositioning logic

- **Scroll Area**: Add `data-hover` to scroll area

## [5.19.0] - 2025-08-18

### Added

- **ScrollArea [NEW]**: Add support for new scroll area component.

### Fixed

- **ListCollection**
  - Avoid recomputing groups on every call to `at()` and `indexOf()`
  - Fixed bug in `find()` method (was checking `!= null` instead of `!== -1`)

- **GridCollection**: Avoid recomputing rows on every call to `getRows()`

- **Menu**
  - Add `data-state` attribute for context menu trigger
  - Fix context menu positioning bug where reopening at the same coordinates fails to reposition

- **ClientOnly**: Fixed issue where `ClientOnly` component was not exported correctly.

## [5.18.4] - 2025-08-14

### Fixed

- **Listbox**: Add support for navigating grid collections

- **Carousel**:
  - Fix an issue where the carousel would not update when `slideCount` or `autoplay` props change.
  - Fix an issue where `loop: false` was ignored when using autoplay. Now, the carousel will stop when it gets to the
    last slide.

- **Date Picker**: Expose `data-inline` attribute on Content part to enable distinct styling for inline date pickers
  versus popover date pickers.

- **Menu**: Fix issue where `onCheckedChange` could be called twice on checkbox or radio item

- **Radio Group**: Fixed issue where arrow key navigation doesn't apply `data-focus-visible` on the newly focused item.

- **TagsInput**: Export `InputValueChangeDetails` type

### Changed

- **Async List**: Improve type inference for descriptors

- **Framework Components**: Improve runtime performance of components

## [5.18.3] - 2025-08-01

### Fixed

- **General**: Fix issue where presence closing animation doesn't work as expected

- **Carousel**: Fix issue where controlled carousel ignores last slide

## [5.18.2] - 2025-07-26

### Fixed

- **Dialog**
  - Sync content `--layer-index` with positioner and backdrop
  - Decouple `trapFocus` from `modal` so it's possible to set `modal=false` and `trapFocus=true`

## [5.18.1] - 2025-07-23

### Fixed

- **Date Picker**: Fixed issue where hovered range was connect to selected values, when it shouldn't

- **Tree View**: Fixed issue where tree view doesn't scroll into view when content overflows.

## [5.18.0] - 2025-07-22

### Added

- **Collection**: Add `useListSelection` hook for managing collection item selection with support for single/multiple
  selection modes

  ```jsx
  const collection = createListCollection({ items: ['React', 'Vue', 'Angular'] })
  const selection = useListSelection({ collection })

  // Check if item is selected
  const isSelected = selection.isSelected('React')

  // Select/deselect items
  selection.select('React')
  selection.toggle('Vue')
  ```

- **File Upload**: Add support for programmatically controlling the accepted files via `acceptedFiles` and
  `defaultAcceptedFiles`

- **Signature Pad**: Add support for programmatically controlling the paths via `paths` and `defaultPaths` props.

- **Date Picker**: Added hover range preview support for date picker range selection. Added `inHoveredRange`,
  `firstInHoveredRange`, and `lastInHoveredRange` properties to `DayTableCellState` with corresponding data attributes
  `data-in-hover-range`, `data-hover-range-start`, and `data-hover-range-end`.

  Hover range states are only active when not overlapping with actual selected range, enabling distinct styling for
  hover preview vs actual selection in range mode.

### Fixed

- **Date Picker**: Fix date comparison issues when time components are involved. This resolves critical issues with date
  comparison operations when different date types (`CalendarDate`, `CalendarDateTime`, `ZonedDateTime`) are mixed,
  particularly in scenarios involving time components.

## [5.17.0] - 2025-07-18

### Added

- **Checkbox**: Add `CheckboxGroupProvider` component for external checkbox group state management

### Fixed

- **Carousel**: Fix issue where full page carousel could trap scrolling

- **ListCollection**: Export `UseListCollectionReturn` type

- **TreeCollection**: Fix issue where the `filter` method completely deletes the children key from the node when there
  are no matching children

- **Number Input**: Fix issue where default pattern does not allow negative numbers with decimal point

- **File Upload**
  - Export `FileError`, `FileMimeType`, and `FileRejection` types
  - Fix issue where calling `api.setFiles` invokes validation with incorrect `acceptedFiles`
  - Fix issue where the browser might not be able to infer the mime type of a file due to limitations, drag source or
    security restrictions. As a fallback in the file validation logic, we now infer the mime type from the file
    extension.

## [5.16.1] - 2025-07-05

### Fixed

- **Combobox**
  - Expose `reason` to `onOpenChange` and `onInputValueChange` callbacks
  - Expose `api.clearHighlightedValue` function to clear highlighted value

- **Date Picker**
  - Fix issue where datepicker errors when setting `selectionMode=range` and `minView=year`
  - Fix issue where `focusedValue` could not be fully controlled

- **Listbox**: Select highlighted item only if it exists in the collection

- **Progress**: Improve `valueAsString` formatting

- **Select**
  - Select highlighted item only if it exists in the collection
  - Expose `api.clearHighlightedValue` function to clear highlighted value

- **Tour**: Fix an issue where the `goto` function in `StepActionMap` doesn't work when passing step IDs (string)

- **Tree View**: Expose `id` in the tree node state

## [5.16.0] - 2025-07-01

### Added

- **Color Picker**: Add support for `inline` prop to render color picker inline
- **Date Picker**: Add support for `inline` prop to render the date calendar inline

### Fixed

- **Color Picker**: Auto-prefix Hex values with `#` if missing when using the `hex` channel input
- **Menu**: Fix interaction outside detection for focusable context trigger
- **Tree View**: Improve support for rendering tree items as links

## [5.15.4] - 2025-06-27

### Fixed

- **Combobox, Select, Listbox**: Fix issue where rehydrating `defaultValue` or `value` after fetching items doesn't
  update the `valueAsString`

## [5.15.3] - 2025-06-27

### Fixed

- **Tree View**: Fix tree traversal for querying last node

## [5.15.2] - 2025-06-26

### Fixed

- **Date Picker**: Fix issue with keyboard selection where setting unavailable date causes month view to behave
  differently from clicking with mouse

- **Toast**: Fix issue where app crashes when `toaster.promise` is called without loading option. The `loading` option
  is now required. A warning will be logged if it is not provided

- **Tree View**
  - Fix issue where clicking a branch with indeterminate state doesn't check its child nodes
  - Remove `aria-busy` attribute from branch trigger when not loading children
  - Expose node details in `onExpandChange`, `onSelectionChange` and `onFocusChange`

- **Angle Slider**: Fix issue where scrubbing doesn't feel smooth on touch devices

- **Timer**
  - Fix issue where timer could continue beyond `targetMs` when window is not visible
  - Add validation to ensure `startMs` and `targetMs` are configured correctly
  - Fix `progressPercent` calculation for countdown timers

## [5.15.1] - 2025-06-23

### Fixed

- **Listbox**: Fix issue where `Listbox.ItemContext` was not exported

## [5.15.0] - 2025-06-23

### Added

- **Tree View**
  - Add support for checkbox state for checkbox trees via `defaultCheckedValue`, `checkedValue`, `onCheckedChange` props
  - Add callback for when `loadChildren` fails via `onLoadChildrenError` prop

### Fixed

- **Progress**
  - Fix issue where setting orientation to `vertical` don't work
  - Fix issue where setting `defaultValue` to `null` doesn't show indeterminate state

## [5.14.2] - 2025-06-19

### Fixed

- **General**: Ensure pointerdown or click event handlers only execute when the main button is clicked
- **Tree View**: Exported `TreeViewNodeState` and `TreeViewNodeProps` types from `@zag-js/tree-view`

### Changed

- **Collection**: Improve the APIs around `tree.flatten(...)` and `flattenedToTree` to ensure the original node
  properties are preserved.

  > Previously, `tree.flatten()` would return an array of objects with `value` and `label` stripping out the original
  > node properties.

  ```ts
  const tree = new TreeCollection({
    rootNode: {
      value: 'ROOT',
      children: [{ value: 'child1' }, { value: 'child2' }],
    },
  })

  const flattened = tree.flatten()
  const reconstructed = flattenedToTree(flattened)

  console.log(reconstructed.rootNode)

  // {
  //   value: "ROOT",
  //   children: [{ value: "child1" }, { value: "child2" }],
  // }
  ```

## [5.14.1] - 2025-06-17

### Fixed

- **Popover**: Fixed issue where `onOpenChange` could be called twice when controlled
- **File Utils**: Improved `downloadFile` function to handle webview scenarios
- **Combobox**:
  - Fixed issue where `onInputValueChange` could be called twice when selecting an item
  - Fixed issue where combobox with `allowCustomValue: true` used within in a form requires two enter keypress to submit

## [5.14.0] - 2025-06-10

### Added

- **Editable**: Added support for `activationMode=none`
- **Collection**
  - Exposed `copy` method
  - Added support for `getParentNodes` to accept a value or index path

### Fixed

- **Collection**: Fixed issue where entrypoint `@ark-ui/solid/collection` was not working as expected
- **Carousel**: Fixed issue where carousel crashes when `slidesPerPage` is 0
- **File Upload**: Prevented `undefined` in `acceptedFiles` when no files accepted
- **Select**: Fixed issue where highlighted item could be cleared when navigating up/down the list with keyboard
- **Tabs**: Fixed issue where tabs with links should not trigger tab change upon cmd/middle click
- **Menu**: Fixed issue where `Menu.ItemText` could not be used with `Menu.Item`

## [5.13.0] - 2025-06-07

### Added

- **Collection**: Add new `useListCollection` hook to create a dynamic list collection.

### Fixed

- **Progress**: Export `ProgressValueChangeDetails` and `ProgressValueTranslationDetails` types from `@zag-js/progress`

## [5.12.0] - 2025-06-05

### Added

- **Tree View**: Add support for lazy loading node children. To use this, you need to provide:
  - `loadChildren` is a function that is used to load the children of a node.
  - `onLoadChildrenComplete` is a callback that is called when the children of a node are loaded. Used to update the
    tree collection.
  - Add `childrenCount` to the node object to indicate the number of children.

### Fixed

- **Slider**
  - Fixed issue where `Shift` + `ArrowRight` set value to `0` instead of `max` when step is too large (e.g. `20`)
  - Fixed issue where `onValueChangeEnd` doesn't return the latest value when dragging very fast

## [5.11.0] - 2025-05-30

### Added

- **File Upload**: Added support for transforming uploaded files via `transformFiles` context property.

### Fixed

- **Slider**: Fixed issue where `minStepsBetweenThumbs` isn't computed correctly when interacting with pointer or
  keyboard.

## [5.10.0] - 2025-05-29

### Added

- **[NEW] Password Input**: Added `PasswordInput` component for collecting secure text inputs.

```tsx
import { PasswordInput } from '@ark-ui/solid/password-input'
import { EyeIcon, EyeOffIcon } from 'lucide-solid'

export const Basic = () => (
  <PasswordInput.Root>
    <PasswordInput.Label>Password</PasswordInput.Label>
    <PasswordInput.Control>
      <PasswordInput.Input />
      <PasswordInput.VisibilityTrigger>
        <PasswordInput.Indicator fallback={<EyeOffIcon />}>
          <EyeIcon />
        </PasswordInput.Indicator>
      </PasswordInput.VisibilityTrigger>
    </PasswordInput.Control>
  </PasswordInput.Root>
)
```

- **Select**: Added `onSelect` callback that gets fired when an item is selected via keyboard/mouse.

### Fixed

- **Color Picker**: Fixed issue where value change end event is invoked when committing via an input.

- **Toast**: Fixed issue where calling `toast.remove()` without an id shows a TypeScript error.

- **Field**: Fixed issue where helper text and error text could not be detected in shadow DOM environments.

## [5.9.2] - 2025-05-24

### Fixed

- **Collection**: Export `CollectionOptions`, `TreeCollectionOptions`, `GridCollectionOptions` types.

- **Carousel**
  - Fix issue where focusing on carousel region and navigating with keyboard doesn't work as expected
  - Fix issue when `allowMouseDrag` is set where carousel no longer snaps after mouse interaction

- **Combobox**: Fix issue where `onInputValueChange` doesn't get called when `autoFocus` is set to `true`

- **Slider**: Fix issue where slider could throw a error when rendered in an popover or dialog

- **Tour**: Fix issue where calling `api.start(<id>)` with a step id doesn't work as expected

## [5.9.1] - 2025-05-12

### Fixed

- **Collection**: Fix issue where `getNextValue` and `getPreviousValue` doesn't work as expected when `groupBy` is used.

## [5.9.0] - 2025-05-05

### Added

- **Locale**: Added `useFilter` hook to filter data based on the current locale.
- **Format**: Added `FormatRelativeTime` component for formatting relative time.

## [5.8.0] - 2025-05-01

### Added

- **Date Picker**: Added support for `outsideDaySelectable` prop to allow selecting days outside the current month (on
  the same visible date range)

## [5.7.0] - 2025-04-25

### Added

- **[NEW] Listbox**: Introduced the `Listbox` component for selecting a single or multiple items from a list. See the
  [documentation](https://ark-ui.com/docs/components/listbox) for details.
- Improved support for grouping collection items. Check the `Listbox`, `Select` or `Combobox` documentation for more
  details.

### Changed

- Added `package.json` to `exports` for improved compatibility with tools like Vite.

## [5.6.0] - 2025-04-15

### Added

- **[NEW] AngleSlider**: Introduced the `AngleSlider` component for selecting an angle. See the
  [documentation](https://ark-ui.com/docs/components/angle-slider) for details.
- **[NEW] FloatingPanel**: Introduced the `FloatingPanel` component for creating floating windows. See the
  [documentation](https://ark-ui.com/docs/components/floating-panel) for details.
- **Toast**: Added toast queuing when the max limit is reached:
  - New toasts were queued instead of dropped
  - Queued toasts were shown when space became available
  - Queue cleared when all toasts were removed
- **Combobox**:
  - Fallbacked to the trigger element as the positioning anchor
  - Added `data-empty` attribute to indicate an empty listbox or content

## [5.5.0] - 2025-04-05

### Added

- **Presence**: Added support for skipping the initial animation when the component is mounted. This can be used in all
  disclosure components (e.g., `Dialog`, `DatePicker`, `Menu` etc).

### Fixed

- **Tabs**: Fixed issue where tabs indicator animation behaves inconsistently.

- **Date Picker**
  - Fixed issue where datepicker throws error when navigating month view.
  - Fixed issue where range selection doesn't reset correctly when clicking the same start date.

- **Disclosure Components**
  - Fixed issue where pointerdown outside doesn't work consistently on mobile devices.
  - Improved pointerdown outside click detection in shadow DOM environments.

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
  [Splitter](https://ark-ui.com/docs/components/splitter) documentation for more details.

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
