import type { Time } from '@internationalized/date'
import type { PositioningOptions } from '@zag-js/popper'
import type * as timePicker from '@zag-js/time-picker'

export interface RootProps {
  /**
   * The locale (BCP 47 language tag) to use when formatting the time.
   */
  locale?: string
  /**
   * The selected time.
   */
  value?: Time | null
  /**
   * Whether the timepicker is open
   */
  open?: boolean
  /**
   * Whether the timepicker open state is controlled by the user
   */
  'open.controlled'?: boolean
  /**
   * The ids of the elements in the time picker. Useful for composition.
   */
  ids?: Partial<{
    trigger: string
    input: string
    positioner: string
    content: string
    clearTrigger: string
    control: string
    column(unit: timePicker.TimeUnit): string
  }>
  /**
   * The `name` attribute of the input element.
   */
  name?: string
  /**
   * The user provided options used to position the time picker content
   */
  positioning?: PositioningOptions
  /**
   * The placeholder text of the input.
   */
  placeholder?: string
  /**
   * Whether the time picker is disabled.
   */
  disabled?: boolean
  /**
   * Whether the time picker is read-only.
   */
  readOnly?: boolean
  /**
   * The minimum time that can be selected.
   */
  min?: Time
  /**
   * The maximum time that can be selected.
   */
  max?: Time
  /**
   * The steps of each time unit.
   */
  steps?: { hour?: number; minute?: number; second?: number }
  /**
   * Whether to show the seconds.
   */
  allowSeconds?: boolean
  /**
   * Whether to disable the interaction outside logic
   */
  disableLayer?: boolean
}

export type RootEmits = {
  /**
   * Function called when the value changes.
   */
  valueChange: [value: timePicker.ValueChangeDetails]
  /**
   * Function called when the time picker opens or closes.
   */
  openChange: [details: timePicker.OpenChangeDetails]
  /**
   * Function called when the focused date changes.
   */
  focusChange: [details: timePicker.FocusChangeDetails]
  /**
   * The callback fired when the model value changes.
   */
  'update:modelValue': [value: Time | null]
  'update:open': [open: boolean]
}
