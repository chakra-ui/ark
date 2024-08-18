'use client'
import type { Assign } from '@ark-ui/react'
import { Menu } from '@ark-ui/react/menu'
import { type MenuVariantProps, menu } from 'styled-system/recipes'
import type { ComponentProps, HTMLStyledProps } from 'styled-system/types'
import { createStyleContext } from '~/lib/create-style-context'

const { withRootProvider, withContext } = createStyleContext(menu)

export type RootProviderProps = ComponentProps<typeof RootProvider>
export const RootProvider = withRootProvider<Assign<Menu.RootProviderProps, MenuVariantProps>>(
  Menu.RootProvider,
)

export type RootProps = ComponentProps<typeof Root>
export const Root = withRootProvider<Assign<Menu.RootProps, MenuVariantProps>>(Menu.Root)

export const Arrow = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Menu.ArrowBaseProps>
>(Menu.Arrow, 'arrow')

export const ArrowTip = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Menu.ArrowTipBaseProps>
>(Menu.ArrowTip, 'arrowTip')

export const CheckboxItem = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Menu.CheckboxItemBaseProps>
>(Menu.CheckboxItem, 'item')

export const Content = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Menu.ContentBaseProps>
>(Menu.Content, 'content')

export const ContextTrigger = withContext<
  HTMLButtonElement,
  Assign<HTMLStyledProps<'button'>, Menu.ContextTriggerBaseProps>
>(Menu.ContextTrigger, 'contextTrigger')

export const Indicator = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Menu.IndicatorBaseProps>
>(Menu.Indicator, 'indicator')

export const ItemGroupLabel = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Menu.ItemGroupLabelBaseProps>
>(Menu.ItemGroupLabel, 'itemGroupLabel')

export const ItemGroup = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Menu.ItemGroupBaseProps>
>(Menu.ItemGroup, 'itemGroup')

export const ItemIndicator = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Menu.ItemIndicatorBaseProps>
>(Menu.ItemIndicator, 'itemIndicator')

export const Item = withContext<HTMLDivElement, Assign<HTMLStyledProps<'div'>, Menu.ItemBaseProps>>(
  Menu.Item,
  'item',
)

export const ItemText = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Menu.ItemTextBaseProps>
>(Menu.ItemText, 'itemText')

export const Positioner = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Menu.PositionerBaseProps>
>(Menu.Positioner, 'positioner')

export const RadioItemGroup = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Menu.RadioItemGroupBaseProps>
>(Menu.RadioItemGroup, 'itemGroup')

export const RadioItem = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Menu.RadioItemBaseProps>
>(Menu.RadioItem, 'item')

export const Separator = withContext<
  HTMLHRElement,
  Assign<HTMLStyledProps<'hr'>, Menu.SeparatorBaseProps>
>(Menu.Separator, 'separator')

export const TriggerItem = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Menu.TriggerItemBaseProps>
>(Menu.TriggerItem, 'triggerItem')

export const Trigger = withContext<
  HTMLButtonElement,
  Assign<HTMLStyledProps<'button'>, Menu.TriggerBaseProps>
>(Menu.Trigger, 'trigger')

export { MenuContext as Context } from '@ark-ui/react/menu'
