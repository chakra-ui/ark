import type * as dialog from '@zag-js/dialog'

export interface RootProps {
  /**
   * Human readable label for the dialog, in event the dialog title is not rendered
   */
  'aria-label'?: string
  /**
   * Whether to close the dialog when the escape key is pressed
   */
  closeOnEscape?: boolean
  /**
   * Whether to close the dialog when the outside is clicked
   */
  closeOnInteractOutside?: boolean
  /**
   * The initial open state of the dialog when it is first rendered.
   * Use when you do not need to control its open state.
   */
  defaultOpen?: boolean
  /**
   * Element to receive focus when the dialog is closed
   */
  finalFocusEl?: HTMLElement | (() => HTMLElement)
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
  initialFocusEl?: HTMLElement | (() => HTMLElement)
  /**
   * Whether to prevent pointer interaction outside the element and hide all content below it
   */
  modal?: boolean
  /**
   * Whether the dialog is open
   */
  open?: boolean
  /**
   * Whether to prevent scrolling behind the dialog when it's opened
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
   */
  trapFocus?: boolean
}

export type RootEmits = {
  /**
   * Callback to be invoked when the escape key is pressed
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
   * Callback to be invoked when the dialog is opened or closed
   */
  openChange: [details: dialog.OpenChangeDetails]
  /**
   * Function called when the pointer is pressed down outside the component
   */
  pointerDownOutside: [event: dialog.PointerDownOutsideEvent]
  'update:open': [open: boolean]
}
