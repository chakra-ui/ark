export type {
  FocusOutsideEvent as TourFocusOutsideEvent,
  InteractOutsideEvent as TourInteractOutsideEvent,
  PointerDownOutsideEvent as TourPointerDownOutsideEvent,
  StepDetails as TourStepDetails,
} from '@zag-js/tour'
export {
  default as TourActionTrigger,
  type TourActionTriggerBaseProps,
  type TourActionTriggerProps,
} from './tour-action-trigger.svelte'
export { default as TourActions, type TourActionsProps } from './tour-actions.svelte'
export { default as TourArrowTip, type TourArrowTipBaseProps, type TourArrowTipProps } from './tour-arrow-tip.svelte'
export { default as TourArrow, type TourArrowBaseProps, type TourArrowProps } from './tour-arrow.svelte'
export { default as TourBackdrop, type TourBackdropBaseProps, type TourBackdropProps } from './tour-backdrop.svelte'
export {
  default as TourCloseTrigger,
  type TourCloseTriggerBaseProps,
  type TourCloseTriggerProps,
} from './tour-close-trigger.svelte'
export { default as TourContent, type TourContentBaseProps, type TourContentProps } from './tour-content.svelte'
export { default as TourContext, type TourContextProps } from './tour-context.svelte'
export { default as TourControl, type TourControlBaseProps, type TourControlProps } from './tour-control.svelte'
export {
  default as TourDescription,
  type TourDescriptionBaseProps,
  type TourDescriptionProps,
} from './tour-description.svelte'
export {
  default as TourPositioner,
  type TourPositionerBaseProps,
  type TourPositionerProps,
} from './tour-positioner.svelte'
export {
  default as TourProgressText,
  type TourProgressTextBaseProps,
  type TourProgressTextProps,
} from './tour-progress-text.svelte'
export { default as TourRoot, type TourRootBaseProps, type TourRootProps } from './tour-root.svelte'
export { default as TourSpotlight, type TourSpotlightBaseProps, type TourSpotlightProps } from './tour-spotlight.svelte'
export { default as TourTitle, type TourTitleBaseProps, type TourTitleProps } from './tour-title.svelte'
export { tourAnatomy } from './tour.anatomy'
export { useTourContext, type UseTourContext } from './use-tour-context'
export { useTour, type UseTourProps, type UseTourReturn } from './use-tour.svelte'

export * as Tour from './tour'
