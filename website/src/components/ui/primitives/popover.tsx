'use client'
import type { Assign } from '@ark-ui/react'
import { Popover } from '@ark-ui/react/popover'
import { type PopoverVariantProps, popover } from 'styled-system/recipes'
import type { ComponentProps, HTMLStyledProps } from 'styled-system/types'
import { createStyleContext } from '~/lib/create-style-context'

const { withRootProvider, withContext } = createStyleContext(popover)

export type RootProviderProps = ComponentProps<typeof RootProvider>
export const RootProvider = withRootProvider<
  Assign<Popover.RootProviderProps, PopoverVariantProps>
>(Popover.RootProvider)

export type RootProps = ComponentProps<typeof Root>
export const Root = withRootProvider<Assign<Popover.RootProps, PopoverVariantProps>>(Popover.Root)

export const Anchor = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Popover.AnchorBaseProps>
>(Popover.Anchor, 'anchor')

export const Arrow = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Popover.ArrowBaseProps>
>(Popover.Arrow, 'arrow')

export const ArrowTip = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Popover.ArrowTipBaseProps>
>(Popover.ArrowTip, 'arrowTip')

export const CloseTrigger = withContext<
  HTMLButtonElement,
  Assign<HTMLStyledProps<'button'>, Popover.CloseTriggerBaseProps>
>(Popover.CloseTrigger, 'closeTrigger')

export const Content = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Popover.ContentBaseProps>
>(Popover.Content, 'content')

export const Description = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Popover.DescriptionBaseProps>
>(Popover.Description, 'description')

export const Indicator = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Popover.IndicatorBaseProps>
>(Popover.Indicator, 'indicator')

export const Positioner = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Popover.PositionerBaseProps>
>(Popover.Positioner, 'positioner')

export const Title = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Popover.TitleBaseProps>
>(Popover.Title, 'title')

export const Trigger = withContext<
  HTMLButtonElement,
  Assign<HTMLStyledProps<'button'>, Popover.TriggerBaseProps>
>(Popover.Trigger, 'trigger')

export { PopoverContext as Context } from '@ark-ui/react/popover'
