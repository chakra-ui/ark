import type * as drawer from '@zag-js/drawer'

export interface RootProps {
  /**
   * Whether to close the drawer when the escape key is pressed.
   * @default true
   */
  closeOnEscape?: boolean
  /**
   * Whether to close the drawer when the outside is clicked.
   * @default true
   */
  closeOnInteractOutside?: boolean
  /**
   * The threshold distance for dismissing the drawer.
   * @default 0.25
   */
  closeThreshold?: number
  /**
   * The initial open state of the drawer.
   */
  defaultOpen?: boolean
  defaultSnapPoint?: drawer.SnapPoint | null
  /**
   * The default trigger value (uncontrolled).
   */
  defaultTriggerValue?: string | null
  /**
   * Element to receive focus when the sheet is closed.
   */
  finalFocusEl?: () => import('@zag-js/types').MaybeElement
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The ids of the elements in the drawer. Useful for composition.
   */
  ids?: drawer.ElementIds
  /**
   * Element to receive focus when the sheet is opened.
   * Return `false` to skip moving focus, or `null` to use the default.
   */
  initialFocusEl?: (() => import('@zag-js/types').MaybeElement | false) | null
  /**
   * Whether to prevent pointer interaction outside the element and hide all content below it.
   * @default true
   */
  modal?: boolean
  /**
   * Whether the drawer is open.
   */
  open?: boolean
  /**
   * Whether to prevent dragging on scrollable elements.
   * When enabled, the sheet will not start dragging if the user is interacting with a scrollable element.
   * @default true
   */
  preventDragOnScroll?: boolean
  /**
   * Whether to prevent scrolling behind the sheet when it's opened
   * @default true
   */
  preventScroll?: boolean
  /**
   * Whether to restore focus to the element that had focus before the sheet was opened.
   * @default true
   */
  restoreFocus?: boolean
  /**
   * The sheet's role
   * @default "dialog"
   */
  role?: 'dialog' | 'alertdialog'
  /**
   * The currently active snap point.
   */
  snapPoint?: drawer.SnapPoint | null
  /**
   * The snap points of the drawer.
   * Array of numbers or strings representing the snap points.
   * @default [1]
   */
  snapPoints?: drawer.SnapPoint[]
  /**
   * Whether the drawer should snap to sequential points when swiping.
   * @default false
   */
  snapToSequentialPoints?: boolean
  /**
   * Optional external store for coordinating app-level drawer stack visuals
   * (e.g. indent and background layers).
   */
  stack?: drawer.DrawerStack
  /**
   * The direction in which the drawer can be swiped.
   * @default "down"
   */
  swipeDirection?: drawer.SwipeDirection
  /**
   * The threshold velocity (in pixels/s) for closing the drawer.
   * @default 700
   */
  swipeVelocityThreshold?: number
  /**
   * Whether to trap focus inside the sheet when it's opened.
   * @default true
   */
  trapFocus?: boolean
  /**
   * The value of the trigger that currently controls the drawer.
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
  focusOutside: [event: drawer.FocusOutsideEvent]
  /**
   * Function called when an interaction happens outside the component
   */
  interactOutside: [event: drawer.InteractOutsideEvent]
  /**
   * Function called when the open state changes.
   */
  openChange: [details: drawer.OpenChangeDetails]
  /**
   * Function called when the pointer is pressed down outside the component
   */
  pointerDownOutside: [event: drawer.PointerDownOutsideEvent]
  /**
   * Function called when this layer is closed due to a parent layer being closed
   */
  requestDismiss: [
    event: import('../../../../../node_modules/.bun/@zag-js+dismissable@2.0.0-next.4/node_modules/@zag-js/dismissable/dist/layer-stack.mjs').LayerDismissEvent,
  ]
  /**
   * Callback fired when the snap point changes.
   */
  snapPointChange: [details: drawer.SnapPointChangeDetails]
  /**
   * Callback when the active trigger value changes.
   */
  triggerValueChange: [details: drawer.TriggerValueChangeDetails]
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
   * The callback fired when the snap point changes.
   */
  'update:snapPoint': [snapPoint: drawer.SnapPoint | null]
  /**
   * The callback fired when the trigger value changes.
   */
  'update:triggerValue': [triggerValue: string | null]
}
