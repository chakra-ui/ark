import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useRadioGroupContext } from './use-radio-group-context'
import { useRadioGroupItemPropsContext } from './use-radio-group-item-props-context'

export interface RadioGroupItemHiddenInputBaseProps extends PolymorphicProps<'input'> {}
export interface RadioGroupItemHiddenInputProps
  extends HTMLProps<'input'>,
    RadioGroupItemHiddenInputBaseProps {}

export const RadioGroupItemHiddenInput = (props: RadioGroupItemHiddenInputProps) => {
  const radioGroup = useRadioGroupContext()
  const itemProps = useRadioGroupItemPropsContext()
  const mergedProps = mergeProps(() => radioGroup().getItemHiddenInputProps(itemProps), props)

  return <ark.input {...mergedProps} />
}
