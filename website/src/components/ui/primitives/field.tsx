'use client'
import type { Assign } from '@ark-ui/react'
import { Field } from '@ark-ui/react/field'
import { type FieldVariantProps, field } from 'styled-system/recipes'
import type { ComponentProps, HTMLStyledProps } from 'styled-system/types'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(field)

export type RootProviderProps = ComponentProps<typeof RootProvider>
export const RootProvider = withProvider<
  HTMLDivElement,
  Assign<Assign<HTMLStyledProps<'div'>, Field.RootProviderBaseProps>, FieldVariantProps>
>(Field.RootProvider, 'root')

export type RootProps = ComponentProps<typeof Root>
export const Root = withProvider<
  HTMLDivElement,
  Assign<Assign<HTMLStyledProps<'div'>, Field.RootBaseProps>, FieldVariantProps>
>(Field.Root, 'root')

export const ErrorText = withContext<
  HTMLSpanElement,
  Assign<HTMLStyledProps<'span'>, Field.ErrorTextBaseProps>
>(Field.ErrorText, 'errorText')

export const HelperText = withContext<
  HTMLSpanElement,
  Assign<HTMLStyledProps<'span'>, Field.HelperTextBaseProps>
>(Field.HelperText, 'helperText')

export const Input = withContext<
  HTMLInputElement,
  Assign<HTMLStyledProps<'input'>, Field.InputBaseProps>
>(Field.Input, 'input')

export const Label = withContext<
  HTMLLabelElement,
  Assign<HTMLStyledProps<'label'>, Field.LabelBaseProps>
>(Field.Label, 'label')

export const Select = withContext<
  HTMLSelectElement,
  Assign<HTMLStyledProps<'select'>, Field.SelectBaseProps>
>(Field.Select, 'select')

export const Textarea = withContext<
  HTMLTextAreaElement,
  Assign<HTMLStyledProps<'textarea'>, Field.TextareaBaseProps>
>(Field.Textarea, 'textarea')

export { FieldContext as Context } from '@ark-ui/react/field'
