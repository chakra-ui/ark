'use client'
import type { Assign } from '@ark-ui/react'
import { Tooltip } from '@ark-ui/react'
import { type TooltipVariantProps, tooltip } from 'styled-system/recipes'
import type { JsxStyleProps } from 'styled-system/types'
import { createStyleContext } from '~/lib/create-style-context'

const { withRootProvider, withContext } = createStyleContext(tooltip)

export interface RootProps extends Tooltip.RootProps, TooltipVariantProps {}
export const Root = withRootProvider<RootProps>(Tooltip.Root)

export const Arrow = withContext<HTMLDivElement, Assign<JsxStyleProps, Tooltip.ArrowProps>>(
  Tooltip.Arrow,
  'arrow',
)

export const ArrowTip = withContext<HTMLDivElement, Assign<JsxStyleProps, Tooltip.ArrowTipProps>>(
  Tooltip.ArrowTip,
  'arrowTip',
)

export const Content = withContext<HTMLDivElement, Assign<JsxStyleProps, Tooltip.ContentProps>>(
  Tooltip.Content,
  'content',
)

export const Positioner = withContext<
  HTMLDivElement,
  Assign<JsxStyleProps, Tooltip.PositionerProps>
>(Tooltip.Positioner, 'positioner')

export const Trigger = withContext<HTMLButtonElement, Assign<JsxStyleProps, Tooltip.TriggerProps>>(
  Tooltip.Trigger,
  'trigger',
)

export {
  TooltipContext as Context,
  type TooltipContextProps as ContextProps,
} from '@ark-ui/react/tooltip'
