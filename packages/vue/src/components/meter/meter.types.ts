import type * as meter from '@zag-js/meter'

export interface RootProps {
  /**
   * The initial value of the meter when rendered.
   * Use when you don't need to control the value of the meter.
   */
  defaultValue?: number
  /**
   * The options to use for formatting the value.
   * @default { style: "percent" }
   */
  formatOptions?: Intl.NumberFormatOptions
  /**
   * The lower numeric bound of the high end of the measured range.
   * Defaults to `max`.
   */
  high?: number
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The ids of the elements in the meter. Useful when the label lives outside
   * the machine and you need to control `aria-labelledby`.
   */
  ids?: Partial<{ label: string }>
  /**
   * The locale to use for formatting the value.
   */
  locale?: string
  /**
   * The upper numeric bound of the low end of the measured range.
   * Defaults to `min`.
   */
  low?: number
  /**
   * The maximum allowed value of the meter.
   * @default 100
   */
  max?: number
  /**
   * The minimum allowed value of the meter.
   * @default 0
   */
  min?: number
  /**
   * The v-model value of the meter
   */
  modelValue?: number
  /**
   * The optimal numeric value. Combined with `low` and `high`, this decides
   * which region is preferred (HTML `<meter>` algorithm).
   * Defaults to the midpoint of `min` and `max`.
   */
  optimum?: number
  /**
   * The orientation of the element.
   * @default "horizontal"
   */
  orientation?: 'horizontal' | 'vertical'
  /**
   * The localized messages to use.
   */
  translations?: meter.IntlTranslations
}

export type RootEmits = {
  /**
   * Callback fired when the value changes.
   */
  valueChange: [details: meter.ValueChangeDetails]
  /**
   * The callback fired when the model value changes.
   */
  'update:modelValue': [value: number]
}
