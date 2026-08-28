import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useRadioGroupContext } from './use-radio-group-context.ts'

export interface RadioGroupLabelBaseProps extends PolymorphicProps<'span'> {}
export interface RadioGroupLabelProps extends HTMLProps<'span'>, RadioGroupLabelBaseProps {}

export const RadioGroupLabel = (props: RadioGroupLabelProps) => {
  const radioGroup = useRadioGroupContext()
  const mergedProps = mergeProps(() => radioGroup().getLabelProps(), props)

  return <ark.span {...mergedProps} />
}
