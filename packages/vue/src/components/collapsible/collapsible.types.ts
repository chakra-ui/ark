import type * as collapsible from '@zag-js/collapsible'

export interface RootProps {
  /**
   * The initial open state of the collapsible when rendered.
   * Use when you don't need to control the open state of the collapsible.
   */
  defaultOpen?: boolean
  /**
   * Whether the collapsible is disabled.
   */
  disabled?: boolean
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
   * The controlled open state of the collapsible.
   */
  open?: boolean
  /**
   * Whether to unmount on exit.
   * @default false
   */
  unmountOnExit?: boolean
}

export type RootEmits = {
  /**
   * The callback invoked when the exit animation completes.
   */
  exitComplete: []
  /**
   * The callback invoked when the open state changes.
   */
  openChange: [details: collapsible.OpenChangeDetails]
  /**
   * Event handler called when the open state of the collapsible changes.
   */
  'update:open': [open: boolean]
}
