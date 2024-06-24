import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useFieldContext } from './use-field-context'

export interface FieldHelperTextBaseProps extends PolymorphicProps {}
export interface FieldHelperTextProps extends HTMLProps<'span'>, FieldHelperTextBaseProps {}

export const FieldHelperText = forwardRef<HTMLSpanElement, FieldHelperTextProps>((props, ref) => {
  const field = useFieldContext()
  const mergedProps = mergeProps<HTMLProps<'span'>>(field?.getHelperTextProps(), props)

  return <ark.span {...mergedProps} ref={ref} />
})

FieldHelperText.displayName = 'FieldHelperText'
