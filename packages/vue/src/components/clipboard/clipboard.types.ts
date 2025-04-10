import type * as clipboard from '@zag-js/clipboard'

export interface RootProps {
  /**
   * The initial value to be copied to the clipboard when rendered.
   * Use when you don't need to control the value of the clipboard.
   */
  defaultValue?: string
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The ids of the elements in the clipboard. Useful for composition.
   */
  ids?: Partial<{ root: string; input: string; label: string }>
  /**
   * The v-model value of the clipboard
   */
  modelValue?: string
  /**
   * The timeout for the copy operation
   * @default 3000
   */
  timeout?: number
}

export type RootEmits = {
  /**
   * The function to be called when the value is copied to the clipboard
   */
  statusChange: [details: clipboard.CopyStatusDetails]
  /**
   * The function to be called when the value changes
   */
  valueChange: [details: clipboard.ValueChangeDetails]
  /**
   * The callback fired when the model value changes.
   */
  'update:modelValue': [value: string]
}
