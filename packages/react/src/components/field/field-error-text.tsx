'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useFieldContext } from './use-field-context'

export interface FieldErrorTextBaseProps extends PolymorphicProps {}
export interface FieldErrorTextProps extends HTMLProps<'span'>, FieldErrorTextBaseProps {}

export const FieldErrorText = ({ ref, ...props }: FieldErrorTextProps) => {
  const field = useFieldContext()
  const mergedProps = mergeProps(field.getErrorTextProps(), props)

  if (field?.invalid) {
    return <ark.span {...mergedProps} ref={ref} />
  }
  return null
}

FieldErrorText.displayName = 'FieldErrorText'
