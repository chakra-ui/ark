'use client'
import type { Assign } from '@ark-ui/react'
import { Field } from '@ark-ui/react/field'
import { field } from 'styled-system/recipes'
import type { ComponentProps, HTMLStyledProps } from 'styled-system/types'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(field)

export type RootProviderProps = ComponentProps<typeof RootProvider>
export const RootProvider = withProvider<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Field.RootProviderBaseProps>
>(Field.RootProvider, 'root')

export type RootProps = ComponentProps<typeof Root>
export const Root = withProvider<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Field.RootBaseProps>
>(Field.Root, 'root')

export type LabelProps = ComponentProps<typeof Label>
export const Label = withContext<
  HTMLLabelElement,
  Assign<HTMLStyledProps<'label'>, Field.LabelBaseProps>
>(Field.Label, 'label')

export type InputProps = ComponentProps<typeof Input>
export const Input = withContext<
  HTMLInputElement,
  Assign<HTMLStyledProps<'input'>, Field.InputBaseProps>
>(Field.Input, 'input')

export type HelperTextProps = ComponentProps<typeof HelperText>
export const HelperText = withContext<
  HTMLSpanElement,
  Assign<HTMLStyledProps<'span'>, Field.HelperTextBaseProps>
>(Field.HelperText, 'helperText')

export type ErrorTextProps = ComponentProps<typeof ErrorText>
export const ErrorText = withContext<
  HTMLSpanElement,
  Assign<HTMLStyledProps<'span'>, Field.ErrorTextBaseProps>
>(Field.ErrorText, 'errorText')

export {
  FieldContext as Context,
  type FieldContextProps as ContextProps,
} from '@ark-ui/react/field'
