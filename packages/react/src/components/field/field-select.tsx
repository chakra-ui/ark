'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useFieldContext } from './use-field-context'

export interface FieldSelectBaseProps extends PolymorphicProps {}
export interface FieldSelectProps extends HTMLProps<'select'>, FieldSelectBaseProps {}

export const FieldSelect = ({ ref, ...props }: FieldSelectProps) => {
  const field = useFieldContext()
  const mergedProps = mergeProps<HTMLProps<'select'>>(field?.getSelectProps(), props)

  return <ark.select {...mergedProps} ref={ref} />
}

FieldSelect.displayName = 'FieldSelect'
