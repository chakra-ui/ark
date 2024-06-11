export interface RootProps {
  /**
   * The qr code encoding options.
   */
  // biome-ignore lint/suspicious/noExplicitAny: Fix with next release of @zag-js/qr-code
  encoding?: any
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
