import type * as tooltip from '@zag-js/tooltip'

export interface RootProps {
  /**
   * Custom label for the tooltip.
   */
  'aria-label'?: string
  /**
   * The close delay of the tooltip.
   * @default 150
   */
  closeDelay?: number
  /**
   * Whether the tooltip should close on click
   * @default true
   */
  closeOnClick?: boolean
  /**
   * Whether to close the tooltip when the Escape key is pressed.
   * @default true
   */
  closeOnEscape?: boolean
  /**
   * Whether to close the tooltip on pointerdown.
   * @default true
   */
  closeOnPointerDown?: boolean
  /**
   * Whether the tooltip should close on scroll
   * @default true
   */
  closeOnScroll?: boolean
  /**
   * The initial open state of the tooltip when rendered.
   * Use when you don't need to control the open state of the tooltip.
   */
  defaultOpen?: boolean
  /**
   * The initial trigger value when rendered.
   * Use when you don't need to control the trigger value.
   */
  defaultTriggerValue?: string | null
  /**
   * Whether the tooltip is disabled
   */
  disabled?: boolean
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The ids of the elements in the tooltip. Useful for composition.
   */
  ids?: tooltip.ElementIds
  /**
   * Whether the tooltip's content is interactive.
   * In this mode, the tooltip will remain open when user hovers over the content.
   * @see https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus
   *
   * @default false
   */
  interactive?: boolean
  /**
   * The controlled open state of the tooltip
   */
  open?: boolean
  /**
   * The open delay of the tooltip.
   * @default 400
   */
  openDelay?: number
  /**
   * The user provided options used to position the popover content
   */
  positioning?: tooltip.PositioningOptions
  /**
   * The controlled trigger value
   */
  triggerValue?: string | null
}

export type RootEmits = {
  /**
   * Function called when the tooltip is opened.
   */
  openChange: [details: tooltip.OpenChangeDetails]
  /**
   * Function called when the trigger value changes.
   */
  triggerValueChange: [details: tooltip.TriggerValueChangeDetails]
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
