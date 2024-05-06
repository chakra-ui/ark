'use client'

import { Accordion } from '@ark-ui/react/accordion'
import type { ComponentProps } from 'react'
import { styled } from 'styled-system/jsx'
import { accordion } from 'styled-system/recipes'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(accordion)

export const Root = withProvider(styled(Accordion.Root), 'root')
export const Item = withContext(styled(Accordion.Item), 'item')
export const ItemContent = withContext(styled(Accordion.ItemContent), 'itemContent')
export const ItemIndicator = withContext(styled(Accordion.ItemIndicator), 'itemIndicator')
export const ItemTrigger = withContext(styled(Accordion.ItemTrigger), 'itemTrigger')

export interface RootProps extends ComponentProps<typeof Root> {}
export interface ItemProps extends ComponentProps<typeof Item> {}
export interface ItemContentProps extends ComponentProps<typeof ItemContent> {}
export interface ItemIndicatorProps extends ComponentProps<typeof ItemIndicator> {}
export interface ItemTriggerProps extends ComponentProps<typeof ItemTrigger> {}
