'use client'
import type { Assign } from '@ark-ui/react'
import { Clipboard } from '@ark-ui/react/clipboard'
import { type ClipboardVariantProps, clipboard } from 'styled-system/recipes'
import type { ComponentProps, HTMLStyledProps } from 'styled-system/types'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(clipboard)

export type RootProviderProps = ComponentProps<typeof RootProvider>
export const RootProvider = withProvider<
  HTMLDivElement,
  Assign<Assign<HTMLStyledProps<'div'>, Clipboard.RootProviderBaseProps>, ClipboardVariantProps>
>(Clipboard.RootProvider, 'root')

export type RootProps = ComponentProps<typeof Root>
export const Root = withProvider<
  HTMLDivElement,
  Assign<Assign<HTMLStyledProps<'div'>, Clipboard.RootBaseProps>, ClipboardVariantProps>
>(Clipboard.Root, 'root')

export const Control = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Clipboard.ControlBaseProps>
>(Clipboard.Control, 'control')

export const Indicator = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Clipboard.IndicatorBaseProps>
>(Clipboard.Indicator, 'indicator')

export const Input = withContext<
  HTMLInputElement,
  Assign<HTMLStyledProps<'input'>, Clipboard.InputBaseProps>
>(Clipboard.Input, 'input')

export const Label = withContext<
  HTMLLabelElement,
  Assign<HTMLStyledProps<'label'>, Clipboard.LabelBaseProps>
>(Clipboard.Label, 'label')

export const Trigger = withContext<
  HTMLButtonElement,
  Assign<HTMLStyledProps<'button'>, Clipboard.TriggerBaseProps>
>(Clipboard.Trigger, 'trigger')

export { ClipboardContext as Context } from '@ark-ui/react/clipboard'
