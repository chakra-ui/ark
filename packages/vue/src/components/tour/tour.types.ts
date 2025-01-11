import type * as tour from '@zag-js/tour'

export interface RootProps {
  /**
   * Whether to close the tour when the user presses the escape key
   * @default true
   */
  closeOnEscape?: boolean
  /**
   * Whether to close the tour when the user clicks outside the tour
   * @default true
   */
  closeOnInteractOutside?: boolean
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The ids of the elements in the tour. Useful for composition.
   */
  ids?: Partial<{
    content: string
    title: string
    description: string
    positioner: string
    backdrop: string
    arrow: string
  }>
  /**
   * Whether to allow keyboard navigation (right/left arrow keys to navigate between steps)
   * @default true
   */
  keyboardNavigation?: boolean
  /**
   * Prevents interaction with the rest of the page while the tour is open
   * @default false
   */
  preventInteraction?: boolean
  /**
   * The offsets to apply to the spotlight
   * @default "{ x: 10, y: 10 }"
   */
  spotlightOffset?: tour.Point
  /**
   * The radius of the spotlight clip path
   * @default 4
   */
  spotlightRadius?: number
  /**
   * The id of the currently highlighted step
   */
  stepId?: string
  /**
   * The steps of the tour
   */
  steps?: tour.StepDetails[]
  /**
   * The translations for the tour
   */
  translations?: tour.IntlTranslations
}

export type RootEmits = {
  /**
   * Function called when the focus is moved outside the component
   */
  focusOutside: [event: tour.FocusOutsideEvent]
  /**
   * Function called when an interaction happens outside the component
   */
  interactOutside: [event: tour.InteractOutsideEvent]
  /**
   * Function called when the pointer is pressed down outside the component
   */
  pointerDownOutside: [event: tour.PointerDownOutsideEvent]
  /**
   * Callback when the tour is opened or closed
   */
  statusChange: [details: tour.StatusChangeDetails]
  /**
   * Callback when the highlighted step changes
   */
  stepChange: [details: tour.StepChangeDetails]
}
