import type * as colorPicker from '@zag-js/color-picker'

export interface RootProps {
  /**
   * Whether to close the color picker when a swatch is selected
   */
  closeOnSelect?: boolean
  /**
   * The initial open state of the color picker.
   */
  defaultOpen?: boolean
  /**
   * The initial value of the color picker when it is first rendered.
   * Use when you do not need to control the state of the color picker.
   */
  defaultValue?: string
  /**
   * Whether the color picker is disabled
   */
  disabled?: boolean
  /**
   * The color format to use
   */
  format?: colorPicker.ColorFormat
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The ids of the elements in the color picker. Useful for composition.
   */
  ids?: Partial<{
    root: string
    control: string
    trigger: string
    label: string
    input: string
    content: string
    area: string
    areaGradient: string
    areaThumb: string
    channelInput(id: string): string
    channelSliderTrack(id: colorPicker.ColorChannel): string
    channelSliderThumb(id: colorPicker.ColorChannel): string
  }>
  /**
   * The initial focus element when the color picker is opened.
   */
  initialFocusEl?: HTMLElement | (() => HTMLElement)
  modelValue?: string
  /**
   * The name for the form input
   */
  name?: string
  /**
   * Whether the color picker is open
   */
  open?: boolean
  /**
   * The positioning options for the color picker
   */
  positioning?: colorPicker.PositioningOptions
  /**
   * Whether the color picker is read-only
   */
  readOnly?: boolean
}

export type RootEmits = {
  /**
   * Function called when the focus is moved outside the component
   */
  focusOutside: [event: colorPicker.FocusOutsideEvent]
  /**
   * Function called when the color format changes
   */
  formatChange: [details: colorPicker.FormatChangeDetails]
  /**
   * Function called when an interaction happens outside the component
   */
  interactOutside: [event: colorPicker.InteractOutsideEvent]
  /**
   * Handler that is called when the user opens or closes the color picker.
   */
  openChange: [details: colorPicker.OpenChangeDetails]
  /**
   * Function called when the pointer is pressed down outside the component
   */
  pointerDownOutside: [event: colorPicker.PointerDownOutsideEvent]
  /**
   * Handler that is called when the value changes, as the user drags.
   */
  valueChange: [details: colorPicker.ValueChangeDetails]
  /**
   * Handler that is called when the user stops dragging.
   */
  valueChangeEnd: [details: colorPicker.ValueChangeDetails]
  /**
   * The callback fired when the model value changes.
   */
  'update:modelValue': [value: string]
  'update:open': [open: boolean]
}
