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
   * @default true
   */
  closeOnInteractOutside?: boolean
  /**
   * The initial open state of the dialog when rendered.
   * Use when you don't need to control the open state of the dialog.
   * @default false
   */
  defaultOpen?: boolean
  /**
   * Element to receive focus when the dialog is closed
   */
  finalFocusEl?: () => HTMLElement | null
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The ids of the elements in the dialog. Useful for composition.
   */
  ids?: Partial<{
    trigger: string
    positioner: string
    backdrop: string
    content: string
    closeTrigger: string
    title: string
    description: string
  }>
  /**
   * Element to receive focus when the dialog is opened
   */
  initialFocusEl?: () => HTMLElement | null
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
    event: CustomEvent<{
      originalLayer: HTMLElement
      targetLayer: HTMLElement | undefined
      originalIndex: number
      targetIndex: number
    }>,
  ]
  /**
   * The callback fired when the open state changes.
   */
  'update:open': [open: boolean]
  /**
   * Function called when the animation ends in the closed state
   */
  exitComplete: []
}
