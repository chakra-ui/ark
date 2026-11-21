'use client'

import type { RootState } from '@zag-js/field'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useFieldContext } from './use-field-context.ts'

export interface FieldLabelState extends RootState {}
export interface FieldLabelBaseProps extends PolymorphicProps<FieldLabelState> {}
export interface FieldLabelProps extends HTMLProps<'label'>, FieldLabelBaseProps {}

export const FieldLabel = forwardRef<HTMLLabelElement, FieldLabelProps>((props, ref) => {
  const field = useFieldContext()
  const mergedProps = mergeProps<HTMLProps<'label'>>(field?.getLabelProps(), props)
  return <ark.label {...mergedProps} ref={ref} state={field?.getRootState()} />
})

FieldLabel.displayName = 'FieldLabel'
