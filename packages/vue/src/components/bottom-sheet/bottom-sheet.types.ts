import type * as bottomSheet from '@zag-js/bottom-sheet'

export interface RootProps {
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The ids of the elements in the bottom sheet. Useful for composition.
   */
  ids?: Partial<{
    backdrop: string
    content: string
    trigger: string
    grabber: string
    grabberIndicator: string
    closeTrigger: string
  }>
  /**
   * Whether to trap focus inside the sheet when it's opened.
   * @default true
   */
  trapFocus?: boolean
  /**
   * Whether to prevent scrolling behind the sheet when it's opened
   * @default true
   */
  preventScroll?: boolean
  /**
   * Whether to prevent pointer interaction outside the element and hide all content below it.
   * @default true
   */
  modal?: boolean
  /**
   * Element to receive focus when the sheet is opened.
   */
  initialFocusEl?: () => HTMLElement | null
  /**
   * Element to receive focus when the sheet is closed.
   */
  finalFocusEl?: () => HTMLElement | null
  /**
   * Whether to restore focus to the element that had focus before the sheet was opened.
   */
  restoreFocus?: boolean
  /**
   * The sheet's role
   * @default "dialog"
   */
  role?: 'dialog' | 'alertdialog'
  /**
   * Whether the bottom sheet is open.
   */
  open?: boolean
  /**
   * The initial open state of the bottom sheet.
   */
  defaultOpen?: boolean
  /**
   * Whether to close the bottom sheet when the outside is clicked.
   * @default true
   */
  closeOnInteractOutside?: boolean
  /**
   * Whether to close the bottom sheet when the escape key is pressed.
   * @default true
   */
  closeOnEscape?: boolean
  /**
   * The snap points of the bottom sheet.
   * Array of numbers or strings representing the snap points.
   * @default [1]
   */
  snapPoints?: (number | string)[]
  /**
   * The threshold velocity (in pixels/s) for closing the bottom sheet.
   * @default 5
   */
  swipeVelocityThreshold?: number
  /**
   * The threshold distance for dismissing the bottom sheet.
   * @default 0.25
   */
  closeThreshold?: number
  /**
   * Whether to prevent dragging on scrollable elements.
   * @default true
   */
  preventDragOnScroll?: boolean
  /**
   * The currently active snap point.
   */
  activeSnapPoint?: number | string
  /**
   * The default active snap point of the bottom sheet.
   * @default 1
   */
  defaultActiveSnapPoint?: number | string
}

export type RootEmits = {
  /**
   * Function called when the open state changes.
   */
  openChange: [details: bottomSheet.OpenChangeDetails]
  /**
   * Callback fired when the active snap point changes.
   */
  activeSnapPointChange: [details: { snapPoint: number | string }]
}
