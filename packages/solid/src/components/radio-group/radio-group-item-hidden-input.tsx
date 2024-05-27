import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useRadioGroupContext } from './use-radio-group-context'
import { useRadioGroupItemPropsContext } from './use-radio-group-item-props-context'

export interface RadioGroupItemHiddenInputProps extends HTMLArkProps<'input'> {}

export const RadioGroupItemHiddenInput = (props: RadioGroupItemHiddenInputProps) => {
  const radioGroup = useRadioGroupContext()
  const itemProps = useRadioGroupItemPropsContext()
  const mergedProps = mergeProps(() => radioGroup().getItemHiddenInputProps(itemProps), props)

  return <ark.input {...mergedProps} />
}
