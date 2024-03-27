import type { OpenChangeDetails } from '@zag-js/tooltip'
import { TooltipArrow as Arrow, type TooltipArrowProps as ArrowProps } from './tooltip-arrow'
import {
  TooltipArrowTip as ArrowTip,
  type TooltipArrowTipProps as ArrowTipProps,
} from './tooltip-arrow-tip'
import {
  TooltipContent as Content,
  type TooltipContentProps as ContentProps,
} from './tooltip-content'
import {
  TooltipContext as Context,
  type TooltipContextProps as ContextProps,
} from './tooltip-context'
import {
  TooltipPositioner as Positioner,
  type TooltipPositionerProps as PositionerProps,
} from './tooltip-positioner'
import { TooltipRoot as Root, type TooltipRootProps as RootProps } from './tooltip-root'
import {
  TooltipTrigger as Trigger,
  type TooltipTriggerProps as TriggerProps,
} from './tooltip-trigger'

export { Arrow, ArrowTip, Content, Context, Positioner, Root, Trigger }
export type {
  ArrowProps,
  ArrowTipProps,
  ContentProps,
  ContextProps,
  OpenChangeDetails,
  PositionerProps,
  RootProps,
  TriggerProps,
}
