import type * as hoverCard from '@zag-js/hover-card'

export interface RootProps {
  /**
   * The duration from when the mouse leaves the trigger or content until the hover card closes.
   * @default 300
   */
  closeDelay?: number
  /**
   * The initial open state of the hover card when it is first rendered.
   * Use when you do not need to control its open state.
   */
  defaultOpen?: boolean
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
   * @default 700
   */
  openDelay?: number
  /**
   * The user provided options used to position the popover content
   */
  positioning?: hoverCard.PositioningOptions
}

export type RootEmits = {
  /**
   * Function called when the hover card opens or closes.
   */
  openChange: [details: hoverCard.OpenChangeDetails]
  'update:open': [open: boolean]
}
