'use client'
import type { Assign } from '@ark-ui/react'
import { Tabs } from '@ark-ui/react/tabs'
import { type TabsVariantProps, tabs } from 'styled-system/recipes'
import type { JsxStyleProps } from 'styled-system/types'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(tabs)

export interface RootProps extends Assign<JsxStyleProps, Tabs.RootProps>, TabsVariantProps {}
export const Root = withProvider<HTMLDivElement, RootProps>(Tabs.Root, 'root')

export const Content = withContext<HTMLDivElement, Assign<JsxStyleProps, Tabs.ContentProps>>(
  Tabs.Content,
  'content',
)

export const Indicator = withContext<HTMLDivElement, Assign<JsxStyleProps, Tabs.IndicatorProps>>(
  Tabs.Indicator,
  'indicator',
)

export const List = withContext<HTMLDivElement, Assign<JsxStyleProps, Tabs.ListProps>>(
  Tabs.List,
  'list',
)

export const Trigger = withContext<HTMLButtonElement, Assign<JsxStyleProps, Tabs.TriggerProps>>(
  Tabs.Trigger,
  'trigger',
)

export { TabsContext as Context, type TabsContextProps as ContextProps } from '@ark-ui/react/tabs'
