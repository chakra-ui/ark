import type * as dialog from '@zag-js/dialog'

export interface RootProps {
  /**
   * Human readable label for the dialog, in event the dialog title is not rendered
   */
  'aria-label'?: string
  /**
   * Whether to close the dialog when the escape key is pressed
   * @default true
   */
  closeOnEscape?: boolean
  /**
   * Whether to close the dialog when the outside is clicked
   * @default `true` for modal dialogs, `false` for non-modal dialogs
   */
  closeOnInteractOutside?: boolean
  /**
   * The initial open state of the dialog when rendered.
   * Use when you don't need to control the open state of the dialog.
   * @default false
   */
  defaultOpen?: boolean
  /**
   * The initial active trigger value when rendered.
   * Use when you don't need to control the active trigger value.
   */
  defaultTriggerValue?: string | null
  /**
   * Element to receive focus when the dialog is closed
   */
  finalFocusEl?: () => import('@zag-js/types').MaybeElement
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The ids of the elements in the dialog. Useful for composition.
   */
  ids?: dialog.ElementIds
  /**
   * Element to receive focus when the dialog is opened.
   * Return `false` to skip moving focus, or `null` to use the default.
   */
  initialFocusEl?: (() => import('@zag-js/types').MaybeElement | false) | null
  /**
   * Whether to prevent pointer interaction outside the element and hide all content below it
   * @default true
   */
  modal?: boolean
  /**
   * The controlled open state of the dialog
   */
  open?: boolean
  /**
   * Returns the persistent elements that:
   * - should not have pointer-events disabled
   * - should not trigger the dismiss event
   */
  persistentElements?: (() => Element | null)[]
  /**
   * Whether to prevent scrolling behind the dialog when it's opened
   * @default true
   */
  preventScroll?: boolean
  /**
   * Whether to restore focus to the element that had focus before the dialog was opened
   */
  restoreFocus?: boolean
  /**
   * The dialog's role
   * @default "dialog"
   */
  role?: 'dialog' | 'alertdialog'
  /**
   * Whether to trap focus inside the dialog when it's opened
   * @default true
   */
  trapFocus?: boolean
  /**
   * The controlled active trigger value
   */
  triggerValue?: string | null
}

export type RootEmits = {
  /**
   * Function called when the escape key is pressed
   */
  escapeKeyDown: [event: KeyboardEvent]
  /**
   * Function called when the focus is moved outside the component
   */
  focusOutside: [event: dialog.FocusOutsideEvent]
  /**
   * Function called when an interaction happens outside the component
   */
  interactOutside: [event: dialog.InteractOutsideEvent]
  /**
   * Function to call when the dialog's open state changes
   */
  openChange: [details: dialog.OpenChangeDetails]
  /**
   * Function called when the pointer is pressed down outside the component
   */
  pointerDownOutside: [event: dialog.PointerDownOutsideEvent]
  /**
   * Function called when this layer is closed due to a parent layer being closed
   */
  requestDismiss: [
    event: import('../../../../../node_modules/.bun/@zag-js+dismissable@2.0.0-next.4/node_modules/@zag-js/dismissable/dist/layer-stack.mjs').LayerDismissEvent,
  ]
  /**
   * Function to call when the active trigger changes
   */
  triggerValueChange: [details: dialog.TriggerValueChangeDetails]
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
