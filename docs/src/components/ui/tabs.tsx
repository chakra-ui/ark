'use client'

import { Tabs } from '@ark-ui/react/tabs'
import type { ComponentProps } from 'react'
import { styled } from 'styled-system/jsx'
import { tabs } from 'styled-system/recipes'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(tabs)

export const Root = withProvider(styled(Tabs.Root), 'root')
export const Content = withContext(styled(Tabs.Content), 'content')
export const Indicator = withContext(styled(Tabs.Indicator), 'indicator')
export const List = withContext(styled(Tabs.List), 'list')
export const Trigger = withContext(styled(Tabs.Trigger), 'trigger')

export interface RootProps extends ComponentProps<typeof Root> {}
export interface ContentProps extends ComponentProps<typeof Content> {}
export interface IndicatorProps extends ComponentProps<typeof Indicator> {}
export interface ListProps extends ComponentProps<typeof List> {}
export interface TriggerProps extends ComponentProps<typeof Trigger> {}
