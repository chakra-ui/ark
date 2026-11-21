'use client'

import type { RootState } from '@zag-js/field'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useFieldContext } from './use-field-context.ts'

export interface FieldSelectState extends RootState {}
export interface FieldSelectBaseProps extends PolymorphicProps<FieldSelectState> {}
export interface FieldSelectProps extends HTMLProps<'select'>, FieldSelectBaseProps {}

export const FieldSelect = forwardRef<HTMLSelectElement, FieldSelectProps>((props, ref) => {
  const field = useFieldContext()
  const mergedProps = mergeProps<HTMLProps<'select'>>(field?.getSelectProps(), props)
  return <ark.select {...mergedProps} ref={ref} state={field?.getRootState()} />
})

FieldSelect.displayName = 'FieldSelect'
