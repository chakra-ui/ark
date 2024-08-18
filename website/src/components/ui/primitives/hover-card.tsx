'use client'
import type { Assign } from '@ark-ui/react'
import { HoverCard } from '@ark-ui/react/hover-card'
import { type HoverCardVariantProps, hoverCard } from 'styled-system/recipes'
import type { ComponentProps, HTMLStyledProps } from 'styled-system/types'
import { createStyleContext } from '~/lib/create-style-context'

const { withRootProvider, withContext } = createStyleContext(hoverCard)

export type RootProviderProps = ComponentProps<typeof RootProvider>
export const RootProvider = withRootProvider<
  Assign<HoverCard.RootProviderProps, HoverCardVariantProps>
>(HoverCard.RootProvider)

export type RootProps = ComponentProps<typeof Root>
export const Root = withRootProvider<Assign<HoverCard.RootProps, HoverCardVariantProps>>(
  HoverCard.Root,
)

export const Arrow = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, HoverCard.ArrowBaseProps>
>(HoverCard.Arrow, 'arrow')

export const ArrowTip = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, HoverCard.ArrowTipBaseProps>
>(HoverCard.ArrowTip, 'arrowTip')

export const Content = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, HoverCard.ContentBaseProps>
>(HoverCard.Content, 'content')

export const Positioner = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, HoverCard.PositionerBaseProps>
>(HoverCard.Positioner, 'positioner')

export const Trigger = withContext<
  HTMLButtonElement,
  Assign<HTMLStyledProps<'button'>, HoverCard.TriggerBaseProps>
>(HoverCard.Trigger, 'trigger')

export { HoverCardContext as Context } from '@ark-ui/react/hover-card'
