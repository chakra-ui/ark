import type { Time } from '@internationalized/date'
import type * as timePicker from '@zag-js/time-picker'

export interface RootProps {
  /**
   * Whether to show the seconds.
   */
  allowSeconds?: boolean
  /**
   * The initial open state of the time picker when it is first rendered.
   * Use when you do not need to control its open state.
   */
  defaultOpen?: boolean
  /**
   * The initial value of the time picker when it is first rendered.
   * Use when you do not need to control the state of the time picker.
   */
  defaultValue?: Time
  /**
   * Whether to disable the interaction outside logic
   */
  disableLayer?: boolean
  /**
   * Whether the time picker is disabled.
   */
  disabled?: boolean
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The ids of the elements in the date picker. Useful for composition.
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
   * The locale (BCP 47 language tag) to use when formatting the time.
   */
  locale?: string
  /**
   * The maximum time that can be selected.
   */
  max?: Time
  /**
   * The minimum time that can be selected.
   */
  min?: Time
  /**
   * The `name` attribute of the input element.
   */
  name?: string
  /**
   * Whether the timepicker is open
   */
  open?: boolean
  /**
   * The placeholder text of the input.
   */
  placeholder?: string
  /**
   * The user provided options used to position the time picker content
   */
  positioning?: import('/Users/colinlienard/dev/ark/node_modules/@zag-js/popper/dist/index').PositioningOptions
  /**
   * Whether the time picker is read-only.
   */
  readOnly?: boolean
  /**
   * The steps of each time unit.
   */
  steps?: { hour?: number; minute?: number; second?: number }
  /**
   * The selected time.
   */
  value?: Time
}

export type RootEmits = {
  /**
   * Function called when the focused date changes.
   */
  focusChange: [details: timePicker.FocusChangeDetails]
  /**
   * Function called when the time picker opens or closes.
   */
  openChange: [details: timePicker.OpenChangeDetails]
  /**
   * Function called when the value changes.
   */
  valueChange: [value: timePicker.ValueChangeDetails]
}
