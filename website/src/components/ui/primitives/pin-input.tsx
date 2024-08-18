'use client'
import type { Assign } from '@ark-ui/react'
import { PinInput } from '@ark-ui/react/pin-input'
import { type PinInputVariantProps, pinInput } from 'styled-system/recipes'
import type { ComponentProps, HTMLStyledProps } from 'styled-system/types'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(pinInput)

export type RootProviderProps = ComponentProps<typeof RootProvider>
export const RootProvider = withProvider<
  HTMLDivElement,
  Assign<Assign<HTMLStyledProps<'div'>, PinInput.RootProviderBaseProps>, PinInputVariantProps>
>(PinInput.RootProvider, 'root')

export type RootProps = ComponentProps<typeof Root>
export const Root = withProvider<
  HTMLDivElement,
  Assign<Assign<HTMLStyledProps<'div'>, PinInput.RootBaseProps>, PinInputVariantProps>
>(PinInput.Root, 'root')

export const Control = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, PinInput.ControlBaseProps>
>(PinInput.Control, 'control')

export const Input = withContext<
  HTMLInputElement,
  Assign<HTMLStyledProps<'input'>, PinInput.InputBaseProps>
>(PinInput.Input, 'input')

export const Label = withContext<
  HTMLLabelElement,
  Assign<HTMLStyledProps<'label'>, PinInput.LabelBaseProps>
>(PinInput.Label, 'label')

export {
  PinInputContext as Context,
  PinInputHiddenInput as HiddenInput,
} from '@ark-ui/react/pin-input'
