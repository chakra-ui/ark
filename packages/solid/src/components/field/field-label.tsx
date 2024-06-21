import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useFieldContext } from './use-field-context'

export interface FieldLabelBaseProps extends PolymorphicProps<'label'> {}
export interface FieldLabelProps extends HTMLProps<'label'>, FieldLabelBaseProps {}

export const FieldLabel = (props: FieldLabelProps) => {
  const field = useFieldContext()
  const mergedProps = mergeProps(() => field?.getLabelProps(), props)

  return <ark.label {...mergedProps} />
}
