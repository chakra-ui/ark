import type * as hoverCard from '@zag-js/hover-card'

export interface RootProps {
  /**
   * The duration from when the mouse leaves the trigger or content until the hover card closes.
   * @default 300
   */
  closeDelay?: number
  /**
   * The initial open state of the hover card when rendered.
   * Use when you don't need to control the open state of the hover card.
   */
  defaultOpen?: boolean
  /**
   * The initial trigger value when rendered.
   * Use when you don't need to control the trigger value.
   */
  defaultTriggerValue?: string | null
  /**
   * Whether the hover card is disabled
   */
  disabled?: boolean
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The ids of the elements in the popover. Useful for composition.
   */
  ids?: hoverCard.ElementIds
  /**
   * The controlled open state of the hover card
   */
  open?: boolean
  /**
   * The duration from when the mouse enters the trigger until the hover card opens.
   * @default 600
   */
  openDelay?: number
  /**
   * The user provided options used to position the popover content
   */
  positioning?: hoverCard.PositioningOptions
  /**
   * The controlled trigger value
   */
  triggerValue?: string | null
}

export type RootEmits = {
  /**
   * Function called when the focus is moved outside the component
   */
  focusOutside: [event: hoverCard.FocusOutsideEvent]
  /**
   * Function called when an interaction happens outside the component
   */
  interactOutside: [event: hoverCard.InteractOutsideEvent]
  /**
   * Function called when the hover card opens or closes.
   */
  openChange: [details: hoverCard.OpenChangeDetails]
  /**
   * Function called when the pointer is pressed down outside the component
   */
  pointerDownOutside: [event: hoverCard.PointerDownOutsideEvent]
  /**
   * Function called when the trigger value changes.
   */
  triggerValueChange: [details: hoverCard.TriggerValueChangeDetails]
  /**
   * Function called when the animation ends in the open state
   */
  enterComplete: []
  /**
   * Function called when the animation ends in the closed state
   */
  exitComplete: []
  /**
   * The callback fired when the open state changes.
   */
  'update:open': [open: boolean]
  /**
   * The callback fired when the trigger value changes.
   */
  'update:triggerValue': [triggerValue: string | null]
}
