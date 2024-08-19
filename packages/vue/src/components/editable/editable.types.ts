import type * as editable from '@zag-js/editable'

export interface RootProps {
  /**
   * The activation mode for the preview element.
   *
   * - "focus" - Enter edit mode when the preview element is focused
   * - "dblclick" - Enter edit mode when the preview element is double-clicked
   * - "none" - No interaction with the preview element will trigger edit mode.
   *
   * @default "focus"
   */
  activationMode?: editable.ActivationMode
  /**
   * Whether the editable should auto-resize to fit the content.
   */
  autoResize?: boolean
  /**
   * The initial value of the editable when it is first rendered.
   * Use when you do not need to control the state of the editable.
   */
  defaultValue?: string
  /**
   * Whether the editable is disabled
   */
  disabled?: boolean
  /**
   * Whether the editable is in edit mode.
   */
  edit?: boolean
  /**
   * The element that should receive focus when the editable is closed.
   * By default, it will focus on the trigger element.
   */
  finalFocusEl?: () => HTMLElement | null
  /**
   * The associate form of the underlying input.
   */
  form?: string
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The ids of the elements in the editable. Useful for composition.
   */
  ids?: Partial<{
    root: string
    area: string
    label: string
    preview: string
    input: string
    control: string
    submitTrigger: string
    cancelTrigger: string
    editTrigger: string
  }>
  /**
   * Whether the input's value is invalid.
   */
  invalid?: boolean
  /**
   * The maximum number of characters allowed in the editable
   */
  maxLength?: number
  modelValue?: string
  /**
   * The name attribute of the editable component. Used for form submission.
   */
  name?: string
  /**
   * The placeholder value to show when the `value` is empty
   */
  placeholder?: string | { edit: string; preview: string }
  /**
   * Whether the editable is readonly
   */
  readOnly?: boolean
  /**
   * Whether the editable is required
   */
  required?: boolean
  /**
   * Whether to select the text in the input when it is focused.
   * @default true
   */
  selectOnFocus?: boolean
  /**
   * The action that triggers submit in the edit mode:
   *
   * - "enter" - Trigger submit when the enter key is pressed
   * - "blur" - Trigger submit when the editable is blurred
   * - "none" - No action will trigger submit. You need to use the submit button
   * - "both" - Pressing `Enter` and blurring the input will trigger submit
   *
   * @default "both"
   */
  submitMode?: editable.SubmitMode
  /**
   * Specifies the localized strings that identifies the accessibility elements and their states
   */
  translations?: editable.IntlTranslations
}

export type RootEmits = {
  /**
   * The callback that is called when in the edit mode.
   */
  editChange: [event: editable.EditChangeDetails]
  /**
   * Function called when the focus is moved outside the component
   */
  focusOutside: [event: editable.FocusOutsideEvent]
  /**
   * Function called when an interaction happens outside the component
   */
  interactOutside: [event: editable.InteractOutsideEvent]
  /**
   * Function called when the pointer is pressed down outside the component
   */
  pointerDownOutside: [event: editable.PointerDownOutsideEvent]
  /**
   * The callback that is called when the editable's value is changed
   */
  valueChange: [details: editable.ValueChangeDetails]
  /**
   * The callback that is called when the editable's value is submitted.
   */
  valueCommit: [details: editable.ValueChangeDetails]
  /**
   * The callback that is called when the esc key is pressed or the cancel button is clicked
   */
  valueRevert: [details: editable.ValueChangeDetails]
  /**
   * The callback fired when the model value changes.
   */
  'update:modelValue': [value: string]
}
