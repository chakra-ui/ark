import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useRadioGroupContext } from './use-radio-group-context'

export interface RadioGroupLabelBaseProps extends PolymorphicProps<'label'> {}
export interface RadioGroupLabelProps extends HTMLProps<'label'>, RadioGroupLabelBaseProps {}

export const RadioGroupLabel = (props: RadioGroupLabelProps) => {
  const radioGroup = useRadioGroupContext()
  const mergedProps = mergeProps(() => radioGroup().getLabelProps(), props)

  return <ark.label {...mergedProps} />
}
