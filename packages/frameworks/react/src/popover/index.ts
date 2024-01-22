import type { OpenChangeDetails as PopoverOpenChangeDetails } from '@zag-js/popover'
import { PopoverAnchor, type PopoverAnchorProps } from './popover-anchor'
import { PopoverArrow, type PopoverArrowProps } from './popover-arrow'
import { PopoverArrowTip, type PopoverArrowTipProps } from './popover-arrow-tip'
import { PopoverCloseTrigger, type PopoverCloseTriggerProps } from './popover-close-trigger'
import { PopoverContent, type PopoverContentProps } from './popover-content'
import { usePopoverContext, type PopoverContext } from './popover-context'
import { PopoverDescription, type PopoverDescriptionProps } from './popover-description'
import { PopoverIndicator, type PopoverIndicatorProps } from './popover-indicator'
import { PopoverPositioner, type PopoverPositionerProps } from './popover-positioner'
import { PopoverRoot, type PopoverRootProps } from './popover-root'
import { PopoverTitle, type PopoverTitleProps } from './popover-title'
import { PopoverTrigger, type PopoverTriggerProps } from './popover-trigger'

export const Popover = {
  Root: PopoverRoot,
  Anchor: PopoverAnchor,
  Arrow: PopoverArrow,
  ArrowTip: PopoverArrowTip,
  CloseTrigger: PopoverCloseTrigger,
  Content: PopoverContent,
  Description: PopoverDescription,
  Indicator: PopoverIndicator,
  Positioner: PopoverPositioner,
  Title: PopoverTitle,
  Trigger: PopoverTrigger,
}

export {
  PopoverAnchor,
  PopoverArrow,
  PopoverArrowTip,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverDescription,
  PopoverIndicator,
  PopoverPositioner,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
  usePopoverContext,
}

export type {
  PopoverAnchorProps,
  PopoverArrowProps,
  PopoverArrowTipProps,
  PopoverCloseTriggerProps,
  PopoverContentProps,
  PopoverContext,
  PopoverDescriptionProps,
  PopoverIndicatorProps,
  PopoverOpenChangeDetails,
  PopoverPositionerProps,
  PopoverRootProps,
  PopoverTitleProps,
  PopoverTriggerProps,
}
