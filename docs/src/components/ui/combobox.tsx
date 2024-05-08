'use client'
import { Combobox } from '@ark-ui/react/combobox'
import type { ComponentProps } from 'react'
import { styled } from 'styled-system/jsx'
import { combobox } from 'styled-system/recipes'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(combobox)

export const Root = withProvider(styled(Combobox.Root), 'root')
export const ClearTrigger = withContext(styled(Combobox.ClearTrigger), 'clearTrigger')
export const Content = withContext(styled(Combobox.Content), 'content')
export const Control = withContext(styled(Combobox.Control), 'control')
export const Input = withContext(styled(Combobox.Input), 'input')
export const Item = withContext(styled(Combobox.Item), 'item')
export const ItemGroup = withContext(styled(Combobox.ItemGroup), 'itemGroup')
export const ItemGroupLabel = withContext(styled(Combobox.ItemGroupLabel), 'itemGroupLabel')
export const ItemIndicator = withContext(styled(Combobox.ItemIndicator), 'itemIndicator')
export const ItemText = withContext(styled(Combobox.ItemText), 'itemText')
export const Label = withContext(styled(Combobox.Label), 'label')
export const Positioner = withContext(styled(Combobox.Positioner), 'positioner')
export const Trigger = withContext(styled(Combobox.Trigger), 'trigger')

export interface RootProps extends ComponentProps<typeof Root> {}
export interface ClearTriggerProps extends ComponentProps<typeof ClearTrigger> {}
export interface ContentProps extends ComponentProps<typeof Content> {}
export interface ControlProps extends ComponentProps<typeof Control> {}
export interface InputProps extends ComponentProps<typeof Input> {}
export interface ItemProps extends ComponentProps<typeof Item> {}
export interface ItemGroupProps extends ComponentProps<typeof ItemGroup> {}
export interface ItemGroupLabelProps extends ComponentProps<typeof ItemGroupLabel> {}
export interface ItemIndicatorProps extends ComponentProps<typeof ItemIndicator> {}
export interface ItemTextProps extends ComponentProps<typeof ItemText> {}
export interface LabelProps extends ComponentProps<typeof Label> {}
export interface PositionerProps extends ComponentProps<typeof Positioner> {}
export interface TriggerProps extends ComponentProps<typeof Trigger> {}
