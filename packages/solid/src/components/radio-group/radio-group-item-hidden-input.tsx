import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useRadioGroupContext } from './use-radio-group-context.ts'
import { useRadioGroupItemPropsContext } from './use-radio-group-item-props-context.ts'

export interface RadioGroupItemHiddenInputBaseProps extends PolymorphicProps<'input'> {}
export interface RadioGroupItemHiddenInputProps extends HTMLProps<'input'>, RadioGroupItemHiddenInputBaseProps {}

export const RadioGroupItemHiddenInput = (props: RadioGroupItemHiddenInputProps) => {
  const radioGroup = useRadioGroupContext()
  const itemProps = useRadioGroupItemPropsContext()
  const mergedProps = mergeProps(() => radioGroup().getItemHiddenInputProps(itemProps), props)

  return <ark.input {...mergedProps} />
}
