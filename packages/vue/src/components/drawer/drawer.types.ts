import type * as drawer from '@zag-js/drawer'

export interface RootProps {
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The ids of the elements in the drawer. Useful for composition.
   */
  ids?: Partial<{
    backdrop: string
    positioner: string
    content: string
    title: string
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
   * Whether the drawer is open.
   */
  open?: boolean
  /**
   * The initial open state of the drawer.
   */
  defaultOpen?: boolean
  /**
   * Whether to close the drawer when the outside is clicked.
   * @default true
   */
  closeOnInteractOutside?: boolean
  /**
   * Whether to close the drawer when the escape key is pressed.
   * @default true
   */
  closeOnEscape?: boolean
  /**
   * The snap points of the drawer.
   * @default [1]
   */
  snapPoints?: (number | string)[]
  /**
   * The direction in which the drawer can be swiped.
   * @default "down"
   */
  swipeDirection?: 'up' | 'down' | 'left' | 'right'
  /**
   * Whether the drawer should snap to sequential points when swiping.
   * @default false
   */
  snapToSequentialPoints?: boolean
  /**
   * The threshold velocity (in pixels/s) for closing the drawer.
   * @default 700
   */
  swipeVelocityThreshold?: number
  /**
   * The threshold distance for dismissing the drawer.
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
  snapPoint?: number | string
  /**
   * The default snap point of the drawer.
   * @default 1
   */
  defaultSnapPoint?: number | string
}

export type RootEmits = {
  /**
   * Function called when the open state changes.
   */
  openChange: [details: drawer.OpenChangeDetails]
  /**
   * Callback fired when the active snap point changes.
   */
  snapPointChange: [details: drawer.SnapPointChangeDetails]
}
