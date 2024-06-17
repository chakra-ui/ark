import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useRadioGroupContext } from './use-radio-group-context'
import { useRadioGroupItemPropsContext } from './use-radio-group-item-props-context'

export interface RadioGroupItemTextBaseProps extends PolymorphicProps<'span'> {}
export interface RadioGroupItemTextProps extends HTMLProps<'span'>, RadioGroupItemTextBaseProps {}

export const RadioGroupItemText = (props: RadioGroupItemTextProps) => {
  const radioGroup = useRadioGroupContext()
  const itemProps = useRadioGroupItemPropsContext()
  const mergedProps = mergeProps(() => radioGroup().getItemTextProps(itemProps), props)

  return <ark.span {...mergedProps} />
}
