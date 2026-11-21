'use client'

import type { RootState } from '@zag-js/field'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useFieldContext } from './use-field-context.ts'

export interface FieldHelperTextState extends RootState {}
export interface FieldHelperTextBaseProps extends PolymorphicProps<FieldHelperTextState> {}
export interface FieldHelperTextProps extends HTMLProps<'span'>, FieldHelperTextBaseProps {}

export const FieldHelperText = forwardRef<HTMLSpanElement, FieldHelperTextProps>((props, ref) => {
  const field = useFieldContext()
  const mergedProps = mergeProps<HTMLProps<'span'>>(field?.getHelperTextProps(), props)
  return <ark.span {...mergedProps} ref={ref} state={field?.getRootState()} />
})

FieldHelperText.displayName = 'FieldHelperText'
