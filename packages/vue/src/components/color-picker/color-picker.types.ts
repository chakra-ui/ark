import type * as colorPicker from '@zag-js/color-picker'

export interface RootProps {
  /**
   * Whether to close the color picker when a swatch is selected
   * @default false
   */
  closeOnSelect?: boolean
  /**
   * The initial color format when rendered.
   * Use when you don't need to control the color format of the color picker.
   * @default "rgba"
   */
  defaultFormat?: colorPicker.ColorFormat
  /**
   * The initial open state of the color picker when rendered.
   * Use when you don't need to control the open state of the color picker.
   */
  defaultOpen?: boolean
  /**
   * The initial color value when rendered.
   * Use when you don't need to control the color value of the color picker.
   * @default #000000
   */
  defaultValue?: colorPicker.Color
  /**
   * Whether the color picker is disabled
   */
  disabled?: boolean
  /**
   * The controlled color format to use
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
    hiddenInput: string
    content: string
    area: string
    areaGradient: string
    positioner: string
    formatSelect: string
    areaThumb: string
    channelInput(id: string): string
    channelSliderTrack(id: colorPicker.ColorChannel): string
    channelSliderThumb(id: colorPicker.ColorChannel): string
  }>
  /**
   * The initial focus element when the color picker is opened.
   */
  initialFocusEl?: () => HTMLElement | null
  /**
   * Whether the color picker is invalid
   */
  invalid?: boolean
  /**
   * The v-model value of the color picker
   */
  modelValue?: colorPicker.Color
  /**
   * The name for the form input
   */
  name?: string
  /**
   * The controlled open state of the color picker
   */
  open?: boolean
  /**
   * Whether to auto focus the color picker when it is opened
   * @default true
   */
  openAutoFocus?: boolean
  /**
   * The positioning options for the color picker
   */
  positioning?: colorPicker.PositioningOptions
  /**
   * Whether the color picker is read-only
   */
  readOnly?: boolean
  /**
   * Whether the color picker is required
   */
  required?: boolean
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
  'update:modelValue': [value: colorPicker.Color]
  /**
   * The callback fired when the open state changes.
   */
  'update:open': [open: boolean]
  /**
   * The callback fired when the format changes.
   */
  'update:format': [format: colorPicker.ColorFormat]
}
