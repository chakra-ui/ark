import type * as progress from '@zag-js/progress'

export interface RootProps {
  /**
   * The initial value of the progress bar when rendered.
   * Use when you don't need to control the value of the progress bar.
   * @default 50
   */
  defaultValue?: number | null
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The ids of the elements in the progress bar. Useful for composition.
   */
  ids?: Partial<{ root: string; track: string; label: string; circle: string }>
  /**
   * The maximum allowed value of the progress bar.
   * @default 100
   */
  max?: number
  /**
   * The minimum allowed value of the progress bar.
   * @default 0
   */
  min?: number
  /**
   * The v-model value of the progress
   */
  modelValue?: number | null
  /**
   * The orientation of the element.
   * @default "horizontal"
   */
  orientation?: 'horizontal' | 'vertical'
  /**
   * The localized messages to use.
   */
  translations?: progress.IntlTranslations
  /**
   * The controlled value of the progress bar.
   */
  value?: number | null
}

export type RootEmits = {
  /**
   * Callback fired when the value changes.
   */
  valueChange: [details: progress.ValueChangeDetails]
  /**
   * The callback fired when the model value changes.
   */
  'update:modelValue': [value: number | null]
}
