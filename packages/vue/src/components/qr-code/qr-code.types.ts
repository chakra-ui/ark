import type * as qrcode from '@zag-js/qr-code'

export interface RootProps {
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
   * The value to encode.
   */
  value?: string
}
