'use client'
import type { Assign } from '@ark-ui/react'
import { Menu } from '@ark-ui/react/menu'
import { type MenuVariantProps, menu } from 'styled-system/recipes'
import type { JsxStyleProps } from 'styled-system/types'
import { createStyleContext } from '~/lib/create-style-context'

const { withRootProvider, withContext } = createStyleContext(menu)

export interface RootProps extends Menu.RootProps, MenuVariantProps {}
export const Root = withRootProvider<RootProps>(Menu.Root)

export const Arrow = withContext<HTMLDivElement, Assign<JsxStyleProps, Menu.ArrowProps>>(
  Menu.Arrow,
  'arrow',
)

export const ArrowTip = withContext<HTMLDivElement, Assign<JsxStyleProps, Menu.ArrowTipProps>>(
  Menu.ArrowTip,
  'arrowTip',
)

export const CheckboxItem = withContext<
  HTMLDivElement,
  Assign<JsxStyleProps, Menu.CheckboxItemProps>
>(Menu.CheckboxItem, 'item')

export const Content = withContext<HTMLDivElement, Assign<JsxStyleProps, Menu.ContentProps>>(
  Menu.Content,
  'content',
)

export const ContextTrigger = withContext<
  HTMLButtonElement,
  Assign<JsxStyleProps, Menu.ContextTriggerProps>
>(Menu.ContextTrigger, 'contextTrigger')

export const Indicator = withContext<HTMLDivElement, Assign<JsxStyleProps, Menu.IndicatorProps>>(
  Menu.Indicator,
  'indicator',
)

export const ItemGroupLabel = withContext<
  HTMLDivElement,
  Assign<JsxStyleProps, Menu.ItemGroupLabelProps>
>(Menu.ItemGroupLabel, 'itemGroupLabel')

export const ItemGroup = withContext<HTMLDivElement, Assign<JsxStyleProps, Menu.ItemGroupProps>>(
  Menu.ItemGroup,
  'itemGroup',
)

export const ItemIndicator = withContext<
  HTMLDivElement,
  Assign<JsxStyleProps, Menu.ItemIndicatorProps>
>(Menu.ItemIndicator, 'itemIndicator')

export const Item = withContext<HTMLDivElement, Assign<JsxStyleProps, Menu.ItemProps>>(
  Menu.Item,
  'item',
)

export const ItemText = withContext<HTMLDivElement, Assign<JsxStyleProps, Menu.ItemTextProps>>(
  Menu.ItemText,
  'itemText',
)

export const Positioner = withContext<HTMLDivElement, Assign<JsxStyleProps, Menu.PositionerProps>>(
  Menu.Positioner,
  'positioner',
)

export const RadioItemGroup = withContext<
  HTMLDivElement,
  Assign<JsxStyleProps, Menu.RadioItemGroupProps>
>(Menu.RadioItemGroup, 'itemGroup')

export const RadioItem = withContext<HTMLDivElement, Assign<JsxStyleProps, Menu.RadioItemProps>>(
  Menu.RadioItem,
  'item',
)

export const Separator = withContext<HTMLHRElement, Assign<JsxStyleProps, Menu.SeparatorProps>>(
  Menu.Separator,
  'separator',
)

export const TriggerItem = withContext<
  HTMLDivElement,
  Assign<JsxStyleProps, Menu.TriggerItemProps>
>(Menu.TriggerItem, 'triggerItem')

export const Trigger = withContext<HTMLButtonElement, Assign<JsxStyleProps, Menu.TriggerProps>>(
  Menu.Trigger,
  'trigger',
)

export { MenuContext as Context, type MenuContextProps as ContextProps } from '@ark-ui/react/menu'
