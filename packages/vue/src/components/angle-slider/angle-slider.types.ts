import type * as angleSlider from '@zag-js/angle-slider'

export interface RootProps {
  /**
   * The initial value of the slider.
   * Use when you don't need to control the value of the slider.
   * @default 0
   */
  defaultValue?: number
  /**
   * The document's text/writing direction.
   * @default "ltr"
   */
  dir?: 'ltr' | 'rtl'
  /**
   * Whether the slider is disabled.
   */
  disabled?: boolean
  /**
   * A root node to correctly resolve document in custom environments. E.x.: Iframes, Electron.
   */
  getRootNode?: () => ShadowRoot | Document | Node
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The ids of the elements in the machine.
   * Useful for composition.
   */
  ids?: Partial<{ root: string; thumb: string; hiddenInput: string; control: string; valueText: string }>
  /**
   * Whether the slider is invalid.
   */
  invalid?: boolean
  /**
   * The v-model value of the angle slider
   */
  modelValue?: number
  /**
   * The name of the slider. Useful for form submission.
   */
  name?: string
  /**
   * Whether the slider is read-only.
   */
  readOnly?: boolean
  /**
   * The step value for the slider.
   * @default 1
   */
  step?: number
}

export type RootEmits = {
  /**
   * The callback function for when the value changes.
   */
  valueChange: [details: angleSlider.ValueChangeDetails]
  /**
   * The callback function for when the value changes ends.
   */
  valueChangeEnd: [details: angleSlider.ValueChangeDetails]
  /**
   * The callback fired when the model value changes.
   */
  'update:modelValue': [value: number]
}
