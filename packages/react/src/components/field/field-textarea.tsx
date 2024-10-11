import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useFieldContext } from './use-field-context'

export interface FieldTextareaBaseProps extends PolymorphicProps {}
export interface FieldTextareaProps extends HTMLProps<'textarea'>, FieldTextareaBaseProps {}

export const FieldTextarea = forwardRef<HTMLTextAreaElement, FieldTextareaProps>((props, ref) => {
  const field = useFieldContext()
  const mergedProps = mergeProps<HTMLProps<'textarea'>>(field?.getTextareaProps(), props)

  return <ark.textarea {...mergedProps} ref={ref} />
})

FieldTextarea.displayName = 'FieldTextarea'
