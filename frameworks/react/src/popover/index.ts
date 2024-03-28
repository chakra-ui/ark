import type { OpenChangeDetails as PopoverOpenChangeDetails } from '@zag-js/popover'
import { PopoverAnchor, type PopoverAnchorProps } from './popover-anchor'
import { PopoverArrow, type PopoverArrowProps } from './popover-arrow'
import { PopoverArrowTip, type PopoverArrowTipProps } from './popover-arrow-tip'
import { PopoverCloseTrigger, type PopoverCloseTriggerProps } from './popover-close-trigger'
import { PopoverContent, type PopoverContentProps } from './popover-content'
import { PopoverContext, type PopoverContextProps } from './popover-context'
import { PopoverDescription, type PopoverDescriptionProps } from './popover-description'
import { PopoverIndicator, type PopoverIndicatorProps } from './popover-indicator'
import { PopoverPositioner, type PopoverPositionerProps } from './popover-positioner'
import { PopoverRoot, type PopoverRootProps } from './popover-root'
import { PopoverTitle, type PopoverTitleProps } from './popover-title'
import { PopoverTrigger, type PopoverTriggerProps } from './popover-trigger'
import { usePopoverContext, type UsePopoverContext } from './use-popover-context'

export * as Popover from './popover'

export {
  PopoverAnchor,
  PopoverArrow,
  PopoverArrowTip,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverContext,
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
  PopoverContextProps,
  PopoverDescriptionProps,
  PopoverIndicatorProps,
  PopoverOpenChangeDetails,
  PopoverPositionerProps,
  PopoverRootProps,
  PopoverTitleProps,
  PopoverTriggerProps,
  UsePopoverContext,
}
