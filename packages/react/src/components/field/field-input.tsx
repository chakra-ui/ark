'use client'

import type { RootState } from '@zag-js/field'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useFieldContext } from './use-field-context.ts'

export interface FieldInputState extends RootState {}
export interface FieldInputBaseProps extends PolymorphicProps<FieldInputState> {}
export interface FieldInputProps extends HTMLProps<'input'>, FieldInputBaseProps {}

export const FieldInput = forwardRef<HTMLInputElement, FieldInputProps>((props, ref) => {
  const field = useFieldContext()
  const mergedProps = mergeProps<HTMLProps<'input'>>(field?.getInputProps(), props)
  return <ark.input {...mergedProps} ref={ref} state={field?.getRootState()} />
})

FieldInput.displayName = 'FieldInput'
