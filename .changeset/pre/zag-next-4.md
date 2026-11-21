---
'@ark-ui/react': major
'@ark-ui/svelte': major
'@ark-ui/vue': major
---

Update to zag `2.0.0-next.4`.

- **Steps:** define steps with `items` and address them by `value` instead of `index`. `count`, `step`, `defaultStep`,
  `isStepValid`, `isStepSkippable`, `onStepChange`, `onStepComplete` and `onStepInvalid` are replaced by `items`,
  `value`, `defaultValue`, `invalid`/`optional` on each item, `onValueChange`, `onComplete` and `onNavigationBlocked`.
  Add `Steps.SkipTrigger`, `completedValues` and `translations`. `Steps.ChangeDetails` and `Steps.InvalidDetails` become
  `Steps.ValueChangeDetails` and `Steps.NavigationBlockedDetails`.
- **NumberInput:** the value is a `number`, with `null` for an empty input. `valueAsNumber` is removed; read `value`.
  `allowOverflow` and `clampValueOnBlur` are replaced by `allowOutOfRange`. The input is a text field instead of a
  spinbutton.
- **PinInput:** remove `blurOnComplete` and `selectOnFocus`; blur in `onValueComplete` instead. Rename `sanitizeValue`
  to `normalizeValue`.
- **Accordion:** remove `loopFocus`; triggers are reached with `Tab`. `collapsible` defaults to `true`.
- **Combobox:** replace `disableLayer` with `inline`.
- **Menu:** replace `composite` with `popupType`.
- **Slider:** replace the `aria-label` and `aria-labelledby` arrays with `getAriaLabel` and `getAriaLabelledBy`.
- **Toc:** `multiple` defaults to `false`.
- **Tour:** the `"prev"` action is now `"previous"`.
- Part state types keep their names but now describe zag's root state, which absorbed the per-part states:
  `CollapsibleTriggerState`, `EditableAreaState`/`InputState`/`LabelState`/`PreviewState`, `DateInputControlState`,
  `PasswordInputInputState`/`VisibilityTriggerState`, `PinInputLabelState` and `RatingGroupControlState`.
- Context and hook APIs spell out "previous": `getPreviousTriggerProps()`, `goToPreviousPage()`,
  `translations.previousTriggerLabel`, `goToPreviousStep()`, `hasPreviousStep`, `selectPrevious()` and
  `scrollPrevious()`. Part names such as `Pagination.PrevTrigger` are unchanged.
- `StepChangeDetails` and `StepInvalidDetails` are replaced by `StepsValueChangeDetails` and
  `StepsNavigationBlockedDetails`, alongside `StepsCompleteDetails`, `StepsCompletedChangeDetails` and `StepsStepItem`.
- Overlays no longer get a `z-index` from zag. Set it on the positioner with `--layer-index`, e.g.
  `z-index: calc(1400 + var(--layer-index))`.
- New props: `hiddenUntilFound` on Accordion and Collapsible, `maxGranularity` on DateInput, `disabled` on Splitter and
  `Slider.Thumb`, `locale` on ColorPicker, and `collection`, `scrollToIndexFn`, `autoHighlight`, `initialFocusEl` and
  `finalFocusEl` on Menu.
- **Toggle:** the hook takes an optional `id`.
- **Vue:** Steps uses `v-model` for the current step value instead of `v-model:step`. NumberInput's `v-model` is a
  `number | null`.
- **Svelte:** Steps binds `value` instead of `step`.
