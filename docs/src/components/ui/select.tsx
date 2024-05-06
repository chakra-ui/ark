'use client'

import { Select } from '@ark-ui/react/select'
import type { ComponentProps } from 'react'
import { styled } from 'styled-system/jsx'
import { select } from 'styled-system/recipes'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(select)

export const Root = withProvider(styled(Select.Root), 'root')
export const ClearTrigger = withContext(styled(Select.ClearTrigger), 'clearTrigger')
export const Content = withContext(styled(Select.Content), 'content')
export const Control = withContext(styled(Select.Control), 'control')
export const Indicator = withContext(styled(Select.Indicator), 'indicator')
export const Item = withContext(styled(Select.Item), 'item')
export const ItemGroup = withContext(styled(Select.ItemGroup), 'itemGroup')
export const ItemGroupLabel = withContext(styled(Select.ItemGroupLabel), 'itemGroupLabel')
export const ItemIndicator = withContext(styled(Select.ItemIndicator), 'itemIndicator')
export const ItemText = withContext(styled(Select.ItemText), 'itemText')
export const Label = withContext(styled(Select.Label), 'label')
export const Positioner = withContext(styled(Select.Positioner), 'positioner')
export const Trigger = withContext(styled(Select.Trigger), 'trigger')
export const ValueText = withContext(styled(Select.ValueText), 'valueText')

export interface RootProps extends ComponentProps<typeof Root> {}
export interface ClearTriggerProps extends ComponentProps<typeof ClearTrigger> {}
export interface ContentProps extends ComponentProps<typeof Content> {}
export interface ControlProps extends ComponentProps<typeof Control> {}
export interface IndicatorProps extends ComponentProps<typeof Indicator> {}
export interface ItemProps extends ComponentProps<typeof Item> {}
export interface ItemGroupProps extends ComponentProps<typeof ItemGroup> {}
export interface ItemGroupLabelProps extends ComponentProps<typeof ItemGroupLabel> {}
export interface ItemIndicatorProps extends ComponentProps<typeof ItemIndicator> {}
export interface ItemTextProps extends ComponentProps<typeof ItemText> {}
export interface LabelProps extends ComponentProps<typeof Label> {}
export interface PositionerProps extends ComponentProps<typeof Positioner> {}
export interface TriggerProps extends ComponentProps<typeof Trigger> {}
export interface ValueTextProps extends ComponentProps<typeof ValueText> {}
