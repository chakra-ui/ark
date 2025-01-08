import type * as qrcode from '@zag-js/qr-code'

export interface RootProps {
  /**
   * The initial value of the tabs when it is first rendered.
   * Use when you do not need to control the state of the tabs.
   */
  defaultValue?: string
  /**
   * The qr code encoding options.
   */
  encoding?: qrcode.QrCodeGenerateOptions
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The element ids.
   */
  ids?: Partial<{ root: string; frame: string }>
  /**
   * Use this prop to control the value of the qr code via v-model.
   */
  modelValue?: string
}

export type RootEmits = {
  /**
   * Callback fired when the value changes.
   */
  valueChange: [details: qrcode.ValueChangeDetails]
  /**
   * The callback fired when the model value changes.
   */
  'update:modelValue': [value: string]
}
