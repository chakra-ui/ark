## [Unreleased]

## [5.16.1] - 2025-07-05

### Fixed

- **Combobox**

  - Expose `reason` to `onOpenChange` and `onInputValueChange` callbacks
  - Expose `api.clearHighlightedValue` function to clear highlighted value

- **Date Picker**

  - Fix issue where datepicker errors when setting `selectionMode=range` and `minView=year`
  - Fix issue where `focusedValue` could not be fully controlled

- **Toast**: Fix issue where toast `title` or `description` could not accept VNodes.

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

## [5.15.3] - 2025-06-27

### Fixed

- **Combobox, Select, Listbox**: Fix issue where rehydrating `defaultValue` or `value` after fetching items doesn't
  update the `valueAsString`

## [5.15.2] - 2025-06-26

### Fixed

- **General**: Fix issue where some Zag packages were not included in the package.json `dependencies` and
  `devDependencies`. This causes import errors when using the `@ark-ui/vue` package.

- **Date Picker**: Fix issue with keyboard selection where setting unavailable date causes month view to behave
  differently from clicking with mouse

- **Toast**: Fix issue where app crashes when `toaster.promise` is called without loading option. The `loading` option
  is now required. A warning will be logged if it is not provided

- **Tree View**

  - Fix issue where clicking a branch with indeterminate state doesn't check its child nodes
  - Remove `aria-busy` attribute from branch trigger when not loading children
  - Expose node details in `onExpandChange`, `onSelectionChange` and `onFocusChange`

- **Angle Slider**: Fix issue where scrubbing doesn't feel smooth on touch devices

- **Timer**:

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
- **Toast**: Fixed issue where toast's CSS variables don't apply correctly
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

- **Collection**: Fixed issue where entrypoint `@ark-ui/vue/collection` was not working as expected
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
import { PasswordInput } from '@ark-ui/vue/password-input'
import { EyeIcon, EyeOffIcon } from 'lucide-vue-next'

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

- **Menu**: Fix issue where `Menu.Item` throws a `document is not defined` error when used in a Nuxt app.

## [5.9.1] - 2025-05-12

### Fixed

- **Combobox**

  - Fixed issue where `focusable` prop was not being applied to the trigger element.
  - Fixed issue where combobox doesn't work for items rendered as links.

- **Collection**: Fix issue where `getNextValue` and `getPreviousValue` doesn't work as expected when `groupBy` is used.

## [5.9.0] - 2025-05-05

### Added

- **Locale**: Added `useFilter` composable to filter data based on the current locale.
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

### Fixed

- **CheckboxGroup**: Fixed issue where `v-model` doesn't work as expected.

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

  - Added `select` emit event to the `Menu.Item` component.

### Fixed

- Ensured each component's state machine starts before processing events.
- **HoverCard, ColorPicker**: Added missing `tabIndex` for better dialog support.
- **Menu**: Assigned unique IDs to menu items to improve accessibility and HTML validation.
- **Field**: Fixed `Textarea` to use `ark.textarea`, ensuring support for the `asChild` prop.

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
import { DownloadTrigger } from '@ark-ui/react/download-trigger'

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

- **Toast**: Fixed issue where setting `offsets` to `undefined` caused the machine to throw.
- **Select**: Fixed issue where select `valueAsString` lost reactivity.

## [5.1.1] - 2025-03-17

### Fixed

- **Field**: Exported the missing `useField` hook.
- **NumberInput**: `onValueChange` correctly received `valueAsNumber`.
- **Slider**: Thumbs initialized correctly when `min` was set to a non-zero value.

## [5.1.0] - 2025-03-11

### Added

- Implemented support for reactive props in `use-*.ts` functions.

```tsx
const value = ref(['React'])

const accordionProps = computed<UseAccordionProps>(() => ({
  multiple: true,
  value: value.value,
  onValueChange: (e) => (value.value = e.value),
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

## [5.0.2] - 2025-03-06

### Fixed

- **Steps**: Fixed issue where `Steps.X` namespace was not exported.

## [5.0.1] - 2025-03-06

Ark UI just got a major performance boost! 🚀

### What’s new in v5?

- **Blazing-fast performance** – Every component runs smoother and renders faster.
- **Smaller bundle size** – Leaner components and adapters for a more efficient build.

We made this happen by using Vue's native reactive primitives instead of external stores.

In our stress tests with **10,000 components**, Ark v5 delivered **1.5x–4x** better performance across the board.

### A quick note on tests

Most component updates are non-breaking, but due to this change, some tests may need adjustments. For example:

```jsx
// Before
it('should open by default', () => {
  render(ComponentUnderTest, {
    props: {
      defaultOpen: true,
    },
  })
  expect(screen.getByRole('dialog')).toBeInTheDocument()
})

// After
it('should open by default', async () => {
  render(ComponentUnderTest, {
    props: {
      defaultOpen: true,
    },
  })
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
