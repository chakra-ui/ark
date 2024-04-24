import type * as hoverCard from '@zag-js/hover-card'

export interface HoverCardRootProps {
  /**
   * The duration from when the mouse leaves the trigger or content until the hover card closes.
   */
  closeDelay?: number
  /**
   * The initial open state of the hover card.
   */
  defaultOpen?: boolean
  /**
   * The document's text/writing direction.
   * @default "ltr"
   */
  dir?: 'ltr' | 'rtl'
  /**
   * A root node to correctly resolve document in custom environments. E.x.: Iframes, Electron.
   */
  getRootNode?: () => ShadowRoot | Node | Document
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The ids of the elements in the popover. Useful for composition.
   */
  ids?: Partial<{ trigger: string; content: string; positioner: string; arrow: string }>
  /**
   * Whether the hover card is open
   */
  open?: boolean
  /**
   * The duration from when the mouse enters the trigger until the hover card opens.
   */
  openDelay?: number
  /**
   * The user provided options used to position the popover content
   */
  positioning?: hoverCard.PositioningOptions
}

export type HoverCardRootEmits = {
  /**
   * Function called when the hover card opens or closes.
   */
  openChange: [details: hoverCard.OpenChangeDetails]

  'update:open': [open: boolean]
}
