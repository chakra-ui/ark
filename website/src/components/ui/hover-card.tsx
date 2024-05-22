'use client'
import type { Assign } from '@ark-ui/react'
import { HoverCard } from '@ark-ui/react/hover-card'
import { type HoverCardVariantProps, hoverCard } from 'styled-system/recipes'
import type { JsxStyleProps } from 'styled-system/types'
import { createStyleContext } from '~/lib/create-style-context'

const { withRootProvider, withContext } = createStyleContext(hoverCard)

export interface RootProps extends HoverCard.RootProps, HoverCardVariantProps {}
export const Root = withRootProvider<RootProps>(HoverCard.Root)

export const Arrow = withContext<HTMLDivElement, Assign<JsxStyleProps, HoverCard.ArrowProps>>(
  HoverCard.Arrow,
  'arrow',
)

export const ArrowTip = withContext<HTMLDivElement, Assign<JsxStyleProps, HoverCard.ArrowTipProps>>(
  HoverCard.ArrowTip,
  'arrowTip',
)

export const Content = withContext<HTMLDivElement, Assign<JsxStyleProps, HoverCard.ContentProps>>(
  HoverCard.Content,
  'content',
)

export const Positioner = withContext<
  HTMLDivElement,
  Assign<JsxStyleProps, HoverCard.PositionerProps>
>(HoverCard.Positioner, 'positioner')

export const Trigger = withContext<
  HTMLButtonElement,
  Assign<JsxStyleProps, HoverCard.TriggerProps>
>(HoverCard.Trigger, 'trigger')

export {
  HoverCardContext as Context,
  type HoverCardContextProps as ContextProps,
} from '@ark-ui/react/hover-card'
