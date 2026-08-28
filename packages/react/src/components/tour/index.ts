export { waitForElement, waitForElementValue, waitForPromise, type WaitOptions } from '@zag-js/tour'
export { waitForEvent, type WaitForEventOptions } from './wait-for-event.ts'
export type {
  FocusOutsideEvent as TourFocusOutsideEvent,
  InteractOutsideEvent as TourInteractOutsideEvent,
  PointerDownOutsideEvent as TourPointerDownOutsideEvent,
  StepDetails as TourStepDetails,
  StepEffectArgs as TourStepEffectArgs,
} from '@zag-js/tour'
export {
  TourActionTrigger,
  type TourActionTriggerBaseProps,
  type TourActionTriggerProps,
} from './tour-action-trigger.tsx'
export { TourActions, type TourActionsProps } from './tour-actions.tsx'
export { TourArrow, type TourArrowBaseProps, type TourArrowProps } from './tour-arrow.tsx'
export { TourArrowTip, type TourArrowTipBaseProps, type TourArrowTipProps } from './tour-arrow-tip.tsx'
export { TourBackdrop, type TourBackdropBaseProps, type TourBackdropProps } from './tour-backdrop.tsx'
export { TourCloseTrigger, type TourCloseTriggerBaseProps, type TourCloseTriggerProps } from './tour-close-trigger.tsx'
export { TourContent, type TourContentBaseProps, type TourContentProps } from './tour-content.tsx'
export { TourContext, type TourContextProps } from './tour-context.tsx'
export { TourControl, type TourControlBaseProps, type TourControlProps } from './tour-control.tsx'
export { TourDescription, type TourDescriptionBaseProps, type TourDescriptionProps } from './tour-description.tsx'
export { TourPositioner, type TourPositionerBaseProps, type TourPositionerProps } from './tour-positioner.tsx'
export { TourProgressText, type TourProgressTextBaseProps, type TourProgressTextProps } from './tour-progress-text.tsx'
export { TourRoot, type TourRootBaseProps, type TourRootProps } from './tour-root.tsx'
export { TourSpotlight, type TourSpotlightBaseProps, type TourSpotlightProps } from './tour-spotlight.tsx'
export { TourTitle, type TourTitleBaseProps, type TourTitleProps } from './tour-title.tsx'
export { tourAnatomy } from './tour.anatomy.ts'
export { useTour, type UseTourProps, type UseTourReturn } from './use-tour.ts'
export { useTourContext, type UseTourContext } from './use-tour-context.ts'

export * as Tour from './tour.ts'
