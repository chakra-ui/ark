'use client'
import type { Assign } from '@ark-ui/react'
import { NumberInput } from '@ark-ui/react/number-input'
import { type NumberInputVariantProps, numberInput } from 'styled-system/recipes'
import type { ComponentProps, HTMLStyledProps } from 'styled-system/types'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(numberInput)

export type RootProviderProps = ComponentProps<typeof RootProvider>
export const RootProvider = withProvider<
  HTMLDivElement,
  Assign<Assign<HTMLStyledProps<'div'>, NumberInput.RootProviderBaseProps>, NumberInputVariantProps>
>(NumberInput.RootProvider, 'root')

export type RootProps = ComponentProps<typeof Root>
export const Root = withProvider<
  HTMLDivElement,
  Assign<Assign<HTMLStyledProps<'div'>, NumberInput.RootBaseProps>, NumberInputVariantProps>
>(NumberInput.Root, 'root')

export const Control = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, NumberInput.ControlBaseProps>
>(NumberInput.Control, 'control')

export const DecrementTrigger = withContext<
  HTMLButtonElement,
  Assign<HTMLStyledProps<'button'>, NumberInput.DecrementTriggerBaseProps>
>(NumberInput.DecrementTrigger, 'decrementTrigger')

export const IncrementTrigger = withContext<
  HTMLButtonElement,
  Assign<HTMLStyledProps<'button'>, NumberInput.IncrementTriggerBaseProps>
>(NumberInput.IncrementTrigger, 'incrementTrigger')

export const Input = withContext<
  HTMLInputElement,
  Assign<HTMLStyledProps<'input'>, NumberInput.InputBaseProps>
>(NumberInput.Input, 'input')

export const Label = withContext<
  HTMLLabelElement,
  Assign<HTMLStyledProps<'label'>, NumberInput.LabelBaseProps>
>(NumberInput.Label, 'label')

export const Scrubber = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, NumberInput.ScrubberBaseProps>
>(NumberInput.Scrubber, 'scrubber')

export const ValueText = withContext<
  HTMLSpanElement,
  Assign<HTMLStyledProps<'span'>, NumberInput.ValueTextBaseProps>
>(NumberInput.ValueText, 'valueText')

export { NumberInputContext as Context } from '@ark-ui/react/number-input'
