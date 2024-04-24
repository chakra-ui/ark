import type * as collapsible from '@zag-js/collapsible'

export interface CollapsibleRootProps {
  /**
   * The document's text/writing direction.
   * @default "ltr"
   */
  dir?: 'ltr' | 'rtl'
  /**
   * Whether the collapsible is disabled
   */
  disabled?: boolean
  /**
   * A root node to correctly resolve document in custom environments. E.x.: Iframes, Electron.
   */
  getRootNode?: () => ShadowRoot | Node | Document
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The ids of the elements in the collapsible. Useful for composition.
   */
  ids?: Partial<{ root: string; content: string; trigger: string }>
  /**
   * Whether to enable lazy mounting
   * @default false
   */
  lazyMount?: boolean
  /**
   * Whether the collapsible is open
   */
  open?: boolean
  /**
   * Whether to unmount on exit.
   * @default false
   */
  unmountOnExit?: boolean
}

export type CollapsibleRootEmits = {
  /**
   * Function called when the animation ends in the closed state.
   */
  exitComplete: []
  /**
   * Function called when the popup is opened
   */
  openChange: [details: collapsible.OpenChangeDetails]
}
