import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useRadioGroupContext } from './use-radio-group-context'

export interface RadioGroupLabelBaseProps extends PolymorphicProps<'label'> {}
export interface RadioGroupLabelProps
  extends JSX.LabelHTMLAttributes<HTMLLabelElement>,
    RadioGroupLabelBaseProps {}

export const RadioGroupLabel = (props: RadioGroupLabelProps) => {
  const radioGroup = useRadioGroupContext()
  const mergedProps = mergeProps(() => radioGroup().getLabelProps(), props)

  return <ark.label {...mergedProps} />
}
