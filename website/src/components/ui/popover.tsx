'use client'
import type { Assign } from '@ark-ui/react'
import { Popover } from '@ark-ui/react/popover'
import { type PopoverVariantProps, popover } from 'styled-system/recipes'
import type { JsxStyleProps } from 'styled-system/types'
import { createStyleContext } from '~/lib/create-style-context'

const { withRootProvider, withContext } = createStyleContext(popover)

export interface RootProps extends Popover.RootProps, PopoverVariantProps {}
export const Root = withRootProvider<RootProps>(Popover.Root)

export const Anchor = withContext<HTMLDivElement, Assign<JsxStyleProps, Popover.AnchorProps>>(
  Popover.Anchor,
  'anchor',
)

export const Arrow = withContext<HTMLDivElement, Assign<JsxStyleProps, Popover.ArrowProps>>(
  Popover.Arrow,
  'arrow',
)

export const ArrowTip = withContext<HTMLDivElement, Assign<JsxStyleProps, Popover.ArrowTipProps>>(
  Popover.ArrowTip,
  'arrowTip',
)

export const CloseTrigger = withContext<
  HTMLButtonElement,
  Assign<JsxStyleProps, Popover.CloseTriggerProps>
>(Popover.CloseTrigger, 'closeTrigger')

export const Content = withContext<HTMLDivElement, Assign<JsxStyleProps, Popover.ContentProps>>(
  Popover.Content,
  'content',
)

export const Description = withContext<
  HTMLParagraphElement,
  Assign<JsxStyleProps, Popover.DescriptionProps>
>(Popover.Description, 'description')

export const Indicator = withContext<HTMLDivElement, Assign<JsxStyleProps, Popover.IndicatorProps>>(
  Popover.Indicator,
  'indicator',
)

export const Positioner = withContext<
  HTMLDivElement,
  Assign<JsxStyleProps, Popover.PositionerProps>
>(Popover.Positioner, 'positioner')

export const Title = withContext<HTMLDivElement, Assign<JsxStyleProps, Popover.TitleProps>>(
  Popover.Title,
  'title',
)

export const Trigger = withContext<HTMLButtonElement, Assign<JsxStyleProps, Popover.TriggerProps>>(
  Popover.Trigger,
  'trigger',
)

export {
  PopoverContext as Context,
  type PopoverContextProps as ContextProps,
} from '@ark-ui/react/popover'
