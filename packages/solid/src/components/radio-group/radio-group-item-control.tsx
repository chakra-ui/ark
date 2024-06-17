import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useRadioGroupContext } from './use-radio-group-context'
import { useRadioGroupItemPropsContext } from './use-radio-group-item-props-context'

export interface RadioGroupItemControlBaseProps extends PolymorphicProps<'div'> {}
export interface RadioGroupItemControlProps
  extends HTMLProps<'div'>,
    RadioGroupItemControlBaseProps {}

export const RadioGroupItemControl = (props: RadioGroupItemControlProps) => {
  const radioGroup = useRadioGroupContext()
  const itemProps = useRadioGroupItemPropsContext()
  const mergedProps = mergeProps(() => radioGroup().getItemControlProps(itemProps), props)

  return <ark.div {...mergedProps} />
}
