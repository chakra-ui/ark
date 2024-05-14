'use client'
import { Clipboard } from '@ark-ui/react/clipboard'
import type { ComponentProps } from 'react'
import { styled } from 'styled-system/jsx'
import { clipboard } from 'styled-system/recipes'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(clipboard)

export const Root = withProvider(styled(Clipboard.Root), 'root')
export const Control = withContext(styled(Clipboard.Control), 'control')
export const Indicator = withContext(styled(Clipboard.Indicator), 'indicator')
export const Input = withContext(styled(Clipboard.Input), 'input')
export const Label = withContext(styled(Clipboard.Label), 'label')
export const Trigger = withContext(styled(Clipboard.Trigger), 'trigger')

export interface RootProps extends ComponentProps<typeof Root> {}
export interface ControlProps extends ComponentProps<typeof Control> {}
export interface IndicatorProps extends ComponentProps<typeof Indicator> {}
export interface InputProps extends ComponentProps<typeof Input> {}
export interface LabelProps extends ComponentProps<typeof Label> {}
export interface TriggerProps extends ComponentProps<typeof Trigger> {}
