import type * as clipboard from '@zag-js/clipboard'

export interface RootProps {
  /**
   * A root node to correctly resolve document in custom environments. E.x.: Iframes, Electron.
   */
  getRootNode?: () => ShadowRoot | Node | Document
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
