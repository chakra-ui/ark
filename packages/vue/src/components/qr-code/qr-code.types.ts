import type * as qrcode from '@zag-js/qr-code'

export interface RootProps {
  /**
   * The initial value to encode when rendered.
   * Use when you don't need to control the value of the qr code.
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
   * The v-model value of the qr code
   */
  modelValue?: string
  /**
   * The pixel size of the qr code.
   */
  pixelSize?: number
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
