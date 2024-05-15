import type * as clipboard from '@zag-js/clipboard'

export interface RootProps {
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The ids of the elements in the clipboard. Useful for composition.
   */
  ids?: Partial<{ root: string; input: string; label: string }>
  /**
   * The timeout for the copy operation
   * @default 3000
   */
  timeout?: number
  /**
   * The value to be copied to the clipboard
   */
  value?: string
}

export type RootEmits = {
  /**
   * The function to be called when the value is copied to the clipboard
   */
  statusChange: [details: clipboard.CopyStatusDetails]
}
