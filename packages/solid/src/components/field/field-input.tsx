import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useFieldContext } from './use-field-context'

export interface FieldInputBaseProps extends PolymorphicProps<'input'> {}
export interface FieldInputProps extends HTMLProps<'input'>, FieldInputBaseProps {}

export const FieldInput = (props: FieldInputProps) => {
  const field = useFieldContext()
  const mergedProps = mergeProps(() => field?.().getInputProps(), props)

  return <ark.input {...mergedProps} />
}
