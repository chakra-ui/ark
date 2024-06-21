import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useFieldContext } from './use-field-context'

export interface FieldTextareaBaseProps extends PolymorphicProps<'textarea'> {}
export interface FieldTextareaProps extends HTMLProps<'textarea'>, FieldTextareaBaseProps {}

export const FieldTextarea = (props: FieldTextareaProps) => {
  const field = useFieldContext()
  const mergedProps = mergeProps(() => field?.getTextareaProps(), props)

  return <ark.textarea {...mergedProps} />
}
